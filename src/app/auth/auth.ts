export interface ISession {
  id: string;
  username: string;
  email: string;
  token: string;
};

export interface ICreateUser {
  fullname: string;
  email: string;
  password: string;
}