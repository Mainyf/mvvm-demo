let uid = 0;

export class Dep {
    
    id = uid++;
    subs = [];
    static target = null;

    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
        Dep.target.addDep(this);
    }

    removeSub(sub) {
        const index = this.subs.indexOf(sub);
        if(index !== -1) {
            this.subs.splice(index, 1);
        }
    }

    notify() {
        this.subs.forEach((v) => v.update());
    }

}