import profile_example from "../assets/profile_example_img.png";

const CTFWriterInfo = () => {
  return (
    <div>
      <div className="writer_info_container">
        <h3>출제자 정보</h3>
        <div className="writer_info_box">
          <div>
            <img src={profile_example} alt="profile_example"></img>
          </div>
          <div>
            <div>이미래</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFWriterInfo;
