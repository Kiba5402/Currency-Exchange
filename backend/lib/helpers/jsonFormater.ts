export const jsonUtils = {
    msgList: [
        "Se obtubo la lista de forma correcta", //cod 0
        "Se hizo la conversion de forma correcta", //cod 1
        "Se presento un error en la peticio HTTP", //cod 2
        "La respuesta de la API no fue la esperada (json), revise la consola", //cod 3
        "API no seteada, puede que no exista" //cod 4
    ],
    creaResp: (flag: boolean, codMsg: number, data: any) => {
        return {
            "flag": flag,
            "msg": jsonUtils.msgList[codMsg],
            "data": data
        }
    },
    getMsg: (codMsg: number) => {
        return jsonUtils.msgList[codMsg];
    }
}