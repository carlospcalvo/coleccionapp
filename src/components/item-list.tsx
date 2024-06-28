"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { api } from "~/utils/api";
import { Item, ItemFormData } from "~/types/item";

interface ItemListProps {
  collectionId: number;
  onBack: () => void;
}

export default function ItemList({ collectionId, onBack }: ItemListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const utils = api.useUtils();
  const items = api.items.getByItemId.useQuery({ id: collectionId });
  const createItem = api.items.create.useMutation({
    onSuccess: () => utils.items.getByItemId.invalidate({ id: collectionId }),
  });
  const updateItem = api.items.update.useMutation({
    onSuccess: () => utils.items.getByItemId.invalidate({ id: collectionId }),
  });
  const deleteItem = api.items.delete.useMutation({
    onSuccess: () => utils.items.getByItemId.invalidate({ id: collectionId }),
  });

  const handleCreateItem = async (data: ItemFormData) => {
    await createItem.mutateAsync({ ...data, collectionId });
    setIsFormOpen(false);
  };

  const handleUpdateItem = async (id: number, data: ItemFormData) => {
    await updateItem.mutateAsync({ id, ...data });
    setEditingItem(null);
  };

  const handleDeleteItem = async (id: number) => {
    await deleteItem.mutateAsync({ id });
  };

  if (items.isLoading) return <div>Loading...</div>;
  if (items.error) return <div>Error: {items.error.message}</div>;

  return (
    <div>
      <Button onClick={onBack}>Back to Collections</Button>
      <Button onClick={() => setIsFormOpen(true)}>Create Item</Button>
      {isFormOpen && (
        <div>
          {/* Implement ItemForm component similar to CollectionForm */}
          <h2>Create New Item</h2>
          {/* Add form fields for item creation */}
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.data?.map((item: Item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setEditingItem(item)}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {editingItem && (
        <div>
          {/* Implement ItemForm component similar to CollectionForm */}
          <h2>Edit Item</h2>
          {/* Add form fields for item editing */}
        </div>
      )}
    </div>
  );
}
