import { proxy } from "./store";

export interface User {
  name: string;
  age: number;
}

export const user = proxy<User>({
  name: "동구",
  age: 31
});

export function changeName() {
  if (user.name === "동구") {
    user.name = "상근";
    return;
  }
  user.name = "동구";
}
