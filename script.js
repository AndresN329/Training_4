//Evento para guardar daros en el local Storage
document.getElementById('saveButton').addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    
    if (!nameInput || !ageInput) {
        console.error('Los elementos del formulario no existen');
        return;
    }
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();

    if (name && ! isNaN(age)) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userAge', age);
        displayData();
    } else{
        alert('Por favor, ingresa un nombre valido y una edad numerica');
    }
})

//Funcion para mostrar los datos almacenados
function displayData() {
    const name = localStorage.getItem('userName');
    const age = localStorage.getItem('userAge');
    const outputDiv = document.getElementById('output');

    if(name && age) {
        outputDiv.textContent = `Hola ${name}, tienes ${age} años`;
    } else {
        outputDiv.textContent = 'No hay datos alacenados'
    }
}

//Al cargar la pagina, mostrar los datos almacenados
window.onload = displayData;

//Inicializar contador de interacciones en Session Storage
if (!sessionStorage.getItem('interactionCount')) {
    sessionStorage.setItem('interactionCount', 0);
}

//Actualizar contador de interaciones
function updateInteractionCount() {
    let count = parseInt(sessionStorage.getItem('interactionCount'));
    count ++;
    sessionStorage.setItem('interactionCount', count);
    console.log(`Interacciones en esta sesion: ${count}`);
}

//Asignar eventos al contador
document.getElementById('saveButton').addEventListener('click', updateInteractionCount);
document.getElementById('clearButton').addEventListener('click', updateInteractionCount);

//Evento para limpiar los datos del local storage
document.getElementById('clearButton').addEventListener('click', () => {
    localStorage.clear();
    displayData();
});

