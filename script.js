let mascotas = [];
let filtroActual = 'todos'; // Variable para controlar el filtro

// Selección de elementos
const formMascota = document.querySelector('#formMascota');
const mensajeError = document.querySelector('#mensajeError');
const listaMascotas = document.querySelector('#listaMascotas');

// Evento submit
formMascota.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarMascota();
});

function validarFormulario() {
    const nombre = document.querySelector('#nombre').value.trim();
    const especie = document.querySelector('#especie').value.trim();
    const propietario = document.querySelector('#propietario').value.trim();
    const edad = parseInt(document.querySelector('#edad').value);

    if (nombre.length < 2 || especie === "" || propietario === "" || isNaN(edad) || edad <= 0) {
        mensajeError.textContent = "Error: Todos los campos son obligatorios, el nombre debe tener al menos 2 caracteres y la edad debe ser positiva.";
        return false;
    }
    mensajeError.textContent = "";
    return true;
}

function registrarMascota() {
    if (validarFormulario()) {
        const nuevaMascota = {
            nombre: document.querySelector('#nombre').value.trim(),
            especie: document.querySelector('#especie').value.trim(),
            propietario: document.querySelector('#propietario').value.trim(),
            edad: parseInt(document.querySelector('#edad').value),
            atendido: false
        };
        mascotas.push(nuevaMascota);
        formMascota.reset();
        mostrarMascotas();
        actualizarEstadisticas();
    }
}

// Nueva función para el filtro
function filtrarMascotas(tipo) {
    filtroActual = tipo;
    mostrarMascotas();
}

function mostrarMascotas() {
    listaMascotas.innerHTML = '';
    
    // Lógica de filtrado
    let mascotasFiltradas = mascotas;
    if (filtroActual === 'pendientes') {
        mascotasFiltradas = mascotas.filter(m => !m.atendido);
    } else if (filtroActual === 'atendidas') {
        mascotasFiltradas = mascotas.filter(m => m.atendido);
    }

    mascotasFiltradas.forEach((mascota) => {
        const indexOriginal = mascotas.indexOf(mascota);
        const div = document.createElement('div');
        div.classList.add('tarjeta-mascota');
        
        div.innerHTML = `
            <p><strong>${mascota.nombre}</strong> - ${mascota.especie} - Propietario: ${mascota.propietario} - Edad: ${mascota.edad} - Estado: ${mascota.atendido ? 'Atendido' : 'Pendiente'}</p>
            ${!mascota.atendido ? `<button onclick="cambiarEstado(${indexOriginal})">Atender</button>` : ''}
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