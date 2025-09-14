
<?php
// Conexión a PostgreSQL
$conn = pg_connect("host=ep-frosty-salad-aewchf1i-pooler.c-2.us-east-2.aws.neon.tech dbname=neondb user=neondb_owner password=npg_UaAxJ2RwXHK1");

if (!$conn) {
    die("Error de conexión: " . pg_last_error());
}

// Obtener y sanitizar datos del formulario
$usuario = $_POST['usuario'];
$contraseña = password_hash($_POST['contraseña'], PASSWORD_DEFAULT); // Encriptar contraseña

// Preparar consulta SQL
$sql = "INSERT INTO usuarios (usuario, contraseña) VALUES ($1, $2)";
$result = pg_query_params($conn, $sql, array($usuario, $contraseña));

if ($result) {
    echo "Usuario registrado con éxito.";
} else {
    echo "Error al registrar: " . pg_last_error($conn);
}

pg_close($conn);
?>