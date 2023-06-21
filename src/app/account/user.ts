export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  phone: Phone;
  address: Address;
}

interface Phone {
  code: number;
  number: string;
}

interface Address {
  country: string;
  state: string;
  city: string;
  exact_address: string;
}