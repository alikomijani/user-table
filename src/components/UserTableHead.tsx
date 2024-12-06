import classNames from "classnames";

const DEFAULT_HEADERS = [
  { caption: "ID", sort: true, name: "id" },
  { caption: "Name", sort: true, name: "name" },
  { caption: "Last Name", sort: true, name: "lastName" },
  { caption: "Email", sort: true, name: "email" },
  { caption: "Actions", sort: false, name: "actions" },
];
type Props = {
  sort: string;
  onSort: (sort: string) => void;
};
function UserTableHead({ sort, onSort }: Props) {
  return (
    <thead>
      <tr>
        {DEFAULT_HEADERS.map((head) => (
          <th key={head.name} className="border p-2 ">
            <div className="flex text-sm gap-1">
              {head.caption}
              {head.sort ? (
                <>
                  <button
                    disabled={"-" + head.name === sort}
                    onClick={() => onSort("-" + head.name)}
                    className={classNames("px-2 border", {
                      "bg-blue-400": "-" + head.name === sort,
                    })}
                  >
                    ↑
                  </button>
                  <button
                    className={classNames("px-2 border", {
                      "bg-blue-400": head.name === sort,
                    })}
                    disabled={head.name === sort}
                    onClick={() => onSort(head.name)}
                  >
                    ↓
                  </button>
                </>
              ) : null}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default UserTableHead;
