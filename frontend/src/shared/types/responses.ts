export type ListMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type List<Item> = {
  items: Item[];
  meta: ListMeta;
};
