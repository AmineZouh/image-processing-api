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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ImageHandling_1 = require("./ImageHandling");
var app = (0, express_1.default)();
var port = 3000;
var imageFolderPath = path_1.default.join(__dirname, '..', 'static', 'img');
app.get('/api/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var responseFromSecondFunction, name_1, width, height, originalImagePath, imageThumbPath_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                responseFromSecondFunction = { status: '', msg: '' };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                name_1 = req.query.filename;
                width = req.query.width;
                height = req.query.height;
                if (!width || !height || !name_1)
                    throw new Error('Missing parametrs! please provide all required parametrs');
                if ((typeof Number(width) !== 'number' || width <= 0) || (typeof Number(height) !== 'number' || height <= 0))
                    throw new Error('Incorect values! please provide a correct values to the parametrs');
                originalImagePath = path_1.default.join(imageFolderPath, name_1);
                imageThumbPath_1 = path_1.default.join(imageFolderPath, '..', 'thumbnail', name_1.split('.')[0] + "_".concat(width, "_").concat(height, "_thumb.jpg"));
                if (!fs_1.default.existsSync(originalImagePath)) return [3 /*break*/, 4];
                if (!!fs_1.default.existsSync(imageThumbPath_1)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, ImageHandling_1.transform)(originalImagePath, width, height)];
            case 2:
                responseFromSecondFunction = _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4: throw new Error("".concat(name_1, " : This image doesn't existe"));
            case 5:
                if (responseFromSecondFunction.status === "error") {
                    res.send(responseFromSecondFunction.msg);
                }
                else {
                    res.status(200);
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = res).send;
                                    _c = "\n                    <!DOCTYPE html>\n                    <html lang=\"en\">\n                    <head>\n                        <meta charset=\"UTF-8\">\n                        <title>Document</title>\n                        <script src=\"../src/index.ts\"></script>\n                    </head>\n                    <body>\n                        <div style=\"margin-left: 25%;margin-top: 10%\">\n                            <img src=".concat;
                                    return [4 /*yield*/, (0, ImageHandling_1.getImage)(imageThumbPath_1)];
                                case 1:
                                    _b.apply(_a, [_c.apply("\n                    <!DOCTYPE html>\n                    <html lang=\"en\">\n                    <head>\n                        <meta charset=\"UTF-8\">\n                        <title>Document</title>\n                        <script src=\"../src/index.ts\"></script>\n                    </head>\n                    <body>\n                        <div style=\"margin-left: 25%;margin-top: 10%\">\n                            <img src=", [_d.sent(), " alt="]).concat(name_1, ">\n                        </div>\n                    </body>\n                    </html>\n                ")]);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                }
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                res.send("something wrong happened : ".concat(err_1));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("server is running at localhost:".concat(port));
});
exports.default = app;
