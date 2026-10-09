// ================================================================
// RETO 3 · MÉTODOS DE ARRAY                         (escribir funciones)
// ================================================================

// 3.1 nombresCaros
export const nombresCaros = (productos, minimo) => {
  return productos
      .map(producto => producto.nombre) 
      .sort((a,b) => a.precio - b.precio);

      
};

// 3.2 totalInventario
export const totalInventario = (productos) => {
  return productos.reduce((total, producto) => {
    return total + producto.precio * producto.unidades
  } ,0)
};

// 3.3 agruparPorCategoria
export const agruparPorCategoria = (productos) => {

};

// 3.4 productoMasBarato
export const productoMasBarato = (productos) => {
  return productos.reduce((masBarato, producto) =>
    producto.precio < masBarato.precio ? producto : masBarato)
};

// 3.5 hayAgotados
export const hayAgotados = (productos) => {
return productos.some(producto => producto.stock === 0);
};
