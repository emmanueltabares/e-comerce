export interface NewUserI {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    direction: {
      calle: string,
      altura: string,
      cp: string,
      piso: string,
      depto: string,
    }
    admin: boolean,
  }

  export interface UserI {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    admin: boolean;
    calle: string;
    altura: string;
    codigoPostal: string;
    piso?: string;
    depto?: string;
    isValidPassword: (password: string) => Promise<boolean>;
  }

  export interface User {
    _id?: string;
  }

  export interface UserQuery {
    username?: string;
    email?: string;
  }

  export interface UserOrder {
    _id: string;
    nombre?: string;
    email: string;
    telefono: string;
    calle: string;
    altura: string;
    codigoPostal: string;
    piso: string;
    depto: string;
  }