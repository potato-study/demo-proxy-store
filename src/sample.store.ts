import { store } from "./store.v2";

const [proxy, useSnapshot] = store();

interface Lecture {
  title: string;
  description: string;
}

export const lectureState = proxy<Lecture>({
  title: "강의",
  description: "설명"
});

export const useLectureState = () => useSnapshot(lectureState);
