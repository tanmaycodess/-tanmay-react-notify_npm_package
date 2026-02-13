# @tanmaycodess/react-notify

A lightweight, dependency-free notification/toast system for React.

Designed for **real-world workflows**, not just UI alerts.

---

## Features

- Global notification provider
- Simple hook-based API
- Multiple notification types
  - `success`
  - `error`
  - `warning`
  - `violation`
  - `info`
- Multiple positions
- Auto-dismiss with progress bar
- Persistent notifications (`duration: null`)
- **Unique Feature 1:** ID-based workflow control
- **Unique Feature 2:** 🔥 `promise()` helper for async flows (Axios, fetch, proctoring, uploads)

---

## Installation

```bash
npm install @tanmay/react-notify
````

---

## Setup

### Wrap your app with `NotificationProvider`

```jsx
import { NotificationProvider } from "@tanmaycodess/react-notify"";
import App from "./App";

export default function Root() {
  return (
    <NotificationProvider
      maxNotifications={5}
      defaultPosition="top-right"
      defaultDuration={5000}
    >
      <App />
    </NotificationProvider>
  );
}
```

### Provider Props

| Prop               | Type          | Default     | Description                               |
| ------------------ | ------------- | ----------- | ----------------------------------------- |
| `maxNotifications` | number        | `5`         | Max visible notifications                 |
| `defaultPosition`  | string        | `top-right` | Default toast position                    |
| `defaultDuration`  | number | null | `5000`      | Auto close duration (`null` = persistent) |

---

## Using Notifications

```jsx
import { useNotification } from "@tanmaycodess/react-notify"";

export default function Demo() {
  const { success, error, warning, violation, info } = useNotification();

  return (
    <div>
      <button onClick={() => success("Saved successfully!")}>Success</button>
      <button onClick={() => error("Something went wrong!")}>Error</button>
      <button onClick={() => warning("This action is risky!")}>Warning</button>
      <button onClick={() => violation("Policy violation detected!")}>Violation</button>
      <button onClick={() => info("Welcome back!")}>Info</button>
    </div>
  );
}
```

---

## Notification Types (Examples)

### Success

```jsx
success("Profile updated successfully");
```

### Error

```jsx
error("Failed to save data");
```

### Warning

```jsx
warning("You are about to delete this item");
```

### Violation (Security / Proctoring use-case)

```jsx
violation("Face not detected. Please return to screen.");
```

### ℹ Info

```jsx
info("New update available");
```

---

## Custom Options

### Custom duration

```jsx
success("Auto closes in 2 seconds", { duration: 2000 });
```

### Persistent notification

```jsx
info("Uploading file...", { duration: null });
```

### Hide close button

```jsx
info("Processing...", { duration: null, showClose: false });
```

### Custom position (per toast)

```jsx
error("Server unreachable", { position: "bottom-left" });
```

### Supported positions

* `top-right`
* `top-left`
* `bottom-right`
* `bottom-left`
* `top-center`
* `bottom-center`

---

## Unique Feature 1: Workflow / Loading Toasts (ID-based)

You can manually control notifications using IDs.

```jsx
const id = addNotification({
  type: "info",
  message: "Saving data...",
  duration: null,
  showClose: false
});

// later
removeNotification(id);
```

Useful for:

* Long-running tasks
* Proctor engine startup
* Uploads
* Payments

---

## Unique Feature 2: `promise()` Helper 

This is the **most powerful feature** of the system.

It automatically handles:

* Loading state
* Success state
* Error state

### Basic Usage

```jsx
const { promise } = useNotification();

promise(
  fetch("/api/save"),
  {
    loading: "Saving data...",
    success: "Saved successfully!",
    error: "Save failed"
  }
);
```

---

### Axios Example (Real-world)

```jsx
import axios from "axios";
import { useNotification } from "@tanmaycodess/react-notify"";

export default function SaveButton() {
  const { promise } = useNotification();

  const save = () => {
    promise(
      axios.post("/api/save", { name: "Tanmay" }),
      {
        loading: "Saving data...",
        success: "Data saved!",
        error: "Save failed!"
      }
    );
  };

  return <button onClick={save}>Save</button>;
}
```

---

### Advanced `promise()` Usage (dynamic messages)

```jsx
promise(
  axios.post("/api/upload"),
  {
    loading: "Uploading file...",
    success: (res) => `Uploaded ${res.data.fileName}`,
    error: (err) => err.response?.data?.message || "Upload failed"
  }
);
```

---

## How `promise()` Works

1. Shows a **persistent loading toast**
2. Waits for the promise to resolve or reject
3. Automatically removes loading toast
4. Shows success OR error toast
5. Returns the original promise result

No manual cleanup required.

---

## API Reference

### `useNotification()` returns

| Method                         | Description                               |
| ------------------------------ | ----------------------------------------- |
| `addNotification(options)`     | Create custom notification (returns `id`) |
| `removeNotification(id)`       | Remove a notification                     |
| `clearAll()`                   | Clear all notifications                   |
| `success(message, options?)`   | Success toast                             |
| `error(message, options?)`     | Error toast                               |
| `warning(message, options?)`   | Warning toast                             |
| `violation(message, options?)` | Violation toast                           |
| `info(message, options?)`      | Info toast                                |
| `promise(promise, config)`     | Async workflow helper                  |

---

### `promise(promise, config)`

#### Config object

| Key       | Type              | Description     |
| --------- | ----------------- | --------------- |
| `loading` | string            | Loading message |
| `success` | string | function | Success message |
| `error`   | string | function | Error message   |

---

## Design Philosophy

* Market-standard UI 
* Predictable behavior
* No external dependencies
* Built for production workflows
* Easy to extend

---

## 📄 License

MIT © Tanmay Seth

---


