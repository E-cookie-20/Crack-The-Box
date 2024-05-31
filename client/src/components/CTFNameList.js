const CTFNameProblem = ({
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
    <div>
      <div className="ctf_name_container">
        <div>
          <img className="ctf_name_img" alt="ctf_img" src={img}></img>
        </div>
        <div>{ctf_name}</div>
        <div>&gt;</div>
      </div>
    </div>
  );
};

export default CTFNameProblem;
