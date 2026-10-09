// tienda.js
// Ejercicio integrador UT 2.1 + UT 2.2: Tienda de música
//
// Completa cada función. No cambies su nombre ni sus parámetros.
// Comprueba tu trabajo con:  node pruebas.js
// Cuando todo esté en verde:  node main.js
//
// Recuerda: salvo en la PARTE 5, las funciones NO deben modificar
// los arrays que reciben. Si necesitas ordenar, copia primero.

// ================================================================
// PARTE 1 · EL CATÁLOGO
// ================================================================

// 1.1 Convierte la matriz [[nombre, categoria, precio, stock], ...]
//     en un array de objetos { nombre, categoria, precio, stock }.
//     Si lo que recibe no es un array, devuelve [].
export const crearCatalogo = (matriz) => {
    // con este if preguntamos si lo que recibe es un array
  if(!Array.isArray(matriz)) {
    return [];
  }
  // convierte la matriz en un array de objetos
  return matriz.map(fila => ({
    nombre: fila[0],
    categoria: fila[1],
    precio: fila[2],
    stock: fila[3]
  })
  )
};

// 1.2 Devuelve un catálogo NUEVO con las novedades (que llegan en
//     formato matriz) añadidas al final.
export const ampliarCatalogo = (catalogo, matrizNovedades) => {
    return catalogo.concat(crearCatalogo(matrizNovedades));
};

// 1.3 Devuelve los nombres de todos los productos en orden
//     alfabético, respetando las tildes ('Vinilo Ópera' va tras 'Vinilo Jazz').
export const nombresOrdenados = (catalogo) => {
    return catalogo
        .map(producto => producto.nombre) // crea un array de todos los nombres de producto
        .sort((a,b) => a.localeCompare(b)) // sort ordena los elementos de un array y localeCompare lo hace alfabeticamente y respetando todo
};

// 1.4 Devuelve una COPIA del catálogo ordenada por precio,
//     de menor a mayor o, si descendente es true, de mayor a menor.
export const ordenarPorPrecio = (catalogo, descendente = false) => {
    // con spread metemos el catalogo en resultado y con sort ordenamos ese resultado
  let resultado = [...catalogo].sort((a,b) => a.precio - b.precio);
    // si descendente es true lo ordenamos al reves
  if (descendente === true) {
    resultado.reverse;
  }
  return resultado;
};

// 1.5 Devuelve los nombres de los tres productos más baratos.
export const tresMasBaratos = (catalogo) => {
  return ordenarPorPrecio(catalogo) // utilizamos la funcion anterior
            .slice(0,3) // cogemos los 3 primeros objetos del array
            .map(producto => producto.nombre) // y con map sacamos el nombre de los 3
};

// ================================================================
// PARTE 2 · BÚSQUEDAS
// ================================================================

// 2.1 Devuelve el producto con ese nombre, sin distinguir mayúsculas
//     y minúsculas, o undefined si no existe.
export const buscarProducto = (catalogo, nombre) => {
    // find busca el primer objeto que cumpla la condicion
    // utilizamos find para encontrar el objeto, pasamos los dos a minuscula y los comparamos para que el producto sea el que es
  return catalogo.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
};

// 2.2 Devuelve true si existe un producto con ese nombre.
//     Obligatorio: usa includes.
export const existeProducto = (catalogo, nombre) => {
    return catalogo.map(producto => producto.nombre.toLowerCase()).includes(nombre.toLowerCase());
};

