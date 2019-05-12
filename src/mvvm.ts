import { observer } from './observer/observer';
import { Compile } from './compile/compile';

export class MVVM {

    private $compile: Compile;
    private _data: any = Object.create({});

    constructor(options: any) {
        this._data = options.data;

        Object.keys(this._data).forEach((key) => this._forwardThisToData(key));

        observer(this._data);

        this.$compile = new Compile(options.el || document.body, this);
    }

    _forwardThisToData(key: string) {
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