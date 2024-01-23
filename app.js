const express = require('express');
const app = express();
const port = 4002 ;


// Ruta para la raíz del sitio
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Street Fighter');
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos de ejemplo
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// Endpoints
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    res.status(201).send('Usuario creado');
});

app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre === nombre);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(u => u.nombre === nombre);
    if (index !== -1) {
        usuarios[index] = {...usuarios[index], ...req.body};
        res.send('Usuario actualizado');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    usuarios = usuarios.filter(u => u.nombre !== nombre);
    res.send('Usuario eliminado');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});