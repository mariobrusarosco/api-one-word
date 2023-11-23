"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapper_1 = require("../domains/shared/error-handling/mapper");
var getUserCookie_1 = require("../domains/shared/utils/getUserCookie");
var authentication = function (req, res, next) {
    var fakeAuth = (0, getUserCookie_1.getUserCookie)(req);
    if (fakeAuth) {
        return next();
    }
    var error = mapper_1.GlobalErrorMapper.NOT_AUTHORIZED;
    return res.status(error.status).send(error.userMessage);
};
exports.default = authentication;
