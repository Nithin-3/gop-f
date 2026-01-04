import React from "react";
import { Card, CardMobile } from "../commonUtils";

const Cancelled = ({ width, arr }) => {
  if (!Array.isArray(arr)) arr = [];

  arr = arr.filter((item) => item.status === "Cancelled");

  return (
    <>
      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {arr.length ? (
            arr.map((item, i) => (
              <Card key={i} width={width} cardInfo={item} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Cancelled Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr.length ? (
            arr.map((item, i) => (
              <CardMobile key={i} width={width} cardInfo={item} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Cancelled Sessions</div>
          )}
        </div>
      )}
    </>
  );
};

export default Cancelled;
