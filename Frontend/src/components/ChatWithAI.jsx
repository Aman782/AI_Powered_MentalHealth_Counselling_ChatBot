import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./ChatWithAI.css"; // Ensure your CSS has typing dot animations

const TypingDots = () => {
  return (
    <div className="typing-dots ms-2">
      <span className="dot">•</span>
      <span className="dot">•</span>
      <span className="dot">•</span>
    </div>
  );
};

const ChatWithAI = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          pickRandomVoice(voices);
        };
      } else {
        pickRandomVoice(voices);
      }
    };

    const pickRandomVoice = (voices) => {
      const englishVoices = voices.filter((voice) =>
        voice.lang.toLowerCase().startsWith("en")
      );
      if (englishVoices.length > 0) {
        const randomVoice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
        setSelectedVoice(randomVoice);
      }
    };

    loadVoices();
  }, []);

  const speakText = (text) => {
    if ("speechSynthesis" in window && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMessageChange = (event) => setUserMessage(event.target.value);

  const handleSendMessage = async () => {
    if (userMessage.trim() !== "") {
      const currentMessage = userMessage;
      setChatHistory((prev) => [...prev, { user: currentMessage }]);
      setUserMessage("");
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:8000/ai/chat/message",
          { userInput: currentMessage },
          { withCredentials: true }
        );

        const aiReply = response.data.message || "AI did not return a valid response.";
        setChatHistory((prevHistory) => [...prevHistory, { ai: aiReply }]);
        speakText(aiReply);
      } catch (error) {
        console.error("Error communicating with backend:", error);
        const errorMsg = "Something went wrong. Please try again later.";
        setChatHistory((prevHistory) => [...prevHistory, { ai: errorMsg }]);
        speakText(errorMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setUserMessage("");
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <Container fluid className="p-4 fontstyle">
      <Row className="justify-content-center">
        <Col md={8} className="chat-column">
          <div className="chat-window">
            <h4 className="text-center mb-4 fw-bold text-primary">💬 Chat with AI</h4>

            <div className="chat-box">
              <div className="message-container">
                {chatHistory.map((msg, index) => (
                  <div key={index}>
                    {msg.user && (
                      <div className="message user-msg">{msg.user}</div>
                    )}
                    {msg.ai && (
                      <div className="message ai-msg">{msg.ai}</div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="d-flex align-items-center mt-2">
                    <div className="message ai-msg d-flex align-items-center">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={userMessage}
              className="rounded-pill px-4 py-2 border-primary shadow-sm"
              onChange={handleMessageChange}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />

            <div className="mt-3 d-flex justify-content-between">
              <Button variant="primary" className="px-4 rounded-pill" onClick={handleSendMessage}>
                Send
              </Button>
              <Button variant="outline-danger" className="px-4 rounded-pill" onClick={handleClearChat}>
                Clear Chat
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatWithAI;
