const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    anio: 1998,
    estaDisponible: false
};

console.table(coche);

const {marca} = coche;
const {modelo} = coche;
console.log(marca);
console.log(modelo);

coche.estaDisponible = true;
coche.color = "blanco";
delete coche.anio;

console.table(coche);