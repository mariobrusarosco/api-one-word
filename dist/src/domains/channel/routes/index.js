"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var channel_controller_1 = __importDefault(require("../controllers/channel-controller"));
var TournamentRouting = function (app) {
    var channelRouter = express_1.default.Router();
    channelRouter.post('/', channel_controller_1.default.createChannel);
    channelRouter.delete('/:channelId', channel_controller_1.default.deleteChannel);
    channelRouter.patch('/:channelId', channel_controller_1.default.updateChannel);
    app.use("".concat(process.env.API_VERSION, "/channels"), channelRouter);
};
exports.default = TournamentRouting;
