Uso de inteligencia artificial.

1. ¿Qué herramienta utilizó?
Se utilizó Gemini

2. ¿Qué consulta realizo?

- Primera consulta: ¿Cómo puedo validar los campos del formulario asegurando que no estén vacíos, que la edad sea positiva
y el nombre tenga al menos 2 caracteres, sin usar alert()?

- Segunda consulta: ¿Cómo puedo mostrar dinamicamente las mascotas registradas en el DOM usando un ciclo?

- Tercera consulta: ¿Cuál es la forma más eficiente de recorrer el arreglo de mascotas y crear tarjetas
- HTML dinámicamente?

- Cuarta consulta: ¿Cómo puedo cambiar la propiedad atendido de false a true al hacer clic en un botón y
-  que se vea reflejado al instante?

- Quinta consulta: ¿Cómo calcular automáticamente el total, los pendientes y los atendidos cada vez que
- cambie el arreglo?

3. ¿Que sugerencia entregó la IA?
PRIMERA CONSULTA:

function validarFormulario() {
    const nombre = document.querySelector('#nombre').value.trim();
    // ... (resto de campos)
    if (nombre.length < 2 || edad <= 0) {
        document.querySelector('#mensajeError').textContent = "Error: Datos inválidos.";
        return false;
    }
    return true;
}

SEGUNDA CONSULTA: 

const nuevaMascota = {
    nombre: "Ejemplo",
    especie: "Perro",
    propietario: "Juan",
    edad: 2,
    atendido: false
};

TERCERA CONSULTA: 

mascotas.forEach((mascota, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${mascota.nombre}</p>`;
    document.querySelector('#lista').appendChild(div);
});

CUARTA CONSULTA: 

function cambiarEstado(index) {
    mascotas[index].atendido = true;
    mostrarMascotas();
    actualizarEstadisticas();
}

QUINTA CONSULTA:

function actualizarEstadisticas() {
    const total = mascotas.length;
    const pendientes = mascotas.filter(m => !m.atendido).length;
    const atendidas = total - pendientes;
    // Asignación al DOM...
}


4. ¿La utilizó completamente o realizó modificaciones?


Realice modificaciones constantes. La IA sirvio como base, pero ajuste la implementación para
asegurar que los nombres de los elementos en el HTML coincidieran con mis propios estilos CSS y
también para integrar las funciones adicionales (como la edición de registros) que decidi añadir.

5. ¿Por qué considera importante revisar las respuestas generadas por la IA antes de
utilizarlas?

Es fundamental porque el código generado puede no alinearse perfectamente con la estructura especifica
que requiere el proyecto, en este caso, el de la veterinaria. Revisar cada linea me permite asegurar la 
correcta integracion, entender el funcionamiento real de mi aplicación y garantizar que el resultado final 
sea coherente con mis decisiones de diseño. 
