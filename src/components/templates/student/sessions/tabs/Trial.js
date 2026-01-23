import React from "react";
import { Card, CardMobile } from "../commonUtils";

const Trial = ({ width, arr }) => {
  if (!Array.isArray(arr)) arr = [];
  const today = new Date();

  const trialArr = arr
    .filter(i => i.isFree && new Date(i.from) >= today)
    .sort((a, b) => new Date(a.from) - new Date(b.from));

  return (
    <>
      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {trialArr.length ? (
            trialArr.map((item, i) => <Card key={i} width={width} cardInfo={item} />)
          ) : (
            <div style={{ textAlign: "center" }}>No Trial Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {trialArr.length ? (
            trialArr.map((item, i) => <CardMobile key={i} width={width} cardInfo={item} />)
          ) : (
            <div style={{ textAlign: "center" }}>No Trial Sessions</div>
          )}
        </div>
      )}
    </>
  );
};

export default Trial;
