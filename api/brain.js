const { Telegraf } = require('telegraf');
const { json } = require('micro');
const fetch = require('node-fetch');

const token = process.env.Bot_token;
const bot = new Telegraf(token, { telegram: { webhookReply: false } });

function get_database() {
    const gsheetsAPI = function (sheetId, sheetNumber = 1) {
        const errorObj = { hasError: true };

        try {
            const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json-in-script`;

            return fetch(sheetsUrl)
                .then(response => {
                    if (!response.ok) {
                        console.log('there is an error in the gsheets response');
                        throw new Error('Error fetching GSheet');
                    }
                    return response.text();
                })
                .then(resultText => {
                    const formattedText = resultText
                        .replace('gdata.io.handleScriptLoaded(', '')
                        .slice(0, -2);
                    return JSON.parse(formattedText);
                })
                .catch(err => {
                    throw new Error(
                        'Failed to fetch from GSheets API. Check your Sheet Id and the public availability of your GSheet.'
                    );
                });
        } catch (err) {
            throw new Error(`General error when fetching GSheet: ${err}`);
        }
    };
    function matchValues(valToMatch, valToMatchAgainst, matchingType) {
        try {
            if (typeof valToMatch != 'undefined') {
                valToMatch = valToMatch.toLowerCase().trim();
                valToMatchAgainst = valToMatchAgainst.toLowerCase().trim();

                if (matchingType === 'strict') {
                    return valToMatch === valToMatchAgainst;
                }

                if (matchingType === 'loose') {
                    return (
                        valToMatch.includes(valToMatchAgainst) ||
                        valToMatch == valToMatchAgainst
                    );
                }
            }
        } catch (e) {
            console.log(`error in matchValues: ${e.message}`);
            return false;
        }

        return false;
    }
    function filterResults(resultsToFilter, filter, options) {
        let filteredData = [];

        // now we have a list of rows, we can filter by various things
        return resultsToFilter.filter(item => {

            // item data shape
            // item = {
            //   'Module Name': 'name of module',
            //   ...
            //   Department: 'Computer science'
            // }

            let addRow = null;
            let filterMatches = [];

            if (
                typeof item === 'undefined' ||
                item.length <= 0 ||
                Object.keys(item).length <= 0
            ) {
                return false;
            }

            Object.keys(filter).forEach(key => {
                const filterValue = filter[key]; // e.g. 'archaeology'

                // need to find a matching item object key in case of case differences
                const itemKey = Object.keys(item).find(thisKey => thisKey.toLowerCase().trim() === key.toLowerCase().trim());
                const itemValue = item[itemKey]; // e.g. 'department' or 'undefined'

                filterMatches.push(
                    matchValues(itemValue, filterValue, options.matching || 'loose')
                );
            });

            if (options.operator === 'or') {
                addRow = filterMatches.some(match => match === true);
            }

            if (options.operator === 'and') {
                addRow = filterMatches.every(match => match === true);
            }

            return addRow;
        });
    }
    function processGSheetResults(
        JSONResponse,
        returnAllResults,
        filter,
        filterOptions
    ) {
        const data = JSONResponse.feed.entry;
        const startRow = 2; // skip the header row(1), don't need it

        let processedResults = [{}];
        let colNames = {};

        for (let item of data) {
            const cell = item['gs$cell']; // gets cell data
            const val = cell['$t']; // gets cell value
            const columnNum = cell['col']; // gets the col number
            const thisRow = cell['row']; // gets the row number

            const colNameToAdd = colNames[columnNum]; // careful, this will be undefined if we hit it on the first pass

            // don't add this row to the return data, but add it to list of column names
            if (thisRow < startRow) {
                colNames[columnNum] = val;
                continue; // skip the header row
            }

            if (typeof processedResults[thisRow] === 'undefined') {
                processedResults[thisRow] = {};
            }

            if (typeof colNameToAdd !== 'undefined' && colNameToAdd.length > 0) {
                processedResults[thisRow][colNameToAdd] = val;
            }
        }

        // make sure we're only returning valid, filled data items
        processedResults = processedResults.filter(
            result => Object.keys(result).length
        );

        // if we're not filtering, then return all results
        if (returnAllResults || !filter) {
            return processedResults;
        }

        return filterResults(processedResults, filter, filterOptions);
    }
    const gsheetProcessor = function (options, callback, onError) {
        return gsheetsAPI(
            options.sheetId,
            options.sheetNumber ? options.sheetNumber : 1
        )
            .then(result => {
                const filteredResults = processGSheetResults(
                    result,
                    options.returnAllResults || false,
                    options.filter || false,
                    options.filterOptions || {
                        operator: 'or',
                        matching: 'loose'
                    }
                );

                callback(filteredResults);
            })
            .catch(err => onError(err.message));
    };
    const reader = (options, callback, onError) => {
        return gsheetProcessor(
            options,
            results => {
                callback(results);
            },
            error => {
                if (onError) {
                    onError(error);
                } else {
                    throw new Error(`g-sheets-api error: ${error}`);
                }
            }
        );
    };
    let output = [];
    reader(
        {
            sheetId: "1R8vXFIZ32PUK3M2zHYuJnXCyZh7Nbg0BWKsBCPz9dY0",
        },
        (results) => {
            output = results
        },
        (error) => {
            output = []
        })
    return output
}

bot.start((ctx) => ctx.reply(`أهلاً ${ctx.chat.first_name}`));
bot.command('balsam', (ctx) => ctx.reply(`قناتنا على التلغرام @Balsam_app`))

bot.on('text', async (ctx) => {
    let msg = ctx.message.text;
    //  let database_output = get_database().filter(quiz => quiz.name.includes(msg.trim()))
    let database_output = []
    if (database_output.length > 0) {
        for (let index = 0; index < database_output.length; index++) {
            const quiz = database_output[index];
            await ctx.reply(quiz.caption);
            await ctx.reply(quiz.path);
        }
    } else {
        await ctx.reply('عذراً لم أجد الملف الذي تبحث عنه');
        await ctx.reply(JSON.stringify(get_database(), null, 2))
        await ctx.reply('ربما يمكنك البحث عنه على قناتنا على التلغرام @Balsam_app')
    }
})

module.exports = async function (req, res) {
    try {
        const body = await json(req)
        await bot.handleUpdate(body)
        res.statusCode = 200
        res.end('')
    } catch (e) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Server Error</h1><p>عذراً، حدثت مشكلة</p>')
    }
};
