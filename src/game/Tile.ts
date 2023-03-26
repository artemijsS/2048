import styles from "@/styles/Home.module.scss";

export class Tile {
    public element: HTMLDivElement;
    public x:  number;
    public y:  number;
    public value: number;
    public bgLightness: number;
    public textLightness: number;

    constructor(boardRef: HTMLDivElement) {
        this.element = document.createElement("div");
        this.element.classList.add(styles.tile);
        this.setValue(Math.random() > 0.5 ? 2 : 4)
        boardRef.append(this.element);
    }

    setValue(value) {
        this.value = value;
        this.element.textContent = value;
        const bgLightness = 100 - Math.log2(value) * 9;
        this.element.style.setProperty("--bg-lightness", `${bgLightness}%`);
        this.element.style.setProperty("--text-lightness", `${bgLightness < 50 ? 90 : 10}%`);
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.element.style.setProperty("--x", x);
        this.element.style.setProperty("--y", y);
    }

    remove() {
        this.element.remove();
    }

    waitForTransitionEnd() {
        return new Promise(resolve => {
            this.element.addEventListener(
                "transitionend", resolve, { once: true });
        });
    }

    waitForAnimationEnd() {
        return new Promise(resolve => {
            this.element.addEventListener(
                "animationend", resolve, { once: true });
        });
    }
}
