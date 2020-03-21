import { code as codeImp } from 'currency-codes';
var cFormat = require('currency-formatter');

export class currency {

    private name: string | undefined;

    constructor(
        private code: string,
        private cant: number | undefined,
        private conversion?: [currency, any] | undefined) {
        this.name = codeImp(this.code)?.currency;
    }

    //getters

    public getName(): string | undefined {
        return this.name;
    }

    public getCode(): string {
        return this.code;
    }

    public getCant(): number | undefined {
        return this.cant;
    }

    public getConversion(): [currency, any] | undefined {
        return this.conversion;
    }

    //setters

    public setCant(cantAtt: number | undefined): void {
        this.cant = cantAtt;
    }

    public setConversion(convAttr: [currency, any] | undefined): void {
        this.conversion = convAttr;
    }

    //funcion que retorna el objeto en formato json
    public toJson(c?: boolean): any {
        return {
            "name": this.name,
            "code": this.code,
            "cant": this.cant,
            "cantFormat": cFormat.format(this.cant, { code: this.code }),
            "convert": !c ? {
                "lastUpdate": this.conversion?.[1],
                "data": this.conversion?.[0].toJson(true)
            } : undefined
        }
    }


}