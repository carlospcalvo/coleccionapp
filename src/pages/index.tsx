import CollectionList from "~/components/collection-list";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Collections</h1>
      <CollectionList />
    </div>
  );
}
