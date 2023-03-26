import React, { useEffect, useRef } from "react";
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'

import { Grid } from '../game/Grid';
import { Cell } from "../game/Cell";

interface MouseEvenCoords {
    x: number,
    y: number
}

interface MouseKeyboardKeyEvent {
    key: string;
}

export default function Home() {

    const grid = new Grid()
    const boardRef = useRef<HTMLDivElement>();
    const mouseEventCoords = useRef<MouseEvenCoords>({ x: 0, y: 0 });

    useEffect(() => {

        window.s

        window.addEventListener('keydown', onKeyPress);
        window.addEventListener('touchstart', onMouseDown);
        window.addEventListener('touchend', onMouseUp);
        grid.getRandomEmptyCell().linkTile(boardRef.current)

        return () => {
            window.removeEventListener('keydown', onKeyPress)
            window.removeEventListener('touchstart', onMouseDown)
            window.removeEventListener('touchend', onMouseUp)
        }


    }, [])

    const onMouseDown = (e: TouchEvent) => {
        mouseEventCoords.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    const onMouseUp = (e: TouchEvent) => {
        const xNew = e.changedTouches[0].clientX;
        const yNew = e.changedTouches[0].clientY;

        console.log(mouseEventCoords.current.y)
        console.log(yNew)

        if (mouseEventCoords.current.x < xNew && Math.abs(mouseEventCoords.current.y - yNew) < 100) {
            onKeyPress({ key: "ArrowRight" })
        } else if (mouseEventCoords.current.x > xNew && Math.abs(mouseEventCoords.current.y - yNew) < 100) {
            onKeyPress({ key: "ArrowLeft" })
        } else if (mouseEventCoords.current.y > yNew && Math.abs(mouseEventCoords.current.x - xNew) < 100) {
            onKeyPress({ key: "ArrowUp" })
        } else if (mouseEventCoords.current.y < yNew && Math.abs(mouseEventCoords.current.x - xNew) < 100) {
            onKeyPress({ key: "ArrowDown" })
        }

        mouseEventCoords.current = { x: 0, y: 0 }
    }

    const onKeyPress = async (e: KeyboardEvent | MouseKeyboardKeyEvent) => {
        switch (e.key) {
            case "ArrowUp":
                if (!canMoveUp()) {
                    return;
                }
                await moveUp();
                break;
            case "ArrowDown":
                if (!canMoveDown()) {
                    return;
                }
                await moveDown();
                break;
            case "ArrowRight":
                if (!canMoveRight()) {
                    return;
                }
                await moveRight();
                break;
            case "ArrowLeft":
                if (!canMoveLeft()) {
                    return;
                }
                await moveLeft();
                break;
            default:
                return;
        }

        const newTile = grid.getRandomEmptyCell().linkTile(boardRef.current)


        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            await newTile.waitForAnimationEnd();
            alert("Try again!")
            return;
        }

    }

    async function moveUp() {
        await slideTiles(grid.cellsGroupedByColumn);
    }

    async function moveDown() {
        await slideTiles(grid.cellsGroupedByReversedColumn);
    }

    async function moveLeft() {
        await slideTiles(grid.cellsGroupedByRow);
    }

    async function moveRight() {
        await slideTiles(grid.cellsGroupedByReversedRow);
    }

    async function slideTiles(groupedCells) {
        const promises = [];

        groupedCells.forEach(group => slideTilesInGroup(group, promises));

        await Promise.all(promises);
        grid.cells.forEach(cell => {
            cell.hasTileForMerge() && cell.mergeTiles()
        });
    }

    function slideTilesInGroup(group: Cell[], promises) {
        for (let i = 1; i < group.length; i++) {
            if (group[i].isEmpty()) {
                continue;
            }

            const cellWithTile: Cell = group[i];

            let targetCell;
            let j = i - 1;
            while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
                targetCell = group[j];
                j--;
            }

            if (!targetCell) {
                continue;
            }

            promises.push(cellWithTile.linkedTile?.waitForTransitionEnd());

            if (targetCell.isEmpty()) {
                targetCell.linkTile(null, cellWithTile.linkedTile);
            } else {
                targetCell.linkTileForMerge(cellWithTile.linkedTile);
            }

            cellWithTile.unlinkTile();
        }
    }

    function canMoveUp() {
        return canMove(grid.cellsGroupedByColumn);
    }

    function canMoveDown() {
        return canMove(grid.cellsGroupedByReversedColumn);
    }

    function canMoveLeft() {
        return canMove(grid.cellsGroupedByRow);
    }

    function canMoveRight() {
        return canMove(grid.cellsGroupedByReversedRow);
    }

    function canMove(groupedCells) {
        return groupedCells.some(group => canMoveInGroup(group));
    }

    function canMoveInGroup(group) {
        return group.some((cell, index) => {
            if (index === 0) {
                return false;
            }

            if (cell.isEmpty()) {
                return false;
            }

            const targetCell = group[index - 1];
            return targetCell.canAccept(cell.linkedTile);
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.gameBoard} ref={boardRef}>

                {
                    grid.cells.map((_obj,i) =>
                        <div className={styles.cell} key={i}/>
                    )
                }

                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}
                {/*<div className={styles.cell}/>*/}

                {/*<div className={styles.tile}>2</div>*/}
            </div>
        </div>
    )
}
