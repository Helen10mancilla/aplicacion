let productos = [];  // Almacena los productos
let categorias = []; // Almacena las categorías

// Función para alternar entre las secciones del panel
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Guardar un producto
function guardarProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const categoriaProducto = document.getElementById('categoriaProducto').value;
    const precioProducto = document.getElementById('precioProducto').value;

    if (nombreProducto && categoriaProducto && precioProducto) {
        productos.push({ nombre: nombreProducto, categoria: categoriaProducto, precio: parseFloat(precioProducto) });
        alert('Producto agregado con éxito');
        document.getElementById('nombreProducto').value = '';
        document.getElementById('precioProducto').value = '';
        verTodosProductos();  // Mostrar todos los productos en la vista de administrador
    } else {
        alert('Por favor completa todos los campos.');
    }
}

// Mostrar todos los productos en la vista de administrador
function verTodosProductos() {
    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos creados.</p>';
    } else {
        productos.forEach(producto => {
            const item = document.createElement('div');
            item.innerHTML = `<p>Nombre: ${producto.nombre} | Categoría: ${producto.categoria} | Precio: $${producto.precio.toFixed(2)}</p>`;
            contenedor.appendChild(item);
        });
    }
}

// Mostrar productos en la vista cliente
function verProductosCliente() {
    const contenedor = document.getElementById('productosCliente');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos disponibles.</p>';
    } else {
        productos.forEach(producto => {
            const item = document.createElement('div');
            item.innerHTML = `<p>Nombre: ${producto.nombre} | Categoría: ${producto.categoria} | Precio: $${producto.precio.toFixed(2)} <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button></p>`;
            contenedor.appendChild(item);
        });
    }
}

// Función para agregar un producto al carrito
let carrito = [];
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    alert(`${nombre} ha sido agregado al carrito.`);
}

// Mostrar el carrito
function verCarrito() {
    const contenedor = document.getElementById('carrito');
    contenedor.innerHTML = '';
    
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const itemCarrito = document.createElement('div');
            itemCarrito.innerHTML = `<p>Producto: ${item.nombre} | Precio: $${item.precio.toFixed(2)}</p>`;
            contenedor.appendChild(itemCarrito);
        });
    }
}

// Inicializar la vista cliente
document.addEventListener('DOMContentLoaded', function () {
    toggleSection('vistaCliente'); // Cambiar a la vista de cliente al cargar
});
