// Función para validar que un nombre no contenga números
function validateName(name) {
    // La expresión regular /\d/ verifica si hay algún dígito en la cadena.
    // !/\d/.test(name) retorna true si NO hay dígitos (nombre válido).
    return !/\d/.test(name);
}

// Función para validar que la edad no sea negativa
function validateAge(age) {
    // parseInt(age) convierte la cadena a un número entero.
    // age >= 0 verifica si la edad es un número no negativo.
    return parseInt(age) >= 0;
}

// Evento para guardar datos en el Local Storage
document.getElementById('saveButton').addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');

    if (!nameInput || !ageInput) {
        console.error('Los elementos del formulario no existen.');
        return;
    }

    const name = nameInput.value.trim();
    const age = ageInput.value.trim();

    // **Nuevas validaciones:**
    if (!validateName(name)) {
        alert('El nombre no debe contener números. Por favor, ingresa un nombre válido.');
        nameInput.focus(); // Enfocar el campo para corrección
        return; // Detener la ejecución
    }

    if (!validateAge(age)) {
        alert('La edad no puede ser un número negativo. Por favor, ingresa una edad válida.');
        ageInput.focus(); // Enfocar el campo para corrección
        return; // Detener la ejecución
    }

    // Validación existente: asegurar que el nombre no esté vacío y la edad sea un número
    if (name && !isNaN(age)) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userAge', age);
        displayData();
        updateInteractionCount(); // Mover aquí para que se cuente solo si se guardan datos válidos
    } else {
        // Este alert ahora solo se activará si el nombre está vacío
        // o si la edad no es un número (aparte de las nuevas validaciones)
        alert('Por favor, ingresa un nombre y una edad numérica.');
    }
});

// Funcion para mostrar los datos almacenados
function displayData() {
    const name = localStorage.getItem('userName');
    const age = localStorage.getItem('userAge');
    const outputDiv = document.getElementById('output');

    if (name && age) {
        outputDiv.textContent = `Hola ${name}, tienes ${age} años`;
    } else {
        outputDiv.textContent = 'No hay datos almacenados';
    }
}

// Al cargar la página, mostrar los datos almacenados
window.onload = displayData;

// Inicializar contador de interacciones en Session Storage
if (!sessionStorage.getItem('interactionCount')) {
    sessionStorage.setItem('interactionCount', 0);
}

// Actualizar contador de interacciones
function updateInteractionCount() {
    let count = parseInt(sessionStorage.getItem('interactionCount'));
    count++;
    sessionStorage.setItem('interactionCount', count);
    console.log(`Interacciones en esta sesión: ${count}`);
}

// Nota: El evento para updateInteractionCount del 'saveButton' se movió dentro de su listener.
// Asignar evento al contador para el botón 'clearButton'
document.getElementById('clearButton').addEventListener('click', updateInteractionCount);

// Evento para limpiar los datos del local storage
document.getElementById('clearButton').addEventListener('click', () => {
    localStorage.clear();
    displayData();
});