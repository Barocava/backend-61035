const socketClient = io();
const products = document.getElementById('productos')

socketClient.on('message', (message)=>{
    //location.reload();
    console.log(message);
    let infoProducts = '';
    message.map((cart)=>{
        infoProducts += `<h2>Carrito ${cart.id}:</h2>`
        cart.products.map((prod) => {
            infoProducts += `<p>Id del producto ${prod.id} / Cantidad ${prod.quantity} </p>`
        })
        infoProducts += `<br>`;
    })
    products.innerHTML = infoProducts
})