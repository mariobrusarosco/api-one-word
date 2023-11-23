"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var message_controller_1 = __importDefault(require("../controllers/message-controller"));
var MessageRouting = function (app) {
    var messageRouter = express_1.default.Router();
    messageRouter.get('/:channelId', message_controller_1.default.getChannelMessages);
    messageRouter.post('/:channelId', message_controller_1.default.createMessage);
    app.use("".concat(process.env.API_VERSION, "/messages"), messageRouter);
};
exports.default = MessageRouting;
