"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mapper_1 = require("../../shared/error-handling/mapper");
var mapper_2 = require("../error-handling/mapper");
var database_1 = __importDefault(require("../../../services/database"));
function createChannel(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, existingChannel, newChannel, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req === null || req === void 0 ? void 0 : req.body;
                    if (!body.name) {
                        return [2 /*return*/, res.status(400).json({ message: mapper_2.ErrorMapper.MISSING_NAME })];
                    }
                    if (!body.tableId) {
                        return [2 /*return*/, res.status(400).json({ message: mapper_2.ErrorMapper.MISSING_TABLE_ID })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, database_1.default.channel.findFirst({
                            where: {
                                name: body.name
                            }
                        })];
                case 2:
                    existingChannel = _a.sent();
                    if (existingChannel) {
                        return [2 /*return*/, res
                                .status(mapper_2.ErrorMapper.DUPLICATED_NAME.status)
                                .send(mapper_2.ErrorMapper.DUPLICATED_NAME.userMessage)];
                    }
                    return [4 /*yield*/, database_1.default.channel.create({
                            data: {
                                name: body.name,
                                tableId: body.tableId
                            }
                        })];
                case 3:
                    newChannel = _a.sent();
                    return [2 /*return*/, res.json(newChannel)];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function deleteChannel(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var channeld, existingChannel, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    channeld = req === null || req === void 0 ? void 0 : req.params.channelId;
                    if (!channeld) {
                        return [2 /*return*/, res
                                .status(mapper_2.ErrorMapper.MISSING_CHANNEL_ID.status)
                                .json(mapper_2.ErrorMapper.MISSING_CHANNEL_ID)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, database_1.default.channel.findUnique({
                            where: {
                                id: channeld
                            }
                        })];
                case 2:
                    existingChannel = _a.sent();
                    if (!existingChannel) {
                        return [2 /*return*/, res
                                .status(mapper_2.ErrorMapper.NOT_FOUND.status)
                                .send(mapper_2.ErrorMapper.NOT_FOUND.userMessage)];
                    }
                    return [4 /*yield*/, database_1.default.channel.delete({
                            where: {
                                id: channeld
                            }
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.json('ok')];
                case 4:
                    error_2 = _a.sent();
                    return [2 /*return*/, res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function updateChannel(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var channeld, _a, tableId, name, result, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    channeld = req === null || req === void 0 ? void 0 : req.params.channelId;
                    if (!channeld) {
                        return [2 /*return*/, res
                                .status(mapper_2.ErrorMapper.MISSING_CHANNEL_ID.status)
                                .json(mapper_2.ErrorMapper.MISSING_CHANNEL_ID.userMessage)];
                    }
                    _a = req === null || req === void 0 ? void 0 : req.body, tableId = _a.tableId, name = _a.name;
                    if (!tableId) {
                        return [2 /*return*/, res
                                .status(mapper_2.ErrorMapper.MISSING_TABLE_ID.status)
                                .json(mapper_2.ErrorMapper.MISSING_TABLE_ID.userMessage)];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, database_1.default.channel.update({
                            where: { id: channeld },
                            data: { name: name }
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, res.json(result)];
                case 3:
                    error_3 = _b.sent();
                    return [2 /*return*/, res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var ChannelController = {
    createChannel: createChannel,
    deleteChannel: deleteChannel,
    updateChannel: updateChannel
};
exports.default = ChannelController;
