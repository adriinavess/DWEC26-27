// ================================================================
// RETO 2 · switch Y BUCLES                          (escribir funciones)
// ================================================================


// 2.1 descuentoPorCategoria
export const descuentoPorCategoria = (categoria) => {
  switch (categoria) {
    case 'estudiante': 0.2;
    case 'jubilado': 0.2;
    case 'familiaNumerosa': 0.3;
    case 'socio': 0.1;
    case 'vip': 0;
  }
};

// 2.2 sumarHastaLimite
export const sumarHastaLimite = (numeros, limite) => {
  for (i = 0; i <= limite; i+numeros) {
    numeros = i;
  }
};

// 2.3 contarVocales
export const contarVocales = (texto) => {
  // TU CÓDIGO AQUÍ
};
