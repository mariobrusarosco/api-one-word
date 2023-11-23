"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorMapper = void 0;
exports.GlobalErrorMapper = {
    BIG_FIVE_HUNDRED: {
        status: 500,
        debug: 'no idea!',
        userMessage: 'Sorry something went wrong when handling your data. Contact us if this error persists.'
    },
    NOT_AUTHORIZED: {
        status: 401,
        debug: 'User not authorized',
        userMessage: 'not authorized'
    }
};
