export interface Collection {
  id: number;
  userId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CollectionFormData
  extends Omit<
    Collection,
    "id" | "userId" | "createdAt" | "updatedAt" | "description"
  > {
  description: string | undefined;
}
