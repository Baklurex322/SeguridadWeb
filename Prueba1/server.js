const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));

// Servir el archivo HTML (formulario de registro)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Configura conexión a MySQL (usa variables de entorno en Railway)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'tu_usuario',
  password: process.env.DB_PASSWORD || 'tu_contrasena',
  database: process.env.DB_NAME || 'tu_base_de_datos'
};

// Ruta POST para registrar usuario
app.post('/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validación básica
  if (!usuario || !contrasena) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  try {
    // Encriptar la contrasena antes de guardarla
    const hash = await bcrypt.hash(contrasena, 10);

    // Conexión a la base de datos
    const connection = await mysql.createConnection(dbConfig);

    // Consulta SQL segura (evita inyección SQL)
    const sql = 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)';
    await connection.execute(sql, [usuario, hash]);

    await connection.end();

    res.send('✅ Usuario registrado con éxito');
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send('Error del servidor');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
});