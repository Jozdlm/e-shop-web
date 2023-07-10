export interface Address {
  recipient: {
    first_name: string;
    last_name: string;
  },
  phone: string;
  country: string;
  state: string;
  city: string;
  exact_address: string;
  shipping_instructions: string;
}
