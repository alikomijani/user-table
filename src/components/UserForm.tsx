import { User } from "./UsersTable";
import classes from "./user-from.module.css";
import tableClasses from "./user-table.module.css";
type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  currentUser: User | undefined;
};

export default function UserForm({ onSubmit, currentUser }: Props) {
  return (
    <form onSubmit={onSubmit} className={classes.card}>
      <div className="flex flex-col gap-3 p-2">
        <div className={tableClasses.card}>
          <label htmlFor="name">name: </label>
          <input
            className="block px-2 py-1 border"
            type="text"
            id={"name"}
            name="name"
            placeholder="name"
            defaultValue={currentUser?.name}
          />
        </div>
        <div>
          <label htmlFor="lastName">lastName: </label>
          <input
            className="block px-2 py-1 border"
            type="text"
            id={"lastName"}
            name="lastName"
            placeholder="lastName"
            defaultValue={currentUser?.lastName}
          />
        </div>
        <div>
          <label htmlFor="email">email: </label>
          <input
            className="block px-2 py-1 border"
            type="text"
            id={"email"}
            name="email"
            placeholder="email"
            defaultValue={currentUser?.email}
          />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 border bg-blue-300">
            {currentUser ? "update" : "save"}
          </button>
        </div>
      </div>
    </form>
  );
}
