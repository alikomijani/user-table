import { User } from "../components/UsersTable";

type Action =
  | {
      type: "ADD" | "UPDATE";
      payload: User;
    }
  | {
      type: "DELETE";
      payload: number;
    };

export function userReducer(state: User[], action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      const id = Math.max(...state.map((user) => user.id), 0) + 1;
      return [...state, { ...payload, id }];
    case "UPDATE":
      return state.map((user) => (user.id === payload.id ? payload : user));
    case "DELETE":
      return state.filter((user) => user.id !== payload);
  }
}
