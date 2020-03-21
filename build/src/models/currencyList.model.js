"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currency_codes_1 = require("currency-codes");
class currencyList {
    constructor(code) {
        var _a;
        this.code = code;
        this.name = (_a = currency_codes_1.code(this.code)) === null || _a === void 0 ? void 0 : _a.currency;
    }
    //getters
    getName() {
        return (this.name == undefined) ? 'No Disp.' : this.name;
    }
    getCode() {
        return this.code;
    }
    toJson() {
        return {
            "name": this.getName(),
            "code": this.code
        };
    }
}
exports.currencyList = currencyList;
