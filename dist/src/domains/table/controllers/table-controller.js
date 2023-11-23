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
var uuid_1 = require("uuid");
var database_1 = __importDefault(require("../../../services/database"));
var client_1 = require("@prisma/client");
var getUserCookie_1 = require("../../../domains/shared/utils/getUserCookie");
function getAllTables(_, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database_1.default.table.findMany({
                            include: { profiles: true, channels: true }
                        })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.status(200).send(results)];
                case 2:
                    error_1 = _a.sent();
                    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
                    return [2 /*return*/, res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createTable(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, fakeAuth, newTable, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req === null || req === void 0 ? void 0 : req.body;
                    if (!(body === null || body === void 0 ? void 0 : body.name)) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: 'You must provide a name to create a table' })];
                    }
                    fakeAuth = (0, getUserCookie_1.getUserCookie)(req);
                    return [4 /*yield*/, database_1.default.table.create({
                            data: {
                                name: body.name,
                                inviteCode: (0, uuid_1.v4)(),
                                profiles: {
                                    create: {
                                        memberId: fakeAuth,
                                        role: client_1.TableRole.ADMIN
                                    }
                                },
                                channels: {
                                    create: {
                                        name: 'general'
                                    }
                                }
                            }
                        })];
                case 1:
                    newTable = _a.sent();
                    res.json(newTable);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if ((error_2 === null || error_2 === void 0 ? void 0 : error_2.value) === 'NULL') {
                        return [2 /*return*/, res.status(mapper_2.ErrorMapper.NOT_FOUND.status).send(mapper_2.ErrorMapper.NOT_FOUND.status)];
                    }
                    else {
                        console.error(error_2);
                        // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
                        res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.debug);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getTable(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tableId, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tableId = req === null || req === void 0 ? void 0 : req.params.tableId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, database_1.default.table.findUnique({
                            where: { id: tableId },
                            include: { profiles: true }
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).send(result)];
                case 3:
                    error_3 = _a.sent();
                    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
                    res
                        .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                        .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateTable(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, tableNewName, tableId, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req === null || req === void 0 ? void 0 : req.body;
                    tableNewName = body === null || body === void 0 ? void 0 : body.name;
                    if (!tableNewName) {
                        return [2 /*return*/, res.status(400).json(mapper_2.ErrorMapper.MISSING_NAME)];
                    }
                    tableId = req === null || req === void 0 ? void 0 : req.params.tableId;
                    return [4 /*yield*/, database_1.default.table.update({
                            where: { id: tableId },
                            data: { name: tableNewName }
                        })];
                case 1:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    return [2 /*return*/, res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateTableInvite(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tableId, table, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    tableId = req === null || req === void 0 ? void 0 : req.params.tableId;
                    return [4 /*yield*/, database_1.default.table.update({
                            where: { id: tableId },
                            data: { inviteCode: (0, uuid_1.v4)() }
                        })];
                case 1:
                    table = _a.sent();
                    res.json(table.inviteCode);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
                    res
                        .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                        .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.debug);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function joinTable(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var inviteCode, fakeAuth, table, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    inviteCode = req === null || req === void 0 ? void 0 : req.params.inviteCode;
                    fakeAuth = (0, getUserCookie_1.getUserCookie)(req);
                    return [4 /*yield*/, database_1.default.table.update({
                            where: { inviteCode: inviteCode },
                            data: {
                                profiles: {
                                    create: {
                                        memberId: fakeAuth,
                                        role: client_1.TableRole.GUEST
                                    }
                                }
                            }
                        })];
                case 1:
                    table = _a.sent();
                    res.json(table);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    // log here: ErrorMapper.BIG_FIVE_HUNDRED.debug
                    console.error(error_6);
                    res
                        .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                        .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.debug);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, role, profileId, updateProfile_1, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req === null || req === void 0 ? void 0 : req.body;
                    role = body === null || body === void 0 ? void 0 : body.role;
                    profileId = body === null || body === void 0 ? void 0 : body.id;
                    if (!role) {
                        return [2 /*return*/, res.status(400).json(mapper_2.ErrorMapper.MISSING_PROFILE_ROLE)];
                    }
                    return [4 /*yield*/, database_1.default.tableProfile.update({
                            where: { id: profileId },
                            data: { role: role }
                        })];
                case 1:
                    updateProfile_1 = _a.sent();
                    res.status(200).json(updateProfile_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    return [2 /*return*/, res
                            .status(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.status)
                            .send(mapper_1.GlobalErrorMapper.BIG_FIVE_HUNDRED.userMessage)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var TableController = {
    getAllTables: getAllTables,
    getTable: getTable,
    createTable: createTable,
    updateTable: updateTable,
    updateTableInvite: updateTableInvite,
    joinTable: joinTable,
    updateProfile: updateProfile
};
exports.default = TableController;
