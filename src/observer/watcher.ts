import { MVVM } from '../mvvm';
import { Dep } from './dep';
import { error } from '../util/log';
import { get } from '@src/util/objectUtil';

export class Watcher {

    private vm: MVVM;
    private cb: (newVal: any, oldVal: any) => void;
    private depIds: Object = {};
    private getter: (data: any) => any;
    private value: any;

    constructor(vm: MVVM, expOrFn: ((data: any) => any) | string, cb: (newVal: any, oldVal: any) => void) {
        this.vm = vm;
        this.cb = cb;
        this.getter = typeof expOrFn === 'function' ? expOrFn : this.parseGetter(expOrFn.trim());
        this.value = this.get();
    }

    update() {
        this.run();
    }

    run() {
        const newVal = this.get();
        const oldVal = this.value;
        if (newVal !== oldVal) {
            this.value = newVal;
            this.cb.call(this.vm, newVal, oldVal);
        }
    }

    addDep(dep: Dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }

    get() {
        Dep.target = this;
        const value = this.getter.call(null, this.vm);
        Dep.target = null;
        return value;
    }

    parseGetter(exp: string): (data: any) => any {
        if (/[^\w.$]/.test(exp)) {
            error('data key cannot to sepcial characters beginning');
        }
        return (obj: any) => get(obj, exp);
    }

}
