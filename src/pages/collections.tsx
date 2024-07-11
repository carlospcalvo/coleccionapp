import { ReactElement } from "react";
import PrivateLayout from "~/components/layouts/private";
import CollectionList from "~/components/collection-list";

export default function Collections() {
  return <CollectionList />;
}

Collections.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
