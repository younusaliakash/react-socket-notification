import { useEffect, useState } from "react/cjs/react.development";
import Message from "../../img/message.svg";
import Notification from "../../img/notification.svg";
import Settings from "../../img/settings.svg";
import "./navbar.css";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([])
  const [open,setOpen] = useState(false)

  useEffect(() => {
      socket.on("getNotification", data => {
        setNotifications( prev => [...prev, data])
      })
  },[socket])

  console.log(notifications)

  const displayNotification = ({senderName, type}) => {
    let action;

    if(type === 1) {
      action = "Liked"
    }
    else if(type === 2) {
      action = "Commented"
    }
    else {
      action = "Shared"
    }
    
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    )
  }

  const handleRead = () => {
    setNotifications([])
    setOpen(false)
  }

  return (
    <div className="navbar">
      <span className="logo">social App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {
            notifications.length > 0 && 
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon">
          <img src={Message} className="iconImg" alt="" />
          <div className="counter">5</div>
        </div>
        <div className="icon">
          <img src={Settings} className="iconImg" alt="" />
          <div className="counter">5</div>
        </div>
      </div>
        {
          open &&
          <div className="notifications">
            {
              notifications.length > 0 ? 
              notifications.map((n) => displayNotification(n))
              : 
              <span className="notification">No Notifications</span>
             }
          {
            notifications.length > 0 && 
            <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
          }
        </div>
        }
    </div>
  );
};

export default Navbar;
