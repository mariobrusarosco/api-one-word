"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMapper = exports.CHANNEL_API_ERRORS = void 0;
var CHANNEL_API_ERRORS;
(function (CHANNEL_API_ERRORS) {
    CHANNEL_API_ERRORS["DUPLICATED_NAME"] = "duplicated_name";
    CHANNEL_API_ERRORS["NOT_FOUND"] = "not_found";
})(CHANNEL_API_ERRORS = exports.CHANNEL_API_ERRORS || (exports.CHANNEL_API_ERRORS = {}));
exports.ErrorMapper = {
    DUPLICATED_NAME: {
        status: 404,
        debug: 'duplicated key: name',
        userMessage: 'This channel already exists. Please, try another name'
    },
    MISSING_CHANNEL_ID: {
        status: 400,
        debug: 'missing key: channel',
        userMessage: 'Ops! You need to provide a valid channel id to remove it.'
    },
    MISSING_NAME: {
        status: 400,
        debug: 'missing key: name',
        userMessage: 'Ops! You need to provide a valid name to create a channel.'
    },
    MISSING_TABLE_ID: {
        status: 400,
        debug: 'missing key: tableId',
        userMessage: 'Ops! We could not identify the necessary data to work on this channel.'
    },
    NOT_FOUND: {
        status: 404,
        debug: 'not found',
        userMessage: 'This channel does not exists.'
    }
};
