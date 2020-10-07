import React, { useState, useContext } from "react";
import { GeneralContext } from "./context/generalContext";
import LensIcon from "@material-ui/icons/Lens";
import Brightness1Icon from "@material-ui/icons/Brightness1";

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

const dLeft = [
  [20, 24],
  [null, 16, 19, 23],
  [1, null, null, 15, 18, 22],
  [9, 5, 2, null, null, 14, 17, 21],
  [10, 6, 3, null, null, 13],
  [11, 7, 4, null],
  [12, 8],
];

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

export const Table = () => {
  const [dLeftState, setDLeftState] = useState(dLeft);
  const [dRightState, setDRightState] = useState(dRight);
  const [addForErase, setAddForErase] = useState([]);
  const [addForEraseBlack, setAddForEraseBlack] = useState([]);
  //if we must move this pice
  const classes = useStyles();
  const {
    setWhiteMove,
    numberToMove,
    setNumberToMove,
    whiteMove,
    startMove,
    setStartMove,
    forcedMove,
    setForcedMove,
  } = useContext(GeneralContext);

  const table = [];
  for (let i = 0; i < dLeftState.length; i++) {
    const row = [];
    for (let j = 0; j < dLeftState[i].length; j++) {
      if (dLeftState[i][j] === null) {
        row.push(null);
        continue;
      }
      if (dLeftState[i][j] < 13) {
        row.push(<Brightness1Icon fontSize="large" color="action" />);
      }
      if (dLeftState[i][j] > 12) {
        row.push(<LensIcon fontSize="large" />);
      }
    }
    table.push(row);
  }

  const handleClick = (ix, jx) => {
    //white 000000000000000000000000000000000000000
    //is white move and first click

    if (whiteMove) {
      //if first move and click on a null cell just return
      if (!startMove && dLeftState[ix][jx] === null) {return}
      // if (whiteMove && !startMove) {
      //search to find out if we have a forced move forward with white pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = 0; j < dLeftState[i].length - 2; j++) {
          if (
            !addForErase.includes(dLeftState[i][j + 1]) &&
            dLeftState[i][j] !== null &&
            dLeftState[i][j] < 13 &&
            dLeftState[i][j + 1] > 12 &&
            dLeftState[i][j + 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal forward
      //search to find out if we have a forced move backward with white pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = dLeftState[i].length - 1; j > 1; j--) {
          if (
            !addForErase.includes(dLeftState[i][j - 1]) &&
            dLeftState[i][j] !== null && //null is < 13
            dLeftState[i][j] < 13 &&
            dLeftState[i][j - 1] > 12 &&
            dLeftState[i][j - 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal backward
      //search to find out if we have a forced move in front with white pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = 0; j < dRightState[i].length - 2; j++) {
          if (
            !addForErase.includes(dRightState[i][j + 1]) &&
            dRightState[i][j] !== null && //null is < 13
            dRightState[i][j] < 13 &&
            dRightState[i][j + 1] > 12 &&
            dRightState[i][j + 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal forward
      //search to find out if we have a forced move backward with white pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = dRightState[i].length - 1; j > 1; j--) {
          if (
            !addForErase.includes(dRightState[i][j - 1]) &&
            dRightState[i][j] !== null && //null is < 13
            dRightState[i][j] < 13 &&
            dRightState[i][j - 1] > 12 &&
            dRightState[i][j - 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal backward
    } //end if first move

    //set what number we will move if white move
    if (
      whiteMove &&
      !startMove &&
      dLeftState[ix][jx] < 13 &&
      dLeftState[ix][jx] !== null
    ) {
      setNumberToMove(dLeftState[ix][jx]);
      setStartMove(true);
      return;
    }

    //this constants will be used in several blocs
    let tempDLeftState = dLeftState;
    let tempRightState = [];
    let isForcedMove = false;
    let tempAddForErase = addForErase;
    let countAddToErase = 0;
    let forcedToCheck = forcedMove;
    //if forced move and second click
    if (forcedMove && whiteMove) {
      //this is the cell where numberToMove is located
      let iSecond;
      let jSecond;
      //check if we made the forced move forward on the left diagonal111111111111111111111111111111111111111111111111111111111111111
      for (let i = 0; i < dLeftState.length; i++) {
        if (dLeftState[i].includes(numberToMove)) {
          for (let j = 0; j < dLeftState[i].length - 1; j++) {
            //find the coordinates of the number to move
            if (dLeftState[i][j] === numberToMove) {
              iSecond = i;
              jSecond = j;
            }
            if (
              dLeftState[i][j] === numberToMove &&
              jx === j + 2 && //we made the click after one cell
              dLeftState[i][j + 2] === null &&
              i === ix //if the move is on the same diagonal
            ) {
              tempDLeftState[i][j + 2] = numberToMove;
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
                    !tempAddForErase.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j + 1] > 12 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with white pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j - 1] > 12 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move in front with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j + 1] > 12 &&
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j - 1] > 12 &&
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward

              ///////////////////check forced Move end

              setAddForErase(tempAddForErase);
              setDLeftState(tempDLeftState);
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

              // return;
            }
          }
        }
      } //end check if we made the forced move forward on the left diagonal111111111111111111111111111111111111111111111111111111111

      // //this is the cell where numberToMove is located
      // let iSecond;
      // let jSecond;
      //check if we made the forced move backward on the left diagonal22222222222222222222222222222222222222222222222222222222222222222
      for (let i = 0; i < dLeftState.length; i++) {
        if (dLeftState[i].includes(numberToMove)) {
          for (let j = dLeftState[i].length - 1; j >= 0; j--) {
            // //find the coordinates of the number to move
            if (dLeftState[i][j] === numberToMove) {
              iSecond = i;
              jSecond = j;
            }
            if (
              dLeftState[i][j] === numberToMove &&
              jx === j - 2 && //we made the click after one cell
              dLeftState[i][j - 2] === null &&
              i === ix //if the move is on the same diagonal
            ) {
              tempDLeftState[i][j - 2] = numberToMove;
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
                    !tempAddForErase.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j + 1] > 12 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with white pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j - 1] > 12 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move in front with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j + 1] > 12 &&
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j - 1] > 12 &&
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward

              ///////////////////check forced Move end

              setAddForErase(tempAddForErase);
              setDLeftState(tempDLeftState);
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
            } // end if we made a forced move
          } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
        } // end if (dLeftState[i].includes(numberToMove))
      } //end check if we made the forced move backward on the left diagonal2222222222222222222222222222222222222222222222222222222

      //check if we made the forced move forward on the right diagonal333333333333333333333333333333333333333333333333333333333333333
      for (let i = 0; i < dRightState.length; i++) {
        if (dRightState[i].includes(numberToMove)) {
          for (let j = 0; j < dRightState[i].length - 2; j++) {
            //
            //convert from rightDiagonal to leftLeftDiagonal
            const tempConvert = convertFromShort[i + "-" + (j + 2)].split("-");
            const tempConvertErase = convertFromShort[i + "-" + (j + 1)].split(
              "-"
            );
            const iParsed = Number.parseInt(tempConvert[0]);
            const jParsed = Number.parseInt(tempConvert[1]);
            const iParsedErase = Number.parseInt(tempConvertErase[0]);
            const jParsedErase = Number.parseInt(tempConvertErase[1]);

            //
            if (
              dRightState[i][j] === numberToMove &&
              dRightState[i][j + 2] === null &&
              ix === iParsed &&
              jx === jParsed
            ) {
              countAddToErase++;
              tempDLeftState[iParsed][jParsed] = numberToMove;
              tempAddForErase.push(tempDLeftState[iParsedErase][jParsedErase]);
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
                    !tempAddForErase.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j + 1] > 12 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with white pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j - 1] > 12 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move in front with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j + 1] > 12 &&
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j - 1] > 12 &&
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward

              ///////////////////check forced Move end

              setAddForErase(tempAddForErase);
              setDLeftState(tempDLeftState);
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

              // return;
            } // end if we made a forced move333333
          } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
        } // end if (dLeftState[i].includes(numberToMove)
      } //end for check if we made the forced move forward on the right diagonal3333333333333333333333333333333333333333333333333333333333

      //check if we made the forced move backward on the right diagonal4444444444444444444444444444444444444444444444444444444444444444444
      for (let i = 0; i < dRightState.length; i++) {
        if (dRightState[i].includes(numberToMove)) {
          for (let j = dRightState[i].length - 1; j > 1; j--) {
            //
            //convert from rightDiagonal to leftLeftDiagonal
            const tempConvert = convertFromShort[i + "-" + (j - 2)].split("-");
            const tempConvertErase = convertFromShort[i + "-" + (j - 1)].split(
              "-"
            );
            const iParsed = Number.parseInt(tempConvert[0]);
            const jParsed = Number.parseInt(tempConvert[1]);
            const iParsedErase = Number.parseInt(tempConvertErase[0]);
            const jParsedErase = Number.parseInt(tempConvertErase[1]);

            //
            if (
              dRightState[i][j] === numberToMove &&
              dRightState[i][j - 2] === null &&
              ix === iParsed &&
              jx === jParsed
            ) {
              countAddToErase++;
              tempDLeftState[iParsed][jParsed] = numberToMove;
              tempAddForErase.push(tempDLeftState[iParsedErase][jParsedErase]);
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
                    !tempAddForErase.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j + 1] > 12 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with white pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = tempDLeftState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] < 13 &&
                    tempDLeftState[i][j - 1] > 12 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move in front with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j + 1] > 12 &&
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !tempAddForErase.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] < 13 &&
                    tempRightState[i][j - 1] > 12 &&
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward

              ///////////////////check forced Move end

              setAddForErase(tempAddForErase);
              setDLeftState(tempDLeftState);
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

              // return;
            } // end if we made a forced move333333
          } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
        } // end if (dLeftState[i].includes(numberToMove)
      } //end for check if we made the forced move backward on the right diagonal444444444444444444444444444444444444444444444444444444
    } //end if (forcedMove && whiteMove)

    //if we have a forced move and we click the wrong way
    if (
      forcedToCheck &&
      countAddToErase === 0 &&
      tempAddForErase.length !== 0
    ) {
      return;
    }

    //erase the pieces from the table leftDiagonal forward
    //erase teh white pieces after finalize the forced move
    if (whiteMove && !isForcedMove && tempAddForErase.length > 0) {
      //find the pieces for erase
      for (let i = 0; i < tempDLeftState.length; i++) {
        for (let j = 0; j < tempDLeftState[i].length; j++) {
          if (tempAddForErase.includes(tempDLeftState[i][j])) {
            tempDLeftState[i][j] = null;
          }
        }
      }
      setAddForErase([]);
      setDLeftState(tempDLeftState);
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
    } // end if (whiteMove && !isForcedMove && tempAddForErase.length > 0)

    //is white move and second click
    //method whiteFinalizeTheMove() //second or more times

    if (whiteMove && startMove) {
      //this is the cell where numberToMove is located
      let iSecond;
      let jSecond;
      //\\\search for move in leftDiagonal1111111111111111111111111111
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
              tempDLeftState[i][j + 1] = numberToMove;
              tempDLeftState[i][j] = null;
              setDLeftState(tempDLeftState);
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
      //method moveWithOtherPiece()
      if (dLeftState[ix][jx] < 13 && dLeftState[ix][jx] !== null) {
        setNumberToMove(dLeftState[ix][jx]);
        setStartMove(true);
        return;
      }
      //if the second click is on a cell that we cannot move
      //method moveWithImpossibleMove()
      const tempConvertLong = convertFromLong[ix + "-" + jx].split("-");
      const ixParsed = Number.parseInt(tempConvertLong[0]);
      const jxParsed = Number.parseInt(tempConvertLong[1]);
      if (dRightState[ixParsed][jxParsed - 1] !== numberToMove) {
        setNumberToMove(null);
        setStartMove(false);
        return;
      }
      //search for move in rightDiagonal222222222222222222222222222222
      //method rightDiagonal() move
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
              // const tempDLeftState = dLeftState;
              tempDLeftState[iParsed][jParsed] = numberToMove;
              tempDLeftState[iSecond][jSecond] = null;
              setDLeftState(tempDLeftState);
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
            }
          }
        }
      } //for on left diagonal
    }

    // setAddForErase([]);
    //black 000000000000000000000000000000000000000 black
    //find if black pieces have a forced move
    if (!whiteMove) {
      // if (!whiteMove && !startMove) {
      //search to find out if we have a forced move forward with white pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = dLeftState[i].length - 1; j > 1; j--) {
          if (
            !addForErase.includes(dLeftState[i][j - 1]) &&
            dLeftState[i][j] !== null && //null is < 13
            dLeftState[i][j] > 12 &&
            dLeftState[i][j - 1] !== null &&
            dLeftState[i][j - 1] < 13 &&
            dLeftState[i][j - 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal forward
      //search to find out if we have a forced move backward with white pieces leftDiagonal
      for (let i = 0; i < dLeftState.length; i++) {
        for (let j = 0; j < dLeftState[i].length - 2; j++) {
          if (
            !addForErase.includes(dLeftState[i][j + 1]) &&
            dLeftState[i][j] !== null &&
            dLeftState[i][j] > 12 &&
            dLeftState[i][j + 1] !== null &&
            dLeftState[i][j + 1] < 13 &&
            dLeftState[i][j + 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //leftDiagonal backward
      //search to find out if we have a forced move forward with white pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = dRightState[i].length - 1; j > 1; j--) {
          if (
            !addForErase.includes(dRightState[i][j - 1]) &&
            dRightState[i][j] !== null && //null is < 13
            dRightState[i][j] > 12 &&
            dRightState[i][j - 1] !== null &&
            dRightState[i][j - 1] < 13 &&
            dRightState[i][j - 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal forward
      //search to find out if we have a forced move backward with white pieces on the rightDiagonal
      for (let i = 0; i < dRightState.length; i++) {
        for (let j = 0; j < dRightState[i].length - 2; j++) {
          if (
            !addForErase.includes(dRightState[i][j + 1]) &&
            dRightState[i][j] !== null && //null is < 13
            dRightState[i][j] > 12 &&
            dRightState[i][j + 1] !== null &&
            dRightState[i][j + 1] < 13 &&
            dRightState[i][j + 2] === null
          ) {
            setForcedMove(true);
          }
        }
      } //rightDiagonal backward
    } // end if (!whiteMove && !startMove) {

    // what is up was writhen with white forced
    //this constants will be used in several blocs
    tempDLeftState = dLeftState;
    tempRightState = [];
    isForcedMove = false;
    let tempAddForEraseBlack = addForEraseBlack;
    countAddToErase = 0;
    forcedToCheck = forcedMove;
    //what to do if black move and forced move
    if (!whiteMove && forcedMove) {
      //this is the cell where numberToMove is located
      let iSecond;
      let jSecond;
      //check if we made the forced move forward on the left diagonal111111111111111111111111111111111111111111111111
      for (let i = 0; i < dLeftState.length; i++) {
        if (dLeftState[i].includes(numberToMove)) {
          for (let j = 0; j < dLeftState[i].length - 1; j++) {
            //find the coordinates of the number to move
            if (dLeftState[i][j] === numberToMove) {
              iSecond = i;
              jSecond = j;
            }
            if (
              dLeftState[i][j] === numberToMove &&
              jx === j + 2 && //we made the click after one cell
              dLeftState[i][j + 2] === null &&
              i === ix //if the move is on the same diagonal
            ) {
              tempDLeftState[i][j + 2] = numberToMove;
              tempDLeftState[i][j] = null;
              countAddToErase++;
              tempAddForEraseBlack.push(tempDLeftState[i][j + 1]);
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
                    !addForEraseBlack.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] > 12 &&
                    tempDLeftState[i][j - 1] !== null &&
                    tempDLeftState[i][j - 1] < 13 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with black pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] > 12 && //black piece
                    tempDLeftState[i][j + 1] !== null &&
                    tempDLeftState[i][j + 1] < 13 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move forward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j - 1] !== null &&
                    tempRightState[i][j - 1] < 13 && //white piece
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j + 1] !== null &&
                    tempRightState[i][j + 1] < 13 && //white piece
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward
              ///////////////////check forced Move end

              setAddForEraseBlack(tempAddForEraseBlack);
              setDLeftState(tempDLeftState);
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
            } //end if we forced a piece on the leftDiagonal forward
          } //end inner loop were we have the numberToMove
        } // end  if (dLeftState[i].includes(numberToMove))
      } //end check if we made the forced move forward on the left diagonal111111111111111111111111111111111111111111111

      //check if we made the forced move backward on the left diagonal22222222222222222222222222222222222222222222222222
      for (let i = 0; i < dLeftState.length; i++) {
        if (dLeftState[i].includes(numberToMove)) {
          for (let j = dLeftState[i].length - 1; j >= 0; j--) {
            // //find the coordinates of the number to move
            if (dLeftState[i][j] === numberToMove) {
              iSecond = i;
              jSecond = j;
            }
            if (
              dLeftState[i][j] === numberToMove &&
              jx === j - 2 && //we made the click after one cell
              dLeftState[i][j - 2] === null &&
              i === ix //if the move is on the same diagonal
            ) {
              tempDLeftState[i][j - 2] = numberToMove;
              tempDLeftState[i][j] = null;
              countAddToErase++;
              tempAddForEraseBlack.push(tempDLeftState[i][j - 1]);
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
                    !addForEraseBlack.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] > 12 &&
                    tempDLeftState[i][j - 1] !== null &&
                    tempDLeftState[i][j - 1] < 13 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with black pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] > 12 && //black piece
                    tempDLeftState[i][j + 1] !== null &&
                    tempDLeftState[i][j + 1] < 13 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move forward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j - 1] !== null &&
                    tempRightState[i][j - 1] < 13 && //white piece
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j + 1] !== null &&
                    tempRightState[i][j + 1] < 13 && //white piece
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward
              ///////////////////check forced Move end

              setAddForEraseBlack(tempAddForEraseBlack);
              setDLeftState(tempDLeftState);
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
            const tempConvert = convertFromShort[i + "-" + (j + 2)].split("-");
            const tempConvertErase = convertFromShort[i + "-" + (j + 1)].split(
              "-"
            );
            const iParsed = Number.parseInt(tempConvert[0]);
            const jParsed = Number.parseInt(tempConvert[1]);
            const iParsedErase = Number.parseInt(tempConvertErase[0]);
            const jParsedErase = Number.parseInt(tempConvertErase[1]);

            //
            if (
              dRightState[i][j] === numberToMove &&
              dRightState[i][j + 2] === null &&
              ix === iParsed &&
              jx === jParsed
            ) {
              countAddToErase++;
              tempDLeftState[iParsed][jParsed] = numberToMove;
              tempAddForEraseBlack.push(
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
                    !addForEraseBlack.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] > 12 &&
                    tempDLeftState[i][j - 1] !== null &&
                    tempDLeftState[i][j - 1] < 13 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with black pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] > 12 && //black piece
                    tempDLeftState[i][j + 1] !== null &&
                    tempDLeftState[i][j + 1] < 13 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move forward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j - 1] !== null &&
                    tempRightState[i][j - 1] < 13 && //white piece
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j + 1] !== null &&
                    tempRightState[i][j + 1] < 13 && //white piece
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward
              ///////////////////check forced Move end

              setAddForEraseBlack(tempAddForEraseBlack);
              setDLeftState(tempDLeftState);
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
            const tempConvert = convertFromShort[i + "-" + (j - 2)].split("-");
            const tempConvertErase = convertFromShort[i + "-" + (j - 1)].split(
              "-"
            );
            const iParsed = Number.parseInt(tempConvert[0]);
            const jParsed = Number.parseInt(tempConvert[1]);
            const iParsedErase = Number.parseInt(tempConvertErase[0]);
            const jParsedErase = Number.parseInt(tempConvertErase[1]);

            //
            if (
              dRightState[i][j] === numberToMove &&
              dRightState[i][j - 2] === null &&
              ix === iParsed &&
              jx === jParsed
            ) {
              countAddToErase++;
              tempDLeftState[iParsed][jParsed] = numberToMove;
              tempAddForEraseBlack.push(
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
                    !addForEraseBlack.includes(tempDLeftState[i][j - 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null && //null is < 13
                    tempDLeftState[i][j] > 12 &&
                    tempDLeftState[i][j - 1] !== null &&
                    tempDLeftState[i][j - 1] < 13 &&
                    tempDLeftState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal forward
              //search to find out if we have a forced move backward with black pieces leftDiagonal
              for (let i = 0; i < tempDLeftState.length; i++) {
                for (let j = 0; j < tempDLeftState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempDLeftState[i][j + 1]) &&
                    tempDLeftState[i][j] === numberToMove &&
                    tempDLeftState[i][j] !== null &&
                    tempDLeftState[i][j] > 12 && //black piece
                    tempDLeftState[i][j + 1] !== null &&
                    tempDLeftState[i][j + 1] < 13 &&
                    tempDLeftState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //leftDiagonal backward
              //search to find out if we have a forced move forward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = tempRightState[i].length - 1; j > 1; j--) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j - 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j - 1] !== null &&
                    tempRightState[i][j - 1] < 13 && //white piece
                    tempRightState[i][j - 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal forward
              //search to find out if we have a forced move backward with white pieces on the rightDiagonal
              for (let i = 0; i < tempRightState.length; i++) {
                for (let j = 0; j < tempRightState[i].length - 2; j++) {
                  if (
                    !addForEraseBlack.includes(tempRightState[i][j + 1]) &&
                    tempRightState[i][j] === numberToMove &&
                    tempRightState[i][j] !== null && //null is < 13
                    tempRightState[i][j] > 12 && //black piece
                    tempRightState[i][j + 1] !== null &&
                    tempRightState[i][j + 1] < 13 && //white piece
                    tempRightState[i][j + 2] === null
                  ) {
                    isForcedMove = true;
                  }
                }
              } //rightDiagonal backward
              ///////////////////check forced Move end

              setAddForEraseBlack(tempAddForEraseBlack);
              setDLeftState(tempDLeftState);
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

              // return;
            } // end if we made a forced move333333
          } //end inner loop for (let j = dLeftState[i].length - 1; j > 1; j--)
        } // end if (dLeftState[i].includes(numberToMove)
      } //end for check if we made the forced move backward on the right diagonal44444444444444444444444444444444444444444444444444444
    } // end  if (!whiteMove && forcedMove)

    //if we have a forced move and we click the wrong way
    if (
      forcedToCheck &&
      countAddToErase === 0 &&
      tempAddForEraseBlack.length !== 0
    ) {
      return;
    }

    //erase the black pieces after finalize the forced move
    if (!whiteMove && !isForcedMove && tempAddForEraseBlack.length > 0) {
      //find the pieces for erase
      for (let i = 0; i < tempDLeftState.length; i++) {
        for (let j = 0; j < tempDLeftState[i].length; j++) {
          if (tempAddForEraseBlack.includes(tempDLeftState[i][j])) {
            tempDLeftState[i][j] = null;
          }
        }
      }
      setAddForEraseBlack([]);
      setDLeftState(tempDLeftState);
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
    } // end if (whiteMove && !isForcedMove && tempAddForErase.length > 0)

    //// what is down was writhen with white forced
    //is white move and first click
    if (!whiteMove && !startMove && dLeftState[ix][jx] > 12) {
      setNumberToMove(dLeftState[ix][jx]);
      setStartMove(true);
      return;
    }
    //is black move and second click
    if (!whiteMove && startMove) {
      let iSecond;
      let jSecond;
      //\\\search for move in leftDiagonal1111111111111111111111111111 black
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
              // const tempDLeftState = dLeftState;
              tempDLeftState[i][j - 1] = numberToMove;
              tempDLeftState[i][j] = null;
              setDLeftState(tempDLeftState);
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
            }
          }
        }
      }
      //if we decided to click on an another cell and move with that cell
      if (dLeftState[ix][jx] > 12 && dLeftState[ix][jx] !== null) {
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
              tempDLeftState[iSecond][jSecond] = null;
              setDLeftState(tempDLeftState);
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
            }
          }
        }
      } //for on left diagonal
    }
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
