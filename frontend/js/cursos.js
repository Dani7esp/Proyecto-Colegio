const API_CURSOS = 'http://127.0.0.1:8000/api/cursos/';
const API_PROFESORES = 'http://127.0.0.1:8000/api/profesores/';

document.addEventListener('DOMContentLoaded', () => {
    cargarProfesoresSelect();
    cargarCursos();
    document.getElementById('form-curso').addEventListener('submit', guardarCurso);
});

// Cargar select de profesores para la ForeignKey
function cargarProfesoresSelect() {
    fetch(API_PROFESORES)
        .then(res => res.json())
        .then(profesores => {
            const select = document.getElementById('profesor');
            select.innerHTML = '<option value="">Seleccione un Profesor</option>';
            profesores.forEach(p => {
                select.innerHTML += `<option value="${p.id}">${p.nombre} (${p.especialidad})</option>`;
            });
        });
}

// GET Cursos
function cargarCursos() {
    fetch(API_CURSOS)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-cursos');
            tbody.innerHTML = '';
            data.forEach(c => {
                tbody.innerHTML += `
                    <tr>
                        <td>${c.id}</td>
                        <td>${c.nombre}</td>
                        <td>${c.codigo}</td>
                        <td>${c.profesor}</td>
                        <td class="actions-btns">
                            <button class="btn btn-warning" onclick="prepararEdicion(${c.id}, '${c.nombre}', '${c.codigo}', ${c.profesor})">Editar</button>
                            <button class="btn btn-danger" onclick="eliminarCurso(${c.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// POST y PUT
function guardarCurso(e) {
    e.preventDefault();
    const id = document.getElementById('curso-id').value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        codigo: document.getElementById('codigo').value,
        profesor: parseInt(document.getElementById('profesor').value)
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_CURSOS}${id}/` : API_CURSOS;

    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(() => {
        cancelarEdicion();
        cargarCursos();
    });
}

function prepararEdicion(id, nombre, codigo, profesor) {
    document.getElementById('curso-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('codigo').value = codigo;
    document.getElementById('profesor').value = profesor;

    document.getElementById('form-titulo').innerText = 'Editar Curso';
    document.getElementById('btn-guardar').innerText = 'Actualizar Curso';
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

function cancelarEdicion() {
    document.getElementById('curso-id').value = '';
    document.getElementById('form-curso').reset();
    document.getElementById('form-titulo').innerText = 'Agregar Nuevo Curso';
    document.getElementById('btn-guardar').innerText = 'Guardar Curso';
    document.getElementById('btn-cancelar').style.display = 'none';
}

function eliminarCurso(id) {
    if (confirm('¿Desea eliminar este curso?')) {
        fetch(`${API_CURSOS}${id}/`, { method: 'DELETE' })
            .then(res => { if (res.ok) cargarCursos(); });
    }
}