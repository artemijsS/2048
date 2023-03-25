export class Tile {
    public x:  number;
    public y:  number;
    public value: number;
    public bgLightness: number;
    public textLightness: number;

    constructor() {
        this.value = Math.random() > 0.5 ? 2 : 4;
    }

    setValue(value) {
        this.value = value;
        this.bgLightness = 100 - Math.log2(value) * 9;
        this.textLightness = this.bgLightness < 50 ? 90 : 10;
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    remove() {
        delete this;
    }
}