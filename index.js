document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button");
  const display = document.querySelector(".display");

  let num1 = "";
  let operator = "";
  let num2 = "";
  let clear = false;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const btn = button.textContent;

      switch (btn) {
        case "AC":
          clearExpression("AC");
          break;

        case "DEL":
          if (num2) {
            num2 = num2.slice(0, -1);
          } else if (operator) {
            operator = "";
          } else if (num1) {
            num1 = num1.slice(0, -1);
          }
          updateDisplay();
          break;

        case "=":
          if ((!operator || operator != "%") && !num2) break;
          const result = computeResult();
          display.value = result;
          num1 = result.toString();
          clear = true;
          break;

        case "+":
        case "-":
        case "x":
        case "/":
        case "%":
          if(clear){
            clearExpression("operand");
            clear=false;
          }
          if (num1 === "") break;
          if (operator && num2) {
            const res = computeResult();
            num1 = res.toString();
            num2 = "";
            operator = btn === "x" ? "*" : btn;
            updateDisplay();
          } else {
            operator = btn === "x" ? "*" : btn;
            updateDisplay();
          }
          break;

        default:
          if ("0123456789.".includes(btn)) {
            if (clear) {
              clearExpression("default");
              clear = false;
            }
            if (!operator) {
              if (btn === "." && num1.includes(".")) break;
              num1 += btn;
            } else {
              if (btn === "." && num2.includes(".")) break;
              num2 += btn;
            }
            updateDisplay();
          }
      }
    });
  });

  function updateDisplay() {
    display.value = num1 + (operator === "*" ? "x" : operator) + num2;
  }

  function computeResult() {
    if (operator === "/" && Number(num2) === 0) {
      alert("Cannot divide by zero");
      return num1;
    }

    num1 = num1.replace(/^0+(?=\d)/, "");
    num2 = num2.replace(/^0+(?=\d)/, "");

    if (operator === "%") {
      return eval(num1 + "/100.0" + (num2 ? "*" + num2 : ""));
    }
    return eval(num1 + operator + num2);
  }

  function clearExpression(checkCase) {
    if(checkCase!="operand") num1 = "";
    operator = "";
    num2 = "";
    display.value = "";
  }
});