export type SidebarItem = {
  name: string;
  itemCount: number;
  url: string;
};

export type Sidebar = {
  categories: SidebarItem[];
  brands: SidebarItem[];
};
