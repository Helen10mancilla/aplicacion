<?php
session_start(); // Iniciar sesión para manejar la sesión del usuario

// Conectar a la base de datos (asegúrate de ajustar los valores según tu servidor)
$servername = "localhost";
$username = "root"; // Usuario de tu base de datos
$password_db = ""; // Contraseña de tu base de datos
$dbname = "lagrancosecha"; // Nombre de tu base de datos

$conn = new mysqli($servername, $username, $password_db, $dbname);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar que el método usado sea POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta SQL para verificar si el email existe en la base de datos
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Usuario encontrado, ahora verificar la contraseña
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // La contraseña es correcta, autenticar al usuario
            $_SESSION['user_id'] = $user['id']; // Guardar el ID de usuario en la sesión
            $_SESSION['nombre'] = $user['nombre']; // Guardar el nombre de usuario en la sesión

            // Redirigir a la página de inicio o dashboard
            header("Location: estructura.php");
            exit();
        } else {
            // Contraseña incorrecta
            echo "Contraseña incorrecta.";
        }
    } else {
        // Usuario no encontrado
        echo "No se encontró el usuario con ese email.";
    }
    $stmt->close();
}

$conn->close();

