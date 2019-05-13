import { matchMult } from '@src/util/regexp';

export default class Updater {

    private static _textReg = /\{\{(.*)\}\}/;

    private static caches: Map<Text | Element, number[][]> = new Map();

    // TODO fix update mutl text bug
    static textUpdater(
        node: Text | Element,
        newVal: string,
        oldVal?: string
    ) {
        const text = node.textContent;
        const cachesStr = Updater.caches.get(node) || [];
        if(oldVal) {
            console.log('todo');
        } else {
            const matchs = matchMult(Updater._textReg, text);
            Updater.caches.set(node, cachesStr);
            node.textContent = text.replace(Updater._textReg, newVal);
        }
    }

}