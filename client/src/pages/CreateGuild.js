import PhotoUpload from "../components/PhotoUpload";

const CreateGuild = () => {
  return (
    <div>
      <div className="create_guild_container">
        <h2>길드 생성</h2>
        <div className="create_guild_sub_container">
          <h2 className="create_guild_txt">길드장 길드 생성</h2>
          <div className="create_guild_photo_container">
            <div>
              <PhotoUpload />
            </div>
            <div className="create_guild_info_container">
              <h3>길드 정보</h3>
              <div className="guild_info_input_container">
                <div className="guild_info_txt">
                  <div>길드 이름</div>
                  <input className="guild_info_input"></input>
                </div>
                <div className="guild_info_txt">
                  <div>길드장</div>
                  <input className="guild_info_input"></input>
                </div>
                <div className="guild_info_txt">
                  <div>개설일</div>
                  <input className="guild_info_input" type="date"></input>
                </div>
              </div>
              <div className="create_guild_btn_container">
                <button className="create_guild_btn_cancel">취소</button>
                <button className="create_guild_btn_create">생성하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGuild;
