import { useEffect, useState } from "react";

/**
 * Single notification (toast) component
 */
export const Notification = ({
  id,
  type = "info",
  message,
  duration = 5000,
  showClose = true,
  customStyles = {},
  onClose,
}) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  // Close handler
  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 250);
  };

  // Auto close + progress
  useEffect(() => {
    if (duration == null) return; // persistent notification

    const start = Date.now();
    const end = start + duration;

    const interval = setInterval(() => {
      const remaining = Math.max(0, end - Date.now());
      setProgress((remaining / duration) * 100);
    }, 50);

    const timer = setTimeout(handleClose, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  const stylesByType = {
    success: { bg: "#E6F4EA", text: "#1E7E34", border: "#B7E0C2" },
    error: { bg: "#FDECEA", text: "#B02A37", border: "#F5C2C7" },
    warning: { bg: "#FFF4E5", text: "#8A6D3B", border: "#FFE0B2" },
    violation: { bg: "#F8D7DA", text: "#842029", border: "#F1AEB5" },
    info: { bg: "#E7F3FF", text: "#084298", border: "#B6D4FE" },
  };

  const theme = stylesByType[type] || stylesByType.info;

  return (
    <div
      style={{
        minWidth: 280,
        maxWidth: 380,
        background: theme.bg,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        borderRadius: 6,
        padding: "12px 14px",
        marginBottom: 10,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        fontSize: 14,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        animation: exiting ? "toast-out 0.25s ease forwards" : "toast-in 0.25s ease",
        position: "relative",
        ...customStyles,
      }}
    >
      {/* Message */}
      <div style={{ flex: 1, lineHeight: 1.4 }}>{message}</div>

      {/* Close button */}
      {showClose && (
        <button
          onClick={handleClose}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
            color: theme.text,
          }}
          aria-label="Close notification"
        >
          ×
        </button>
      )}

      {/* Time progress */}
      {duration != null && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 3,
            width: `${progress}%`,
            background: theme.text,
            opacity: 0.35,
            transition: "width 50ms linear",
          }}
        />
      )}
    </div>
  );
};
