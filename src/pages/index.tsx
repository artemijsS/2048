import React, { useEffect } from "react";
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'

import { Grid } from '../game/Grid';

export default function Home() {

    const grid = new Grid()

    useEffect(() => {

        window.addEventListener('keydown', onKeyPress)

        return () => window.removeEventListener('keydown', onKeyPress)
    }, [])

    const onKeyPress = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowUp":
                console.log("up");
                break;
            case "ArrowDown":
                console.log("down");
                break;
            case "ArrowRight":
                console.log("right");
                break;
            case "ArrowLeft":
                console.log("left");
                break;
            default:
                console.log("none")
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.gameBoard}>

                {grid.cells.map((_obj,i) =>
                    <div className={styles.cell} key={i}/>
                )}

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
