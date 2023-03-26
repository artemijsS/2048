import { Tile } from "./Tile";

export class Cell {
    public x: number;
    public y: number;
    public linkedTile: Tile | null;
    public linkedTileForMerge: Tile | null;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.linkedTile = null;
        this.linkedTileForMerge = null;
    }

    linkTile(boardRef: HTMLDivElement | null, tileL: Tile | null = null) {
        let tile: Tile | null = null;
        if (boardRef) {
            tile = new Tile(boardRef);
        } else if (tileL) {
            tile = tileL;
        }
        if (tile) {
            tile.setXY(this.x, this.y);
            this.linkedTile = tile;
        }
        return this.linkedTile;
    }

    unlinkTile() {
        this.linkedTile = null;
    }

    isEmpty() {
        return !this.linkedTile;
    }

    linkTileForMerge(tile: Tile | null) {
        tile?.setXY(this.x, this.y);
        this.linkedTileForMerge = tile;
    }

    unlinkTileForMerge() {
        this.linkedTileForMerge = null;
    }

    hasTileForMerge() {
        return !!this.linkedTileForMerge;
    }

    canAccept(newTile: Tile | null) {
        return (
            this.isEmpty() ||
            (!this.hasTileForMerge() && this.linkedTile?.value === newTile?.value)
        );
    }

    mergeTiles() {
        if (this.linkedTileForMerge) {
            this.linkedTile?.setValue(this.linkedTile?.value + this.linkedTileForMerge?.value);
            this.linkedTileForMerge?.remove();
            this.unlinkTileForMerge();
        }
    }
}


export const CellType = typeof Cell;
