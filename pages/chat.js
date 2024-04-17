import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { user } = router.query;
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Define typical responses for both Doctors and Patients
  const replies = {
    Doctor: [
      "Yes, what seems to be the problem?",
      "How long have you been feeling this way?",
      "I recommend scheduling a test for this, it's important.",
      "Let's schedule a follow-up appointment for next week.",
      "Make sure to take the prescribed medication regularly.",
    ],
    Patient: [
      "I have been feeling unwell since yesterday.",
      "Thank you, Doctor, for the advice!",
      "When should I take the medicine?",
      "Is it okay if I schedule my appointment for next month?",
      "I might need assistance with the prescription.",
    ],
  };

  // Determine user type upon user being available.
  const userType = user
    ? user.startsWith("Dr.")
      ? "Doctor"
      : "Patient"
    : null;

  const handleMessageSubmit = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      user: "You",
      text: currentMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setCurrentMessage("");

    // Check if userType is determined before providing a response.
    if (userType) {
      const response =
        replies[userType][Math.floor(Math.random() * replies[userType].length)];
      const responseMessage = {
        user: user,
        text: response,
        timestamp: new Date().toISOString(),
      };

      setTimeout(() => setMessages((m) => [...m, responseMessage]), 1000);
    }
  };

  // Optionally ensure that user is defined (useEffect can be used to check or handle async ops)
  useEffect(() => {
    if (!user) {
      console.log("User data is not yet loaded.");
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Or any other appropriate loading/informational display
  }

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "left" }}>Chat with {user}</h1>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          backgroundColor: "#FFFFFF0E",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 15px 5px #00000012",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{ textAlign: message.user === "You" ? "right" : "left" }}
          >
            <strong>{message.user}:</strong> <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
}
