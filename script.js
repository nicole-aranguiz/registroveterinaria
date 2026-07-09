let mascotas = [];

// Selección de elementos
const formMascota = document.getElementById('formMascota');
const mensajeError = document.getElementById('mensajeError');
const listaMascotas = document.getElementById('listaMascotas');

// Evento submit
formMascota.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarMascota();
});

function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const especie = document.getElementById('especie').value.trim();
    const propietario = document.getElementById('propietario').value.trim();
    const edad = document.getElementById('edad').value;

    if (nombre.length < 2 || especie === "" || propietario === "" || edad <= 0) {
        mensajeError.textContent = "Error: Todos los campos son obligatorios, el nombre debe tener al menos 2 caracteres y la edad debe ser positiva.";
        return false;
    }
    mensajeError.textContent = "";
    return true;
}

function registrarMascota() {
    if (validarFormulario()) {
        const nuevaMascota = {
            nombre: document.getElementById('nombre').value.trim(),
            especie: document.getElementById('especie').value.trim(),
            propietario: document.getElementById('propietario').value.trim(),
            edad: parseInt(document.getElementById('edad').value),
            atendido: false
        };
        mascotas.push(nuevaMascota);
        formMascota.reset();
        mostrarMascotas();
        actualizarEstadisticas();
    }
}

function mostrarMascotas() {
    listaMascotas.innerHTML = '';
    mascotas.forEach((mascota, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${mascota.nombre}</strong> - ${mascota.especie} - Propietario: ${mascota.propietario} - Edad: ${mascota.edad} - Estado: ${mascota.atendido ? 'Atendido' : 'Pendiente'}</p>
            ${!mascota.atendido ? `<button onclick="cambiarEstado(${index})">Atender</button>` : ''}
        `;
        listaMascotas.appendChild(div);
    });
}

function cambiarEstado(index) {
    mascotas[index].atendido = true;
    mostrarMascotas();
    actualizarEstadisticas();
}

function actualizarEstadisticas() {
    const total = mascotas.length;
    const atendidas = mascotas.filter(m => m.atendido).length;
    const pendientes = total - atendidas;

    document.getElementById('total').textContent = total;
    document.getElementById('pendientes').textContent = pendientes;
    document.getElementById('atendidas').textContent = atendidas;
}