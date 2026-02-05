import { useCallback, useMemo, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { NotificationContainer } from "./NotificationContainer";

export const NotificationProvider = ({
  children,
  maxNotifications = 5,
  defaultDuration = 5000,
  defaultPosition = "top-right",
}) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((options) => {
    const id = Date.now() + Math.random();

    const notification = {
      id,
      type: options.type || "info",
      message: options.message || "Notification",
      duration:
        options.duration !== undefined ? options.duration : defaultDuration,
      showClose:
        options.showClose !== undefined ? options.showClose : true,
      customStyles: options.customStyles || {},
    };

    setNotifications((prev) => {
      const next = [...prev, notification];
      return next.length > maxNotifications
        ? next.slice(next.length - maxNotifications)
        : next;
    });

    return id;
  }, [defaultDuration, maxNotifications]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const updateNotification = useCallback((id, patch) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch } : n))
    );
  }, []);

  //  UNIQUE FEATURE: promise-based notification
  const promise = useCallback(async (p, msgs, options = {}) => {
    const id = addNotification({
      ...options,
      type: "info",
      message: msgs.loading,
      duration: null,
      showClose: false,
    });

    try {
      const res = await p;
      updateNotification(id, {
        type: "success",
        message: msgs.success,
        duration: 2500,
        showClose: true,
      });
      return res;
    } catch (err) {
      updateNotification(id, {
        type: "error",
        message: msgs.error,
        duration: 5000,
        showClose: true,
      });
      throw err;
    }
  }, [addNotification, updateNotification]);

  const api = useMemo(() => ({
    notifications,
    addNotification,
    removeNotification,
    updateNotification,
    clearAll: () => setNotifications([]),

    success: (msg, o = {}) => addNotification({ ...o, type: "success", message: msg }),
    error: (msg, o = {}) => addNotification({ ...o, type: "error", message: msg }),
    warning: (msg, o = {}) => addNotification({ ...o, type: "warning", message: msg }),
    violation: (msg, o = {}) => addNotification({ ...o, type: "violation", message: msg }),
    info: (msg, o = {}) => addNotification({ ...o, type: "info", message: msg }),

    promise,
  }), [notifications, addNotification, removeNotification, updateNotification, promise]);

  return (
    <NotificationContext.Provider value={api}>
      {children}
      <NotificationContainer
        notifications={notifications}
        position={defaultPosition}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};
