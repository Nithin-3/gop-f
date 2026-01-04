import React from "react";
import { Card, CardMobile } from "../commonUtils";

const IssueReported = ({ width, arr }) => {
  if (!Array.isArray(arr)) arr = [];

  return (
    <>
      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {arr.length ? (
            arr.map((item, i) => <Card key={i} width={width} cardInfo={item} />)
          ) : (
            <div style={{ textAlign: "center" }}>No Reported Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr.length ? (
            arr.map((item, i) => <CardMobile key={i} width={width} cardInfo={item} />)
          ) : (
            <div style={{ textAlign: "center" }}>No Reported Sessions</div>
          )}
        </div>
      )}
    </>
  );
};

export default IssueReported;
