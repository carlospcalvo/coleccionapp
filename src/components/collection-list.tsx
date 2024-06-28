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
import CollectionForm from "./collection-form";
import { api } from "~/utils/api";
import { Collection, CollectionFormData } from "~/types/collection";
import ItemList from "./item-list";

export default function CollectionList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const utils = api.useUtils();
  const collections = api.collections.getAll.useQuery();
  const createCollection = api.collections.create.useMutation({
    onSuccess: () => utils.collections.getAll.invalidate(),
  });
  const updateCollection = api.collections.update.useMutation({
    onSuccess: () => utils.collections.getAll.invalidate(),
  });
  const deleteCollection = api.collections.delete.useMutation({
    onSuccess: () => utils.collections.getAll.invalidate(),
  });

  const handleCreateCollection = async (data: CollectionFormData) => {
    await createCollection.mutateAsync({
      ...data,
      userId: "TEST", // TODO: Replace with actual user ID
    });
    setIsFormOpen(false);
  };

  const handleUpdateCollection = async (
    id: number,
    data: CollectionFormData,
  ) => {
    await updateCollection.mutateAsync({ id, ...data });
    setEditingCollection(null);
  };

  const handleDeleteCollection = async (id: number) => {
    await deleteCollection.mutateAsync({ id });
  };

  if (collections.isLoading) return <div>Loading...</div>;
  if (collections.error) return <div>Error: {collections.error.message}</div>;
  if (selectedCollection) {
    return (
      <ItemList
        collectionId={selectedCollection.id}
        onBack={() => setSelectedCollection(null)}
      />
    );
  }

  return (
    <div>
      <Button onClick={() => setIsFormOpen(true)}>Create Collection</Button>
      {isFormOpen && (
        <CollectionForm
          onSubmit={handleCreateCollection}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections.data?.map((collection: Collection) => (
          <Card
            className="cursor-pointer"
            key={collection.id}
            onClick={(e) => {
              if (e.defaultPrevented) return; // Exits here if event has been handled
              e.preventDefault();
              setSelectedCollection(collection);
            }}
          >
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{collection.description}</p>
              <div className="mt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCollection(collection);
                  }}
                >
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the collection and all its items.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCollection(collection.id)}
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
      {editingCollection && (
        <CollectionForm
          initialData={editingCollection}
          onSubmit={(data) =>
            handleUpdateCollection(editingCollection.id, data)
          }
          onCancel={() => setEditingCollection(null)}
        />
      )}
    </div>
  );
}
