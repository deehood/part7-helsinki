import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification)
    return (
      <div className={`Notification ${notification.type} `}>
        <p>{notification.msg}</p>
      </div>
    );

  return null;
};

export default Notification;
