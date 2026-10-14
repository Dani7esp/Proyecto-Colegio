const API_ESTUDIANTES = 'http://127.0.0.1:8000/api/estudiantes/';
const API_CURSOS = 'http://127.0.0.1:8000/api/cursos/';

document.addEventListener('DOMContentLoaded', () => {
    cargarCursosSelect();
    cargarEstudiantes();
    document.getElementById('form-estudiante').addEventListener('submit', guardarEstudiante);
});

// Cargar opciones del selector de Cursos
function cargarCursosSelect() {
    fetch(API_CURSOS)
        .then(res => res.json())
        .then(cursos => {
            const select = document.getElementById('curso');
            select.innerHTML = '<option value="">Seleccione un Curso</option>';
            cursos.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.nombre} (${c.codigo})</option>`;
            });
        })
        .catch(err => console.error('Error al cargar cursos:', err));
}

// Cargar la tabla de estudiantes (GET)
function cargarEstudiantes() {
    fetch(API_ESTUDIANTES)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-estudiantes');
            tbody.innerHTML = '';
            data.forEach(e => {
                // Usamos e.nombre_completo o e.nombre según devuelva la API
                const nombreMostrar = e.nombre_completo || e.nombre;
                tbody.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${nombreMostrar}</td>
                        <td>${e.email}</td>
                        <td>${e.curso}</td>
                        <td class="actions-btns">
                            <button class="btn btn-warning" onclick="prepararEdicion(${e.id}, '${nombreMostrar}', '${e.email}', ${e.curso})">Editar</button>
                            <button class="btn btn-danger" onclick="eliminarEstudiante(${e.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error('Error al cargar estudiantes:', err));
}

// Guardar estudiante (POST / PUT)
function guardarEstudiante(e) {
    e.preventDefault();

    const id = document.getElementById('estudiante-id').value;
    const cursoVal = document.getElementById('curso').value;

    if (!cursoVal) {
        alert('Por favor seleccione un curso válido');
        return;
    }

    // Se envía 'nombre_completo' tal como lo definió el modelo en Django
    const datos = {
        nombre_completo: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        curso: parseInt(cursoVal, 10)
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_ESTUDIANTES}${id}/` : API_ESTUDIANTES;

    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => { throw err; });
        }
        return res.json();
    })
    .then(() => {
        cancelarEdicion();
        cargarEstudiantes();
    })
    .catch(err => {
        console.error('Error del backend:', err);
        alert('Error al guardar: Revisa que los nombres de los campos coincidan con la API.');
    });
}

function prepararEdicion(id, nombre, email, curso) {
    document.getElementById('estudiante-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('curso').value = curso;

    document.getElementById('form-titulo').innerText = 'Editar Estudiante';
    document.getElementById('btn-guardar').innerText = 'Actualizar Estudiante';
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

function cancelarEdicion() {
    document.getElementById('estudiante-id').value = '';
    document.getElementById('form-estudiante').reset();
    document.getElementById('form-titulo').innerText = 'Agregar Nuevo Estudiante';
    document.getElementById('btn-guardar').innerText = 'Guardar Estudiante';
    document.getElementById('btn-cancelar').style.display = 'none';
}

function eliminarEstudiante(id) {
    if (confirm('¿Desea eliminar este estudiante?')) {
        fetch(`${API_ESTUDIANTES}${id}/`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) cargarEstudiantes();
            })
            .catch(err => console.error('Error al eliminar:', err));
    }
    
}