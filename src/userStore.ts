import { proxy } from "./proxy";

interface User {
  name: string;
  age: number;
}

export const user = proxy<User>({
  name: "동구",
  age: 31
});
