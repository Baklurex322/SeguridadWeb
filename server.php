<?php

// Conexión a la base de datos
$host = "ep-frosty-salad-aewchf1i-pooler.c-2.us-east-2.aws.neon.tech";
$db = "neondb";
$user = "neondb_owner";
$pass = "npg_UaAxJ2RwXHK1";

$conn = new mysqli($host, $user, $pass, $db);

// Verifica conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$contraseña = password_hash($_POST['contraseña'], PASSWORD_DEFAULT); // Encriptar contraseña

// Insertar en la tabla
$sql = "INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nombre, $contraseña);

if ($stmt->execute()) {
    echo "Usuario registrado con éxito.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>