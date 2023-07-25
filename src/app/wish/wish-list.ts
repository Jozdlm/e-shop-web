export interface IWishList {
  id: string;
  count: number;
  items: IWishItem[];
}

export interface IWishItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  img_url: string;
}

export type WishListDto = Omit<IWishList, 'id'>;