import { Cell } from "./cell";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
    public cells: Cell[];

    constructor() {
        this.cells = [];
        for (let i = 0; i < CELLS_COUNT; i++) {
            this.cells.push(new Cell(i % CELLS_COUNT, Math.floor(i / GRID_SIZE)))
        }
    }
}