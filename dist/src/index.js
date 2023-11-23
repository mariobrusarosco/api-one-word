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
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = __importDefault(require("./domains/table/routes"));
var routes_2 = __importDefault(require("./domains/channel/routes"));
var routes_3 = __importDefault(require("./domains/message/routes"));
var logger_1 = __importDefault(require("./middlewares/logger"));
var authentication_1 = __importDefault(require("./middlewares/authentication"));
// const cors = require('cors')
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
// console.log('----------', process.env.ACESS_CONTROL_ALLOW_ORIGIN, process.env.NODE_ENV)
// // Temp middlewares
// app.set('trust proxy', 1)
// const corsConfig = {
//   origin: process.env.ACESS_CONTROL_ALLOW_ORIGIN,
//   credentials: true
// }
// app.use(cors(corsConfig))
// app.options('*', cors(corsConfig))
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.ACESS_CONTROL_ALLOW_ORIGIN)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
//   )
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
//   next()
// })
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
app.use(authentication_1.default);
// Rest routes - temporary place
(0, routes_1.default)(app);
(0, routes_2.default)(app);
(0, routes_3.default)(app);
// UserRouting(app)
// AuthRouting(app)
// Rest routes - temporary place'
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            app.listen(PORT, function () { return console.log("Listening on port ".concat(PORT)); });
            return [2 /*return*/];
        });
    });
}
startServer();
exports.default = app;
// Middleware flow POC!
// app.use(middleware1)
// app.use(middleware2)
// app.get('/middlewares', (_, res) => {
//   console.log('GET on /middlewares')
//   res.send('middlewares')
// })
// Middleware flow POC!
