"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonUtils = {
    msgList: [
        "Se obtubo la lista de forma correcta",
        "Se hizo la conversion de forma correcta",
        "Se presento un error en la peticio HTTP",
        "La respuesta de la API no fue la esperada (json), revise la consola",
        "API no seteada, puede que no exista",
        "No hay APIs disponibles" //cod5
    ],
    creaResp: (flag, codMsg, data) => {
        return {
            "flag": flag,
            "msg": exports.jsonUtils.msgList[codMsg],
            "data": data
        };
    },
    getMsg: (codMsg) => {
        return exports.jsonUtils.msgList[codMsg];
    }
};
