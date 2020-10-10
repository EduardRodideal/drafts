import React, { useContext } from "react";
import "./App.css";
import { Table3 } from "./components/Table3";
import { GeneralContext } from "./components/context/generalContext";
import { History } from "./components/History";

//Material-UI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// let copyLeftState = [
//   [20, 24],
//   [null, 16, 19, 23],
//   [1, null, null, 15, 18, 22],
//   [9, 5, 2, null, null, 14, 17, 21],
//   [10, 6, 3, null, null, 13],
//   [11, 7, 4, null],
//   [12, 8],
// ];
// for (let s = 0; s < tempDLeftState.length; s++) {
//   for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
//     copyLeftState[s][s2] = tempDLeftState[s][s2];
//   }
// }
// tempHistory.push(copyLeftState);
// // setHistory(tempHistory);
// tempHistory.push([...tempDLeftState]);

  // //moves with out eliminating pieces from the table
  // if (whiteMove && !isForcedMove && tempAddForErase.length === 0) {
  //   let copyLeftState = [
  //     [20, 24],
  //     [null, 16, 19, 23],
  //     [1, null, null, 15, 18, 22],
  //     [9, 5, 2, null, null, 14, 17, 21],
  //     [10, 6, 3, null, null, 13],
  //     [11, 7, 4, null],
  //     [12, 8],
  //   ];
  //   for (let s = 0; s < tempDLeftState.length; s++) {
  //     for (let s2 = 0; s2 < tempDLeftState[s].length; s2++) {
  //       copyLeftState[s][s2] = tempDLeftState[s][s2];
  //     }
  //   }
  //   tempHistory.push(copyLeftState);
  //   setHistory(tempHistory);
  // } //end if (whiteMove && !isForcedMove && tempAddForErase.length === 0)

export const App = () => {
  const { whiteMove } = useContext(GeneralContext);
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          {whiteMove && (
            <Typography className="margin-table">Black move</Typography>
          )}
          {!whiteMove && (
            <Typography className="margin-table">Red move</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Table3 />
        </Grid>
        <Grid className="margin-table" item xs={12}>
          <History />
        </Grid>
      </Grid>
    </div>
  );
};
