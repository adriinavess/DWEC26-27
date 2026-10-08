const nombre = 'Adrian';
let edad = 22;
const tieneMascota = false;

edad = 23;
// tieneMascota no se puede cambiar ya que es const

console.log(nombre, typeof nombre);
console.log(edad, typeof edad);
console.log(tieneMascota, typeof tieneMascota);

const mascotaTexto = tieneMascota ? "tiene mascota" : "no tiene mascota";

const frase = nombre + " tiene " + edad + " años y " + mascotaTexto;
console.log(frase);