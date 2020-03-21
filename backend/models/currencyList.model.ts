import { code as codeImp } from 'currency-codes';

export class currencyList {

    private name: string | undefined;

    constructor(private code: string) {
        this.name = codeImp(this.code)?.currency;
    }

    //getters

    public getName(): string | undefined {
        return (this.name == undefined) ? 'No Disp.' : this.name;
    }

    public getCode(): string {
        return this.code;
    }

    public toJson(): any {
        return {
            "name": this.getName(),
            "code": this.code
        }
    }

}