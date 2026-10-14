const API_URL = 'http://127.0.0.1:8000/api/profesores/';

document.addEventListener('DOMContentLoaded', () => {
    cargarProfesores();
    document.getElementById('form-profesor').addEventListener('submit', guardarProfesor);
});

// GET: Cargar profesores
function cargarProfesores() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-profesores');
            tbody.innerHTML = '';
            data.forEach(p => {
                tbody.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nombre}</td>
                        <td>${p.especialidad}</td>
                        <td>${p.email}</td>
                        <td class="actions-btns">
                            <button class="btn btn-warning" onclick="prepararEdicion(${p.id}, '${p.nombre}', '${p.especialidad}', '${p.email}')">Editar</button>
                            <button class="btn btn-danger" onclick="eliminarProfesor(${p.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error('Error al cargar profesores:', err));
}

// POST y PUT: Crear o Actualizar
function guardarProfesor(e) {
    e.preventDefault();
    const id = document.getElementById('profesor-id').value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        especialidad: document.getElementById('especialidad').value,
        email: document.getElementById('email').value
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}${id}/` : API_URL;

    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error en la petición');
        return res.json();
    })
    .then(() => {
        cancelarEdicion();
        cargarProfesores();
    })
    .catch(err => console.error('Error al guardar:', err));
}

// Llenar formulario para editar
function prepararEdicion(id, nombre, especialidad, email) {
    document.getElementById('profesor-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('especialidad').value = especialidad;
    document.getElementById('email').value = email;

    document.getElementById('form-titulo').innerText = 'Editar Profesor';
    document.getElementById('btn-guardar').innerText = 'Actualizar Profesor';
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

function cancelarEdicion() {
    document.getElementById('profesor-id').value = '';
    document.getElementById('form-profesor').reset();
    document.getElementById('form-titulo').innerText = 'Agregar Nuevo Profesor';
    document.getElementById('btn-guardar').innerText = 'Guardar Profesor';
    document.getElementById('btn-cancelar').style.display = 'none';
}

// DELETE: Eliminar
function eliminarProfesor(id) {
    if (confirm('¿Desea eliminar este profesor?')) {
        fetch(`${API_URL}${id}/`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) cargarProfesores();
            })
            .catch(err => console.error('Error al eliminar:', err));
    }
}