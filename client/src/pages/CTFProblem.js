const CTFProblem = ({
  id,
  date,
  img,
  ctf_name,
  ctf_start,
  ctf_fin,
  profile_img,
  profile_name,
  profile_position,
  onBack,
  ctf_description,
}) => {
  const data = [
    {
      ctf_id: 1,
      ctf_chall_id: 1,
      challenge_title: "string",
      challenge_type: "Crypto",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 2,
      challenge_title: "string",
      challenge_type: "System",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 3,
      challenge_title: "string",
      challenge_type: "Web",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 4,
      challenge_title: "string",
      challenge_type: "Forensics",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 5,
      challenge_title: "string",
      challenge_type: "Reversing",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 1,
      ctf_chall_id: 5,
      challenge_title: "string",
      challenge_type: "Misc",
      challenge_pts: 100,
      solve: false,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 1,
      challenge_title: "string",
      challenge_type: "Crypto",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 2,
      challenge_title: "string",
      challenge_type: "System",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 3,
      challenge_title: "string",
      challenge_type: "Web",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 4,
      challenge_title: "string",
      challenge_type: "Forensics",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 5,
      challenge_title: "string",
      challenge_type: "Reversing",
      challenge_pts: 100,
      solve: true,
    },
    {
      ctf_id: 2,
      ctf_chall_id: 5,
      challenge_title: "string",
      challenge_type: "Misc",
      challenge_pts: 100,
      solve: true,
    },
  ];
  return (
    <div>
      <div className="ctf_problem_container">
        <div className="ctf_problem_title_container">
          <h2 className="ctf_problem_title">{ctf_name}</h2>
          <div className="ctf_problem_date">
            <p className="ctf_problem_start_time">{ctf_start}</p>
            <p>-</p>
            <p className="ctf_problem_fin_time">{ctf_fin}</p>
          </div>
          <div className="ctf_problem_go_back_container">
            <button onClick={onBack} className="ctf_problem_go_back">
              뒤로가기
            </button>
          </div>
        </div>
        <div className="ctf_problem_area">
          <div className="system_hacking_conatiner">
            <h3>시스템 해킹</h3>
          </div>
          <div className="reversing_container">
            <h3>리버싱</h3>
          </div>
          <div className="web_hacking_container">
            <h3>웹 해킹</h3>
          </div>
          <div className="crypto_container">
            <h3>암호학</h3>
          </div>
          <div className="forensic_container">
            <h3>포렌식</h3>
          </div>
          <div className="msic_container">
            <h3>기타</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFProblem;
