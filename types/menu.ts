export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}
