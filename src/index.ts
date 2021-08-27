import Server from './services/server';

const port = process.env.PORT || 8080;

Server.listen(port, () => console.log(`Server up in port ${port}`));