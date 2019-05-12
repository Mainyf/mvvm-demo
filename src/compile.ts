import { MVVM } from ".";

export class Compile {

    private $el: Element;
    private $vm: MVVM;

    constructor(el: Element, vm: MVVM) {
        this.$vm = vm;
        this.$el = el;
    }

}