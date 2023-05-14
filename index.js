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
            // Expresión regular para validar los comandos permitidos (PUSH, NEG, ADD, SUB, MUL, DIV, OUTPUT, END)
            regex = new RegExp('\\b(PUSH|NEG|ADD|SUB|MUL|DIV|OUTPUT|END)\\b', 'g');

            // Verificar si el comando ingresado coincide con el patrón permitido
            if (regex.test(commandInput.value)) {
                switch (commandInput.value) {
                    case "PUSH":
                        // Si el comando es "PUSH", cambiar el estado para esperar un número y limpiar la entrada
                        needCommand = false;
                        commandInput.value = "";
                        showAlert(1)
                        commandInput.focus();
                        break;

                    case "NEG":
                        // Si el comando es "NEG", negar el último elemento en la pila si existe
                        if (stack.length > 0) {
                            stack[stack.length - 1] = stack[stack.length - 1] * -1;
                            commandInput.value = "";
                            refreshStack();
                        } else {
                            showAlert(2)
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
                            showAlert(3)
                        }
                        break;

                    case "SUB":
                            // Si el comando es "SUB", restar los dos últimos elementos de la pila y reemplazarlos con el resultado
                            if (stack.length > 1) {
                                let sub = stack[stack.length - 2] * 1 - stack[stack.length - 1] * 1;
                                stack.splice(stack.length - 2, 2);
                                stack.push(sub);
                                commandInput.value = "";
                                refreshStack();
                            } else {
                                showAlert(4)
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
                            showAlert(3)
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
                                stack.splice(stack.length - 1, 1);
                                commandInput.value = "";
                                refreshStack();
                                showAlert(4)
                            }
                        } else {
                            showAlert(3)
                        }

                        break;

                    case "OUTPUT":
                        // Si el comando es "OUTPUT", mostrar el último elemento de la pila en el elemento de salida
                        if (stack.length > 0) {
                            commandInput.value = "";
                            output.innerHTML = stack[stack.length - 1];
                        } else {
                            showAlert(5)
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
                        // Expresión regular para validar si se ingresa el comando PUSH seguido del número a ingresar
                        regex = new RegExp('^PUSH\\s*-?\\d+$');
                        // Si el comando de ingreso es correcto agregar el valor a la pila
                        if (regex.test(commandInput.value)) {                         
                            stack.push(commandInput.value.replace(/PUSH\s*/g, ""));
                            needCommand = true;
                            commandInput.value = "";
                            showAlert(9);
                            refreshStack();
                        }

                        break;
                }
            } else {
                showAlert(6)
            }
        } else {
            // Se espera un número en la entrada
            regex = new RegExp('^-?\\d+$', 'g');
            if (regex.test(commandInput.value)) {
                // Si se ingresó un número válido, agregarlo a la pila y cambiar al estado de esperar un comando
                stack.push(commandInput.value);
                needCommand = true;
                commandInput.value = "";
                showAlert(9)
            } else {
                showAlert(8)
            }

            refreshStack();
        }
    } else {
        // No se ingresó ningún comando
        if (needCommand = true) {
            showAlert(7)
        } else {
            showAlert(8)
        }
    }
}

// Función para actualizar la visualización de la pila en el documento HTML
function refreshStack() {
    stackContainer.innerHTML = "";
    for (let i = 0; i < stack.length; i++) {
        stackContainer.innerHTML += '<div class="stack_item">' + stack[i] + '</div>';
    }
    commandInput.focus();
}

// Función para leer si en el campo de comandos se presiona enter para intentar ejecutar el comando
function handleKeyPress(event) {
    if (event.keyCode === 13) {
      // Código a ejecutar cuando se presiona Enter
      readCommand();
    }
  }

// Función para poder desplegar las alertas dependiendo del código de alerta proporcionado
function showAlert(alertCode) {
    let message;
    
    switch (alertCode) {
      case 1:
        message = "Ingresa un valor numérico";
        break;
      case 2:
        message = "No hay ningún elemento en la pila";
        break;
      case 3:
        message = "Deben haber al menos 2 elementos en la pila";
        break;
      case 4:
        message = "No se puede operar, el resultado es un número real, solo se admiten enteros";
        break;
      case 5:
        message = "No hay elementos en la pila";
        break;
      case 6:
        message = "Comando inválido";
        break;
      case 7:
        message = "Debes ingresar un comando";
        break;
      case 8:
        message = "Debes ingresar un número";
        break;
      case 9:
        message = "Ingresa un comando";
        break;
      default:
        message = "Error desconocido";
        break;
    }
    
    alertContainer.innerHTML = message;
  }
  