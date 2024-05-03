import React from "react";
import { useParams } from "react-router-dom";
import WargameDetailList from "../components/WargameDetailList";

const WargameDetail = () => {
  let { id } = useParams();

  const wargame_data = [
    {
      id: 7,
      quiz_description:
        "제 자동차에 문제가 생겨 1급 공업사에 방문했어요!\n 정비사가 자동차를 점검하면서 주행 데이터를 기록하여 로그 데이터 파일로 제공해주셨는데,\n 쉽게 알아볼 수 없는 데이터에요.. 이 로그 데이터를 분석할 수 있을까요?\n 플래그는 EWHA{flag content} 형식입니다.",
      quiz_flag: "EWHA{1234567890}",
      quiz_title: "7번 문제",
      quiz_level: "low",
      quiz_type: "web",
      quiz_file: "null",
      author: "서아영",
    },
    {
      id: 1,
      quiz_description: "제 노트북에 문제가 발생했어요!",
      quiz_flag: "EWHA{0987654321}",
      quiz_title: "1번 문제",
      quiz_level: "high",
      quiz_type: "forensic",
      quiz_file: "null",
      author: "1",
    },
  ];

  const selectedWargame = wargame_data.find((item) => item.id === parseInt(id));

  return (
    <div className="wargame_info_container">
      <h1 className="wargame_detail_title">문제 정보</h1>
      {/* <p className="wargame_info">문제 ID: {id}</p> */}
      <WargameDetailList {...selectedWargame} />
    </div>
  );
};

export default WargameDetail;
