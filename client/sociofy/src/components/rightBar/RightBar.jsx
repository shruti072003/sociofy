import './rightbar.scss';
import suggestion from './Suggestions';
import activity from './Activities';
import online from './Online';

function RightBar() {
  return (
    <div className='rightBar'>
      <div className='container'>
        <div className='item'>
          <span>Suggestions For You</span>
          {suggestion.map(({ profilePic, name }) => {
            return (
              <><div className='user'>
                <div className='userInfo'>
                  <img src={profilePic} alt='' />
                  <span>{name}</span>
                </div>
                <div className='buttons'>
                  <button>follow</button>
                  <button>dismiss</button>
                </div>
              </div></>
            )
          })}
        </div>

        <div className='item'>
          <span>Latest Activities</span>
          {activity.map(({ name, activity, profilePic }) => {
            return (
              <div className='user'>
                <div className='userInfo'>
                  <img src={profilePic} alt='' />
                  <p>
                    <span>{name}</span> {activity}
                  </p>
                </div>
                <span>1 min ago</span>
              </div>
            )
          })}
        </div>

        <div className='item'>
          <span>Online Friends</span>
          {online.map(({ name, profilePic }) => {
            return (
              <div className='user'>
                <div className='userInfo'>
                  <img src={profilePic} alt='' />
                  <div className='online' />
                  <span>{name} </span>
                </div>
              </div>)
          })}

        </div>

      </div>
    </div>
  )
}

export default RightBar