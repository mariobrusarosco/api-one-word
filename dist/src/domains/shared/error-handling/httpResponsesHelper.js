"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInternalServerErrorResponse = void 0;
var mapper_1 = require("./mapper");
function handleInternalServerErrorResponse(res, error) {
    // TODO log the error param somewhere
    return res
        .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
        .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage);
}
exports.handleInternalServerErrorResponse = handleInternalServerErrorResponse;
