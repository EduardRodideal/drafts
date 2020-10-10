import React, { useContext } from "react";
import "./App.css";
import { Table3 } from "./components/Table3";
import { GeneralContext } from "./components/context/generalContext";
import { History } from "./components/History";

//Material-UI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const App = () => {
  const { whiteMove, indexToContinue, afterHistory } = useContext(GeneralContext);
  const num = "(move nr. " + indexToContinue +")";
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          {whiteMove && (
            <Typography className="margin-table">Black pieces {afterHistory && num} </Typography>
          )}
          {!whiteMove && (
            <Typography className="margin-table">Red pieces  {afterHistory && num}</Typography>
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
