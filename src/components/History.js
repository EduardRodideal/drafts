import React, { useContext } from "react";
import { GeneralContext } from "./context/generalContext";
import { v4 as uuidv4 } from "uuid";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

export const History = () => {
  const {
    history,
    setWhiteMove,
    setAfterHistory,
    addForEraseHistory,
    setAddToEraseContext,
    setDLeftState,
    setIndexToContinue,
  } = useContext(GeneralContext);

  const gridHistory = [];

  const handleClickButton = (index) => {
    //if index is 0 or even whiteMove is true else is false
    if (index % 2 === 0) {
      setWhiteMove(true);
    } else {
      setWhiteMove(false);
    }
    setAfterHistory(true);
    setAddToEraseContext(addForEraseHistory[index]);
    setDLeftState(history[index]);
    setIndexToContinue(index);
  };

  //construct the whole history
  for (let i = 0; i < history.length; i++) {
    if (i === 0) {
      gridHistory.push(
        <Grid key={uuidv4()} item xs={12}>
          <Button onClick={() => handleClickButton(i)}>
            Start of the game
          </Button>{" "}
        </Grid>
      );
    } else {
      gridHistory.push(
        <Grid key={uuidv4()} item xs={12}>
          <Button onClick={() => handleClickButton(i)}>#move {i}</Button>{" "}
        </Grid>
      );
    }
  }

  return <Grid container>{gridHistory}</Grid>;
};
