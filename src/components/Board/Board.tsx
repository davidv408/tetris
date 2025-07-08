import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./Board.module.css";
import { type ActiveShape } from "../../interfaces/Shape";
import { canDrawActiveShapeAsNewShape, canDrawActiveShapeAtPosition, drawActiveShapeAsNewShape, drawActiveShapeAtPosition, pickNewShape, rotateMatrix90Degrees } from "../../utils/ActiveShape";
import { wait } from "../../utils/Time";
import type { Board } from "../../interfaces/Board";

function Board() {
    const [board, setBoard] = useState(Array(20).fill([]).map(() => Array(10).fill({value: 0, color: ''})));
    const activeShape = useRef<ActiveShape>(pickNewShape());

    
    const moveActiveShape = (newPosition: {r0: number, c0: number}) => {
        setBoard(board => {
            if(!canDrawActiveShapeAtPosition(activeShape.current, newPosition, board)) {
                return board;
            }
            const result = drawActiveShapeAtPosition(activeShape.current, newPosition, board);
            activeShape.current.position = newPosition;
            return result;
        });
    }
  
    useEffect(() => {(
        async () => {
            // Run game loop while game is not over.
            let gameOver = false;
            do {
               // Draw active shape on board
                setBoard(board => drawActiveShapeAtPosition(activeShape.current, activeShape.current.position, board));
                await wait(200);

                let inFinalPosition = false;
                while(!inFinalPosition) {
                    const {r0, c0} = activeShape.current.position;
                    const newPosition = {r0: r0+1, c0}
                    moveActiveShape(newPosition);
                    await wait(200);
                     
                    // If position didn't change, then shape is final position.
                    if(activeShape.current.position.r0 === r0) {
                        inFinalPosition = true;
                    }
                }

                if(activeShape.current.position.r0 === 0) {
                    alert('Game over');
                    gameOver = true;
                } else {
                     // Pick a new active shape
                    activeShape.current = pickNewShape();
                }
            } while(!gameOver);
        })();
    }, []);



    useEffect(() => {
        const onKeyDown = async (evt: KeyboardEvent) => {
            const {r0, c0} = activeShape.current.position;
            switch(evt.key) {
                case 'ArrowRight':
                    moveActiveShape({r0, c0: c0+1});
                    break;
                case 'ArrowLeft':
                    moveActiveShape({r0, c0: c0-1});
                    break;
                case 'ArrowDown':
                    moveActiveShape({r0: r0+1, c0});
                    break;
                case 'ArrowUp':
                    setBoard(board => {
                        const newShape = rotateMatrix90Degrees(activeShape.current.shape);
                        // If active shape is in final position (can not descend any further) or can not be drawn using the new shape (because of collisions), then do not apply any state transformations.
                        if(!canDrawActiveShapeAtPosition(activeShape.current, {r0: r0+1, c0}, board) || !canDrawActiveShapeAsNewShape(activeShape.current, newShape, board)) {
                            return board;
                        }
                        const result = drawActiveShapeAsNewShape(activeShape.current, newShape, board);
                        activeShape.current.shape = newShape;
                        return result;
                    });
                    break;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return <Fragment>

    <div className={styles.board}>
        {board.map((row, rowIndex) => {
            return <div key={rowIndex} className={styles.row}>
                {row.map((_, colIndex) => {
                    return <div key={`${rowIndex}-${colIndex}`} className={styles.cell}
                                style={{backgroundColor: board[rowIndex][colIndex].color}}>
                            </div>
                })}
            </div>
        })}
    </div>
    </Fragment>
}

export default Board;