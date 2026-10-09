// ================================================================
// RETO 1 · CORREGIR MÉTODOS DE ARRAY                (corregir código)
// ================================================================

export const ordenarNumeros = (numeros) => {
  return numeros.sort((a,b) => a.numero - b.numero);
};

export const duplicarPrecios = (precios) => {
  return precios.map((precio) => {
    precio * 2;
  });
};

export const ultimos = (lista, cantidad) => {
  return lista.splice(-cantidad);
};

export const primerPar = (numeros) => {
  const par = numeros.find((numero) => numero % 2 === 0) 
  return numeros ? par : 'ninguno'; 
};

export const sumaTotal = (numeros) => {
  return numeros.reduce((acumulado, numero) => acumulado + numero, 0);
};
