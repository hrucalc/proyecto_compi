// Obtener los elementos necesarios del documento HTML
var commandInput = document.getElementById('command_input');
var counter = 0;
var alertContainer = document.getElementById('alert');
var stack = [];
var needCommand = true;
var regex;
var stackContainer = document.getElementById('stack_container');
var output = document.getElementById('output');

// Función para leer los comandos ingresados por el usuario
function readCommand() {
    // Verificar si se ha ingresado algún comando
    if (commandInput.value != "") {
        // Verificar si se espera un comando o un número en la entrada
        if (needCommand) {
            // Expresión regular para validar los comandos permitidos (PUSH, NEG, ADD, MUL, DIV, OUTPUT, END)
            regex = new RegExp('\\b(PUSH|NEG|ADD|MUL|DIV|OUTPUT|END)\\b', 'g');

            // Verificar si el comando ingresado coincide con el patrón permitido
            if (regex.test(commandInput.value)) {
                switch (commandInput.value) {
                    case "PUSH":
                        // Si el comando es "PUSH", cambiar el estado para esperar un número y limpiar la entrada
                        needCommand = false;
                        commandInput.value = "";
                        alertContainer.innerHTML = "Ingresa un valor numérico";
                        break;

                    case "NEG":
                        // Si el comando es "NEG", negar el último elemento en la pila si existe
                        if (stack.length > 0) {
                            stack[stack.length - 1] = stack[stack.length - 1] * -1;
                            commandInput.value = "";
                            refreshStack();
                        } else {
                            alertContainer.innerHTML = "No hay ningún elemento en la pila";
                        }

                        break;

                    case "ADD":
                        // Si el comando es "ADD", sumar los dos últimos elementos de la pila y reemplazarlos con el resultado
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
                        // Si el comando es "MUL", multiplicar los dos últimos elementos de la pila y reemplazarlos con el resultado
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
                        // Si el comando es "DIV", dividir los dos últimos elementos de la pila y reemplazarlos con el resultado (solo si es una división entera)
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
                        // Si el comando es "OUTPUT", mostrar el último elemento de la pila en el elemento de salida
                        if (stack.length > 0) {
                            commandInput.value = "";
                            output.innerHTML = stack[stack.length - 1];
                        } else {
                            alertContainer.innerHTML = "No hay elementos en la pila";
                        }
                        break;

                    case "END":
                        // Si el comando es "END", limpiar la entrada, el elemento de salida y reiniciar la pila
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
            // Se espera un número en la entrada
            regex = new RegExp('^\\d+$', 'g');
            if (regex.test(commandInput.value)) {
                // Si se ingresó un número válido, agregarlo a la pila y cambiar al estado de esperar un comando
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
        // No se ingresó ningún comando
        if (needCommand = true) {
            alertContainer.innerHTML = "Debes ingresar un comando";
        } else {
            alertContainer.innerHTML = "Debes ingresar un número";
        }
    }
}

// Función para actualizar la visualización de la pila en el documento HTML
function refreshStack() {
    stackContainer.innerHTML = "";
    for (let i = 0; i < stack.length; i++) {
        stackContainer.innerHTML += '<div class="stack_item">' + stack[i] + '</div>';
    }
}
