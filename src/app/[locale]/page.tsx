import { getServerSession } from "next-auth";
import auth from "../../auth";
import Index from "./Index";

export default async function IndexPage() {
  return <Index />;
}
