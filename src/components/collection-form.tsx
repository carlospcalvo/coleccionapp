import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { Collection, CollectionFormData } from "~/types/collection";

interface CollectionFormProps {
  onSubmit: (data: CollectionFormData) => void;
  onCancel: () => void;
  initialData?: Collection | null;
}

export default function CollectionForm({
  onSubmit,
  onCancel,
  initialData = null,
}: CollectionFormProps) {
  const [name, setName] = useState<string>(initialData?.name ?? "");
  const [description, setDescription] = useState<string>(
    initialData?.description ?? "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, userId: "TEST" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Collection Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
