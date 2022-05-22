import { proxy } from "./store";

export interface Image {
  url: string;
}

export const image = proxy<Image>({
  url: ""
});

export function changeImage() {
  if (image.url) {
    image.url = "";
    return;
  }
  image.url =
    "https://image.mysuni.sk.com/suni-asset/thumb/20220303/62205d46d2274a0001805be5.png";
}