// 2.3 Devuelve la posición del producto en el catálogo, o -1.
export const posicionProducto = (catalogo, nombre) => {
    // busca el producto por id y si no devuelve -1
  return catalogo.findIndex(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
};

// 2.4 Devuelve un array con los NOMBRES de los productos sin stock.
export const agotados = (catalogo) => {
  return catalogo
  // filtramos los productos sin stock y con map creamos un nuevo array con sus nombres
    .filter(producto => producto.stock === 0)
    .map(producto => producto.nombre)
};

// 2.5 Devuelve los productos con precio entre minimo y maximo
//     (ambos incluidos).
export const productosEntre = (catalogo, minimo, maximo) => {
    return catalogo.filter(producto => 
        producto.precio >= minimo && producto.precio <= maximo);
};

// ================================================================
// PARTE 3 · CÁLCULOS
// ================================================================

// 3.1 Valor total del almacén: suma de precio × stock.
export const valorAlmacen = (catalogo) => {
    // reduce acumula valores empezando desde 0
  return catalogo.reduce((total, producto) => {
    // multiplicamos precio y stock de cada producto y lo sumamos al total
    return total + producto.precio * producto.stock
  } ,0)
};

// 3.2 Devuelve el producto (el objeto completo) más caro.
export const productoMasCaro = (catalogo) => {
    // con el reduce empezamos en undefined 
    // con una funcion si el precio es mayor que el mas caro pasa a ser el nuevo y si no se mantiene
  return catalogo.reduce((masCaro, producto) =>
    producto.precio > masCaro.precio ? producto : masCaro)
};

// 3.3 Devuelve un objeto con las unidades en stock de cada categoría:
//     { equipos: 7, accesorios: 29, discos: 14 }
export const unidadesPorCategoria = (catalogo) => {
  // Acumulamos en un objeto vacío {} inicial.
  return catalogo.reduce((resultado, producto) => {
    // Si la categoría aún no se ha registrado en el objeto, la inicializamos a 0.
    if(resultado[producto.categoria] === undefined) {
      resultado[producto.categoria] = 0
    }
    // Sumamos el stock del producto a la categoría correspondiente.
    resultado[producto.categoria] += producto.stock

    return resultado
  }, {})
};

// 3.4 Devuelve true si hay AL MENOS un producto agotado.
export const hayAgotados = (catalogo) => {
    // some devuelve true si un elemento del array cumple la condicion
  return catalogo.some(producto => producto.stock === 0);
};

// 3.5 Devuelve true si TODOS los precios son números mayores que 0.
export const preciosValidos = (catalogo) => {
    // every devuelve true si todos los elementos del array cumplen la condicion
  return catalogo.every(producto =>
    typeof producto.precio === 'number' && producto.precio > 0
  );
};

// ================================================================
// PARTE 4 · PEDIDOS
// ================================================================

// 4.1 Convierte el texto 'Lucía|Tocadiscos:1;Vinilo Jazz:2' en:
//     {
//       cliente: 'Lucía',
//       lineas: [
//         { nombre: 'Tocadiscos', cantidad: 1 },
//         { nombre: 'Vinilo Jazz', cantidad: 2 },
//       ],
//     }
//     ¡Ojo! La cantidad debe ser un número, no un string.
export const parsearPedido = (texto) => {
    // Separamos el string en dos partes por el carácter '|': ['Lucía', 'Tocadiscos:1;Vinilo Jazz:2']
  const partes = texto.split('|')
  const cliente = partes[0]

  // Tomamos la segunda parte y la dividimos por ';' para separar cada producto.
  // Luego mapeamos cada sub-string del tipo 'Tocadiscos:1'.
  const lineas = partes[1].split(';').map((linea) => {
    const [nombre, cantidad] = linea.split(':') // Separamos nombre y cantidad por el carácteres ':'

    return {
      nombre: nombre,
      cantidad: Number(cantidad) // Importante: convertimos el string de la cantidad a número.
    }
  })

  // Retornamos el objeto estructurado.
  return {
    cliente,
    lineas
  }
};

// 4.2 Devuelve true si TODOS los productos del pedido existen
//     y tienen stock suficiente.
export const puedeServirse = (catalogo, pedido) => {
  // Comprobamos si CADA línea del pedido se puede atender.
  return pedido.lineas.every((linea) => {
    // Buscamos el producto en el catálogo.
    const producto = catalogo.find((producto) => producto.nombre === linea.nombre)

    // Es válido solo si el producto existe Y su stock es mayor o igual a la cantidad pedida.
    return producto !== undefined && producto.stock >= linea.cantidad
  })
};

// 4.3 Devuelve el importe total del pedido.
export const totalPedido = (catalogo, pedido) => {
  // sumamos todos los importes de cada linea
  return pedido.lineas.reduce((resultado, linea) => {
    // buscamos el producto
    const producto = catalogo.find((producto) => producto.nombre === linea.nombre)
    // devolvemos resultado que empieza en cero + el precio del producto por la cantidad de ellos pedidos
    return resultado + producto.precio * linea.cantidad
  }, 0);
    
};

// 4.4 Devuelve un catálogo NUEVO en el que se ha restado del stock
//     la cantidad pedida de cada producto. El original no cambia.
//     Pista: { ...producto, stock: nuevoStock } crea una copia del objeto.
export const servirPedido = (catalogo, pedido) => {
  // Usamos .map() para iterar sobre los productos y crear un catálogo totalmente nuevo.
  return catalogo.map((producto) => {
    // Comprobamos si este producto del catálogo forma parte de las líneas del pedido.
    const linea = pedido.lineas.find((linea) => linea.nombre === producto.nombre)

    // Si está en el pedido, devolvemos una copia del objeto con el stock actualizado.
    if (linea) {
      return {
        ...producto, // Copiamos las propiedades originales (nombre, categoria, precio)
        stock: producto.stock - linea.cantidad // Sobrescribimos con el nuevo stock reducido
      }
    }

    // Si el producto no estaba en el pedido, lo dejamos intacto.
    return producto
  })
};

// 4.5 Devuelve el ticket del pedido como un único texto:
//     Cliente: Lucía
//     1 x Tocadiscos = 200 €
//     2 x Vinilo Jazz = 60 €
//     TOTAL: 260 €
//     Pista: construye un array de líneas y únelas con '\n'.
export const generarTicket = (catalogo, pedido) => {
  // Mapeamos las líneas del pedido para crear las frases con subtotales por producto.
  const lineas = pedido.lineas.map((linea) => {
    const producto = catalogo.find((producto) => producto.nombre === linea.nombre)
    const importe = producto.precio * linea.cantidad

    return `${linea.cantidad} x ${linea.nombre} = ${importe} €`
  })

  // Añadimos el encabezado al PRINCIPIO del array con .unshift()
  lineas.unshift(`Cliente: ${pedido.cliente}`)

  // Añadimos la línea final de TOTAL al FINAL del array con .push()
  lineas.push(`TOTAL: ${totalPedido(catalogo, pedido)} €`)

  // Unimos todas las líneas del array insertando un salto de línea ('\n') entre cada una.
  return lineas.join('\n')
};

// ================================================================
// PARTE 5 · COLA DE PEDIDOS Y CARRITO CON "DESHACER"
// En esta parte SÍ se modifican los arrays recibidos.
// ================================================================

// 5.1 COLA (el primero que llega es el primero en salir):
//     saca y devuelve el primer pedido de la cola.
export const atenderSiguiente = (cola) => {
  // .shift() elimina y devuelve el PRIMER elemento de un array (comportamiento tipo Queue/FIFO).
  return cola.shift()
};

// 5.2 Coloca el pedido al PRINCIPIO de la cola y devuelve
//     la nueva longitud de la cola.
export const agregarUrgente = (cola, pedido) => {
  // .unshift() inserta al INICIO del array y devuelve la nueva longitud del array.
  return cola.unshift(pedido)
};

// 5.3 Añade el nombre al final del carrito y apunta la acción en el
//     historial: { accion: 'agregar', nombre }
export const agregarAlCarrito = (carrito, historial, nombre) => {
  // Añadimos el artículo al final del carrito.
  carrito.push(nombre)

  // Guardamos en el historial un objeto registrando la acción realizada.
  historial.push({
    accion: 'agregar',
    nombre: nombre
  })
};

// 5.4 Quita la PRIMERA aparición del nombre en el carrito y apunta en
//     el historial: { accion: 'quitar', nombre, posicion }
//     Devuelve true, o false (sin tocar nada) si no estaba.
export const quitarDelCarrito = (carrito, historial, nombre) => {
  // Buscamos la primera posición del artículo en el carrito.
  const posicion = carrito.indexOf(nombre)

  // Si no existe, indexOf devuelve -1; retornamos false sin modificar nada.
  if (posicion === -1) {
    return false
  }

  // .splice(posicion, 1) elimina 1 elemento en la posición dada (muta el carrito).
  carrito.splice(posicion, 1)

  // Registramos en el historial la acción, el nombre y la posición original.
  historial.push({
    accion: 'quitar',
    nombre: nombre,
    posicion: posicion
  })

  return true;
};

// 5.5 PILA (la última acción es la primera en deshacerse):
//     saca la última acción del historial y la revierte:
//     - si fue 'agregar', quita la ÚLTIMA aparición de ese nombre;
//     - si fue 'quitar', vuelve a insertarlo en su posición original.
//     Devuelve true, o false si el historial estaba vacío.
export const deshacer = (carrito, historial) => {
  // Si no hay acciones para deshacer, devuelve false.
  if (historial.length === 0) {
    return false
  }

  // .pop() extrae la ÚLTIMA acción agregada al historial (comportamiento tipo Stack/LIFO).
  const accion = historial.pop()

  // Caso 1: Deshacer un 'agregar'
  if (accion.accion === 'agregar') {
    // Localizamos la ÚLTIMA aparición del artículo introducido.
    const posicion = carrito.lastIndexOf(accion.nombre)

    if (posicion !== -1) {
      carrito.splice(posicion, 1) // Eliminamos esa última entrada del carrito.
    }

    return true
  }

  // Caso 2: Deshacer un 'quitar'
  if (accion.accion === 'quitar') {
    // Usamos .splice() para insertar el elemento de nuevo exactamente en su índice original.
    carrito.splice(accion.posicion, 0, accion.nombre)

    return true
  }

  return false
};

// ================================================================
// PARTE 6 · INFORME FINAL
// ================================================================

// 6.1 Atiende uno a uno (con atenderSiguiente) todos los pedidos de la
//     cola. Si puede servirse, actualiza el catálogo con servirPedido y lo
//     guarda en servidos; si no, en rechazados. Al terminar la cola queda vacía.
//     Devuelve { catalogo, servidos, rechazados }
export const procesarCola = (catalogo, cola) => {
  const servidos = []
  const rechazados = []

  // Mientas queden elementos dentro del array 'cola':
  while (cola.length > 0) {
    // Extraemos el primer pedido disponible.
    const pedido = atenderSiguiente(cola)

    // Si hay stock y productos válidos:
    if (puedeServirse(catalogo, pedido)) {
      catalogo = servirPedido(catalogo, pedido) // Actualizamos el catálogo restando stock
      servidos.push(pedido)                      // Guardamos en la lista de aceptados
    } else {
      rechazados.push(pedido)                    // Guardamos en la lista de rechazados
    }
  }

  // Retornamos el catálogo actualizado y los dos arrays de registro.
  return { catalogo, servidos, rechazados }
};

// 6.2 Recibe un array de pedidos y devuelve los nombres de los productos
//     vendidos, SIN repetidos y en orden alfabético.
export const productosVendidos = (pedidos) => {
  return [...new Set(
    // flatMap recorre los pedidos, extrae las líneas de productos y "aplana" el resultado en un solo array.
    pedidos.flatMap(pedido => pedido.lineas.map(linea => linea.nombre))
  )].sort() 
  // 1. new Set(...) elimina automáticamente los elementos duplicados.
  // 2. [...Set] convierte de nuevo la estructura Set a un Array normal.
  // 3. .sort() los ordena alfabéticamente.
};

// 6.3 Devuelve un array de textos con una barra por producto:
//     'Altavoz: ■■■ (3)'
//     Obligatorio: crea la barra con new Array(...).fill('■')
export const graficoStock = (catalogo) => {
  return catalogo.map(producto =>
    // 1. new Array(producto.stock) crea un array vacío de longitud igual al stock.
    // 2. .fill('■') rellena cada posición con el carácter del bloque.
    // 3. .join('') une todos los bloques en una sola cadena de texto visual.
    `${producto.nombre}: ${new Array(producto.stock).fill('■').join('')} (${producto.stock})`
  )
};
