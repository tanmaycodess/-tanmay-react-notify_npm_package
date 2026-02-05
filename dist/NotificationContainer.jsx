import { Notification } from "./Notification";

export const NotificationContainer = ({ notifications, position, onClose }) => {
  const styles = {
    "top-right": { top: 16, right: 16, alignItems: "flex-end" },
    "top-left": { top: 16, left: 16, alignItems: "flex-start" },
    "bottom-right": { bottom: 16, right: 16, alignItems: "flex-end" },
    "bottom-left": { bottom: 16, left: 16, alignItems: "flex-start" },
    "top-center": { top: 16, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
    "bottom-center": { bottom: 16, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
        ...styles[position],
      }}
    >
      <div style={{ pointerEvents: "auto", display: "flex", flexDirection: "column" }}>
        {notifications.map((n) => (
          <Notification key={n.id} {...n} onClose={onClose} />
        ))}
      </div>
    </div>
  );
};
