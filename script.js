const buttonContainer = document.querySelector("#button-container");
const update = document.querySelector(".update");

buttonContainer.addEventListener("click", clickEventHandler);
buttonContainer.addEventListener("mouseover", hoverEventHandler);
buttonContainer.addEventListener("mouseout", leaveEventHandler);

let input = "";                 // Stores the current equation
let errorBeingDisplayed = false;

// Called everytime a button is pressed
function clickEventHandler(event) {

    const targetId = event.target.id;

    // Prevent user from using operators more than once e.g. 6++6
    if (isOperator(input.slice(input.length - 1, input.length + 1))) {
        if (isOperator(targetId)) {
            return;
        }
    }

    if (errorBeingDisplayed) {
        if (targetId == "clear" || targetId == "backspace") {
            errorBeingDisplayed = false;
            input = "";
            update.textContent = "";
        }
    }

    // Different functions depending on the button user pressed
    if (!errorBeingDisplayed) {
        switch (targetId) {

            case "=":
                update.textContent = evaluate(input);
                input = update.textContent;
                break;

            case "clear":
                // clear all and restart input

                input = "";
                update.textContent = "";
                break;

            case "backspace":
                // delete last character and update input

                input = update.textContent.slice(0, update.textContent.length - 1);
                update.textContent = update.textContent.slice(0, update.textContent.length - 1);
                break;

            case "not-button":
                break;

            default:
                // append it to input

                input += targetId;

                // If the first thing user presses is an operator
                if (isOperator(input[0])) {
                    input = "";
                    return;
                }

                // Prevent user from entering an operator
                if (input[0] != "+" && input[0] != "-" && input.length > 0) {
                    if (isOperator(input[0])) {
                        input = input.slice(0, -1);
                        return;
                    }
                    update.textContent = input;
                }

                // if the entered expression ends with an operator, evaulate the expression
                if (isOperator(targetId)) {
                    update.textContent = evaluate(input.slice(0, -1)) + targetId;
                    input = update.textContent;
                }

                break;
        }
    }

}

// Function to check if a character is an operator
function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}

// return the result of an expression, if its invalid, return error
function evaluate(expression) {

    let result;

    try {
        result = eval(expression);
    } catch (error) {
        result = "Error";
        errorBeingDisplayed = true;
    }

    return result;
}

function hoverEventHandler(event) {

    if (event.target.nodeName == "BUTTON") {
        const currentBackground = window.getComputedStyle(event.target).backgroundColor.slice(4, -1);
        console.log(currentBackground);
        event.target.setAttribute("style", `background-color: rgba(${currentBackground}, 0.6);`);
    }

}

function leaveEventHandler(event) {
    event.target.removeAttribute("style");
}