import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { user, imgIndex } = router.query;
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Function to generate image URL
  const getUserImageUrl = () => {
    return `https://randomuser.me/api/portraits/men/${imgIndex}.jpg`; // Construct the URL using the passed index
  };

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
      imgIndex: imgIndex, // assuming you are also showing your image, modify as needed
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
        imgIndex: imgIndex, // Include the image index in the response message
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={getUserImageUrl(user)}
          style={{ height: "50px", borderRadius: "50%", marginRight: "10px" }}
        />
        <h1 style={{ textAlign: "left" }}>Chat with {user}</h1>
      </div>
      <div
        style={{
          height: "auto",
          overflowY: "auto",
          backgroundColor: "#FFFFFF00",
          padding: "10px",
          borderRadius: "15px",
          boxShadow: "0 2px 15px 5px #00000000",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.user === "You" ? "right" : "left",
              borderRadius: "20px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
              outline:
                message.user === "You"
                  ? "1px solid #FFFFFF65"
                  : "1px solid #5AA0EF78",
              backgroundColor:
                message.user === "You" ? "#FFFFFF0B" : "#08080827",
            }}
          >
            <strong>{message.user}</strong>
            {message.user !== "You" && (
              <img
                src={`https://randomuser.me/api/portraits/men/${message.imgIndex}.jpg`} // Using `imgIndex` from the message
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  float: "left", // Align the image to the left if the user is not "You"
                  marginRight: "10px",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
            {message.user !== "You" && (
              <span
                style={{
                  fontSize: "0.8em",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            )}
            <br />
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
            if (e.key === "Enter" || e.keyCode === 13) {
              handleMessageSubmit();
            }
          }}
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
}
