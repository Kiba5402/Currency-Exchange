"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currency_codes_1 = require("currency-codes");
var cFormat = require('currency-formatter');
class currency {
    constructor(code, cant, conversion) {
        var _a;
        this.code = code;
        this.cant = cant;
        this.conversion = conversion;
        this.name = (_a = currency_codes_1.code(this.code)) === null || _a === void 0 ? void 0 : _a.currency;
    }
    //getters
    getName() {
        return this.name;
    }
    getCode() {
        return this.code;
    }
    getCant() {
        return this.cant;
    }
    getConversion() {
        return this.conversion;
    }
    //setters
    setCant(cantAtt) {
        this.cant = cantAtt;
    }
    setConversion(convAttr) {
        this.conversion = convAttr;
    }
    //funcion que retorna el objeto en formato json
    toJson(c) {
        var _a, _b;
        return {
            "name": this.name,
            "code": this.code,
            "cant": this.cant,
            "cantFormat": cFormat.format(this.cant, { code: this.code }),
            "convert": !c ? {
                "lastUpdate": (_a = this.conversion) === null || _a === void 0 ? void 0 : _a[1],
                "data": (_b = this.conversion) === null || _b === void 0 ? void 0 : _b[0].toJson(true)
            } : undefined
        };
    }
}
exports.currency = currency;
