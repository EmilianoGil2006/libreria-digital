const listaLibros = document.getElementById('listaLibros');
const form = document.getElementById('formLibro');

const API_URL = '/api/libros';

// Cargar libros al iniciar
document.addEventListener('DOMContentLoaded', obtenerLibros);

function obtenerLibros() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            listaLibros.innerHTML = '';
            data.forEach(libro => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${libro.titulo}</strong> - ${libro.autor}
                    <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
                `;
                listaLibros.appendChild(li);
            });
        });
}

// Agregar libro
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor })
    })
    .then(res => res.json())
    .then(() => {
        form.reset();
        obtenerLibros();
    });
});

// Eliminar libro
function eliminarLibro(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => obtenerLibros());
}