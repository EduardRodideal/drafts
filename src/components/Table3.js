import React, { useState, useContext } from "react";
import { GeneralContext } from "./context/generalContext";
import LensIcon from "@material-ui/icons/Lens";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import AdjustIcon from "@material-ui/icons/Adjust";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export const Table3 = () => {
  const whiteQueen = ["0-1", "1-3", "2-5", "3-7"];
  const blackQueen = ["3-0", "4-0", "5-0", "6-0"];

  const convertFromShort = {
    "0-0": "4-0",
    "0-1": "3-1",
    "0-2": "2-0",
    "1-0": "5-0",
    "1-1": "4-1",
    "1-2": "3-2",
    "1-3": "2-1",
    "1-4": "1-0",
    "2-0": "6-0",
    "2-1": "5-1",
    "2-2": "4-2",
    "2-3": "3-3",
    "2-4": "2-2",
    "2-5": "1-1",
    "2-6": "0-0",
    "3-0": "6-1",
    "3-1": "5-2",
    "3-2": "4-3",
    "3-3": "3-4",
    "3-4": "2-3",
    "3-5": "1-2",
    "3-6": "0-1",
    "4-0": "5-3",
    "4-1": "4-4",
    "4-2": "3-5",
    "4-3": "2-4",
    "4-4": "1-3",
    "5-0": "4-5",
    "5-1": "3-6",
    "5-2": "2-5",
  };

  const convertFromLong = {
    "4-0": "0-0",
    "3-0": "3-7",
    "3-7": "3-0",
    "3-1": "0-1",
    "2-0": "0-2",
    "5-0": "1-0",
    "4-1": "1-1",
    "3-2": "1-2",
    "2-1": "1-3",
    "1-0": "1-4",
    "6-0": "2-0",
    "5-1": "2-1",
    "4-2": "2-2",
    "3-3": "2-3",
    "2-2": "2-4",
    "1-1": "2-5",
    "0-0": "2-6",
    "6-1": "3-0",
    "5-2": "3-1",
    "4-3": "3-2",
    "3-4": "3-3",
    "2-3": "3-4",
    "1-2": "3-5",
    "0-1": "3-6",
    "5-3": "4-0",
    "4-4": "4-1",
    "3-5": "4-2",
    "2-4": "4-3",
    "1-3": "4-4",
    "4-5": "5-0",
    "3-6": "5-1",
    "2-5": "5-2",
  };

  const {
    setWhiteMove,
    numberToMove,
    setNumberToMove,
    whiteMove,
    startMove,
    setStartMove,
    forcedMove,
    setForcedMove,
    history,
    setHistory,
    addForEraseHistory,
    setAddForEraseHistory,
    addToEraseContext,
    dLeft,
    dLeftState,
    setDLeftState,
    historyState,
    setHistoryState,
    afterHistory,
    setAfterHistory,
    indexToContinue,
  } = useContext(GeneralContext);

  //   const dLeft = historyToShow;

  const dRight = [
    [dLeft[4][0], dLeft[3][1], dLeft[2][0]],
    [dLeft[5][0], dLeft[4][1], dLeft[3][2], dLeft[2][1], dLeft[1][0]],
    [
      dLeft[6][0],
      dLeft[5][1],
      dLeft[4][2],
      dLeft[3][3],
      dLeft[2][2],
      dLeft[1][1],
      dLeft[0][0],
    ],
    [
      dLeft[6][1],
      dLeft[5][2],
      dLeft[4][3],
      dLeft[3][4],
      dLeft[2][3],
      dLeft[1][2],
      dLeft[0][1],
    ],
    [dLeft[5][3], dLeft[4][4], dLeft[3][5], dLeft[2][4], dLeft[1][3]],
    [dLeft[4][5], dLeft[3][6], dLeft[2][5]],
  ];

  //   const [dLeftState, setDLeftState] = useState(dLeft);
  const [dRightState, setDRightState] = useState(dRight);
  const [addForErase, setAddForErase] = useState(addToEraseContext);

  const tempHistory = [...history];
  const tempAddForEraseHistory = [...addForEraseHistory];
  const tempHistoryState = [...historyState];

  const classes = useStyles();
  //convert from numbers to pieces
  const table = [];
  for (let i = 0; i < dLeftState.length; i++) {
    const row = [];
    for (let j = 0; j < dLeftState[i].length; j++) {
      if (dLeftState[i][j] === null) {
        row.push(null);
        continue;
      }
      //white piece
      if (dLeftState[i][j] < 13) {
        row.push(<Brightness1Icon fontSize="large" color="action" />);
      }

      //white queen
      if (dLeftState[i][j] > 25 && dLeftState[i][j] < 63) {
        row.push(<AdjustIcon fontSize="large" color="action" />);
      }
      //black piece
      if (dLeftState[i][j] > 12 && dLeftState[i][j] < 25) {
        row.push(<LensIcon fontSize="large" />);
      }
      //black queen
      if (dLeftState[i][j] > 62) {
        row.push(<AdjustIcon fontSize="large" />);
      }
    }
    table.push(row);
  }

  const handleClick = (ix, jx) => {
    if (afterHistory) {
      const tempHistory = [history.slice(0, indexToContinue + 1)];
      const lastArrayOfHistory = tempHistory[0][indexToContinue];
      //to make a pure copy
      const copyLastArrayOfHistory = [
        [20, 24],
        [null, 16, 19, 23],
        [1, null, null, 15, 18, 22],
        [9, 5, 2, null, null, 14, 17, 21],
        [10, 6, 3, null, null, 13],
        [11, 7, 4, null],
        [12, 8],
      ];
      for (let s = 0; s < lastArrayOfHistory.length; s++) {
        for (let s2 = 0; s2 < lastArrayOfHistory[s].length; s2++) {
          copyLastArrayOfHistory[s][s2] = lastArrayOfHistory[s][s2];
        }
      }
      tempHistory[0][indexToContinue] = copyLastArrayOfHistory;
      setHistory(tempHistory[0]);
      setDRightState([
        [dLeftState[4][0], dLeftState[3][1], dLeftState[2][0]],
        [dLeftState[5][0], dLeftState[4][1], dLeftState[3][2], dLeftState[2][1], dLeftState[1][0]],
        [
          dLeftState[6][0],
          dLeftState[5][1],
          dLeftState[4][2],
          dLeftState[3][3],
          dLeftState[2][2],
          dLeftState[1][1],
          dLeftState[0][0],
        ],
        [
          dLeftState[6][1],
          dLeftState[5][2],
          dLeftState[4][3],
          dLeftState[3][4],
          dLeftState[2][3],
          dLeftState[1][2],
          dLeftState[0][1],
        ],
        [dLeftState[5][3], dLeftState[4][4], dLeftState[3][5], dLeftState[2][4], dLeftState[1][3]],
        [dLeftState[4][5], dLeftState[3][6], dLeftState[2][5]],
      ]);

      // const tempHistoryState = [historyState.slice(0, indexToContinue + 1)];
      // const lastArrayOfHistoryState = tempHistoryState[0][indexToContinue];
      // const copyLastArrayOfHistoryState = [
      //   [20, 24],
      //   [null, 16, 19, 23],
      //   [1, null, null, 15, 18, 22],
      //   [9, 5, 2, null, null, 14, 17, 21],
      //   [10, 6, 3, null, null, 13],
      //   [11, 7, 4, null],
      //   [12, 8],
      // ];
      // for (let s = 0; s < lastArrayOfHistoryState.length; s++) {
      //   for (let s2 = 0; s2 < lastArrayOfHistoryState[s].length; s2++) {
      //     copyLastArrayOfHistoryState[s][s2] = lastArrayOfHistoryState[s][s2];
      //   }
      // }
      // tempHistoryState[0][indexToContinue] = copyLastArrayOfHistoryState;
      // setHistoryState(tempHistoryState[0]);
      // setWhiteMove(historyState[indexToContinue][0].whiteMove);
      setNumberToMove(null);
      setStartMove(false);
      setForcedMove(false);
      setAfterHistory(false);
      return;
    }
    //is white move and first click
    if (whiteMove) {
      //if first move and the click is on a null cell just return
      if (!startMove && dLeftState[ix][jx] === null) {
        return;
      }
      //search to find out if we have a forced move forward with white pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = 0; j < dLeftState[i].length - 2; j++) {
          if (
            (!addForErase.includes(dLeftState[i][j + 1]) &&
              dLeftState[i][j] > 0 && //white piece
              dLeftState[i][j] < 13 && //white piece
              dLeftState[i][j + 1] > 12 && //black piece
              dLeftState[i][j + 1] < 25 && // black piece
              dLeftState[i][j + 2] === null) ||
            (!addForErase.includes(dLeftState[i][j + 1]) &&
              dLeftState[i][j] > 0 && //white piece
              dLeftState[i][j] < 13 && //white piece
              dLeftState[i][j + 1] > 62 && //black queen
              dLeftState[i][j + 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal forward
      //search to find out if we have a forced move backward with white pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = dLeftState[i].length - 1; j > 1; j--) {
          if (
            (!addForErase.includes(dLeftState[i][j - 1]) &&
              dLeftState[i][j] > 0 && //white piece
              dLeftState[i][j] < 13 && //white piece
              dLeftState[i][j - 1] > 12 && //black piece
              dLeftState[i][j - 1] < 25 && //black piece
              dLeftState[i][j - 2] === null) ||
            (!addForErase.includes(dLeftState[i][j - 1]) &&
              dLeftState[i][j] > 0 && //white piece
              dLeftState[i][j] < 13 && //white piece
              dLeftState[i][j - 1] > 62 && //black queen
              dLeftState[i][j - 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal backward
      //search to find out if we have a forced move in front with white pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = 0; j < dRightState[i].length - 2; j++) {
          if (
            (!addForErase.includes(dRightState[i][j + 1]) &&
              dRightState[i][j] > 0 && //white piece
              dRightState[i][j] < 13 && //white piece
              dRightState[i][j + 1] > 12 && //black piece
              dRightState[i][j + 1] < 25 && //black piece
              dRightState[i][j + 2] === null) ||
            (!addForErase.includes(dRightState[i][j + 1]) &&
              dRightState[i][j] > 0 && // white piece
              dRightState[i][j] < 13 && //white piece
              dRightState[i][j + 1] > 62 && //black queen
              dRightState[i][j + 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal forward
      //search to find out if we have a forced move backward with white pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = dRightState[i].length - 1; j > 1; j--) {
          if (
            (!addForErase.includes(dRightState[i][j - 1]) &&
              dRightState[i][j] > 0 && //white piece
              dRightState[i][j] < 13 && //white piece
              dRightState[i][j - 1] > 12 && //black piece
              dRightState[i][j - 1] < 25 && //black piece
              dRightState[i][j - 2] === null) ||
            (!addForErase.includes(dRightState[i][j - 1]) &&
              dRightState[i][j] > 0 && //white piece
              dRightState[i][j] < 13 && //white piece
              dRightState[i][j - 1] > 62 && //black queen
              dRightState[i][j - 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal backward
      //queen  queen queen queen queen queen queen queen queen queen queen queen queen queen queen
      //search to find out if we have a forced move forward with white queen leftDiagonal queen1
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = 0; j < dLeftState[i].length - 2; j++) {
          if (
            dLeftState[i][j] < 63 && //white queen
            dLeftState[i][j] > 50 //white queen
          ) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j + 1; k < dLeftState[i].length - 1; k++) {
              //two white pieces stand next to each other
              if (dLeftState[i][k] !== null && dLeftState[i][k + 1] !== null) {
                break;
              }
              //if one white piece is in from of the queen
              if (dLeftState[i][k] > 0 && dLeftState[i][k] < 13) {
                break;
              }
              //if one white queen is in from of the queen
              if (dLeftState[i][k] > 50 && dLeftState[i][k] < 63) {
                break;
              }
              if (
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 12 && //black piece
                  dLeftState[i][k] < 25 && //black piece
                  dLeftState[i][k + 1] === null) ||
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 62 && //black queen
                  dLeftState[i][k + 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end leftDiagonal forward queen1
      //search to find out if we have a forced move backward with white queen leftDiagonal queen2
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = dLeftState[i].length - 1; j > 1; j--) {
          if (
            dLeftState[i][j] < 63 && //white queen
            dLeftState[i][j] > 50 //white queen
          ) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j - 1; k > 1; k--) {
              //two white pieces stand next to each other
              if (dLeftState[i][k] !== null && dLeftState[i][k - 1] !== null) {
                break;
              }
              //if one white piece is in from of the queen
              if (dLeftState[i][k] > 0 && dLeftState[i][k] < 13) {
                break;
              }
              //if one white queen is in from of the queen
              if (dLeftState[i][k] > 50 && dLeftState[i][k] < 63) {
                break;
              }
              if (
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 12 && //black piece
                  dLeftState[i][k] < 25 && //black piece
                  dLeftState[i][k - 1] === null) ||
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 62 && //black queen
                  dLeftState[i][k - 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end leftDiagonal backward queen2
      //search to find out if we have a forced move forward with white queen rightDiagonal queen3
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = 0; j < dRightState[i].length - 2; j++) {
          if (
            dRightState[i][j] < 63 && //white queen
            dRightState[i][j] > 50 //white queen
          ) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j + 1; k < dRightState[i].length - 1; k++) {
              //two pieces stand next to each other
              if (
                dRightState[i][k] !== null &&
                dRightState[i][k + 1] !== null
              ) {
                break;
              }
              //if one white piece is in from of the queen
              if (dRightState[i][k] > 0 && dRightState[i][k] < 13) {
                break;
              }
              //if one white queen is in from of the queen
              if (dRightState[i][k] > 50 && dRightState[i][k] < 63) {
                break;
              }
              if (
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 12 && //black piece
                  dRightState[i][k] < 25 && //black piece
                  dRightState[i][k + 1] === null) ||
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 62 && //black queen
                  dRightState[i][k + 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end rightDiagonal forward queen3
      //search to find out if we have a forced move backward with white queen rightDiagonal queen4
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = dRightState[i].length - 1; j > 1; j--) {
          if (
            dRightState[i][j] < 63 && //white queen
            dRightState[i][j] > 50 //white queen
          ) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j - 1; k > 1; k--) {
              //two white pieces stand next to each other
              if (
                dRightState[i][k] !== null &&
                dRightState[i][k - 1] !== null
              ) {
                break;
              }
              //if one white piece is in from of the queen
              if (dRightState[i][k] > 0 && dRightState[i][k] < 13) {
                break;
              }
              //if one white queen is in from of the queen
              if (dRightState[i][k] > 50 && dRightState[i][k] < 63) {
                break;
              }
              if (
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 12 && //black piece
                  dRightState[i][k] < 25 && //black piece
                  dRightState[i][k - 1] === null) ||
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 62 && //black queen
                  dRightState[i][k - 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end rightDiagonal backward queen4
    } //end if (whiteMove)

    //set what number we will move if white move. Any piece that we
    //will click will be set as te piece to move, except when we
    //have made a forced move and still have a forced move to be made
    if (
      (whiteMove &&
        !startMove &&
        dLeftState[ix][jx] > 0 && //white piece
        dLeftState[ix][jx] < 13) || //white piece
      (whiteMove &&
        !startMove &&
        dLeftState[ix][jx] > 50 && //white queen
        dLeftState[ix][jx] < 63) //white queen
    ) {
      setNumberToMove(dLeftState[ix][jx]);
      setStartMove(true);
      return;
    }

    //this constants will be used in several blocs
    let tempDLeftState = [...dLeftState];
    let tempRightState = [];
    let isForcedMove = false;
    let tempAddForErase = addForErase;
    let countAddToErase = 0;
    let forcedToCheck = forcedMove;
    let haveNewHistory = false;
    //if forced move and second click
    if (forcedMove && whiteMove) {
      //this is the cell where numberToMove is located
      let iSecond;
      let jSecond;
      //forced move of the white piece not white queen
      if (numberToMove > 0 && numberToMove < 13) {
        //check if we made the forced move forward on the left diagonal11111111111111111111111111111111111111111111111111111111111111white
        for (let i = 0; i < dLeftState.length; i++) {
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = 0; j < dLeftState[i].length - 1; j++) {
              //find the coordinates of the number to move
              if (dLeftState[i][j] === numberToMove) {
                iSecond = i;
                jSecond = j;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (
                (dLeftState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dLeftState[i][j + 1]) &&
                  jx === j + 2 && //we made the click after one cell
                  dLeftState[i][j + 1] > 12 && //white piece
                  dLeftState[i][j + 1] < 25 && //white piece
                  dLeftState[i][j + 2] === null &&
                  i === ix) ||
                (dLeftState[i][j] === numberToMove &&
                  jx === j + 2 && //we made the click after one cell//if the move is on the same diagonal
                  dLeftState[i][j + 2] === null &&
                  i === ix &&
                  dLeftState[i][j + 1] > 62) //black queen
              ) {
                const tempWhiteQueen = i + "-" + (j + 2);
                //the white queen appears here
                if (
                  whiteQueen.includes(tempWhiteQueen) &&
                  numberToMove > 0 &&
                  numberToMove < 13
                ) {
                  tempDLeftState[i][j + 2] = numberToMove + 50;
                } else {
                  tempDLeftState[i][j + 2] = numberToMove;
                }
                tempDLeftState[i][j] = null;
                countAddToErase++;
                tempAddForErase.push(tempDLeftState[i][j + 1]);
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 12 && //black piece
                        tempDLeftState[i][j + 1] < 25 && // black piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 62 && //black queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 12 && //black piece
                        tempDLeftState[i][j - 1] < 25 && //black piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 62 && //black queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move in front with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 12 && //black piece
                        tempRightState[i][j + 1] < 25 && //black piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && // white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 62 && //black queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 12 && //black piece
                        tempRightState[i][j - 1] < 25 && //black piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 62 && //black queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: false,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                setNumberToMove(null);
                setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
              } //if we clicked on the numberToMove and then we made a correct forced move
            } // for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end (dLeftState[i].includes(numberToMove))
        } //end outer for. check if we made the forced move forward on the left diagonal11111111111111111111111111111111111111111111111white

        //check if we made the forced move backward on the left diagonal222222222222222222222222222222222222222222222222222222222222222white
        for (let i = 0; i < dLeftState.length; i++) {
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = dLeftState[i].length - 1; j >= 0; j--) {
              // //find the coordinates of the number to move
              if (dLeftState[i][j] === numberToMove) {
                iSecond = i;
                jSecond = j;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (
                (dLeftState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dLeftState[i][j - 1]) &&
                  jx === j - 2 && //we made the click after one cell
                  dLeftState[i][j - 1] > 12 && //black piece
                  dLeftState[i][j - 1] < 25 && // black piece
                  dLeftState[i][j - 2] === null &&
                  i === ix) ||
                (dLeftState[i][j] === numberToMove &&
                  jx === j - 2 && //we made the click after one cell//if the move is on the same diagonal
                  dLeftState[i][j - 2] === null &&
                  i === ix &&
                  dLeftState[i][j + 1] > 62) //black queen
              ) {
                const tempWhiteQueen = i + "-" + (j - 2);
                //the white queen appears here
                if (
                  whiteQueen.includes(tempWhiteQueen) &&
                  numberToMove > 0 &&
                  numberToMove < 13
                ) {
                  tempDLeftState[i][j - 2] = numberToMove + 50;
                } else {
                  tempDLeftState[i][j - 2] = numberToMove;
                }
                tempDLeftState[i][j] = null;
                countAddToErase++;
                tempAddForErase.push(tempDLeftState[i][j - 1]);
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 12 && //black piece
                        tempDLeftState[i][j + 1] < 25 && // black piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 62 && //black queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 12 && //black piece
                        tempDLeftState[i][j - 1] < 25 && //black piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 62 && //black queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move in front with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 12 && //black piece
                        tempRightState[i][j + 1] < 25 && //black piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && // white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 62 && //black queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 12 && //black piece
                        tempRightState[i][j - 1] < 25 && //black piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 62 && //black queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: false,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                setNumberToMove(null);
                setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
              } // end if we made a correct forced move
            } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
          } // end if (dLeftState[i].includes(numberToMove))
        } //end check if we made the forced move backward on the left diagonal22222222222222222222222222222222222222222222222222222white

        //check if we made the forced move forward on the right diagonal33333333333333333333333333333333333333333333333333333333333white
        for (let i = 0; i < dRightState.length; i++) {
          if (dRightState[i].includes(numberToMove)) {
            for (let j = 0; j < dRightState[i].length - 2; j++) {
              //convert from rightDiagonal to leftLeftDiagonal
              const tempConvert = convertFromShort[i + "-" + (j + 2)].split(
                "-"
              );
              const tempConvertErase = convertFromShort[
                i + "-" + (j + 1)
              ].split("-");
              const iParsed = Number.parseInt(tempConvert[0]);
              const jParsed = Number.parseInt(tempConvert[1]);
              const iParsedErase = Number.parseInt(tempConvertErase[0]);
              const jParsedErase = Number.parseInt(tempConvertErase[1]);

              //if we clicked on the numberToMove and then we made a correct forced move
              if (
                (dRightState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dRightState[i][j + 1]) &&
                  dRightState[i][j + 1] > 12 && //black piece
                  dRightState[i][j + 1] < 25 && //black piece
                  dRightState[i][j + 2] === null &&
                  ix === iParsed &&
                  jx === jParsed) ||
                (dRightState[i][j] === numberToMove &&
                  dRightState[i][j + 2] === null &&
                  dRightState[i][j + 1] > 62 && //black queen
                  ix === iParsed &&
                  jx === jParsed)
              ) {
                countAddToErase++;
                const tempWhiteQueen = iParsed + "-" + jParsed;
                //the white queen appears here
                if (
                  whiteQueen.includes(tempWhiteQueen) &&
                  numberToMove > 0 &&
                  numberToMove < 13
                ) {
                  tempDLeftState[iParsed][jParsed] = numberToMove + 50;
                } else {
                  tempDLeftState[iParsed][jParsed] = numberToMove;
                }
                tempAddForErase.push(
                  tempDLeftState[iParsedErase][jParsedErase]
                );
                tempDLeftState[iSecond][jSecond] = null;
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 12 && //black piece
                        tempDLeftState[i][j + 1] < 25 && // black piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 62 && //black queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 12 && //black piece
                        tempDLeftState[i][j - 1] < 25 && //black piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 62 && //black queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move in front with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 12 && //black piece
                        tempRightState[i][j + 1] < 25 && //black piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && // white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 62 && //black queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 12 && //black piece
                        tempRightState[i][j - 1] < 25 && //black piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 62 && //black queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: false,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                setNumberToMove(null);
                setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                break;
              } // end if we made a correct forced move333333
            } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
          } // end if (dLeftState[i].includes(numberToMove)
        } //end for check if we made the forced move forward on the right diagonal333333333333333333333333333333333333333333333333333white

        //check if we made the forced move backward on the right diagonal444444444444444444444444444444444444444444444444444444444444white
        for (let i = 0; i < dRightState.length; i++) {
          if (dRightState[i].includes(numberToMove)) {
            for (let j = dRightState[i].length - 1; j > 1; j--) {
              //convert from rightDiagonal to leftLeftDiagonal
              const tempConvert = convertFromShort[i + "-" + (j - 2)].split(
                "-"
              );
              const tempConvertErase = convertFromShort[
                i + "-" + (j - 1)
              ].split("-");
              const iParsed = Number.parseInt(tempConvert[0]);
              const jParsed = Number.parseInt(tempConvert[1]);
              const iParsedErase = Number.parseInt(tempConvertErase[0]);
              const jParsedErase = Number.parseInt(tempConvertErase[1]);

              //if we clicked on the numberToMove and then we made a correct forced move
              if (
                (dRightState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dRightState[i][j - 1]) &&
                  dRightState[i][j - 1] > 12 && //black piece
                  dRightState[i][j - 1] < 25 && //black piece
                  dRightState[i][j - 2] === null &&
                  ix === iParsed &&
                  jx === jParsed) ||
                (dRightState[i][j] === numberToMove &&
                  dRightState[i][j - 2] === null &&
                  dRightState[i][j - 1] > 62 && //black queen
                  ix === iParsed &&
                  jx === jParsed)
              ) {
                countAddToErase++;
                const tempWhiteQueen = iParsed + "-" + jParsed;
                //the white queen appears here
                if (
                  whiteQueen.includes(tempWhiteQueen) &&
                  numberToMove > 0 &&
                  numberToMove < 13
                ) {
                  tempDLeftState[iParsed][jParsed] = numberToMove + 50;
                } else {
                  tempDLeftState[iParsed][jParsed] = numberToMove;
                }
                tempAddForErase.push(
                  tempDLeftState[iParsedErase][jParsedErase]
                );
                tempDLeftState[iSecond][jSecond] = null;
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 12 && //black piece
                        tempDLeftState[i][j + 1] < 25 && // black piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j + 1] > 62 && //black queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with white pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 12 && //black piece
                        tempDLeftState[i][j - 1] < 25 && //black piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 0 && //white piece
                        tempDLeftState[i][j] < 13 && //white piece
                        tempDLeftState[i][j - 1] > 62 && //black queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move in front with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 12 && //black piece
                        tempRightState[i][j + 1] < 25 && //black piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && // white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j + 1] > 62 && //black queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 12 && //black piece
                        tempRightState[i][j - 1] < 25 && //black piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 0 && //white piece
                        tempRightState[i][j] < 13 && //white piece
                        tempRightState[i][j - 1] > 62 && //black queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: false,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                setNumberToMove(null);
                setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                break;
              } // end if we made a forced move333333
            } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
          } // end if (dLeftState[i].includes(numberToMove)
        } //end for check if we made the forced move backward on the right diagonal4444444444444444444444444444444444444444444444444white
      } //end if (numberToMove < 13 && numberToMove !== null);

      //forced move with white queen
      if (numberToMove > 50 && numberToMove < 63) {
        //if true the white queen made a forced move
        let countFinalMove = false;
        //check if we made the forced move forward on the leftDiagonal111111111111111111111111111111111111111111111111Newqueen
        for (let i = 0; i < dLeftState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = 0; j < dLeftState[i].length - 2; j++) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dLeftState[i][j] === numberToMove) {
                for (let k = j + 1; k < dLeftState[i].length; k++) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  if (dLeftState[i][k] === null) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k + 1; z < dLeftState[i].length; z++) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (ix === i && jx === z && dLeftState[i][z] === null) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > k; y--) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dLeftState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dLeftState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[i][z] = numberToMove;
                          tempAddForErase.push(tempDLeftState[i][k]);
                          tempDLeftState[i][j] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with white queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }

                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with white queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with white queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with white queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: false,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move forward on the leftDiagonal11111111111111111111111111111Newqueen

        //check if we made the forced move backward on the leftDiagonal22222222222222222222222222222222222222222222Newqueen
        for (let i = 0; i < dLeftState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = dLeftState[i].length - 1; j > 1; j--) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dLeftState[i][j] === numberToMove) {
                for (let k = j - 1; k >= 0; k--) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  if (dLeftState[i][k] === null) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k - 1; z >= 0; z--) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (ix === i && jx === z && dLeftState[i][z] === null) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > k; y++) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dLeftState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dLeftState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[i][z] = numberToMove;
                          tempAddForErase.push(tempDLeftState[i][k]);
                          tempDLeftState[i][j] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with white queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }

                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with white queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with white queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with white queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: false,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move backward on the leftDiagonal22222222222222222222222222222222Newqueen

        //check if we made the forced move forward on the rightDiagonal3333333333333333333333333333333333333333333333Newqueen
        for (let i = 0; i < dRightState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dRightState[i].includes(numberToMove)) {
            for (let j = 0; j < dRightState[i].length - 2; j++) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dRightState[i][j] === numberToMove) {
                //we find the position of the black queen on the leftDiagonal by converting it from the rightDiagonal
                const tempConvert = convertFromShort[i + "-" + j].split("-");
                const iParsed = Number.parseInt(tempConvert[0]);
                const jParsed = Number.parseInt(tempConvert[1]);
                for (let k = j + 1; k < dRightState[i].length; k++) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  //we find the position of the first cell after numberToMove on the rightDiagonal
                  //and converting it to the leftDiagonal from the rightDiagonal
                  const tempConvertNull = convertFromShort[i + "-" + k].split(
                    "-"
                  );
                  const iAfterNumberToMove = Number.parseInt(
                    tempConvertNull[0]
                  );
                  const jAfterNumberToMove = Number.parseInt(
                    tempConvertNull[1]
                  );
                  if (
                    dLeftState[iAfterNumberToMove][jAfterNumberToMove] === null
                  ) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k + 1; z < dRightState[i].length; z++) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      //we find the position of all null cells after the white piece or queen
                      const tempConvertZ = convertFromShort[i + "-" + z].split(
                        "-"
                      );
                      const iNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[0]
                      );
                      const jNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[1]
                      );
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (
                        ix === iNullAfterNrToMove &&
                        jx === jNullAfterNrToMove &&
                        dRightState[i][z] === null
                      ) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > k; y--) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dRightState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dRightState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[iNullAfterNrToMove][
                            jNullAfterNrToMove
                          ] = numberToMove;
                          tempAddForErase.push(
                            tempDLeftState[iAfterNumberToMove][
                              jAfterNumberToMove
                            ]
                          );
                          tempDLeftState[iParsed][jParsed] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with white queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }

                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with white queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with white queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with white queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: false,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move forward on the rightDiagonal333333333333333333333333333333333333333Newqueen

        //check if we made the forced move backward on the rightDiagonal444444444444444444444444444444444444444444444444444444Newqueen
        for (let i = 0; i < dRightState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dRightState[i].includes(numberToMove)) {
            for (let j = dRightState[i].length - 1; j > 1; j--) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dRightState[i][j] === numberToMove) {
                //we find the position of the black queen on the leftDiagonal by converting it from the rightDiagonal
                const tempConvert = convertFromShort[i + "-" + j].split("-");
                const iParsed = Number.parseInt(tempConvert[0]);
                const jParsed = Number.parseInt(tempConvert[1]);
                for (let k = j - 1; k >= 0; k--) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  let jToErase; //the j of the number to be erased
                  //we find the position of the first cell after numberToMove on the rightDiagonal
                  //and converting it to the leftDiagonal from the rightDiagonal
                  const tempConvertNull = convertFromShort[i + "-" + k].split(
                    "-"
                  );
                  const iAfterNumberToMove = Number.parseInt(
                    tempConvertNull[0]
                  );
                  const jAfterNumberToMove = Number.parseInt(
                    tempConvertNull[1]
                  );
                  if (
                    dLeftState[iAfterNumberToMove][jAfterNumberToMove] === null
                  ) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    jToErase = jAfterNumberToMove; //this is the j a white piece or queen
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k - 1; z >= 0; z--) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      //we find the position of all null cells after the white piece or queen
                      const tempConvertZ = convertFromShort[i + "-" + z].split(
                        "-"
                      );
                      const iNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[0]
                      );
                      const jNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[1]
                      );
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (
                        ix === iNullAfterNrToMove &&
                        jx === jNullAfterNrToMove
                      ) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > jToErase; y++) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dRightState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dRightState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[iNullAfterNrToMove][
                            jNullAfterNrToMove
                          ] = numberToMove;
                          tempAddForErase.push(
                            tempDLeftState[iAfterNumberToMove][
                              jAfterNumberToMove
                            ]
                          );
                          tempDLeftState[iParsed][jParsed] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with white queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }

                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with white queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempDLeftState[i][j] < 63 && //white queen
                                tempDLeftState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 0 &&
                                    tempDLeftState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 50 &&
                                    tempDLeftState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 12 && //black piece
                                      tempDLeftState[i][k] < 25 && //black piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 62 && //black queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with white queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with white queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a white queen
                              if (
                                tempRightState[i][j] < 63 && //white queen
                                tempRightState[i][j] > 50 //white queen
                              ) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one white piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 0 &&
                                    tempRightState[i][k] < 13
                                  ) {
                                    break;
                                  }
                                  //if one white queen is in from of the queen
                                  if (
                                    tempRightState[i][k] > 50 &&
                                    tempRightState[i][k] < 63
                                  ) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 12 && //black piece
                                      tempRightState[i][k] < 25 && //black piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 62 && //black queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: false,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move backward on the rightDiagonal4444444444444444444444444444444444444444Newqueen
      } //end forced move with white queen. if (numberToMove > 50 && numberToMove < 63)
    } //end if (forcedMove && whiteMove)

    //if we have a forced move after we made a forced move and we click the wrong cell
    if (
      whiteMove &&
      forcedToCheck &&
      countAddToErase === 0 &&
      tempAddForErase.length !== 0
    ) {
      return;
    }

    //moves with out eliminating pieces from the table
    if (
      whiteMove &&
      !isForcedMove &&
      tempAddForErase.length === 0 &&
      haveNewHistory
    ) {
      alert("3186");
      let copyLeftState = [
        [20, 24],
        [null, 16, 19, 23],
        [1, null, null, 15, 18, 22],
        [9, 5, 2, null, null, 14, 17, 21],
        [10, 6, 3, null, null, 13],
        [11, 7, 4, null],
        [12, 8],
      ];
      for (let s = 0; s < tempDLeftState.length; s++) {
        for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
          copyLeftState[s][s2] = tempDLeftState[s][s2];
        }
      }
      tempHistory.push(copyLeftState);
      setHistory(tempHistory);
    } //end if (whiteMove && !isForcedMove && tempAddForErase.length === 0)

    //erase the white pieces after finalize the forced move
    if (whiteMove && !isForcedMove && tempAddForErase.length > 0) {
      //find the pieces for erase and erase them
      for (let i = 0; i < tempDLeftState.length; i++) {
        for (let j = 0; j < tempDLeftState[i].length; j++) {
          if (tempAddForErase.includes(tempDLeftState[i][j])) {
            tempDLeftState[i][j] = null;
          }
        }
      } //end for find the pieces for erase and erase them
      tempHistoryState.push([
        {
          whiteMove: false,
          numberToMove: null,
          startMove: false,
          forcedMove: false,
        },
      ]);
      setHistoryState(tempHistoryState);
      setAddForErase([]);
      setDLeftState(tempDLeftState);
      let copyLeftState = [
        [20, 24],
        [null, 16, 19, 23],
        [1, null, null, 15, 18, 22],
        [9, 5, 2, null, null, 14, 17, 21],
        [10, 6, 3, null, null, 13],
        [11, 7, 4, null],
        [12, 8],
      ];
      for (let s = 0; s < tempDLeftState.length; s++) {
        for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
          copyLeftState[s][s2] = tempDLeftState[s][s2];
        }
      }
      tempHistory.push(copyLeftState);
      setHistory(tempHistory);
      setDRightState([
        [tempDLeftState[4][0], tempDLeftState[3][1], tempDLeftState[2][0]],
        [
          tempDLeftState[5][0],
          tempDLeftState[4][1],
          tempDLeftState[3][2],
          tempDLeftState[2][1],
          tempDLeftState[1][0],
        ],
        [
          tempDLeftState[6][0],
          tempDLeftState[5][1],
          tempDLeftState[4][2],
          tempDLeftState[3][3],
          tempDLeftState[2][2],
          tempDLeftState[1][1],
          tempDLeftState[0][0],
        ],
        [
          tempDLeftState[6][1],
          tempDLeftState[5][2],
          tempDLeftState[4][3],
          tempDLeftState[3][4],
          tempDLeftState[2][3],
          tempDLeftState[1][2],
          tempDLeftState[0][1],
        ],
        [
          tempDLeftState[5][3],
          tempDLeftState[4][4],
          tempDLeftState[3][5],
          tempDLeftState[2][4],
          tempDLeftState[1][3],
        ],
        [tempDLeftState[4][5], tempDLeftState[3][6], tempDLeftState[2][5]],
      ]);
      setWhiteMove(false);
      setStartMove(false);
      setNumberToMove(null);
      return;
    } // end if (whiteMove && !isForcedMove && tempAddForErase.length > 0)
    //end erase the white pieces after finalize the forced move

    //this constants will be used in several blocs
    tempDLeftState = [...dLeftState];
    tempRightState = [];
    //is white move and second click
    if (whiteMove && startMove) {
      //this is the cell where numberToMove is located
      let iSecond;
      let jSecond;
      //if we move with the white piece
      if (numberToMove > 0 && numberToMove < 13) {
        //if the move was made with a piece in leftDiagonal1111111111111111111111111111
        for (let i = 0; i < dLeftState.length; i++) {
          //if this is our diagonal
          if (dLeftState[i].includes(numberToMove) && !forcedMove) {
            //search in diagonal where we have out number
            for (let j = 0; j < dLeftState[i].length; j++) {
              //find the coordinates of the number to move
              if (dLeftState[i][j] === numberToMove) {
                iSecond = i;
                jSecond = j;
              }
              //if this is our number and the next number is null
              if (
                dLeftState[i][j] === numberToMove &&
                jx === j + 1 &&
                dLeftState[i][j + 1] === null &&
                i === ix
              ) {
                const tempWhiteQueen = i + "-" + (j + 1);
                //the white queen appears here
                if (
                  whiteQueen.includes(tempWhiteQueen) &&
                  numberToMove > 0 &&
                  numberToMove < 13
                ) {
                  tempDLeftState[i][j + 1] = numberToMove + 50;
                } else {
                  tempDLeftState[i][j + 1] = numberToMove;
                }
                tempDLeftState[i][j] = null;
                tempHistoryState.push([
                  {
                    whiteMove: false,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                let copyLeftState = [
                  [20, 24],
                  [null, 16, 19, 23],
                  [1, null, null, 15, 18, 22],
                  [9, 5, 2, null, null, 14, 17, 21],
                  [10, 6, 3, null, null, 13],
                  [11, 7, 4, null],
                  [12, 8],
                ];
                for (let s = 0; s < tempDLeftState.length; s++) {
                  for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                    copyLeftState[s][s2] = tempDLeftState[s][s2];
                  }
                }
                tempHistory.push(copyLeftState);
                setHistory(tempHistory);
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setNumberToMove(null);
                setStartMove(false);
                setWhiteMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                return;
              } //if move forward
            } //inner loop dLeftState
          } //if this diagonal has the number to move
        } //outer loop dLeftState

        //if we decided to click on an another cell that has white piece and move with that cell
        //when we have a forced move numberToMove and startMove doesn't change
        if (
          (dLeftState[ix][jx] < 13 && dLeftState[ix][jx] > 0) ||
          (dLeftState[ix][jx] < 63 && dLeftState[ix][jx] > 50)
        ) {
          setNumberToMove(dLeftState[ix][jx]);
          setStartMove(true);
          return;
        }
        //if the second click is on a cell that we cannot move
        //if the click is made not forward on the rightDiagonal
        const tempConvertLong = convertFromLong[ix + "-" + jx].split("-");
        const ixParsed = Number.parseInt(tempConvertLong[0]);
        const jxParsed = Number.parseInt(tempConvertLong[1]);
        if (dRightState[ixParsed][jxParsed - 1] !== numberToMove) {
          setNumberToMove(null);
          setStartMove(false);
          return;
        }
        //search for move with white piece in rightDiagonal222222222222222222222222222222
        for (let i = 0; i < dRightState.length; i++) {
          //if this is our diagonal
          if (dRightState[i].includes(numberToMove) && !forcedMove) {
            //search in diagonal where we have out number
            for (let j = 0; j < dRightState[i].length - 1; j++) {
              //if this is our number and the next number is null
              if (
                dRightState[i][j] === numberToMove &&
                dRightState[i][j + 1] === null
              ) {
                //convert from rightDiagonal to leftLeftDiagonal
                const tempConvert = convertFromShort[i + "-" + (j + 1)].split(
                  "-"
                );
                const iParsed = Number.parseInt(tempConvert[0]);
                const jParsed = Number.parseInt(tempConvert[1]);
                const tempWhiteQueen = iParsed + "-" + (jParsed + 1);
                //the white queen appears here
                if (
                  whiteQueen.includes(tempWhiteQueen) &&
                  numberToMove > 0 &&
                  numberToMove < 13
                ) {
                  tempDLeftState[iParsed][jParsed] = numberToMove + 50;
                } else {
                  tempDLeftState[iParsed][jParsed] = numberToMove;
                }
                tempDLeftState[iSecond][jSecond] = null;
                tempHistoryState.push([
                  {
                    whiteMove: false,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                let copyLeftState = [
                  [20, 24],
                  [null, 16, 19, 23],
                  [1, null, null, 15, 18, 22],
                  [9, 5, 2, null, null, 14, 17, 21],
                  [10, 6, 3, null, null, 13],
                  [11, 7, 4, null],
                  [12, 8],
                ];
                for (let s = 0; s < tempDLeftState.length; s++) {
                  for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                    copyLeftState[s][s2] = tempDLeftState[s][s2];
                  }
                }
                tempHistory.push(copyLeftState);
                setHistory(tempHistory);
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setNumberToMove(null);
                setStartMove(false);
                setWhiteMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                return;
              } //if we have found the number to be moved and the second cell is null
            } //end for (let j = 0; j < dRightState[i].length - 1; j++) loop on the diagonal where is the number to be moved
          } //end if (dRightState[i].includes(numberToMove) && !forcedMove) if we found the number to be moved
        } //end for (let i = 0; i < dRightState.length; i++) check the move on the rightDiagonal
      } //if (numberToMove > 0 && numberToMove < 13) move of white piece

      //if we move with the white queen
      if (numberToMove > 50 && numberToMove < 63) {
        //if the move was made forward or backward with the queen in leftDiagonal1111111111111111111112222222222222222222222queen
        for (let i = 0; i < dLeftState.length; i++) {
          //if this is our diagonal
          if (dLeftState[i].includes(numberToMove) && !forcedMove) {
            //if the move was made on the same diagonal where the queen is
            if (i === ix) {
              for (let j = 0; j < dLeftState[i].length; j++) {
                //find the coordinates of the number to move
                if (dLeftState[i][j] === numberToMove) {
                  //if click twice on the same queen
                  if (i === ix && j === jx) {
                    return;
                  }
                  iSecond = i;
                  jSecond = j;
                  let onlyNullCells = true;
                  //if the move was made forward
                  if (j > jx) {
                    //loop backward to see if we have only null cells between the numberToMove and the new move
                    for (let z = jx - 1; z > j; z--) {
                      //check for null cells
                      if (dRightState[i][z] !== null) {
                        onlyNullCells = false;
                        return;
                      } //end check for null cells
                    } //end loop backward to see if we have only null cells between the numberToMove and the new move
                  } //end if the move was made forward
                  //if the move was made backward
                  if (j < jx) {
                    //loop backward to see if we have only null cells between the numberToMove and the new move
                    for (let z = jx + 1; z < j; z++) {
                      //check for null cells
                      if (dRightState[i][z] !== null) {
                        onlyNullCells = false;
                        return;
                      } //end check for null cells
                    } //end loop backward to see if we have only null cells between the numberToMove and the new move
                  } // end if the move was made forward
                  //the move with the queen is possible
                  if (onlyNullCells && i === ix) {
                    tempDLeftState[ix][jx] = numberToMove;
                    tempDLeftState[iSecond][jSecond] = null;
                    tempHistoryState.push([
                      {
                        whiteMove: false,
                        numberToMove: null,
                        startMove: false,
                        forcedMove: false,
                      },
                    ]);
                    setHistoryState(tempHistoryState);
                    setDLeftState(tempDLeftState);
                    haveNewHistory = true;
                    let copyLeftState = [
                      [20, 24],
                      [null, 16, 19, 23],
                      [1, null, null, 15, 18, 22],
                      [9, 5, 2, null, null, 14, 17, 21],
                      [10, 6, 3, null, null, 13],
                      [11, 7, 4, null],
                      [12, 8],
                    ];
                    for (let s = 0; s < tempDLeftState.length; s++) {
                      for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                        copyLeftState[s][s2] = tempDLeftState[s][s2];
                      }
                    }
                    tempHistory.push(copyLeftState);
                    setHistory(tempHistory);
                    tempAddForEraseHistory.push([...tempAddForErase]);
                    setAddForEraseHistory(tempAddForEraseHistory);
                    setNumberToMove(null);
                    setStartMove(false);
                    setWhiteMove(false);
                    setDRightState([
                      [
                        tempDLeftState[4][0],
                        tempDLeftState[3][1],
                        tempDLeftState[2][0],
                      ],
                      [
                        tempDLeftState[5][0],
                        tempDLeftState[4][1],
                        tempDLeftState[3][2],
                        tempDLeftState[2][1],
                        tempDLeftState[1][0],
                      ],
                      [
                        tempDLeftState[6][0],
                        tempDLeftState[5][1],
                        tempDLeftState[4][2],
                        tempDLeftState[3][3],
                        tempDLeftState[2][2],
                        tempDLeftState[1][1],
                        tempDLeftState[0][0],
                      ],
                      [
                        tempDLeftState[6][1],
                        tempDLeftState[5][2],
                        tempDLeftState[4][3],
                        tempDLeftState[3][4],
                        tempDLeftState[2][3],
                        tempDLeftState[1][2],
                        tempDLeftState[0][1],
                      ],
                      [
                        tempDLeftState[5][3],
                        tempDLeftState[4][4],
                        tempDLeftState[3][5],
                        tempDLeftState[2][4],
                        tempDLeftState[1][3],
                      ],
                      [
                        tempDLeftState[4][5],
                        tempDLeftState[3][6],
                        tempDLeftState[2][5],
                      ],
                    ]);
                    return;
                  } //end if the move with the queen is possible
                } //end if we have found the numberToMove
              } //end for the diagonal where is number to move
            } //end  if (i === ix) if the move is made on the same diagonal
          } // if (dLeftState[i].includes(numberToMove) && !forcedMove) if this diagonal has the number to move
        } ////end for if the move was made forward with the queen in leftDiagonal1111111111111111222222222222222queen
        //if the move was made forward or backward with the queen in rightDiagonal333333333333333333444444444444queen
        for (let i = 0; i < dRightState.length; i++) {
          //if this is our diagonal
          if (dRightState[i].includes(numberToMove) && !forcedMove) {
            //if the move was made on the same diagonal where the queen is
            for (let j = 0; j < dRightState[i].length; j++) {
              //find the coordinates of the number to move
              if (dRightState[i][j] === numberToMove) {
                //the purpose is to find out the value of the i in leftDiagonal
                const tempConvert = convertFromShort[i + "-" + j].split("-");
                const iLeft = Number.parseInt(tempConvert[0]);
                const jLeft = Number.parseInt(tempConvert[1]);
                //the purpose is to find out for jx in the rightDiagonal
                const tempConvert2 = convertFromLong[ix + "-" + jx].split("-");
                const ixRight = Number.parseInt(tempConvert2[0]);
                const jxRight = Number.parseInt(tempConvert2[1]);
                //coordinates of the numberToMove
                iSecond = iLeft;
                jSecond = jLeft;
                let onlyNullCells = true;
                //if the move was made forward
                if (j > jxRight) {
                  //loop backward to see if we have only null cells between the numberToMove and the new move
                  for (let z = jxRight; z < j; z++) {
                    //check for null cells
                    if (dRightState[i][z] !== null) {
                      onlyNullCells = false;
                      return;
                    } //end check for null cells
                  } //end loop backward to see if we have only null cells between the numberToMove and the new move
                } //end if the move was made forward
                //if the move was made backward
                if (j < jxRight) {
                  //loop backward to see if we have only null cells between the numberToMove and the new move
                  for (let z = jxRight; z > j; z--) {
                    //check for null cells
                    if (dRightState[i][z] !== null) {
                      onlyNullCells = false;
                      return;
                    } //end check for null cells
                  } //end loop backward to see if we have only null cells between the numberToMove and the new move
                } // end if the move was made forward
                //the move with the queen is possible
                if (onlyNullCells && ixRight === i) {
                  tempDLeftState[ix][jx] = numberToMove;
                  tempDLeftState[iSecond][jSecond] = null;
                  tempHistoryState.push([
                    {
                      whiteMove: false,
                      numberToMove: null,
                      startMove: false,
                      forcedMove: false,
                    },
                  ]);
                  setHistoryState(tempHistoryState);
                  setDLeftState(tempDLeftState);
                  haveNewHistory = true;
                  let copyLeftState = [
                    [20, 24],
                    [null, 16, 19, 23],
                    [1, null, null, 15, 18, 22],
                    [9, 5, 2, null, null, 14, 17, 21],
                    [10, 6, 3, null, null, 13],
                    [11, 7, 4, null],
                    [12, 8],
                  ];
                  for (let s = 0; s < tempDLeftState.length; s++) {
                    for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                      copyLeftState[s][s2] = tempDLeftState[s][s2];
                    }
                  }
                  tempHistory.push(copyLeftState);
                  setHistory(tempHistory);
                  tempAddForEraseHistory.push([...tempAddForErase]);
                  setAddForEraseHistory(tempAddForEraseHistory);
                  setNumberToMove(null);
                  setStartMove(false);
                  setWhiteMove(false);
                  setDRightState([
                    [
                      tempDLeftState[4][0],
                      tempDLeftState[3][1],
                      tempDLeftState[2][0],
                    ],
                    [
                      tempDLeftState[5][0],
                      tempDLeftState[4][1],
                      tempDLeftState[3][2],
                      tempDLeftState[2][1],
                      tempDLeftState[1][0],
                    ],
                    [
                      tempDLeftState[6][0],
                      tempDLeftState[5][1],
                      tempDLeftState[4][2],
                      tempDLeftState[3][3],
                      tempDLeftState[2][2],
                      tempDLeftState[1][1],
                      tempDLeftState[0][0],
                    ],
                    [
                      tempDLeftState[6][1],
                      tempDLeftState[5][2],
                      tempDLeftState[4][3],
                      tempDLeftState[3][4],
                      tempDLeftState[2][3],
                      tempDLeftState[1][2],
                      tempDLeftState[0][1],
                    ],
                    [
                      tempDLeftState[5][3],
                      tempDLeftState[4][4],
                      tempDLeftState[3][5],
                      tempDLeftState[2][4],
                      tempDLeftState[1][3],
                    ],
                    [
                      tempDLeftState[4][5],
                      tempDLeftState[3][6],
                      tempDLeftState[2][5],
                    ],
                  ]);
                  return;
                } //end if the move with the queen is possible
              } //end if we have found the numberToMove
            } //end for the diagonal where is number to move
          } // if (dLeftState[i].includes(numberToMove) && !forcedMove) if this diagonal has the number to move
        } ////end for if the move was made forward with the queen in rightDiagonal333333333333344444444444queen

        //if we decided to click on an another cell that has white piece and move with that cell
        //when we have a forced move numberToMove and startMove doesn't change
        if (
          (dLeftState[ix][jx] < 13 && dLeftState[ix][jx] > 0) ||
          (dLeftState[ix][jx] < 63 && dLeftState[ix][jx] > 50)
        ) {
          setNumberToMove(dLeftState[ix][jx]);
          setStartMove(true);
          return;
        }
        //if the second click is on a cell that we cannot move
        //if the click is made not forward on the rightDiagonal
        //other wise the piece will automatically move forward on the rightDiagonal
        const tempConvertLong = convertFromLong[ix + "-" + jx].split("-");
        const ixParsed = Number.parseInt(tempConvertLong[0]);
        const jxParsed = Number.parseInt(tempConvertLong[1]);
        if (dRightState[ixParsed][jxParsed - 1] !== numberToMove) {
          setNumberToMove(null);
          setStartMove(false);
          return;
        }
      } //if (numberToMove > 50 && numberToMove < 63) //if we move with the white queen
    } //end if (whiteMove && startMove) is white move and second click

    //black 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 black
    //find if black pieces have a forced move
    if (!whiteMove) {
      //if first move and the click is on a null cell just return
      if (!startMove && dLeftState[ix][jx] === null) {
        return;
      }
      // if (!whiteMove && !startMove) {
      //search to find out if we have a forced move forward with black pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = 0; j < dLeftState[i].length - 2; j++) {
          if (
            (!addForErase.includes(dLeftState[i][j + 1]) &&
              dLeftState[i][j] > 12 && //black piece
              dLeftState[i][j] < 25 && //black piece
              dLeftState[i][j + 1] > 0 && //white piece
              dLeftState[i][j + 1] < 13 && // white piece
              dLeftState[i][j + 2] === null) ||
            (!addForErase.includes(dLeftState[i][j + 1]) &&
              dLeftState[i][j] > 12 && //black piece
              dLeftState[i][j] < 25 && //black piece
              dLeftState[i][j + 1] > 50 && //white queen
              dLeftState[i][j + 1] < 63 && //white queen
              dLeftState[i][j + 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal forward
      //search to find out if we have a forced move backward with black pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = dLeftState[i].length - 1; j > 1; j--) {
          if (
            (!addForErase.includes(dLeftState[i][j - 1]) &&
              dLeftState[i][j] > 12 && //black piece
              dLeftState[i][j] < 25 && //black piece
              dLeftState[i][j - 1] > 0 && //white piece
              dLeftState[i][j - 1] < 13 && //white piece
              dLeftState[i][j - 2] === null) ||
            (!addForErase.includes(dLeftState[i][j - 1]) &&
              dLeftState[i][j] > 12 && //black piece
              dLeftState[i][j] < 25 && //black piece
              dLeftState[i][j - 1] > 50 && //white queen
              dLeftState[i][j - 1] < 63 && //black queen
              dLeftState[i][j - 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal backward
      //search to find out if we have a forced move in front with black pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = 0; j < dRightState[i].length - 2; j++) {
          if (
            (!addForErase.includes(dRightState[i][j + 1]) &&
              dRightState[i][j] > 12 && //black piece
              dRightState[i][j] < 25 && //black piece
              dRightState[i][j + 1] > 0 && //white piece
              dRightState[i][j + 1] < 13 && //white piece
              dRightState[i][j + 2] === null) ||
            (!addForErase.includes(dRightState[i][j + 1]) &&
              dRightState[i][j] > 12 && // black piece
              dRightState[i][j] < 25 && //black piece
              dRightState[i][j + 1] > 50 && //black queen
              dRightState[i][j + 1] < 63 && //black queen
              dRightState[i][j + 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal forward
      //search to find out if we have a forced move backward with black pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = dRightState[i].length - 1; j > 1; j--) {
          if (
            (!addForErase.includes(dRightState[i][j - 1]) &&
              dRightState[i][j] > 12 && //black piece
              dRightState[i][j] < 25 && //black piece
              dRightState[i][j - 1] > 0 && //white piece
              dRightState[i][j - 1] < 13 && //white piece
              dRightState[i][j - 2] === null) ||
            (!addForErase.includes(dRightState[i][j - 1]) &&
              dRightState[i][j] > 12 && //black piece
              dRightState[i][j] < 25 && //black piece
              dRightState[i][j - 1] > 50 && //white queen
              dRightState[i][j - 1] < 63 && //white queen
              dRightState[i][j - 2] === null)
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal backward black piece
      //queen  queen queen queen queen queen queen queen queen queen queen queen queen queen queen Black Black Black Black Black
      //search to find out if we have a forced move forward with black queen leftDiagonal queen1
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = 0; j < dLeftState[i].length - 2; j++) {
          //black queen
          if (dLeftState[i][j] > 62) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j + 1; k < dLeftState[i].length; k++) {
              //two white or black pieces stand next to each other
              if (dLeftState[i][k] !== null && dLeftState[i][k + 1] !== null) {
                break;
              }
              //if one black piece is in from of the queen
              if (dLeftState[i][k] > 12 && dLeftState[i][k] < 25) {
                break;
              }
              //if one black queen is in from of the queen
              if (dLeftState[i][k] > 62) {
                break;
              }
              if (
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 0 && //white piece
                  dLeftState[i][k] < 13 && //white piece
                  dLeftState[i][k + 1] === null) ||
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 50 && //white queen
                  dLeftState[i][k] < 63 && //white queen
                  dLeftState[i][k + 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a black queen
        } //end for on each left Diagonal
      } //end leftDiagonal forward queen1
      //search to find out if we have a forced move backward with black queen leftDiagonal queen2
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = dLeftState[i].length - 1; j > 1; j--) {
          //black queen
          if (dLeftState[i][j] > 62) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j - 1; k > 0; k--) {
              //two pieces stand next to each other
              if (dLeftState[i][k] !== null && dLeftState[i][k - 1] !== null) {
                break;
              }
              //if one black piece is in from of the queen
              if (dLeftState[i][k] > 12 && dLeftState[i][k] < 25) {
                break;
              }
              //if one black queen is in from of the queen
              if (dLeftState[i][k] > 62) {
                break;
              }
              if (
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 0 && //white piece
                  dLeftState[i][k] < 13 && //white piece
                  dLeftState[i][k - 1] === null) ||
                (!addForErase.includes(dLeftState[i][k]) &&
                  dLeftState[i][k] > 50 && //white queen
                  dLeftState[i][k] < 63 && //white queen
                  dLeftState[i][k - 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end leftDiagonal backward queen2
      //search to find out if we have a forced move forward with white queen rightDiagonal queen3
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = 0; j < dRightState[i].length - 2; j++) {
          //black queen
          if (dRightState[i][j] > 62) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j + 1; k < dRightState[i].length - 1; k++) {
              //two white pieces stand next to each other
              if (
                dRightState[i][k] !== null &&
                dRightState[i][k + 1] !== null
              ) {
                break;
              }
              //if one black piece is in from of the queen
              if (dRightState[i][k] > 12 && dRightState[i][k] < 25) {
                break;
              }
              //if one black queen is in from of the queen
              if (dRightState[i][k] > 62) {
                break;
              }
              if (
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 0 && //white piece
                  dRightState[i][k] < 13 && //white piece
                  dRightState[i][k + 1] === null) ||
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 50 && //white queen
                  dRightState[i][k] < 63 && //white queen
                  dRightState[i][k + 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end rightDiagonal forward queen3
      //search to find out if we have a forced move backward with black queen rightDiagonal queen4
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = dRightState[i].length - 1; j > 1; j--) {
          //black queen
          if (dRightState[i][j] > 62) {
            //check all the diagonal if we have a forced move with the queen
            for (let k = j - 1; k > 0; k--) {
              //two black pieces stand next to each other
              if (
                dRightState[i][k] !== null &&
                dRightState[i][k - 1] !== null
              ) {
                break;
              }
              //if one black piece is in from of the queen
              if (dRightState[i][k] > 12 && dRightState[i][k] < 25) {
                break;
              }
              //if one black queen is in from of the queen
              if (dRightState[i][k] > 62) {
                break;
              }
              if (
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 0 && //white piece
                  dRightState[i][k] < 13 && //white piece
                  dRightState[i][k - 1] === null) ||
                (!addForErase.includes(dRightState[i][k]) &&
                  dRightState[i][k] > 50 && //white queen
                  dRightState[i][k] < 63 && //white queen
                  dRightState[i][k - 1] === null)
              ) {
                setForcedMove(true);
              }
            } // end for queen check if has a forced move
          } //end if we have a white queen
        } //end for on each left Diagonal
      } //end rightDiagonal backward black queen4
    } // end if (!whiteMove)

    // what is up was writhen with white forced
    //this constants will be used in several blocs
    tempDLeftState = [...dLeftState];
    tempRightState = [];
    isForcedMove = false;
    tempAddForErase = addForErase;
    countAddToErase = 0;
    forcedToCheck = forcedMove;
    //what to do if black move and forced move
    if (!whiteMove && forcedMove) {
      //this is the cell where numberToMove is located
      let iSecond;
      let jSecond;
      //if we make a forced move with black piece
      if (numberToMove > 12 && numberToMove < 25) {
        //check if we made the forced move forward on the left diagonal111111111111111111111111111111111111111111111111black
        for (let i = 0; i < dLeftState.length; i++) {
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = 0; j < dLeftState[i].length - 1; j++) {
              //find the coordinates of the number to move
              if (dLeftState[i][j] === numberToMove) {
                iSecond = i;
                jSecond = j;
              }
              if (
                (dLeftState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dLeftState[i][j + 1]) &&
                  jx === j + 2 && //we made the click after one cell
                  dLeftState[i][j + 1] < 13 &&
                  dLeftState[i][j + 1] > 0 &&
                  dLeftState[i][j + 2] === null &&
                  i === ix) ||
                (dLeftState[i][j] === numberToMove &&
                  jx === j + 2 && //we made the click after one cell//if the move is on the same diagonal
                  dLeftState[i][j + 2] === null &&
                  i === ix &&
                  dLeftState[i][j + 1] > 50 && //white queen
                  dLeftState[i][j + 1] < 63) //white queen
              ) {
                const tempBlackQueen = i + "-" + (j + 2);
                //the white queen appears here
                if (
                  blackQueen.includes(tempBlackQueen) &&
                  numberToMove > 12 &&
                  numberToMove < 25
                ) {
                  tempDLeftState[i][j + 2] = numberToMove + 50;
                } else {
                  tempDLeftState[i][j + 2] = numberToMove;
                }
                tempDLeftState[i][j] = null;
                countAddToErase++;
                tempAddForErase.push(tempDLeftState[i][j + 1]);
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 0 && //white piece
                        tempDLeftState[i][j - 1] < 13 && //white piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 50 && //white queen
                        tempDLeftState[i][j - 1] < 63 && //white queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 0 && //white piece
                        tempDLeftState[i][j + 1] < 13 && //white piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 50 && //white queen
                        tempDLeftState[i][j + 1] < 63 && //white queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move forward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 0 && //white piece
                        tempRightState[i][j - 1] < 13 && //white piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 50 && //white queen
                        tempRightState[i][j - 1] < 63 && //white queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 0 && //white piece
                        tempRightState[i][j + 1] < 13 && //white piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 50 && //white queen
                        tempRightState[i][j + 1] < 63 && //white queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: true,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                isForcedMove
                  ? setNumberToMove(numberToMove)
                  : setNumberToMove(null);
                isForcedMove ? setStartMove(true) : setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
              } //end if we forced a piece on the leftDiagonal forward
            } //end inner loop were we have the numberToMove
          } // end  if (dLeftState[i].includes(numberToMove))
        } //end check if we made the forced move forward on the left diagonal111111111111111111111111111111111111111111111black

        //check if we made the forced move backward on the left diagonal22222222222222222222222222222222222222222222222222black
        for (let i = 0; i < dLeftState.length; i++) {
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = dLeftState[i].length - 1; j > 1; j--) {
              // //find the coordinates of the number to move
              if (dLeftState[i][j] === numberToMove) {
                iSecond = i;
                jSecond = j;
              }
              if (
                (dLeftState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dLeftState[i][j - 1]) &&
                  jx === j - 2 && //we made the click after one cell
                  dLeftState[i][j - 1] < 13 && //white piece
                  dLeftState[i][j - 1] > 0 && // white piece
                  dLeftState[i][j - 2] === null &&
                  i === ix) ||
                (dLeftState[i][j] === numberToMove &&
                  jx === j - 2 && //we made the click after one cell//if the move is on the same diagonal
                  dLeftState[i][j - 2] === null &&
                  i === ix &&
                  dLeftState[i][j - 1] > 50 && //white queen
                  dLeftState[i][j - 1] < 63) //white queen
              ) {
                const tempBlackQueen = i + "-" + (j - 2);
                //the white queen appears here
                if (
                  blackQueen.includes(tempBlackQueen) &&
                  numberToMove > 12 &&
                  numberToMove < 25
                ) {
                  tempDLeftState[i][j - 2] = numberToMove + 50;
                } else {
                  tempDLeftState[i][j - 2] = numberToMove;
                }
                tempDLeftState[i][j] = null;
                countAddToErase++;
                tempAddForErase.push(tempDLeftState[i][j - 1]);
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 0 && //white piece
                        tempDLeftState[i][j - 1] < 13 && //white piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 50 && //white queen
                        tempDLeftState[i][j - 1] < 63 && //white queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 0 && //white piece
                        tempDLeftState[i][j + 1] < 13 && //white piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 50 && //white queen
                        tempDLeftState[i][j + 1] < 63 && //white queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move forward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 0 && //white piece
                        tempRightState[i][j - 1] < 13 && //white piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 50 && //white queen
                        tempRightState[i][j - 1] < 63 && //white queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 0 && //white piece
                        tempRightState[i][j + 1] < 13 && //white piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 50 && //white queen
                        tempRightState[i][j + 1] < 63 && //white queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: true,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                isForcedMove
                  ? setNumberToMove(numberToMove)
                  : setNumberToMove(null);
                isForcedMove ? setStartMove(true) : setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
              } // end if we made a forced move
            } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
          } // end if (dLeftState[i].includes(numberToMove))
        } //end check if we made the forced move backward on the left diagonal2222222222222222222222222222222222222

        //check if we made the forced move forward on the right diagonal3333333333333333333333333333333333333333333
        for (let i = 0; i < dRightState.length; i++) {
          if (dRightState[i].includes(numberToMove)) {
            for (let j = 0; j < dRightState[i].length - 2; j++) {
              //
              //convert from rightDiagonal to leftLeftDiagonal
              const tempConvert = convertFromShort[i + "-" + (j + 2)].split(
                "-"
              );
              const tempConvertErase = convertFromShort[
                i + "-" + (j + 1)
              ].split("-");
              const iParsed = Number.parseInt(tempConvert[0]);
              const jParsed = Number.parseInt(tempConvert[1]);
              const iParsedErase = Number.parseInt(tempConvertErase[0]);
              const jParsedErase = Number.parseInt(tempConvertErase[1]);

              //
              if (
                (dRightState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dRightState[i][j + 1]) &&
                  dRightState[i][j + 1] < 13 && //white piece
                  dRightState[i][j + 1] > 0 && //white piece
                  dRightState[i][j + 2] === null &&
                  ix === iParsed &&
                  jx === jParsed) ||
                (dRightState[i][j] === numberToMove &&
                  dRightState[i][j + 2] === null &&
                  dRightState[i][j + 1] > 50 && //white queen
                  dRightState[i][j + 1] < 63 && //white queen
                  ix === iParsed &&
                  jx === jParsed)
              ) {
                countAddToErase++;
                const tempBlackQueen = iParsed + "-" + jParsed;
                //the white queen appears here
                if (
                  blackQueen.includes(tempBlackQueen) &&
                  numberToMove > 12 &&
                  numberToMove < 25
                ) {
                  tempDLeftState[iParsed][jParsed] = numberToMove + 50;
                } else {
                  tempDLeftState[iParsed][jParsed] = numberToMove;
                }
                tempAddForErase.push(
                  tempDLeftState[iParsedErase][jParsedErase]
                );
                tempDLeftState[iSecond][jSecond] = null;
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 0 && //white piece
                        tempDLeftState[i][j - 1] < 13 && //white piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 50 && //white queen
                        tempDLeftState[i][j - 1] < 63 && //white queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 0 && //white piece
                        tempDLeftState[i][j + 1] < 13 && //white piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 50 && //white queen
                        tempDLeftState[i][j + 1] < 63 && //white queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move forward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 0 && //white piece
                        tempRightState[i][j - 1] < 13 && //white piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 50 && //white queen
                        tempRightState[i][j - 1] < 63 && //white queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 0 && //white piece
                        tempRightState[i][j + 1] < 13 && //white piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 50 && //white queen
                        tempRightState[i][j + 1] < 63 && //white queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: true,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                isForcedMove
                  ? setNumberToMove(numberToMove)
                  : setNumberToMove(null);
                isForcedMove ? setStartMove(true) : setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                break;

                // return;
              } // end if we made a forced move
            } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
          } // end if (dLeftState[i].includes(numberToMove)
        } //end for check if we made the forced move forward on the right diagonal333333333333333333333333333333333333333333333333333

        //check if we made the forced move backward on the right diagonal444444444444444444444444444444444444444444444444444444444444
        for (let i = 0; i < dRightState.length; i++) {
          if (dRightState[i].includes(numberToMove)) {
            for (let j = dRightState[i].length - 1; j > 1; j--) {
              //
              //convert from rightDiagonal to leftLeftDiagonal
              const tempConvert = convertFromShort[i + "-" + (j - 2)].split(
                "-"
              );
              const tempConvertErase = convertFromShort[
                i + "-" + (j - 1)
              ].split("-");
              const iParsed = Number.parseInt(tempConvert[0]);
              const jParsed = Number.parseInt(tempConvert[1]);
              const iParsedErase = Number.parseInt(tempConvertErase[0]);
              const jParsedErase = Number.parseInt(tempConvertErase[1]);

              //
              if (
                (dRightState[i][j] === numberToMove &&
                  !tempAddForErase.includes(dRightState[i][j - 1]) &&
                  dRightState[i][j - 1] < 13 && //white piece
                  dRightState[i][j - 1] > 0 && //white piece
                  dRightState[i][j - 2] === null &&
                  ix === iParsed &&
                  jx === jParsed) ||
                (dRightState[i][j] === numberToMove &&
                  dRightState[i][j - 2] === null &&
                  dRightState[i][j - 1] < 63 && //white queen
                  dRightState[i][j - 1] > 50 && //white queen
                  ix === iParsed &&
                  jx === jParsed)
              ) {
                countAddToErase++;
                tempDLeftState[iParsed][jParsed] = numberToMove;
                const tempBlackQueen = iParsed + "-" + jParsed;
                //the white queen appears here
                if (
                  blackQueen.includes(tempBlackQueen) &&
                  numberToMove > 12 &&
                  numberToMove < 25
                ) {
                  tempDLeftState[iParsed][jParsed] = numberToMove + 50;
                } else {
                  tempDLeftState[iParsed][jParsed] = numberToMove;
                }
                tempAddForErase.push(
                  tempDLeftState[iParsedErase][jParsedErase]
                );
                tempDLeftState[iSecond][jSecond] = null;
                tempRightState = [
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ];

                ////////////////////check forced Move start
                //search to find out if we have a forced move forward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 0 && //white piece
                        tempDLeftState[i][j - 1] < 13 && //white piece
                        tempDLeftState[i][j - 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j - 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j - 1] > 50 && //white queen
                        tempDLeftState[i][j - 1] < 63 && //white queen
                        tempDLeftState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal forward
                //search to find out if we have a forced move backward with black pieces leftDiagonal
                for (let i = 0; i < tempDLeftState.length; i++) {
                  for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 0 && //white piece
                        tempDLeftState[i][j + 1] < 13 && //white piece
                        tempDLeftState[i][j + 2] === null) ||
                      (!addForErase.includes(tempDLeftState[i][j + 1]) &&
                        tempDLeftState[i][j] === numberToMove &&
                        tempDLeftState[i][j] > 12 && //black piece
                        tempDLeftState[i][j] < 25 && //black piece
                        tempDLeftState[i][j + 1] > 50 && //white queen
                        tempDLeftState[i][j + 1] < 63 && //white queen
                        tempDLeftState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //leftDiagonal backward
                //search to find out if we have a forced move forward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = tempRightState[i].length - 1; j > 1; j--) {
                    if (
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 0 && //white piece
                        tempRightState[i][j - 1] < 13 && //white piece
                        tempRightState[i][j - 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j - 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j - 1] > 50 && //white queen
                        tempRightState[i][j - 1] < 63 && //white queen
                        tempRightState[i][j - 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal forward
                //search to find out if we have a forced move backward with white pieces on the rightDiagonal
                for (let i = 0; i < tempRightState.length; i++) {
                  for (let j = 0; j < tempRightState[i].length - 2; j++) {
                    if (
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 0 && //white piece
                        tempRightState[i][j + 1] < 13 && //white piece
                        tempRightState[i][j + 2] === null) ||
                      (!addForErase.includes(tempRightState[i][j + 1]) &&
                        tempRightState[i][j] === numberToMove &&
                        tempRightState[i][j] > 12 && //black piece
                        tempRightState[i][j] < 25 && //black piece
                        tempRightState[i][j + 1] > 50 && //white queen
                        tempRightState[i][j + 1] < 63 && //white queen
                        tempRightState[i][j + 2] === null)
                    ) {
                      isForcedMove = true;
                    }
                  }
                } //rightDiagonal backward
                ///////////////////check forced Move end
                tempHistoryState.push([
                  {
                    whiteMove: true,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setAddForErase(tempAddForErase);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setForcedMove(isForcedMove);
                isForcedMove
                  ? setNumberToMove(numberToMove)
                  : setNumberToMove(null);
                isForcedMove ? setStartMove(true) : setStartMove(false);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                break;
              } // end if we made a forced move333333
            } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
          } // end if (dLeftState[i].includes(numberToMove)
        } //end for check if we made the forced move backward on the right diagonal44444444444444444444444444444444444444444444444444444
      } //end if (numberToMove > 12 && numberToMove < 25)
      //forced move with black queen
      if (numberToMove > 62) {
        let countFinalMove = false;
        //check if we made the forced move forward on the leftDiagonal1111111111111111111111111111111111111111111111111111111111Newqueen
        for (let i = 0; i < dLeftState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = 0; j < dLeftState[i].length - 2; j++) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dLeftState[i][j] === numberToMove) {
                for (let k = j + 1; k < dLeftState[i].length; k++) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  if (dLeftState[i][k] === null) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k + 1; z < dLeftState[i].length; z++) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (ix === i && jx === z && dLeftState[i][z] === null) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > k; y--) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dLeftState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dLeftState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[i][z] = numberToMove; //move the piece after forced move on the right cell
                          tempAddForErase.push(tempDLeftState[i][k]);
                          tempDLeftState[i][j] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with black queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 63) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with black queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with black queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with black queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: true,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move forward on the leftDiagonal11111111111111111111111111111Newqueen

        //check if we made the forced move backward on the leftDiagonal22222222222222222222222222222222222222222222Newqueen
        for (let i = 0; i < dLeftState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dLeftState[i].includes(numberToMove)) {
            for (let j = dLeftState[i].length - 1; j > 1; j--) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dLeftState[i][j] === numberToMove) {
                for (let k = j - 1; k >= 0; k--) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  if (dLeftState[i][k] === null) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k - 1; z >= 0; z--) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (ix === i && jx === z && dLeftState[i][z] === null) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > k; y++) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dLeftState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dLeftState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[i][z] = numberToMove; //move the piece after forced move on the right cell
                          tempAddForErase.push(tempDLeftState[i][k]);
                          tempDLeftState[i][j] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with black queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 63) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with black queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with black queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with black queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: true,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move backward on the leftDiagonal22222222222222222222222222222222Newqueen

        //check if we made the forced move forward on the rightDiagonal3333333333333333333333333333333333333333333333Newqueen
        for (let i = 0; i < dRightState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dRightState[i].includes(numberToMove)) {
            for (let j = 0; j < dRightState[i].length - 2; j++) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dRightState[i][j] === numberToMove) {
                //we find the position of the black queen on the leftDiagonal by converting it from the rightDiagonal
                const tempConvert = convertFromShort[i + "-" + j].split("-");
                const iParsed = Number.parseInt(tempConvert[0]);
                const jParsed = Number.parseInt(tempConvert[1]);
                for (let k = j + 1; k < dRightState[i].length; k++) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  //we find the position of the first cell after numberToMove on the rightDiagonal
                  //and converting it to the leftDiagonal from the rightDiagonal
                  const tempConvertNull = convertFromShort[i + "-" + k].split(
                    "-"
                  );
                  const iAfterNumberToMove = Number.parseInt(
                    tempConvertNull[0]
                  );
                  const jAfterNumberToMove = Number.parseInt(
                    tempConvertNull[1]
                  );
                  if (
                    dLeftState[iAfterNumberToMove][jAfterNumberToMove] === null
                  ) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k + 1; z < dRightState[i].length; z++) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      //we find the position of all null cells after the white piece or queen
                      const tempConvertZ = convertFromShort[i + "-" + z].split(
                        "-"
                      );
                      const iNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[0]
                      );
                      const jNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[1]
                      );
                      let allCellsAreNull = true;
                      //this is the place where we made the move
                      if (
                        ix === iNullAfterNrToMove &&
                        jx === jNullAfterNrToMove &&
                        dRightState[i][z] === null
                      ) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > k; y--) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dRightState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dRightState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[iNullAfterNrToMove][
                            jNullAfterNrToMove
                          ] = numberToMove; //move the piece after forced move on the right cell
                          tempAddForErase.push(
                            tempDLeftState[iAfterNumberToMove][
                              jAfterNumberToMove
                            ]
                          );
                          tempDLeftState[iParsed][jParsed] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with black queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 63) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with black queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with black queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with black queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: true,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move forward on the rightDiagonal333333333333333333333333333333333333333Newqueen

        //check if we made the forced move backward on the right diagonal444444444444444444444444444444444444444444444444444444Newqueen
        for (let i = 0; i < dRightState.length; i++) {
          //if we did a forced move we exit the loop of i
          if (countFinalMove) {
            break;
          }
          if (dRightState[i].includes(numberToMove)) {
            for (let j = dRightState[i].length - 1; j > 1; j--) {
              //if we did a forced move we exit the loop of j
              if (countFinalMove) {
                break;
              }
              //if we clicked on the numberToMove and then we made a correct forced move
              if (dRightState[i][j] === numberToMove) {
                //we find the position of the black queen on the leftDiagonal by converting it from the rightDiagonal
                const tempConvert = convertFromShort[i + "-" + j].split("-");
                const iParsed = Number.parseInt(tempConvert[0]);
                const jParsed = Number.parseInt(tempConvert[1]);
                for (let k = j - 1; k >= 0; k--) {
                  //if we did a forced move we exit the loop of k
                  if (countFinalMove) {
                    break;
                  }
                  let jToErase; //the j of the number to be erased
                  //we find the position of the first cell after numberToMove on the rightDiagonal
                  //and converting it to the leftDiagonal from the rightDiagonal
                  const tempConvertNull = convertFromShort[i + "-" + k].split(
                    "-"
                  );
                  const iAfterNumberToMove = Number.parseInt(
                    tempConvertNull[0]
                  );
                  const jAfterNumberToMove = Number.parseInt(
                    tempConvertNull[1]
                  );
                  if (
                    dLeftState[iAfterNumberToMove][jAfterNumberToMove] === null
                  ) {
                    continue; //we didn't found the number to remove and we start the loop again
                  } else {
                    jToErase = jAfterNumberToMove; //this is the j a white piece or queen
                    //found the number to remove and search if the move after that cell was correct
                    for (let z = k - 1; z >= 0; z--) {
                      //if we did a forced move we exit the loop of k
                      if (countFinalMove) {
                        break;
                      }
                      //we find the position of all null cells after the white piece or queen
                      const tempConvertZ = convertFromShort[i + "-" + z].split(
                        "-"
                      );
                      const iNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[0]
                      );
                      const jNullAfterNrToMove = Number.parseInt(
                        tempConvertZ[1]
                      );
                      //this is the place where we made the move
                      let allCellsAreNull = true;
                      if (
                        ix === iNullAfterNrToMove &&
                        jx === jNullAfterNrToMove
                      ) {
                        //check if all the cells after the numberToMove and before the cell where we moved are null
                        for (let y = z - 1; y > jToErase; y++) {
                          //if we did a forced move we exit the loop of k
                          if (countFinalMove) {
                            break;
                          }
                          if (dRightState[i][y] !== null) {
                            allCellsAreNull = false;
                          }
                        } //end for check if all the cells after the numberToMove and before the cell where we moved are null
                        //all cells are null and the move is possible
                        if (
                          allCellsAreNull &&
                          !tempAddForErase.includes(dRightState[i][k])
                        ) {
                          countFinalMove = true;
                          countAddToErase++;
                          tempDLeftState[iNullAfterNrToMove][
                            jNullAfterNrToMove
                          ] = numberToMove; //move the piece after forced move on the right cell
                          tempAddForErase.push(
                            tempDLeftState[iAfterNumberToMove][
                              jAfterNumberToMove
                            ]
                          );
                          tempDLeftState[iParsed][jParsed] = null; //the queen disappears from the ex cell
                          tempRightState = [
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ];
                          ////////////////////check forced Move start
                          //search to find out if we have a forced move forward with black queen leftDiagonal queen1
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = 0;
                              j < tempDLeftState[i].length - 1;
                              j++
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 63) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempDLeftState[i].length - 1;
                                  k++
                                ) {
                                  //two pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }

                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal forward queen1
                          //search to find out if we have a forced move backward with black queen leftDiagonal queen2
                          for (let i = 0; i < tempDLeftState.length; i++) {
                            for (
                              let j = tempDLeftState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempDLeftState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempDLeftState[i][k] !== null &&
                                    tempDLeftState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempDLeftState[i][k] > 12 &&
                                    tempDLeftState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempDLeftState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 0 && //white piece
                                      tempDLeftState[i][k] < 13 && //white piece
                                      tempDLeftState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempDLeftState[i][k]
                                    ) &&
                                      tempDLeftState[i][k] > 50 && //white queen
                                      tempDLeftState[i][k] < 63 && //white queen
                                      tempDLeftState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen2
                          //search to find out if we have a forced move forward with black queen rightDiagonal queen3
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = 0;
                              j < tempRightState[i].length - 2;
                              j++
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (
                                  let k = j + 1;
                                  k < tempRightState[i].length - 1;
                                  k++
                                ) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k + 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k + 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k + 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a black queen
                            } //end for on each left Diagonal
                          } //end rightDiagonal forward queen3
                          //search to find out if we have a forced move backward with black queen rightDiagonal queen4
                          for (let i = 0; i < tempRightState.length; i++) {
                            for (
                              let j = tempRightState[i].length - 1;
                              j > 1;
                              j--
                            ) {
                              //if find a black queen
                              if (tempRightState[i][j] > 62) {
                                //check all the diagonal if we have a forced move with the queen
                                for (let k = j - 1; k >= 0; k--) {
                                  //two white pieces stand next to each other
                                  if (
                                    tempRightState[i][k] !== null &&
                                    tempRightState[i][k - 1] !== null
                                  ) {
                                    break;
                                  }
                                  //if one black piece is in from of the queen
                                  if (
                                    tempRightState[i][k] > 12 &&
                                    tempRightState[i][k] < 25
                                  ) {
                                    break;
                                  }
                                  //if one black queen is in from of the queen
                                  if (tempRightState[i][k] > 62) {
                                    break;
                                  }
                                  if (
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 0 && //white piece
                                      tempRightState[i][k] < 13 && //white piece
                                      tempRightState[i][k - 1] === null) ||
                                    (!addForErase.includes(
                                      tempRightState[i][k]
                                    ) &&
                                      tempRightState[i][k] > 50 && //white queen
                                      tempRightState[i][k] < 63 && //white queen
                                      tempRightState[i][k - 1] === null)
                                  ) {
                                    isForcedMove = true;
                                  }
                                } // end for queen check if has a forced move
                              } //end if we have a white queen
                            } //end for on each left Diagonal
                          } //end leftDiagonal backward queen4
                          ///////////////////check forced Move end
                          tempHistoryState.push([
                            {
                              whiteMove: true,
                              numberToMove: null,
                              startMove: false,
                              forcedMove: false,
                            },
                          ]);
                          setHistoryState(tempHistoryState);
                          setAddForErase(tempAddForErase);
                          setDLeftState(tempDLeftState);
                          haveNewHistory = true;
                          tempAddForEraseHistory.push([...tempAddForErase]);
                          setAddForEraseHistory(tempAddForEraseHistory);
                          setForcedMove(isForcedMove);
                          isForcedMove
                            ? setNumberToMove(numberToMove)
                            : setNumberToMove(null);
                          isForcedMove
                            ? setStartMove(true)
                            : setStartMove(false);
                          setDRightState([
                            [
                              tempDLeftState[4][0],
                              tempDLeftState[3][1],
                              tempDLeftState[2][0],
                            ],
                            [
                              tempDLeftState[5][0],
                              tempDLeftState[4][1],
                              tempDLeftState[3][2],
                              tempDLeftState[2][1],
                              tempDLeftState[1][0],
                            ],
                            [
                              tempDLeftState[6][0],
                              tempDLeftState[5][1],
                              tempDLeftState[4][2],
                              tempDLeftState[3][3],
                              tempDLeftState[2][2],
                              tempDLeftState[1][1],
                              tempDLeftState[0][0],
                            ],
                            [
                              tempDLeftState[6][1],
                              tempDLeftState[5][2],
                              tempDLeftState[4][3],
                              tempDLeftState[3][4],
                              tempDLeftState[2][3],
                              tempDLeftState[1][2],
                              tempDLeftState[0][1],
                            ],
                            [
                              tempDLeftState[5][3],
                              tempDLeftState[4][4],
                              tempDLeftState[3][5],
                              tempDLeftState[2][4],
                              tempDLeftState[1][3],
                            ],
                            [
                              tempDLeftState[4][5],
                              tempDLeftState[3][6],
                              tempDLeftState[2][5],
                            ],
                          ]);
                          break;
                        } //end if (allCellsAreNull)
                      } //end if (ix === iNullAfterNrToMove && jx === jNullAfterNrToMove)
                    } //end if we made a forced move with white queen for (let z = k - 1; z >= 0; z--)
                  } //end  } else { we found the number to remove
                } //end for if the queen made the forced move
              } //end if (dLeftState[i][j] === numberToMove)
              //end if we clicked on the numberToMove and then we made a correct forced move
            } //end for (let j = 0; j < dLeftState[i].length - 1; j++) inner loop
          } //end if (dLeftState[i].includes(numberToMove))
        } //end outer for check if we made the forced move backward on the right diagonal44444444444444444444444444444444444444444Newqueen
      } //if (numberToMove > 62)
    } // end  if (!whiteMove && forcedMove)

    //if we have a forced move and we click the wrong way
    if (
      forcedToCheck &&
      countAddToErase === 0 &&
      tempAddForErase.length !== 0
    ) {
      return;
    }

    //moves with out eliminating pieces from the table
    if (
      !whiteMove &&
      !isForcedMove &&
      tempAddForErase.length === 0 &&
      haveNewHistory
    ) {
      let copyLeftState = [
        [20, 24],
        [null, 16, 19, 23],
        [1, null, null, 15, 18, 22],
        [9, 5, 2, null, null, 14, 17, 21],
        [10, 6, 3, null, null, 13],
        [11, 7, 4, null],
        [12, 8],
      ];
      for (let s = 0; s < tempDLeftState.length; s++) {
        for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
          copyLeftState[s][s2] = tempDLeftState[s][s2];
        }
      }
      tempHistory.push(copyLeftState);
      setHistory(tempHistory);
    } //end if (whiteMove && !isForcedMove && tempAddForErase.length === 0)

    //erase the white pieces after finalize the forced move
    if (!whiteMove && !isForcedMove && tempAddForErase.length > 0) {
      //find the pieces for erase
      for (let i = 0; i < tempDLeftState.length; i++) {
        for (let j = 0; j < tempDLeftState[i].length; j++) {
          if (tempAddForErase.includes(tempDLeftState[i][j])) {
            tempDLeftState[i][j] = null;
          }
        }
      }
      tempHistoryState.push([
        {
          whiteMove: true,
          numberToMove: null,
          startMove: false,
          forcedMove: false,
        },
      ]);
      setHistoryState(tempHistoryState);
      setAddForErase([]);
      setDLeftState(tempDLeftState);
      let copyLeftState = [
        [20, 24],
        [null, 16, 19, 23],
        [1, null, null, 15, 18, 22],
        [9, 5, 2, null, null, 14, 17, 21],
        [10, 6, 3, null, null, 13],
        [11, 7, 4, null],
        [12, 8],
      ];
      for (let s = 0; s < tempDLeftState.length; s++) {
        for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
          copyLeftState[s][s2] = tempDLeftState[s][s2];
        }
      }
      tempHistory.push(copyLeftState);
      setHistory(tempHistory);
      setDRightState([
        [tempDLeftState[4][0], tempDLeftState[3][1], tempDLeftState[2][0]],
        [
          tempDLeftState[5][0],
          tempDLeftState[4][1],
          tempDLeftState[3][2],
          tempDLeftState[2][1],
          tempDLeftState[1][0],
        ],
        [
          tempDLeftState[6][0],
          tempDLeftState[5][1],
          tempDLeftState[4][2],
          tempDLeftState[3][3],
          tempDLeftState[2][2],
          tempDLeftState[1][1],
          tempDLeftState[0][0],
        ],
        [
          tempDLeftState[6][1],
          tempDLeftState[5][2],
          tempDLeftState[4][3],
          tempDLeftState[3][4],
          tempDLeftState[2][3],
          tempDLeftState[1][2],
          tempDLeftState[0][1],
        ],
        [
          tempDLeftState[5][3],
          tempDLeftState[4][4],
          tempDLeftState[3][5],
          tempDLeftState[2][4],
          tempDLeftState[1][3],
        ],
        [tempDLeftState[4][5], tempDLeftState[3][6], tempDLeftState[2][5]],
      ]);
      setWhiteMove(true);
      setStartMove(false);
      setNumberToMove(null);
      return;
    } // end if (whiteMove && !isForcedMove && tempAddForErase.length > 0)

    //// what is down was writhen with white forced
    //is black move and first click. This block of code don't let a white piece to be activated
    //we activate only black pieces or black queens, if click on another cell the program will just return
    if (
      (!whiteMove && dLeftState[ix][jx] > 12 && dLeftState[ix][jx] < 25) ||
      (!whiteMove && dLeftState[ix][jx] > 62)
    ) {
      setNumberToMove(dLeftState[ix][jx]);
      setStartMove(true);
      return;
    }
    //this constants will be used in several blocs
    tempDLeftState = [...dLeftState];
    tempRightState = [];
    //is black move and second click
    if (!whiteMove && startMove) {
      let iSecond;
      let jSecond;
      if (numberToMove > 12 && numberToMove < 25) {
        //search for move in leftDiagonal1111111111111111111111111111 black
        for (let i = 0; i < dLeftState.length; i++) {
          //if this is our diagonal
          if (dLeftState[i].includes(numberToMove) && !forcedMove) {
            //search in diagonal where we have out number
            for (let j = dLeftState[i].length - 1; j >= 0; j--) {
              //find the coordinates of the number to move
              if (dLeftState[i][j] === numberToMove) {
                iSecond = i;
                jSecond = j;
              }
              //if this is our number and the next number is null
              if (
                dLeftState[i][j] === numberToMove &&
                jx === j - 1 &&
                dLeftState[i][j - 1] === null &&
                i === ix
              ) {
                const tempBlackQueen = i + "-" + (j - 1);
                //the white queen appears here
                if (
                  blackQueen.includes(tempBlackQueen) &&
                  numberToMove > 12 &&
                  numberToMove < 25
                ) {
                  tempDLeftState[i][j - 1] = numberToMove + 50;
                } else {
                  tempDLeftState[i][j - 1] = numberToMove;
                }
                tempDLeftState[i][j] = null;
                tempHistoryState.push([
                  {
                    whiteMove: true,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                let copyLeftState = [
                  [20, 24],
                  [null, 16, 19, 23],
                  [1, null, null, 15, 18, 22],
                  [9, 5, 2, null, null, 14, 17, 21],
                  [10, 6, 3, null, null, 13],
                  [11, 7, 4, null],
                  [12, 8],
                ];
                for (let s = 0; s < tempDLeftState.length; s++) {
                  for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                    copyLeftState[s][s2] = tempDLeftState[s][s2];
                  }
                }
                tempHistory.push(copyLeftState);
                setHistory(tempHistory);
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setNumberToMove(null);
                setStartMove(false);
                setWhiteMove(true);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                return;
              } //end if this is our number and the next number is null
            } //end for (let j = dLeftState[i].length - 1; j >= 0; j--)
          } //end  if (dLeftState[i].includes(numberToMove) && !forcedMove)
        } //end search for move in leftDiagonal1111111111111111111111111111 black
        //if we decided to click on an another cell and move with that cell
        //if we have a forced move the numberToMove and startMove doesn't change
        if (
          (dLeftState[ix][jx] > 12 &&
            dLeftState[ix][jx] < 25 &&
            dLeftState[ix][jx] !== null) ||
          (dLeftState[ix][jx] > 62 && dLeftState[ix][jx] !== null)
        ) {
          setNumberToMove(dLeftState[ix][jx]);
          setStartMove(true);
          return;
        }
        //if the second click is on a cell that we cannot move
        const tempConvertLong = convertFromLong[ix + "-" + jx].split("-");
        const ixParsed = Number.parseInt(tempConvertLong[0]);
        const jxParsed = Number.parseInt(tempConvertLong[1]);
        if (dRightState[ixParsed][jxParsed + 1] !== numberToMove) {
          setNumberToMove(null);
          setStartMove(false);
          return;
        }
        //search for move in rightDiagonal222222222222222222222222222222 black
        for (let i = 0; i < dRightState.length; i++) {
          //if this is our diagonal
          if (dRightState[i].includes(numberToMove) && !forcedMove) {
            //search in diagonal where we have out number
            for (let j = dRightState[i].length - 1; j > 0; j--) {
              //if this is our number and the next number is null
              //we make the move
              if (
                dRightState[i][j] === numberToMove &&
                dRightState[i][j - 1] === null
              ) {
                //the next move on the right diagonal
                const tempConvert = convertFromShort[i + "-" + (j - 1)].split(
                  "-"
                );
                const iParsed = Number.parseInt(tempConvert[0]);
                const jParsed = Number.parseInt(tempConvert[1]);
                tempDLeftState[iParsed][jParsed] = numberToMove;
                const tempBlackQueen = iParsed + "-" + jParsed;
                //the white queen appears here
                if (
                  blackQueen.includes(tempBlackQueen) &&
                  numberToMove > 12 &&
                  numberToMove < 25
                ) {
                  tempDLeftState[iParsed][jParsed] = numberToMove + 50;
                } else {
                  tempDLeftState[iParsed][jParsed] = numberToMove;
                }
                tempDLeftState[iSecond][jSecond] = null;
                tempHistoryState.push([
                  {
                    whiteMove: true,
                    numberToMove: null,
                    startMove: false,
                    forcedMove: false,
                  },
                ]);
                setHistoryState(tempHistoryState);
                setDLeftState(tempDLeftState);
                haveNewHistory = true;
                let copyLeftState = [
                  [20, 24],
                  [null, 16, 19, 23],
                  [1, null, null, 15, 18, 22],
                  [9, 5, 2, null, null, 14, 17, 21],
                  [10, 6, 3, null, null, 13],
                  [11, 7, 4, null],
                  [12, 8],
                ];
                for (let s = 0; s < tempDLeftState.length; s++) {
                  for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                    copyLeftState[s][s2] = tempDLeftState[s][s2];
                  }
                }
                tempHistory.push(copyLeftState);
                setHistory(tempHistory);
                tempAddForEraseHistory.push([...tempAddForErase]);
                setAddForEraseHistory(tempAddForEraseHistory);
                setNumberToMove(null);
                setStartMove(false);
                setWhiteMove(true);
                setDRightState([
                  [
                    tempDLeftState[4][0],
                    tempDLeftState[3][1],
                    tempDLeftState[2][0],
                  ],
                  [
                    tempDLeftState[5][0],
                    tempDLeftState[4][1],
                    tempDLeftState[3][2],
                    tempDLeftState[2][1],
                    tempDLeftState[1][0],
                  ],
                  [
                    tempDLeftState[6][0],
                    tempDLeftState[5][1],
                    tempDLeftState[4][2],
                    tempDLeftState[3][3],
                    tempDLeftState[2][2],
                    tempDLeftState[1][1],
                    tempDLeftState[0][0],
                  ],
                  [
                    tempDLeftState[6][1],
                    tempDLeftState[5][2],
                    tempDLeftState[4][3],
                    tempDLeftState[3][4],
                    tempDLeftState[2][3],
                    tempDLeftState[1][2],
                    tempDLeftState[0][1],
                  ],
                  [
                    tempDLeftState[5][3],
                    tempDLeftState[4][4],
                    tempDLeftState[3][5],
                    tempDLeftState[2][4],
                    tempDLeftState[1][3],
                  ],
                  [
                    tempDLeftState[4][5],
                    tempDLeftState[3][6],
                    tempDLeftState[2][5],
                  ],
                ]);
                return;
              } //end if this is our number and the next number is null
            } // end for (let j = dRightState[i].length - 1; j > 0; j--)
          } // end  if (dRightState[i].includes(numberToMove) && !forcedMove)
        } //end search for move in rightDiagonal222222222222222222222222222222 black
      } //end if (numberToMove > 12 && numberToMove < 25)
      if (numberToMove > 62) {
        //if the move was made forward or backward with the queen in leftDiagonal1111111111111111111112222222222222222222222queen
        for (let i = 0; i < dLeftState.length; i++) {
          //if this is our diagonal
          if (dLeftState[i].includes(numberToMove) && !forcedMove) {
            //if the move was made on the same diagonal where the queen is
            if (i === ix) {
              for (let j = 0; j < dLeftState[i].length; j++) {
                //find the coordinates of the number to move
                if (dLeftState[i][j] === numberToMove) {
                  //if click twice on the same queen
                  if (i === ix && j === jx) {
                    return;
                  }
                  iSecond = i;
                  jSecond = j;
                  let onlyNullCells = true;
                  //if the move was made forward
                  if (j > jx) {
                    //loop forward to see if we have only null cells between the numberToMove and the new move
                    for (let z = jx - 1; z > j; z--) {
                      //check for null cells
                      if (dRightState[i][z] !== null) {
                        onlyNullCells = false;
                        return;
                      } //end check for null cells
                    } //end loop backward to see if we have only null cells between the numberToMove and the new move
                  } //end if the move was made forward
                  //if the move was made backward
                  if (j < jx) {
                    //loop backward to see if we have only null cells between the numberToMove and the new move
                    for (let z = jx + 1; z < j; z++) {
                      //check for null cells
                      if (dRightState[i][z] !== null) {
                        onlyNullCells = false;
                        return;
                      } //end check for null cells
                    } //end loop backward to see if we have only null cells between the numberToMove and the new move
                  } // end if the move was made forward
                  //the move with the queen is possible
                  if (onlyNullCells && i === ix) {
                    tempDLeftState[ix][jx] = numberToMove;
                    tempDLeftState[iSecond][jSecond] = null;
                    tempHistoryState.push([
                      {
                        whiteMove: true,
                        numberToMove: null,
                        startMove: false,
                        forcedMove: false,
                      },
                    ]);
                    setHistoryState(tempHistoryState);
                    haveNewHistory = true;
                    let copyLeftState = [
                      [20, 24],
                      [null, 16, 19, 23],
                      [1, null, null, 15, 18, 22],
                      [9, 5, 2, null, null, 14, 17, 21],
                      [10, 6, 3, null, null, 13],
                      [11, 7, 4, null],
                      [12, 8],
                    ];
                    for (let s = 0; s < tempDLeftState.length; s++) {
                      for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                        copyLeftState[s][s2] = tempDLeftState[s][s2];
                      }
                    }
                    tempHistory.push(copyLeftState);
                    setHistory(tempHistory);
                    tempAddForEraseHistory.push([...tempAddForErase]);
                    setAddForEraseHistory(tempAddForEraseHistory);
                    setNumberToMove(null);
                    setStartMove(false);
                    setWhiteMove(true);
                    setDRightState([
                      [
                        tempDLeftState[4][0],
                        tempDLeftState[3][1],
                        tempDLeftState[2][0],
                      ],
                      [
                        tempDLeftState[5][0],
                        tempDLeftState[4][1],
                        tempDLeftState[3][2],
                        tempDLeftState[2][1],
                        tempDLeftState[1][0],
                      ],
                      [
                        tempDLeftState[6][0],
                        tempDLeftState[5][1],
                        tempDLeftState[4][2],
                        tempDLeftState[3][3],
                        tempDLeftState[2][2],
                        tempDLeftState[1][1],
                        tempDLeftState[0][0],
                      ],
                      [
                        tempDLeftState[6][1],
                        tempDLeftState[5][2],
                        tempDLeftState[4][3],
                        tempDLeftState[3][4],
                        tempDLeftState[2][3],
                        tempDLeftState[1][2],
                        tempDLeftState[0][1],
                      ],
                      [
                        tempDLeftState[5][3],
                        tempDLeftState[4][4],
                        tempDLeftState[3][5],
                        tempDLeftState[2][4],
                        tempDLeftState[1][3],
                      ],
                      [
                        tempDLeftState[4][5],
                        tempDLeftState[3][6],
                        tempDLeftState[2][5],
                      ],
                    ]);
                    return;
                  } //end if the move with the queen is possible
                } //end if we have found the numberToMove
              } //end for the diagonal where is number to move
            } //end  if (i === ix) if the move is made on the same diagonal
          } // if (dLeftState[i].includes(numberToMove) && !forcedMove) if this diagonal has the number to move
        } ////end for if the move was made forward with the queen in leftDiagonal1111111111111111222222222222222queen
        //if the move was made forward or backward with the queen in rightDiagonal333333333333333333444444444444queen
        for (let i = 0; i < dRightState.length; i++) {
          //if this is our diagonal
          if (dRightState[i].includes(numberToMove) && !forcedMove) {
            //if the move was made on the same diagonal where the queen is
            for (let j = 0; j < dRightState[i].length; j++) {
              //find the coordinates of the number to move
              if (dRightState[i][j] === numberToMove) {
                //the purpose is to find out the value of the i in leftDiagonal
                const tempConvert = convertFromShort[i + "-" + j].split("-");
                const iLeft = Number.parseInt(tempConvert[0]);
                const jLeft = Number.parseInt(tempConvert[1]);
                //the purpose is to find out for jx in the rightDiagonal
                const tempConvert2 = convertFromLong[ix + "-" + jx].split("-");
                const ixRight = Number.parseInt(tempConvert2[0]);
                const jxRight = Number.parseInt(tempConvert2[1]);
                //coordinates of the numberToMove
                iSecond = iLeft;
                jSecond = jLeft;
                let onlyNullCells = true;
                //if the move was made forward
                if (j > jxRight) {
                  //loop backward to see if we have only null cells between the numberToMove and the new move
                  for (let z = jxRight; z < j; z++) {
                    //check for null cells
                    if (dRightState[i][z] !== null) {
                      onlyNullCells = false;
                      return;
                    } //end check for null cells
                  } //end loop backward to see if we have only null cells between the numberToMove and the new move
                } //end if the move was made forward
                //if the move was made backward
                if (j < jxRight) {
                  //loop backward to see if we have only null cells between the numberToMove and the new move
                  for (let z = jxRight; z > j; z--) {
                    //check for null cells
                    if (dRightState[i][z] !== null) {
                      onlyNullCells = false;
                      return;
                    } //end check for null cells
                  } //end loop backward to see if we have only null cells between the numberToMove and the new move
                } // end if the move was made forward
                //the move with the queen is possible
                if (onlyNullCells && ixRight === i) {
                  tempDLeftState[ix][jx] = numberToMove;
                  tempDLeftState[iSecond][jSecond] = null;
                  tempHistoryState.push([
                    {
                      whiteMove: true,
                      numberToMove: null,
                      startMove: false,
                      forcedMove: false,
                    },
                  ]);
                  setHistoryState(tempHistoryState);
                  setDLeftState(tempDLeftState);
                  haveNewHistory = true;
                  let copyLeftState = [
                    [20, 24],
                    [null, 16, 19, 23],
                    [1, null, null, 15, 18, 22],
                    [9, 5, 2, null, null, 14, 17, 21],
                    [10, 6, 3, null, null, 13],
                    [11, 7, 4, null],
                    [12, 8],
                  ];
                  for (let s = 0; s < tempDLeftState.length; s++) {
                    for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
                      copyLeftState[s][s2] = tempDLeftState[s][s2];
                    }
                  }
                  tempHistory.push(copyLeftState);
                  setHistory(tempHistory);
                  tempAddForEraseHistory.push([...tempAddForErase]);
                  setAddForEraseHistory(tempAddForEraseHistory);
                  setNumberToMove(null);
                  setStartMove(false);
                  setWhiteMove(true);
                  setDRightState([
                    [
                      tempDLeftState[4][0],
                      tempDLeftState[3][1],
                      tempDLeftState[2][0],
                    ],
                    [
                      tempDLeftState[5][0],
                      tempDLeftState[4][1],
                      tempDLeftState[3][2],
                      tempDLeftState[2][1],
                      tempDLeftState[1][0],
                    ],
                    [
                      tempDLeftState[6][0],
                      tempDLeftState[5][1],
                      tempDLeftState[4][2],
                      tempDLeftState[3][3],
                      tempDLeftState[2][2],
                      tempDLeftState[1][1],
                      tempDLeftState[0][0],
                    ],
                    [
                      tempDLeftState[6][1],
                      tempDLeftState[5][2],
                      tempDLeftState[4][3],
                      tempDLeftState[3][4],
                      tempDLeftState[2][3],
                      tempDLeftState[1][2],
                      tempDLeftState[0][1],
                    ],
                    [
                      tempDLeftState[5][3],
                      tempDLeftState[4][4],
                      tempDLeftState[3][5],
                      tempDLeftState[2][4],
                      tempDLeftState[1][3],
                    ],
                    [
                      tempDLeftState[4][5],
                      tempDLeftState[3][6],
                      tempDLeftState[2][5],
                    ],
                  ]);
                  return;
                } //end if the move with the queen is possible
              } //end if we have found the numberToMove
            } //end for the diagonal where is number to move
          } // if (dLeftState[i].includes(numberToMove) && !forcedMove) if this diagonal has the number to move
        } ////end for if the move was made forward with the queen in rightDiagonal333333333333344444444444queen

        //if we decided to click on an another cell that has black piece and move with that cell
        //when we have a forced move numberToMove and startMove doesn't change
        if (
          (dLeftState[ix][jx] > 0 && dLeftState[ix][jx] < 13) ||
          dLeftState[ix][jx] > 62
        ) {
          setNumberToMove(dLeftState[ix][jx]);
          setStartMove(true);
          return;
        }
      } //end if (numberToMove > 62)
    } // end if (!whiteMove && startMove)
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        className="margin-table"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(0, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[0][1]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(1, 3)}
          variant="contained"
          className="xo-font"
        >
          {table[1][3]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(2, 5)}
          variant="contained"
          className="xo-font"
        >
          {table[2][5]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 7)}
          variant="contained"
          className="xo-font"
        >
          {table[3][7]}
        </Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          onClick={() => handleClick(0, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[0][0]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(1, 2)}
          variant="contained"
          className="xo-font"
        >
          {table[1][2]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(2, 4)}
          variant="contained"
          className="xo-font"
        >
          {table[2][4]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 6)}
          variant="contained"
          className="xo-font"
        >
          {table[3][6]}
        </Button>
        <Button className="xo-font"></Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(1, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[1][1]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(2, 3)}
          variant="contained"
          className="xo-font"
        >
          {table[2][3]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 5)}
          variant="contained"
          className="xo-font"
        >
          {table[3][5]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(4, 5)}
          variant="contained"
          className="xo-font"
        >
          {table[4][5]}
        </Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          onClick={() => handleClick(1, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[1][0]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(2, 2)}
          variant="contained"
          className="xo-font"
        >
          {table[2][2]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 4)}
          variant="contained"
          className="xo-font"
        >
          {table[3][4]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(4, 4)}
          variant="contained"
          className="xo-font"
        >
          {table[4][4]}
        </Button>
        <Button className="xo-font"></Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(2, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[2][1]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 3)}
          variant="contained"
          className="xo-font"
        >
          {table[3][3]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(4, 3)}
          variant="contained"
          className="xo-font"
        >
          {table[4][3]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(5, 3)}
          variant="contained"
          className="xo-font"
        >
          {table[5][3]}
        </Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          onClick={() => handleClick(2, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[2][0]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 2)}
          variant="contained"
          className="xo-font"
        >
          {table[3][2]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(4, 2)}
          variant="contained"
          className="xo-font"
        >
          {table[4][2]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(5, 2)}
          variant="contained"
          className="xo-font"
        >
          {table[5][2]}
        </Button>
        <Button className="xo-font"></Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(3, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[3][1]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(4, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[4][1]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(5, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[5][1]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(6, 1)}
          variant="contained"
          className="xo-font"
        >
          {table[6][1]}
        </Button>
      </ButtonGroup>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          onClick={() => handleClick(3, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[3][0]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(4, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[4][0]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(5, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[5][0]}
        </Button>
        <Button className="xo-font"></Button>
        <Button
          onClick={() => handleClick(6, 0)}
          variant="contained"
          className="xo-font"
        >
          {table[6][0]}
        </Button>
        <Button className="xo-font"></Button>
      </ButtonGroup>
    </div>
  );
};
