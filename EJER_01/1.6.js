const cursos = [{
    nombre: "DWEC",
    profesor: "Pablo",
    estudiantes: [{
        nombre: "Adrian",
        calificacion: 5
    }, {
        nombre: "Saul",
        calificacion: 1
    }, {
        nombre: "Paco",
        calificacion: 10
    }]
},{
    nombre: "DWES",
    profesor: "Natalia",
    estudiantes: [{
        nombre: "Adrian",
        calificacion: 10
    }, {
        nombre: "Saul",
        calificacion: 10
    }, {
        nombre: "Paco",
        calificacion: 10
    }]
},{
    nombre: "DAW",
    profesor: "Marco",
    estudiantes: [{
        nombre: "Adrian",
        calificacion: 5
    }, {
        nombre: "Saul",
        calificacion: 1
    }, {
        nombre: "Paco",
        calificacion: 10
    }]
},{
    nombre: "DIW",
    profesor: "Daniel",
    estudiantes: [{
        nombre: "Adrian",
        calificacion: 5
    }, {
        nombre: "Saul",
        calificacion: 1
    }, {
        nombre: "Paco",
        calificacion: 10
    }]
}]

const resumenCursos = cursos.map(curso => {
    const sumaCalificaciones = curso.estudiantes.reduce((suma, estudiante) => suma + estudiante.calificacion, 0
    // con el map recorro el curso y creo una constante sumaCalificaciones
    // hago un reduce que recorre el array con una variable suma que es el acumulador y estudiante que es el estudiante que esta recorriendo
    // el cero significa que la cuenta empieza en cero y empieza a sumar
);
const promedioCalificaciones = sumaCalificaciones / curso.estudiantes.length;
// dividimos toda la suma entre los estudiantes que haya y devolvemos el resultado
return {
    nombreCurso: curso.nombre,
    promedioCalificaciones: promedioCalificaciones
};
});
console.log(resumenCursos);

const cursosDestacados = resumenCursos.filter(resumenCurso => resumenCurso.promedioCalificaciones >= 7);

cursosDestacados.forEach(curso => console.log("📘 El curso " + curso.nombreCurso + " tiene un promedio de " + curso.promedioCalificaciones +  " y es considerado destacado."))

cursos.forEach(curso => {
    const notasMalas = curso.estudiantes.some(
        estudiante => estudiante.calificacion < 4
    );
    if (notasMalas) {
        console.log("⚠️ Atención: En el curso " + curso.nombre + " hay estudiantes con calificaciones muy bajas.")
    };
});