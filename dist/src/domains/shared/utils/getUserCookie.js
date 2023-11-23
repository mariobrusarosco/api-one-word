"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCookie = void 0;
var getUserCookie = function (req) {
    var cookies = req.cookies;
    var fakeAuth = cookies['one_word_auth'];
    return fakeAuth;
};
exports.getUserCookie = getUserCookie;
