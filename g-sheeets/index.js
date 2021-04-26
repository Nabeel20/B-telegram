const gsheetProcessor = require('./gsheetsprocessor');

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

module.exports = reader;

