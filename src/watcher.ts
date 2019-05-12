import { MVVM } from './mvvm';
import { Dep } from './dep';
import { error } from './util/log';

export class Watcher {

    private vm: MVVM;
    private cb: Function;
    private depIds: Object = {};
    private getter: (data: any) => any;
    private value: any;

    constructor(vm: MVVM, expOrFn: ((data: any) => any) | string, cb: Function) {
        this.vm = vm;
        this.cb = cb;
        this.getter = typeof expOrFn === 'function' ? expOrFn : this.parseGetter(expOrFn.trim());
        this.value = this.get();
    }

    run() {
        const newVal = this.get();
        const oldVal = this.value;
        if(newVal !== oldVal) {
            this.value = newVal;
            this.cb.call(this.vm, newVal, oldVal);
        }
    }

    addDep(dep: Dep) {
        if(!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
    
    get() {
        Dep.target = this;
        const value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    }

    parseGetter(exp: string): (data: any) => any {
        if(/[^\w.$]/.test(exp)) {
            error('data key cannot to sepcial characters beginning');
        }
        const exps = exp.split('.');
        return (obj: any) => {
            for(let i = 0, len = exps.length;i < len;i++) {
                if(!obj) {
                    return;
                }
                obj = obj[exps[i]];
            }
            return obj;
        }
    }

}
