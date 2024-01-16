// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the component
const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [chatbotResponse, setChatbotResponse] = useState<string>("");

  const URL: string = "https://nestjs-api-alpha.vercel.app/chatbot";

  // Function to handle user input and fetch chatbot response
  const handleUserInput = async () => {
    try {
      const response = await axios.post(URL, {
        question: userInput,
      });
      setChatbotResponse(response.data.response);
    } catch (error) {
      //@ts-ignore
      console.error("Error:", error.message);
    }
  };

  const fetchFata = () => {
    try {
      const URL = axios.get("https://nestjs-api-alpha.vercel.app");

      //@ts-ignore
      return URL?.data?.response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFata();
  }, []);

  return (
    <div className="chatbot-container">
      <div className="logo-img-div">
        <img alt="AI" src="chatbot.png" />
        <h2> How can I help you today? </h2>
      </div>

      <div>{chatbotResponse}</div>

      <div>
        <div className="suggestion">
          <div>
            <p> who are you? </p>
            <p> who build you? </p>
          </div>

          <div>
            <p> what can you do for me? </p>
            <p> how do you work? </p>
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
