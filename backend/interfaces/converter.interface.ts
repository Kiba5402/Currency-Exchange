import { currency } from '../models/currency.model';
import { currencyList } from '../models/currencyList.model';

export interface converterController {

    setAPI(): void;

    getConvert(codBase: string, codTarget: string, cant: number): Promise<currency>;

    getAllCurrencys(): any;

    connectAPI(url: string, query: string): any;

    formatListC(info: any): currencyList[];
}