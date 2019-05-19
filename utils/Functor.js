class Functor {
    constructor(x) {
        this.value = x;
    }

    static of(x) {
        return new Functor(x);
    }

    map(f) {
        return new Functor(f(this.value))
    }

    join() {
        return this.value;
    }
}



module.exports = {
    Functor
};
