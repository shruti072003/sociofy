import './navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import WbSunnyOutlined from '@mui/icons-material/WbSunnyOutlined';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

function NavBar() {

  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout")
      navigate("/login")
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className='navbar'>
      <div className='left'>
        <Link to="/" style={{textDecoration:"none"}}>
          <span>Sociofy.</span> 
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? <WbSunnyOutlined onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle}/>}
        <GridViewOutlinedIcon />
        <div className='search'>
          <SearchOutlinedIcon />
          <input type="text" placeHolder="Search..."></input>
        </div>
      </div>

      <div className='right'>
        <PersonOutlinedIcon />
        <NotificationsOutlinedIcon />
        <LogoutIcon style={{cursor: "pointer"}} onClick={handleClick}/>
        <div className='user'>
          <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit"}}>
            <img src={currentUser.profilePic} alt='' />
          </Link>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar