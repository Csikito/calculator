import React, { useReducer } from "react";
import Screen from "./Screen";
import Keypad from "./Keypad";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function Calculator({ theme }) {
  const [{ currentOperand, previusOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  }

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          };
        }
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state;
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state;
        }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        };
      case ACTIONS.CHOOSE_OPERATION:
        if (
          (state.currentOperand == null && state.previusOperand == null) ||
          (state.currentOperand == null && payload.operation === "x^") ||
          (state.currentOperand == null && payload.operation === "√") ||
          (state.currentOperand == null && payload.operation === "%")
        ) {
          return state;
        }

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          };
        }

        if (
          payload.operation === "x^" ||
          payload.operation === "√" ||
          (payload.operation === "%" && state.previusOperand)
        ) {
          return {
            ...state,
            previusOperand: evaluate(
              state.previusOperand,
              state.currentOperand,
              state.operation,
              payload.operation
            ),
            currentOperand: null,
            operation: null,
          };
        }
        if (
          payload.operation === "x^" ||
          payload.operation === "√" ||
          (payload.operation === "%" && state.currentOperand)
        ) {
          return {
            ...state,
            previusOperand: evaluate(
              state.previusOperand,
              state.currentOperand,
              state.operation,
              payload.operation
            ),
            currentOperand: null,
          };
        }

        if (state.previusOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previusOperand: state.currentOperand,
            currentOperand: null,
          };
        }
        return {
          ...state,
          previusOperand: evaluate(
            state.previusOperand,
            state.currentOperand,
            state.operation
          ),
          operation: payload.operation,
          currentOperand: null,
        };
      case ACTIONS.DELETE_DIGIT:
        if (state.currentOperand == null) return state;
        if (state.currentOperand.lenght === 1) {
          return { ...state, currentOperand: null };
        }
        return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
      case ACTIONS.EVALUATE:
        if (state.previusOperand !== null && state.currentOperand == null) {
          return {
            ...state,
            currentOperand: state.previusOperand,
            previusOperand: null,
            operation: null,
          };
        }

        if (
          state.operation == null ||
          state.previusOperand == null ||
          state.currentOperand == null
        ) {
          return state;
        }
        return {
          ...state,
          overwrite: true,
          previusOperand: null,
          operation: null,
          currentOperand: evaluate(
            state.previusOperand,
            state.currentOperand,
            state.operation
          ),
        };
      case ACTIONS.CLEAR:
        return {};

      default:
        return {
          currentOperand: "Error",
        };
    }
  }

  function evaluate(
    previusOperand,
    currentOperand,
    operation,
    operationSpecial
  ) {
    let pre = parseFloat(previusOperand);
    let cur = parseFloat(currentOperand);
    let comp = "";

    if (!isNaN(cur)) {
      if (operationSpecial === "x^" && isNaN(pre)) {
        comp = cur * cur;
        return comp.toString();
      }
      if (operationSpecial === "x^" && !isNaN(pre)) {
        cur = cur * cur;
      }
      if (operationSpecial === "√" && isNaN(pre)) {
        comp = Math.sqrt(cur);
        return comp.toString();
      }
      if (operationSpecial === "√" && !isNaN(pre)) {
        cur = Math.sqrt(cur);
      }
      if (operationSpecial === "%" && isNaN(pre)) {
        comp = cur / 100;
        return comp.toString();
      }
      if (operationSpecial === "%" && !isNaN(pre)) {
        cur = cur / 100;
      }
      if (isNaN(pre) || isNaN(cur)) return "";
    }

    switch (operation) {
      case "+":
        comp = pre + cur;
        break;
      case "-":
        comp = pre - cur;
        break;
      case "*":
        comp = pre * cur;
        break;
      case "/":
        comp = pre / cur;
        break;
      default:
        comp = "Error";
    }
    return comp.toString();
  }

  return (
    <section
      className={`${
        theme === "rainbow" ? "rainbow border-[2px]" : theme
      } w-[550px] rounded-[30px] absolute sml:relative top-[-2rem] left-[-6rem] sml:top-0 sml:left-0 m-auto mt-10 py-4 scale-50 sml:scale-75 md:scale-100`}
    >
      <div className="relative calculator z-20">
        <Screen
          currentOperand={formatOperand(currentOperand)}
          previusOperand={formatOperand(previusOperand)}
          operation={operation}
        />
        <Keypad dispatch={dispatch} />
      </div>
      <div
        className={`${
          theme === "rainbow"
            ? "absolute w-[100%] h-[100%] top-0 left-0 rounded-[28px] z-0 bg-black opacity-60"
            : ""
        }`}
      ></div>
    </section>
  );
}

export default Calculator;
