import React, {useReducer, useState, createRef} from 'react';
import "./style/Board.css";
import "./style/DarkBoard.css";
import "./style/Responsive.css";

const initialState = ['', '', '', '', '', '', '', '', ''];
const reduce = (state, action) => {
    if (action.type === 'playAgain') {
        return initialState;
    }
    if (state[action.index] === '') {
        const newBoard = [...state];
        newBoard[action.index] = action.turn;
        action.setTurn(action.turn.toLowerCase() === 'x' ? 'o' : 'x');
        return newBoard;
    }
    return state;
}

const Board = () => {
    const [board, dispatch] = useReducer(reduce, initialState);
    const [turn, setTurn] = useState('x');
    const boardRef = createRef();
    let canPlay = true;

    const winner = () => {
        // Rows
        // 0 1 2
        if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
            canPlay = false;
            return board[0]
        }
        // 3 4 5
        if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
            canPlay = false;
            return board[3]
        }
        // 6 7 8
        if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
            canPlay = false;
            return board[6]
        }

        // Columns
        // 0 3 6
        if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
            canPlay = false;
            return board[0];
        }
        // 1 4 7
        if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
            canPlay = false;
            return board[1];
        }
        // 2 5 8
        if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
            canPlay = false;
            return board[2];
        }

        // Diameter - 0 4 8
        if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
            canPlay = false;
            return board[0];
        }

        // Sub Diameter - 2 4 6
        if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
            canPlay = false;
            return board[2];
        }
        return false;
    }

    const draw = () => {
        for (let i = 0; i < 9; ++i) {
            if (board[i] === '') {
                return false;
            }
        }
        canPlay = false;
        return true;
    }

    const playAgainHandler = () => {
        dispatch({type: 'playAgain'});
        canPlay = true;
        setTurn('x');
    }

    const darkHandler = () => {
        const classList = boardRef.current.classList;
        if (classList.contains("board-container__dark")) {
            classList.remove("board-container__dark");
        } else {
            classList.add("board-container__dark");
        }
    }

    const message = winner() ? `Game Over. ${winner().toUpperCase()} Won !` : (draw() ? `Game Over. Draw . . .` : `It's ${turn.toUpperCase()} turn`);

    return (
        <div className="board-container" ref={boardRef}>
            <div className="game-mode">
                <label htmlFor="game-mode" className="game-mode__txt">Dark Mode</label>
                <input type="checkbox" id="game-mode" className="game-mode__checkbox" onChange={darkHandler}/>
                <span className="game-mode__slider"> </span>
            </div>
            <ul className="board">
                {board.map((item, index) =>
                    <li className="board__item" key={index}>
                        <button className="board__btn" onClick={() => {
                            if (canPlay) dispatch({type: 'button', index: index, turn: turn, setTurn: setTurn});
                        }}>{item ? item : index + 1}
                        </button>
                    </li>)}
            </ul>
            <h2 className="board__info">{message}</h2>
            {!canPlay && <button onClick={playAgainHandler} className="play-again__btn">Play Again</button>}
        </div>
    );
};

export default Board;