"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    console.log('[logger]', req.url);
    console.log('[cookies]', req.cookies);
    next();
};
exports.default = logger;
