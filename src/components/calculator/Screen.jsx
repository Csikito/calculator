import React from "react";

function Screen({ currentOperand, previusOperand, operation }) {
  return (
    <div className="output">
      <div className=" text-white text-[20px] font-mono text-opacity-70">
        {previusOperand} {operation}
      </div>
      <div className="text-white text-[32px] font-mono">{currentOperand}</div>
    </div>
  );
}

export default Screen;
