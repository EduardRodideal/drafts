import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({children}) => {
  const [whiteMove, setWhiteMove] = useState(true);
  const [numberToMove, setNumberToMove] = useState(null);
  const [startMove, setStartMove] = useState(false);
  const [forcedMove, setForcedMove] = useState(false);

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
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
