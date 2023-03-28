import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Update } from "../../components/update/Update";

const Profile = () => {

  const { currentUser } = useContext(AuthContext);

  const [openUpdate, setOpenUpdate] = useState(false)

  const userId = parseInt(useLocation().pathname.split("/")[2])

  const { isLoading, error, data } = useQuery(['user'], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(['relationship'], () =>
    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation((following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
  },
  {  
      onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['relationship'] })
      }
  });

  const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id))
  }

  return (
    <div className="profile">
      {isLoading ? ("Loading") :
        (<><div className="images">
          <img className="cover" src={"/upload/"+data.coverPic} alt="" />
          <img className="profilePic" src={"/upload/"+data.profilePic} alt="" />
        </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="https://www.facebook.com"><FacebookTwoToneIcon fontSize="large" /></a>
                <a href="https://www.instagram.com"><InstagramIcon fontSize="large" /></a>
                <a href="https://www.twitter.com"><TwitterIcon fontSize="large" /></a>
                <a href="https://linkedin.com"><LinkedInIcon fontSize="large" /></a>
                <a href="https://pinterest.com"><PinterestIcon fontSize="large" /></a>
              </div>

              <div className="center">
                <span>{data.name}</span>
                <div className="info">

                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>

                  <div className="item">
                    
                  </div>

                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>

                {rIsLoading ? "Loading" : userId === currentUser.id
                  ? (<button onClick={() => setOpenUpdate(true)}>Update</button>)
                  : <button onClick={handleFollow}>{relationshipData.includes(currentUser.id)
                    ? "Following"
                    : "Follow"}
                  </button>}
              </div>

              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId}/>
          </div></>
        )}
        {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}

    </div>
  )
}

export default Profile