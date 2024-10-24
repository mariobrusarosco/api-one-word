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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
// Disclaimer: Following Sentry DOCs, the above code should be placed in the main file before importing "Express" :https://docs.sentry.io/platforms/javascript/guides/express/
require("./services/profiling/sentry-instrument");
require("dotenv/config");
var Sentry = require('@sentry/node');
var express_1 = require("express");
var cookie_parser_1 = require("cookie-parser");
var routes_1 = require("@/domains/table/routes");
var routes_2 = require("@/domains/channel/routes");
var routes_3 = require("@/domains/message/routes");
var start_socket_server_1 = require("@/services/app-initialization/start-socket-server");
var start_web_server_1 = require("@/services/app-initialization/start-web-server");
var access_control_1 = require("@/middlewares/access-control");
var routes_4 = require("@/domains/auth/routes");
var routes_5 = require("@/domains/member/routes");
var profiling_1 = require("@/services/profiling");
// TODO Change to ESM import
var cors = require('cors');
var app = (0, express_1.default)();
var socketAdmin = (0, express_1.default)();
socketAdmin.use(express_1.default.static('./node_modules/@socket.io/admin-ui/ui/dist'));
socketAdmin.listen('5000');
// Middlewares
app.use(cors({
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
    credentials: true
}));
app.use(access_control_1.default);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(profiling_1.default.middleware);
// Routing
(0, routes_1.default)(app);
(0, routes_2.default)(app);
(0, routes_3.default)(app);
(0, routes_4.default)(app);
(0, routes_5.default)(app);
Sentry.setupExpressErrorHandler(app);
// Optional fallthrough error handler
// app.use(function onError(err, req, res: any) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500
//   res.end(res.sentry + '\n')
// })
function startServers() {
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            server = (0, start_web_server_1.startWebServer)(app);
            (0, start_socket_server_1.startSocketServer)(server);
            return [2 /*return*/];
        });
    });
}
startServers();
exports.default = app;
