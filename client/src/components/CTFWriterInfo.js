import React, { useState, useEffect } from "react";
import axios from "axios";
import profile_example from "../assets/profile_example_img.png";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook

const CTFWriterInfo = () => {
  const { user } = useAuth(); // Get the user object from useAuth hook
  const [username, setUsername] = useState(""); // State to hold the username

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make sure user is defined before making the API call
        if (user) {
          const response = await axios.get(
            `http://ec2-3-36-34-43.ap-northeast-2.compute.amazonaws.com:8000/users/${user.userId}/`
          );
          if (response.data && response.data.first_name) {
            setUsername(response.data.first_name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData(); // Call fetchUserData function on component mount
  }, [user]); // Depend on user object to refetch data when it changes

  return (
    <div>
      <div className="writer_info_container">
        <h3>출제자 정보</h3>
        <div className="writer_info_box">
          <div>
            <img src={profile_example} alt="profile_example"></img>
          </div>
          <div>
            <div>{username}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFWriterInfo;
