export interface NewUserI {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }
  
  export interface UserI {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    isValidPassword: (password: string) => Promise<boolean>;
  }

  export interface User {
    _id?: string;
  }

  export interface UserQuery {
    username?: string;
    email?: string;
  }