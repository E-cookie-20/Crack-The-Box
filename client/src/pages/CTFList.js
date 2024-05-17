const CTFList = ({
  id,
  state,
  date,
  img,
  ctf_name,
  profile_img,
  profile_name,
  profile_position,
}) => {
  return (
    <div className="ctf_box">
      <div className="img_container">
        <img className="ctf_cover_img" src={img}></img>
      </div>
      <div className="text_container">
        <div className="date_info">일시: {date}</div>
        <div className="name_info">{ctf_name}</div>
        <div className="generator_info">
          <div>
            <img src={profile_img} alt="profile img"></img>
          </div>
          <div>
            <div className="profile_name">{profile_name}</div>
            <div className="profile_position">{profile_position}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFList;
