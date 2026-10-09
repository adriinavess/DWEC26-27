// ================================================================
// RETO 4 · PILA Y COLA CON ARRAYS                   (escribir funciones)
// ================================================================

// 4.1 atenderTurnos
export const atenderTurnos = (cola, cantidad) => {
  return cola.shift(cantidad)
};

// 4.2 deshacerUltimas
export const deshacerUltimas = (historial, cantidad) => {
return historial.shift(cantidad)

}
