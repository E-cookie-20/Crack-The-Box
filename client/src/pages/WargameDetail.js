import React from "react";
import { useParams } from "react-router-dom";

const WargameDetail = () => {
  let { id } = useParams();

  return (
    <div className="wargame_info">
      <h1 className="wargame_info">문제 상세 정보</h1>
      <p className="wargame_info">문제 ID: {id}</p>
    </div>
  );
};

export default WargameDetail;
