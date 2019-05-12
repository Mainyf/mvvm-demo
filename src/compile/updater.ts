export default class Updater {

    static textUpdater(node: Text | Element, value) {
        node.textContent = value || '';
    }

}