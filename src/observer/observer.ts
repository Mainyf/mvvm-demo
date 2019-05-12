import { Dep } from './dep';

class Observer {

    private data: any;

    constructor(data: any) {
        this.data = data;
        this.attackProxy(data);
    }

    attackProxy(data: any) {
        Object.keys(data).forEach((key) => this.defineReactive(this.data, key, data[key]));
    }

    defineReactive(data: any, key: string, val: any) {
        const dep = new Dep();

        observer(val);

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: (newVal: any) => {
                if (newVal !== val) {
                    val = newVal;
                    observer(val);
                    dep.notify();
                }
            }
        });
    }

}


export function observer(data: any): Observer | undefined {
    if (data && typeof data === 'object') {
        return new Observer(data);
    }
}