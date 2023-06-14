import React from "react";
import { ACTIONS } from "./Calculator";

function OperationButton({ dispatch, operation }) {
  return (
    <button
      className="digit__btn"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
