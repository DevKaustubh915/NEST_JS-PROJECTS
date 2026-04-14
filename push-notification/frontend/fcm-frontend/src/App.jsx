// src/App.jsx

import useFCMToken from "./hooks/useFCMToken";

function App() {
  const { token, notification } = useFCMToken();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FCM Push Notification Demo</h1>

      {/* Show token (for testing) */}
      <div>
        <h3>Your FCM Token:</h3>
        <p style={{ wordBreak: "break-all", fontSize: "12px", color: "gray" }}>
          {token ? token : "Waiting for permission..."}
        </p>
      </div>

      {/* Show foreground notification */}
      {notification && (
        <div style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#e8f5e9",
          borderRadius: "8px",
          border: "1px solid #a5d6a7"
        }}>
          <strong>{notification.title}</strong>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;