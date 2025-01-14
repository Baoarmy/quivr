import axios from "axios";
import { Document } from "../types";
import { useSupabase } from "../../supabase-provider";

interface DocumentDataProps {
  documentName: string;
}

const DocumentData = async ({ documentName }: DocumentDataProps) => {
  const { supabase, session } = useSupabase();
  if (!session) {
    throw new Error('User session not found');
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/explore/${documentName}`,
    {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
    }
  );
  const documents = res.data.documents as any[];
  const doc = documents[0];
  return (
    <div className="prose">
      <p>No. of documents: {documents.length}</p>
      {/* {documents.map((doc) => (
        <pre key={doc.name}>{JSON.stringify(doc)}</pre>
      ))} */}
      <div className="flex flex-col gap-2">
        {documents[0] &&
          Object.keys(documents[0]).map((k) => {
            return (
              <div className="grid grid-cols-2 border-b py-2" key={k}>
                <span className="capitalize font-bold">
                  {k.replaceAll("_", " ")}
                </span>
                <span className="">{documents[0][k] || "Not Available"}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DocumentData;
