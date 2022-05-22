import React from "react";
import { changeImage, image } from "./image.store";
import { useSnapshot } from "./store";
import { user } from "./user.store";

export function Avatar() {
  const userSnapshot = useSnapshot(user);
  const imageSnapshot = useSnapshot(image);

  const onClick = () => {
    changeImage();
  };

  return (
    <div>
      <img src={imageSnapshot?.url} alt="" />
      <span>{userSnapshot?.name}</span>
      <button onClick={onClick}>이미지 변경</button>
    </div>
  );
}
