import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Navbar from "./Navbar"; 
import Footer from "./Footer";  

const ChatWithAI = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatHistory([...chatHistory, { user: userMessage }]);
      setUserMessage("");

      setTimeout(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { ai: "This is a response from the AI model." },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="p-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <h4 className="text-center mb-3">Chat with AI</h4>
                <div
                  style={{
                    height: "300px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {chatHistory.map((msg, index) => (
                    <div key={index} className="mb-2">
                      {msg.user && (
                        <div>
                          <strong>You: </strong>
                          <p>{msg.user}</p>
                        </div>
                      )}
                      {msg.ai && (
                        <div>
                          <strong>AI: </strong>
                          <p>{msg.ai}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Form.Control
                  type="text"
                  placeholder="Type a message"
                  value={userMessage}
                  onChange={handleMessageChange}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ChatWithAI;
