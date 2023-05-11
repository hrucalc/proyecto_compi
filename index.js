var commandInput = document.getElementById('command_input');
var counter = 0;
var alertContainer = document.getElementById('alert');
var stack = [];
var needCommand = true;
var regex;
var stackContainer = document.getElementById('stack_container');
var output = document.getElementById('output');
function readCommand() {

    if (commandInput.value != "") {
        if (needCommand) {
            regex = new RegExp('\\b(PUSH|NEG|ADD|MUL|DIV|OUTPUT|END)\\b', 'g');

            if (regex.test(commandInput.value)) {
                switch (commandInput.value) {
                    case "PUSH":
                        needCommand = false;
                        commandInput.value = "";
                        alertContainer.innerHTML = "Ingresa un valor numérico";
                        break;

                    case "NEG":
                        if (stack.length > 0) {
                            stack[stack.length - 1] = stack[stack.length - 1] * -1;
                            commandInput.value = "";
                            refreshStack();
                        } else {
                            alertContainer.innerHTML = "No hay ningún elemento en la pila";
                        }

                        break;

                    case "ADD":
                        if (stack.length > 1) {
                            let add = stack[stack.length - 1] * 1 + stack[stack.length - 2] * 1;
                            stack.splice(stack.length - 2, 2);
                            stack.push(add);
                            commandInput.value = "";
                            refreshStack();
                        } else {
                            alertContainer.innerHTML = "Deben haber al menos 2 elementos en la pila";
                        }
                        break;

                    case "MUL":
                        if (stack.length > 1) {
                            let mul = stack[stack.length - 1] * stack[stack.length - 2];
                            stack.splice(stack.length - 2, 2);
                            stack.push(mul);
                            commandInput.value = "";
                            refreshStack();
                        } else {
                            alertContainer.innerHTML = "Deben haber al menos 2 elementos en la pila";
                        }
                        break;

                    case "DIV":
                        if (stack.length > 1) {
                            if (stack[stack.length - 2] % stack[stack.length - 1] == 0) {
                                let div = stack[stack.length - 2] / stack[stack.length - 1];
                                stack.splice(stack.length - 2, 2);
                                stack.push(div);
                                commandInput.value = "";
                                refreshStack();
                            } else {
                                alertContainer.innerHTML = "No se puede operar, el resultado es un número real, solo se admiten enteros";
                            }
                        } else {
                            alertContainer.innerHTML = "Deben haber al menos 2 elementos en la pila";
                        }

                        break;

                    case "OUTPUT":
                        if (stack.length > 0) {
                            commandInput.value = "";
                            output.innerHTML = stack[stack.length - 1];
                        } else {
                            alertContainer.innerHTML = "No hay elementos en la pila";
                        }
                        break;

                    case "END":
                        commandInput.value = "";
                        output.innerHTML = "";
                        stack = [];
                        refreshStack();
                        break;

                    default:
                        break;
                }
            } else {
                alertContainer.innerHTML = "Comando inválido";
            }
        } else {
            regex = new RegExp('^\\d+$', 'g');
            if (regex.test(commandInput.value)) {
                stack.push(commandInput.value);
                needCommand = true;
                commandInput.value = "";
                alertContainer.innerHTML = "Ingresa un comando";
            } else {
                alertContainer.innerHTML = "Debes ingresar un número";
            }

            refreshStack();
        }
    } else {
        if (needCommand = true) {
            alertContainer.innerHTML = "Debes ingresar un comando";
        } else {
            alertContainer.innerHTML = "Debes ingresar un número";
        }

    }




}

function refreshStack() {
    stackContainer.innerHTML = "";
    for (let i = 0; i < stack.length; i++) {
        stackContainer.innerHTML += '<div class="stack_item">' + stack[i] + '</div>';
    }

}