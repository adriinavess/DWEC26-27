const producto = {
    nombre: "producto",
    precio: 20
};

const cliente = {
    nombreCliente: "Adrian",
    esPremium: true
};

const pedido = {
    ...producto,
    ...cliente
};

console.log(pedido);

const cliente2 = {
    nombre: "Pedro"
};

const pedido2 = {
    ...producto,
    ...cliente2
};

console.log(pedido2);
// El nombre de cliente2 se sobreescribe de producto
