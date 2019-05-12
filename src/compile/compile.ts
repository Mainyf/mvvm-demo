import { MVVM } from '../mvvm';
import { isElementNode, isTextNode } from '../util/dom';
import { error } from '../util/log';
import Updater from './updater';
import { Watcher } from '@src/observer/watcher';
import { get, set } from '@src/util/objectUtil';
import { matchMult } from '@src/util/regexp';

export class Compile {

    private $el: Element;
    private $vm: MVVM;
    private $fragment: DocumentFragment;

    constructor(el: Element | string, vm: MVVM) {
        this.$vm = vm;
        this.$el = isElementNode(el) ? el as Element : document.querySelector(el as string)!;
        if (!this.$el) {
            error('root element not found');
        }
        this.$fragment = this.moveToFragment(this.$el);
        this._init();
        this.$el.appendChild(this.$fragment);
    }

    private _init() {
        this._compileElement(this.$fragment);
    }

    private _compileElement(el: DocumentFragment | Element) {
        const childrens = Array.prototype.slice.call(el.childNodes) as Element[];
        childrens.forEach((node) => {

            this._handleText(node);

            if (node.childNodes && node.childNodes.length) {
                this._compileElement(node);
            }
        });
    }

    private _handleText(node: Element) {
        if(!isTextNode(node)) {
            return;
        }
        const text = node.textContent;
        const reg = /\s\S*\{\{(.*)\}\}\s\S*/gm;

        matchMult(reg, text).forEach((v) => {
            this._compileText(node as any, v.trim());
        });
    }

    private _compileText(node: Text, exp: string) {
        this._bind(node, this.$vm, exp, 'text');
    }

    private _bind(node: Element | Text, vm: MVVM, exp: string, dir: string) {
        const updaterFn = Updater[dir + 'Updater']
        if (updaterFn) {
            updaterFn(node, this._getVMVal(vm, exp));
        }
        new Watcher(vm, exp, (newVal, oldVal) => {
            updaterFn && updaterFn(node, newVal, oldVal);
        })
    }

    _getVMVal(vm: MVVM, exp: string): any {
        return get(vm, exp);
    }

    _setVMVal(vm: MVVM, exp: string, value: any) {
        set(vm, exp, value);
    }

    moveToFragment(el: Element): DocumentFragment {
        const fragment = document.createDocumentFragment();
        for (let child = el.firstChild; child; child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

}
