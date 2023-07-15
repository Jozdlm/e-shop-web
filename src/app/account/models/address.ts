export interface Address {
  recipient: {
    first_name: string;
    last_name: string;
  },
  phone: {
    calling_code: string;
    number: string;
  };
  country: string;
  state: string;
  city: string;
  exact_address: string;
  shipping_instructions: string;
}
