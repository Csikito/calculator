import React from "react";
import { ACTIONS } from "./Calculator";

function DigitButton({ dispatch, digit }) {
  return (
    <button
      className={`${digit === "0" ? "span-two digit__btn" : "digit__btn"}`}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
