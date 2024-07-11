export interface Collection {
  id: number | null;
  userId: string | null;
  name: string | null;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CollectionWithItemCount extends Collection {
  itemCount: number;
}

export interface CollectionFormData {
  name: string;
  description: string | undefined;
  userId: string;
}
