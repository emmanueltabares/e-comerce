const socket = io.connect('http://localhost:8081', { forceNew: true});

const FORM_CHAT = document.getElementsByTagName('input')
FORM_CHAT.addEventListener('submit', (e) => {
    console.log(FORM_CHAT)
})

socket.emit('askMessages');

socket.on('new-message', function (data) {
    const newMessage = {

        email: msg.email,
        nombre: msg.nombre || faker.name.firstName(),
        apellido: msg.apellido || faker.name.lastName(),
        edad: msg.edad || faker.datatype.number(90),
        alias: msg.alias || faker.name.jobArea(),
        avatar: msg.avatar || faker.image.avatar(),
        message: msg.mensaje || faker.lorem.sentence(),
        timestamp: m 
    }
});