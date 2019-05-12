import { observer } from './observer';

export class MVVM {
    
    private $options: any;
    private _data: any = Object.create({});

    constructor(options: any) {
        this.$options = options;
        const data = this._data = this.$options.data;

        Object.keys(data).forEach((key) => this._proxyData(key));

        observer(data);
    }

    _proxyData(key: string, setter?: Function, getter?: Function) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: () => {
                return this._data[key];
            },
            set: (newVal: any) => {
                this._data[key] = newVal;
            }
        });
    }

}