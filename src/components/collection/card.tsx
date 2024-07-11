import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import {
  Calendar,
  EllipsisVertical,
  FilePenIcon,
  SquareLibrary,
  Tag,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { CollectionWithItemCount } from "~/types/collection";

interface CollectionCardProps {
  collection: CollectionWithItemCount;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { name, description, itemCount, createdAt } = collection;

  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader className="flex flex-row items-center p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <SquareLibrary className="h-8 w-8" />
          <span>{name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 rounded-full"
            >
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center">
              <FilePenIcon className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center text-red-700 focus:text-red-500">
              <TrashIcon className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-2">
          <p>{description}</p>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{`${itemCount} items`}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {`Creada el ${createdAt?.toLocaleString()}`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        <Button variant="outline" size="sm">
          Ver Collección
        </Button>
      </CardFooter>
    </Card>
  );
}
