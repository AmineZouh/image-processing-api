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
var fs_1 = __importDefault(require("fs"));
var image_size_1 = require("image-size");
var path_1 = __importDefault(require("path"));
var supertest_1 = __importDefault(require("supertest"));
var ImageHandling_1 = require("../ImageHandling");
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
describe('the api should passes all those tests', function () {
    it('should get the endpoint api/images', function () { return __awaiter(void 0, void 0, void 0, function () {
        var testPath, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testPath = path_1.default.join(__dirname, '..', '..', 'static', 'thumbnail', 'fjord_360_350_thumb.jpg');
                    return [4 /*yield*/, request.get('/api/images?filename=fjord.jpg&width=360&height=350')];
                case 1:
                    response = _a.sent();
                    expect(response.error).toBeFalsy();
                    expect(response.statusCode).toBe(200);
                    expect(typeof response.text).toBe('string');
                    return [2 /*return*/];
            }
        });
    }); });
    it('a new image should be situated at thumbnail folder when calling transform', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, resultPath, width, height;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imagePath = path_1.default.join(__dirname, '..', '..', 'static', 'img', 'icelandwaterfall.jpg');
                    resultPath = path_1.default.join(__dirname, '..', '..', 'static', 'thumbnail', 'icelandwaterfall_206_311_thumb.jpg');
                    width = 206;
                    height = 311;
                    if (fs_1.default.existsSync(resultPath) === true)
                        fs_1.default.unlinkSync(resultPath);
                    return [4 /*yield*/, (0, ImageHandling_1.transform)(imagePath, width, height)];
                case 1:
                    _a.sent();
                    setTimeout(function () {
                        expect(fs_1.default.existsSync(resultPath)).toBe(true);
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('The new image should have the same dimensions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, verifyPath, width, height;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imagePath = path_1.default.join(__dirname, '..', '..', 'static', 'img', 'icelandwaterfall.jpg');
                    verifyPath = path_1.default.join(__dirname, '..', '..', 'static', 'thumbnail', 'icelandwaterfall_207_312_thumb.jpg');
                    width = 207;
                    height = 312;
                    if (fs_1.default.existsSync(verifyPath) === true)
                        fs_1.default.unlinkSync(verifyPath);
                    return [4 /*yield*/, (0, ImageHandling_1.transform)(imagePath, width, height)];
                case 1:
                    _a.sent();
                    setTimeout(function () {
                        var dimensions = (0, image_size_1.imageSize)(verifyPath);
                        expect(dimensions.width === width && dimensions.height === height).toBe(true);
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expect transform to not return error message', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, width, height;
        return __generator(this, function (_a) {
            imagePath = path_1.default.join(__dirname, '..', '..', 'static', 'img', 'encenadaport.jpg');
            width = 206;
            height = 311;
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, ImageHandling_1.transform)(imagePath, width, height)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.status];
                    }
                });
            }); }).not.toBe('Error');
            return [2 /*return*/];
        });
    }); });
    it('expect the endpoint to return error message', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fileName, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = 'inexitant.jpg';
                    return [4 /*yield*/, request.get('/api/images?filename=inexitant.jpg&width=300&height=350')];
                case 1:
                    response = _a.sent();
                    expect(response.text).toBe("something wrong happened : Error: ".concat(fileName, " : This image doesn't existe"));
                    return [2 /*return*/];
            }
        });
    }); });
});
