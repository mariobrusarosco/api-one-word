"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var table_controller_1 = __importDefault(require("../controllers/table-controller"));
var TableRouting = function (app) {
    var tableRouter = express_1.default.Router();
    tableRouter.post('/', table_controller_1.default.createTable);
    tableRouter.get('/', table_controller_1.default.getAllTables);
    tableRouter.patch('/:tableId', table_controller_1.default.updateTable);
    tableRouter.get('/:tableId', table_controller_1.default.getTable);
    tableRouter.post('/:tableId/invite', table_controller_1.default.updateTableInvite);
    tableRouter.post('/join/:inviteCode', table_controller_1.default.joinTable);
    tableRouter.patch('/:tableId/profile', table_controller_1.default.updateProfile);
    app.use("".concat(process.env.API_VERSION, "/tables"), tableRouter);
};
exports.default = TableRouting;
