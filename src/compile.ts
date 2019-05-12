import { MVVM } from './mvvm';
import { isElementNode } from './util/dom';
import { error } from './util/log';

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
        
    }

    moveToFragment(el: Element): DocumentFragment {
        const fragment = document.createDocumentFragment();
        for (let child; child; child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

}