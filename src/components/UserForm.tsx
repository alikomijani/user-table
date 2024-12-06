import { useEffect, useState } from "react";
import z from "zod";
import { User } from "./UsersTable";
import classes from "./user-from.module.css";
import tableClasses from "./user-table.module.css";
type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  currentUser: User | undefined;
};

const UserSchema = z.object({
  name: z
    .string({
      required_error: "تو رو خدا اسمت رو به من بگو",
    })
    .min(3, { message: "نام انتخابی بسیار کوچک است" })
    .max(16, { message: "چه خبرته؟؟؟؟" }),
  lastName: z
    .string({
      required_error: "تو رو خدا فامیلیت هم رو به من بگو",
    })
    .min(3, { message: "فامیلی انتخابی بسیار کوچک است" })
    .max(16, { message: "چه خبرته؟؟؟؟" }),

  email: z.string().email("داداش ایمیل وارد کن نه چیز دیگه!"),
});
export default function UserForm({ onSubmit, currentUser }: Props) {
  const [errors, setErrors] = useState<any>({});
  const [user, setUser] = useState<Omit<User, "id">>({
    name: "",
    lastName: "",
    email: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = UserSchema.safeParse(user);
    if (!err.success) {
      setErrors(err.error.flatten().fieldErrors);
    }
  };
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit} className={classes.card}>
      <div className="flex flex-col gap-3 p-2">
        <div className={tableClasses.card}>
          <label htmlFor="name">name: </label>
          <input
            className="block px-2 py-1 border"
            type="text"
            id="name"
            onChange={handleChangeInput}
            name="name"
            placeholder="name"
            value={user.name}
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="lastName">lastName: </label>
          <input
            className="block px-2 py-1 border"
            onChange={handleChangeInput}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="lastName"
            value={user.lastName}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName}</span>
          )}
        </div>

        <div>
          <label htmlFor="email">email: </label>
          <input
            className="block px-2 py-1 border"
            onChange={handleChangeInput}
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={user.email}
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
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
