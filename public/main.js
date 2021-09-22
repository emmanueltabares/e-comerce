const socket = io.connect();

newProduct = (e) => {
    e.preventDefault()
    console.log('EJECUTANDO NEWPRODUCT')
    const newProduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    socket.emit('new-product', newProduct);
    return false;
}

socket.on('products', (data) => {
    alert(JSON.stringify(data))
    console.log(data)

});

// Cuando arrancamos pedimos la data que hay actualmente enviando un socket
socket.emit('askData');

function sendData(e) {
  const input = document.getElementById('message');
  socket.emit('new-message', input.value);
}

function render(data) {
  const input2 = document.getElementById('username')
  const html = data
    .map(function (elem, index) {
      return `<div>
                 <strong>Usuario: ${input2.value} => </strong>:
                 <em>${elem.message}</em>
        </div>`;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) {
  render(data);
});
 





