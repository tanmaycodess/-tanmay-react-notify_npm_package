import { useMemo } from "react";
import { Notification } from "./Notification";

const POS_STYLES = {
  "top-right": { top: 16, right: 16, alignItems: "flex-end" },
  "top-left": { top: 16, left: 16, alignItems: "flex-start" },
  "bottom-right": { bottom: 16, right: 16, alignItems: "flex-end" },
  "bottom-left": { bottom: 16, left: 16, alignItems: "flex-start" },
  "top-center": { top: 16, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
  "bottom-center": { bottom: 16, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
};

export const NotificationContainer = ({ notifications = [], defaultPosition = "top-right", onClose }) => {
  const grouped = useMemo(() => {
    const map = {};
    for (const n of notifications) {
      const key = n.position || defaultPosition;
      if (!map[key]) map[key] = [];
      map[key].push(n);
    }
    return map;
  }, [notifications, defaultPosition]);

  return (
    <>
      {Object.entries(grouped).map(([position, list]) => (
        <div
          key={position}
          data-position={position}
          style={{
            position: "fixed",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            pointerEvents: "none",
            ...(POS_STYLES[position] || POS_STYLES["top-right"]),
          }}
        >
          {list.map((n) => (
            <div key={n.id} style={{ pointerEvents: "auto" }}>
              <Notification {...n} onClose={onClose} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
