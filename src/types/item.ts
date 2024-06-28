export interface Item {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  collectionId: number;
}

export interface ItemFormData {
  name: string;
  description: string;
}
