"use client";

import { useState } from "react";

export default function List() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];

  let [countList, setCountList] = useState([0, 0, 0]);

  return (
    <div>
      <h4 className="title">상품 목록</h4>
      {상품.map((e, i) => {
        return (
          <div className="food" key={i}>
            <img src={`/food${i}.png`} className="food-img" />
            <h4>{e} $40</h4>
            <button
              onClick={() => {
                let copy = [...countList];
                copy[i]--;
                setCountList(copy);
              }}
            >
              -
            </button>
            <span> {countList[i]} </span>
            <button
              onClick={() => {
                let copy = [...countList];
                copy[i]++;
                setCountList(copy);
              }}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
