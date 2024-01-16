// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the component
const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatbotResponse, setChatbotResponse] = useState<string>("");
  const [error, setError] = useState<string>("");

  const URL: string = "https://nestjs-api-alpha.vercel.app/chatbot";

  // Function to handle user input and fetch chatbot response
  const handleUserInput = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await axios.post(URL, {
        question: userInput,
      });

      const fullResponse = response.data.response;

      for (let i = 0; i < fullResponse.length; i++) {
        setChatbotResponse(fullResponse.substring(0, i + 1));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } catch (error) {
      //@ts-ignore
      const fullErrorResponse = error.message;
      for (let i = 0; i < fullErrorResponse.length; i++) {
        setError(fullErrorResponse.substring(0, i + 1));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      //@ts-ignore
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="logo-img-div">
        <img alt="AI" src="chatbot.png" />
        <h2> How can I help you today? </h2>
      </div>

      <div className="response">{chatbotResponse}</div>
      <div className="error-message">{error}</div>

      <div>
        <div className="suggestion">
          <div>
            <p> who are you </p>
            <p> who build you </p>
          </div>

          <div>
            <p> what can you do for me </p>
            <p> how do you work </p>
          </div>
        </div>
        <div className="input-btn-div">
          <input
            placeholder="Message ChatGPT..."
            className="question-input"
            type="text"
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="ask-button" onClick={handleUserInput}>
            Ask
          </button>
        </div>
        <span>
          AI can make mistakes. Consider checking important information.{" "}
        </span>{" "}
      </div>
    </div>
  );
};

// Export the component
export default Chatbot;
