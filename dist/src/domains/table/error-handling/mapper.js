"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMapper = void 0;
exports.ErrorMapper = {
    NOT_FOUND: {
        status: 404,
        debug: 'not found',
        userMessage: 'This table was not created yet.'
    },
    MISSING_NAME: {
        status: 400,
        debug: 'missing name',
        userMessage: 'You must provide an name in order to create a table.'
    },
    MISSING_PROFILE_ROLE: {
        status: 400,
        debug: 'missing profile_role',
        userMessage: 'You must provide a new role for the profile you want update.'
    },
    MISSING_NOT_PROFILE_FOUND: {
        status: 400,
        debug: 'profile_not_found',
        userMessage: 'You must provide a valid profile id.'
    }
};
