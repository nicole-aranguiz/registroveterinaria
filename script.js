// Arreglo principal y estado de filtro
let mascotas = [];
let filtroActual = 'todos';

// Selección de elementos
const formMascota = document.querySelector('#formMascota');
const mensajeError = document.querySelector('#mensajeError');
const listaMascotas = document.querySelector('#listaMascotas');
const btnBuscar = document.querySelector('#btnBuscar'); // Nuevo botón de búsqueda

// Evento submit del formulario
formMascota.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarMascota();
});

// Evento click del botón buscar
if (btnBuscar) {
    btnBuscar.addEventListener('click', () => {
        mostrarMascotas();
    });
}

// 1. Validar Formulario
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

// 2. Registrar Mascota
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

// 3. Filtrar por estado (Ej: botones de "Todos", "Pendientes", "Atendidos")
function filtrarMascotas(tipo) {
    filtroActual = tipo;
    mostrarMascotas();
}

// 4. Motor de Renderizado
function mostrarMascotas() {
    listaMascotas.innerHTML = '';
    
    // Capturamos el valor del buscador al momento de ejecutar la función
    const inputBuscador = document.querySelector('#buscador');
    const terminoBusqueda = inputBuscador ? inputBuscador.value.toLowerCase() : '';
    
    // Filtro combinado: Estado + Buscador
    let mascotasFiltradas = mascotas.filter(m => {
        const cumpleEstado = (filtroActual === 'todos') || 
                             (filtroActual === 'pendientes' && !m.atendido) || 
                             (filtroActual === 'atendidas' && m.atendido);
        const cumpleNombre = m.nombre.toLowerCase().includes(terminoBusqueda);
        return cumpleEstado && cumpleNombre;
    });

    mascotasFiltradas.forEach((mascota) => {
        const indexOriginal = mascotas.indexOf(mascota);
        const div = document.createElement('div');
        div.classList.add('tarjeta-mascota');
        
        if (mascota.atendido) div.classList.add('atendida');
        
        div.innerHTML = `
            <p><strong>${mascota.nombre}</strong> - ${mascota.especie} | Propietario: ${mascota.propietario} | Edad: ${mascota.edad}</p>
            <p>Estado: ${mascota.atendido ? 'Atendido' : 'Pendiente'}</p>
            ${!mascota.atendido ? `<button onclick="cambiarEstado(${indexOriginal})">Atender</button>` : ''}
            <button onclick="editarMascota(${indexOriginal})">Editar</button>
            <button onclick="eliminarMascota(${indexOriginal})" style="background-color: #d32f2f; color: white;">Eliminar</button>
        `;
        listaMascotas.appendChild(div);
    });
}

// 5. Cambiar Estado
function cambiarEstado(index) {
    mascotas[index].atendido = true;
    mostrarMascotas();
    actualizarEstadisticas();
}

// 6. Editar Mascota
function editarMascota(index) {
    const mascota = mascotas[index];
    const nuevoNombre = prompt("Editar nombre:", mascota.nombre);
    const nuevaEspecie = prompt("Editar especie:", mascota.especie);
    const nuevoPropietario = prompt("Editar propietario:", mascota.propietario);
    const nuevaEdad = prompt("Editar edad:", mascota.edad);
    
    if (nuevoNombre && nuevaEspecie && nuevoPropietario && nuevaEdad > 0) {
        mascotas[index] = { ...mascota, nombre: nuevoNombre, especie: nuevaEspecie, propietario: nuevoPropietario, edad: parseInt(nuevaEdad) };
        mostrarMascotas();
        actualizarEstadisticas();
    }
}

// 7. Eliminar Mascota
function eliminarMascota(index) {
    if (confirm("¿Estás segura de que quieres eliminar a " + mascotas[index].nombre + "?")) {
        mascotas.splice(index, 1);
        mostrarMascotas();
        actualizarEstadisticas();
    }
}

// 8. Actualizar Estadísticas
function actualizarEstadisticas() {
    const total = mascotas.length;
    const atendidas = mascotas.filter(m => m.atendido).length;
    const pendientes = total - atendidas;

    const elTotal = document.getElementById('total');
    const elPendientes = document.getElementById('pendientes');
    const elAtendidas = document.getElementById('atendidas');

    if(elTotal) elTotal.textContent = total;
    if(elPendientes) elPendientes.textContent = pendientes;
    if(elAtendidas) elAtendidas.textContent = atendidas;
}

// 9. Ordenar
function ordenarPorNombre() {
    mascotas.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
    mostrarMascotas();
}