import axios from "axios";
import { User } from "../components/UsersTable";

export async function getUsers() {
  return await axios.get<User[]>("http://localhost:3000/users");
}
export async function createUser(data: User) {
  return await axios.post<User>("http://localhost:3000/users", data);
}
