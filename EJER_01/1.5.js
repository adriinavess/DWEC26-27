const estudiantes = [
{
    nombre: "Adrian",
    apellidos: "Naves de la Fuente",
    calificacion: 5,
    aprobado: true
},
{
    nombre: "Paco",
    apellidos: "Gonzalez Fernandez",
    calificacion: 10,
    aprobado: true
},
{
    nombre: "Saul",
    apellidos: "Garcia Diaz",
    calificacion: 1,
    aprobado: true
}
]
let id = 1;
const estudiantesId = estudiantes.map(estudiante => ({
    ...estudiante,
    id: id++
}));

const aprobado = estudiantes.filter(estudiante => estudiante.calificacion >= 5);
// Esta constante filtra los estudiantes con un 5 o mas
aprobado.forEach(estudiante => {console.log("¡Felicidades " + estudiante.nombre + ", has aprobado con " + estudiante.calificacion)});
// Este foreEach recorre el array para imprimir el mensaje

estudiantes.forEach(estudiante => {
    const aprobadoEsperado = estudiante.calificacion >= 5;
    // Recorremos el array creando una variable que te diga si se espera que está aprobado
    if (estudiante.aprobado !== aprobadoEsperado) {
        // si no coinciden las dos sentencias imprime el mensaje
        // en el if si usamos != el if para comparar puede convertir los valores de tipo, con !== no puede hacerlo
        console.log("⚠️ Incoherencia en el registro de " + estudiante.nombre + ": calificación = " + estudiante.calificacion + ", aprobado = " + estudiante.aprobado);
    }
})
