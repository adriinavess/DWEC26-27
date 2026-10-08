const ciudades = ["Madrid", "Buenos Aires", "Tokio", "Nueva York", "Paris"];

ciudades.push("Roma");

const ciudadesMayusculas = ciudades.map(ciudad => ciudad.toUpperCase());
// El map recorre cada elemento del array ciudades y luego cada ciudad la convierte en mayusculas

const ciudadesFiltradas = ciudades.filter(ciudad => ciudad.length > 6);
// El filter recorre cada ciudad y la filtra por cual tiene mas de 6 caracteres
console.log(ciudades);
console.log(ciudadesMayusculas);
console.log(ciudadesFiltradas);
