const GuildJoinPopup = ({ onClose }) => {
  return (
    <div>
      <div className="guild-join-popup">
        <div className="guild-join-popup-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <div className="guild-join-popup-text"></div>
        </div>
      </div>
    </div>
  );
};

export default GuildJoinPopup;
