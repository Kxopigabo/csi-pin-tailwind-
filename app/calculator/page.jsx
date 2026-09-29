"use client";
import { useEffect, useReducer } from "react";

// ---------------- debug ---------------- //
// (ของเดิมเป็น TransformStreamDefaultController ซึ่งเป็นค่า truthy เสมอ = log ตลอด)
const DEBUG = true;

// ---------------- state ---------------- //
// state: first -> operator -> second
const initialState = {
  state: "first",
  display: "0",
  first: 0,
  second: 0,
  operator: "?",
};

const calculate = (first, second, operator) => {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    default:
      return 0;
  }
};

// ---------------- reducer (แทน numberclick / operatorclick / equalclick / clearclick) ---------------- //
const reducer = (s, action) => {
  switch (action.type) {
    case "number": {
      const num = String(action.num);
      switch (s.state) {
        case "first":
        case "second":
          if (s.display.length < 9) {
            return { ...s, display: s.display === "0" ? num : s.display + num };
          }
          return s;
        case "operator":
          return { ...s, display: num, state: "second" };
        default:
          return s;
      }
    }

    case "operator": {
      const op = String(action.op);
      switch (s.state) {
        case "first":
          return {
            ...s,
            first: Number(s.display),
            operator: op,
            state: "operator",
          };
        case "operator":
          return { ...s, operator: op };
        case "second": {
          const second = Number(s.display);
          const result = calculate(s.first, second, s.operator);
          return {
            state: "operator",
            display: String(result),
            first: result,
            second: 0,
            operator: op,
          };
        }
        default:
          return s;
      }
    }

    case "equal": {
      if (s.state !== "second") return s;
      const second = Number(s.display);
      const result = calculate(s.first, second, s.operator);
      return {
        state: "first",
        display: String(result),
        first: result,
        second: 0,
        operator: "?",
      };
    }

    case "clear":
      return initialState;

    default:
      return s;
  }
};

// ---------------- ใส่ตัวคั่นทุก 3 หลัก ---------------- //
const insertSeparator = (str, separator = " ", groupSize = 3) => {
  let resultString = " ";
  let counter = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    resultString = str[i] + resultString;
    if (i != 0 && counter++ % groupSize === groupSize - 1)
      resultString = separator + resultString;
  }
  return resultString;
};

// ---------------- ปุ่ม ---------------- //
const colors = {
  green: "bg-[rgb(180,236,180)]",
  red: "bg-[#ea6f6f]",
  purple: "bg-[rgb(136,147,248)]",
};

const Btn = ({ color, onClick, disabled, children }) => (
  <button
    className={`size-[45px] rounded-lg border-2 border-[#767676] text-[1.05rem] font-bold text-black [border-style:outset] disabled:bg-[#999] disabled:opacity-50 ${colors[color]}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const Row = ({ children }) => (
  <div className="mt-[5px] flex gap-1">{children}</div>
);

// ---------------- component ---------------- //
const Calculator = () => {
  const [s, dispatch] = useReducer(reducer, initialState);

  const numberclick = (num) => dispatch({ type: "number", num });
  const operatorclick = (op) => dispatch({ type: "operator", op });
  const equalclick = () => dispatch({ type: "equal" });
  const clearclick = () => dispatch({ type: "clear" });

  // keyboard event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") dispatch({ type: "clear" });
      else if (e.key === "Enter") dispatch({ type: "equal" });
      else if (/^[0-9]$/.test(e.key))
        dispatch({ type: "number", num: Number(e.key) });
      else if (e.key === "-") dispatch({ type: "operator", op: "-" });
      else if (e.key === "+") dispatch({ type: "operator", op: "+" });
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // debug log
  useEffect(() => {
    if (DEBUG)
      console.log(
        `[${s.state}] first: ${s.first}, operator: ${s.operator}, second: ${s.second}, state: ${s.state}, display: ${s.display}`,
      );
  }, [s]);

  return (
    <div className = ' flex justify-center  '>
      <div className="grid h-96 place-items-center text-center font-[sans-serif]">
        <div className="rounded-t-[18px] border-[3px] border-black bg-[gray]">
          <div className="rounded-[15px] border-[5px] border-[gray] bg-linear-to-br from-[rgb(7,197,249)] to-[rgb(42,112,252)] p-[10px]">
            {/* screen */}
            <div
              id="screen"
              className="mb-[20px] flex h-10 items-center justify-end rounded-[10px] bg-[rgb(170,218,246)] px-2 text-right text-[1.75rem]"
            >
              {insertSeparator(s.display)}
            </div>

            <Row>
              <Btn color="green" disabled>
                MC
              </Btn>
              <Btn color="green" disabled>
                MR
              </Btn>
              <Btn color="green" disabled>
                M+
              </Btn>
              <Btn color="green" disabled>
                M-
              </Btn>
              <Btn color="red" onClick={clearclick}>
                CE
              </Btn>
            </Row>
            <Row>
              <Btn color="purple" onClick={() => numberclick(9)}>
                9
              </Btn>
              <Btn color="purple" onClick={() => numberclick(8)}>
                8
              </Btn>
              <Btn color="purple" onClick={() => numberclick(7)}>
                7
              </Btn>
              <Btn color="green" disabled>
                /
              </Btn>
              <Btn color="green" disabled>
                &radic;
              </Btn>
            </Row>
            <Row>
              <Btn color="purple" onClick={() => numberclick(6)}>
                6
              </Btn>
              <Btn color="purple" onClick={() => numberclick(5)}>
                5
              </Btn>
              <Btn color="purple" onClick={() => numberclick(4)}>
                4
              </Btn>
              <Btn color="green" disabled>
                x
              </Btn>
              <Btn color="green" disabled>
                %
              </Btn>
            </Row>
            <Row>
              <Btn color="purple" onClick={() => numberclick(3)}>
                3
              </Btn>
              <Btn color="purple" onClick={() => numberclick(2)}>
                2
              </Btn>
              <Btn color="purple" onClick={() => numberclick(1)}>
                1
              </Btn>
              <Btn color="green" onClick={() => operatorclick("-")}>
                -
              </Btn>
              <Btn color="green" disabled>
                1/x
              </Btn>
            </Row>
            <Row>
              <Btn color="purple" onClick={() => numberclick(0)}>
                0
              </Btn>
              <Btn color="purple" disabled>
                .
              </Btn>
              <Btn color="purple" disabled>
                +/&minus;
              </Btn>
              <Btn color="green" onClick={() => operatorclick("+")}>
                +
              </Btn>
              <Btn color="green" onClick={equalclick}>
                =
              </Btn>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <Calculator />;
}
