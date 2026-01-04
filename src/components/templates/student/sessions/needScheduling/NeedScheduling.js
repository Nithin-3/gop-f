import React from "react";
import { Card, CardMobile } from "../commonUtils";

const NeedScheduling = ({ width, arr }) => {
  if (!Array.isArray(arr)) arr = [];

  arr = arr.filter((item) => item.status === "Need Scheduling");

  return (
    <>
      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {arr.length ? (
            arr.map((item, i) => <Card key={i} width={width} cardInfo={item} />)
          ) : (
            <div style={{ textAlign: "center" }}>No Need Scheduling Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr.length ? (
            arr.map((item, i) => <CardMobile key={i} width={width} cardInfo={item} />)
          ) : (
            <div style={{ textAlign: "center" }}>No Need Scheduling Sessions</div>
          )}
        </div>
      )}
    </>
  );
};

export default NeedScheduling;
