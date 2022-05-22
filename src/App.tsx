import { Avatar } from "./Avatar";
import { Lecture } from "./Lecture";
import { useSnapshot } from "./store";
import "./styles.css";
import { changeName, user } from "./user.store";

export default function App() {
  const userSnapshot = useSnapshot(user);

  const onClick = () => {
    changeName();
  };

  return (
    <div className="App">
      <h1>이름: {userSnapshot?.name}</h1>
      <h2>나이: {userSnapshot?.age}</h2>
      <button onClick={onClick}>이름 변경</button>
      <Avatar />
      <Lecture />
    </div>
  );
}
