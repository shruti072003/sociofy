import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
import storiesList from "./StoriesList";

function Stories() {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>

            {storiesList.map(({ name, story }) => {
                return (
                    <div className="story">
                        <img src={story} alt="" />
                        <span>{name}</span>
                    </div>)
            })}
        </div>
    )
}

export default Stories