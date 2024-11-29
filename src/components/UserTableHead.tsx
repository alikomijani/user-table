import { useState } from "react";

const DEFAULT_HEADERS = ["id", "name", "last name", "email", "actions"];

function UserTableHead() {
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);

  const handleDelete = (key: string) => {
    setHeaders(headers.filter((head) => head !== key));
  };
  return (
    <thead>
      <tr>
        {headers.map((head) => (
          <th key={head} className="border p-2">
            {head.toUpperCase()}
            <button
              onClick={() => handleDelete(head)}
              className="px-2 border m-2"
            >
              *
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default UserTableHead;
