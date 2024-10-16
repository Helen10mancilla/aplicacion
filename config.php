<?php
$host = "localhost"; // O tu host
$dbname = "lagrancosecha"; // El nombre de tu base de datos
$username = "root"; // Tu usuario de MySQL
$password = ""; // Tu contraseña de MySQL

// Crear la conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}



