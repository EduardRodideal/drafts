import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  //if is true the white pieces must to move
  const [whiteMove, setWhiteMove] = useState(true);
  //each piece has a number and we know exactly what piece will be moving
  const [numberToMove, setNumberToMove] = useState(null);
  //when we first click a piece the startMove is true
  const [startMove, setStartMove] = useState(false);
  //when we have a forced move the forcedMove is true
  const [forcedMove, setForcedMove] = useState(false);
  //the history of addForErase for each move
  const [addForEraseHistory, setAddForEraseHistory] = useState([[]]);
  //this is addToErase on any time
  const [addToEraseContext, setAddToEraseContext] = useState([]);
  //if true we clicked the board after we have shown the history
  const [afterHistory, setAfterHistory] = useState(false);
  //holds all the states on each move
  const [historyState, setHistoryState] = useState([[{whiteMove:true, numberToMove:null, startMove:false, forcedMove:false}]])
  //this will hold the history of all moves
  const [history, setHistory] = useState([
    [
      [20, 24],
      [null, 16, 19, 23],
      [1, null, null, 15, 18, 22],
      [9, 5, 2, null, null, 14, 17, 21],
      [10, 6, 3, null, null, 13],
      [11, 7, 4, null],
      [12, 8],
    ],
  ]);
  //the state of the leftDiagonal
  const [dLeftState, setDLeftState] = useState([
    [20, 24],
    [null, 16, 19, 23],
    [1, null, null, 15, 18, 22],
    [9, 5, 2, null, null, 14, 17, 21],
    [10, 6, 3, null, null, 13],
    [11, 7, 4, null],
    [12, 8],
  ]);
  //this will be the information displayed to the user
  const [dLeft, setDLeft] = useState([
    [20, 24],
    [null, 16, 19, 23],
    [1, null, null, 15, 18, 22],
    [9, 5, 2, null, null, 14, 17, 21],
    [10, 6, 3, null, null, 13],
    [11, 7, 4, null],
    [12, 8],
  ]);
const [indexToContinue, setIndexToContinue] = useState(0);

  return (
    <GeneralContext.Provider
      value={{
        whiteMove,
        setWhiteMove,
        numberToMove,
        setNumberToMove,
        startMove,
        setStartMove,
        forcedMove,
        setForcedMove,
        dLeft,
        setDLeft,
        history,
        setHistory,
        afterHistory,
        setAfterHistory,
        addForEraseHistory,
        setAddForEraseHistory,
        addToEraseContext,
        setAddToEraseContext,
        dLeftState,
        setDLeftState,
        historyState,
        setHistoryState,
        indexToContinue,
        setIndexToContinue,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
