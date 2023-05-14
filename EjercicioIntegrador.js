class Producto {
    sku;
    nombre;
    categoria;
    precio;
    stock;
  
    constructor(sku, nombre, precio, categoria, stock) {
      this.sku = sku;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
  
      if (stock) {
        this.stock = stock;
      } else {
        this.stock = 10;
      }
    }
  }
  
  const queso = new Producto("KS944RUR", "Queso", 10, "lacteos", 4);
  const gaseosa = new Producto("FN312PPE", "Gaseosa", 5, "bebidas");
  const cerveza = new Producto("PV332MJ", "Cerveza", 20, "bebidas");
  const arroz = new Producto("XX92LKI", "Arroz", 7, "alimentos", 20);
  const fideos = new Producto("UI999TY", "Fideos", 5, "alimentos");
  const lavandina = new Producto("RT324GD", "Lavandina", 9, "limpieza");
  const shampoo = new Producto("OL883YE", "Shampoo", 3, "higiene", 50);
  const jabon = new Producto("WE328NJ", "Jabon", 4, "higiene", 3);
  
  const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];

 
  class Carrito {
    productos;
    categorias;
    precioTotal;
    registroProductos;
  
    constructor() {
      this.precioTotal = 0;
      this.productos = [];
      this.categorias = [];
      this.registroProductos = {};
    }
  
    async agregarProducto(sku, cantidad) {
      console.log(`Agregando ${cantidad} ${sku}`);
  
      const producto = await findProductBySku(sku);
  
      console.log("Producto encontrado", producto);
  
      if (this.registroProductos[sku]) {
        this.registroProductos[sku].cantidad += cantidad;
      } else {
        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
        this.productos.push(nuevoProducto);
        if (!this.categorias.includes(producto.categoria)) {
          this.categorias.push(producto.categoria);
        }
        this.registroProductos[sku] = nuevoProducto;
      }
      this.precioTotal += producto.precio * cantidad;
    }
  
    async eliminarProducto(sku, cantidad) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const productoEnCarrito = this.registroProductos[sku];
          if (productoEnCarrito) {
            if (cantidad < productoEnCarrito.cantidad) {
              productoEnCarrito.cantidad -= cantidad;
              this.precioTotal -= productoEnCarrito.precio * cantidad;
              resolve("Producto eliminado parcialmente");
            } else if (cantidad >= productoEnCarrito.cantidad) {
              const index = this.productos.findIndex((producto) => producto.sku === sku);
              this.productos.splice(index, 1);
              this.categorias = [...new Set(this.productos.map((producto) => producto.categoria))];
              this.precioTotal -= productoEnCarrito.precio * productoEnCarrito.cantidad;
              delete this.registroProductos[sku];
              resolve("Producto eliminado completamente");
            }
          } else {
            reject(`Producto ${sku} no encontrado`);
          }
        });

        });
    }
   
} 