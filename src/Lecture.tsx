import React from "react";
import { useLectureState } from "./sample.store";

export function Lecture() {
  const lecture = useLectureState();

  return (
    <>
      <span>{lecture.title}</span>
    </>
  );
}
