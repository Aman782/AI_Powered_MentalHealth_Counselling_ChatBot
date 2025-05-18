// import { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import axios from "axios";
// import { JitsiMeeting } from "@jitsi/react-sdk";
// import "./ChatWithAI.css"; // Ensure your CSS has typing dot animations

// const TypingDots = () => {
//   return (
//     <div className="typing-dots ms-2">
//       <span className="dot">•</span>
//       <span className="dot">•</span>
//       <span className="dot">•</span>
//     </div>
//   );
// };

// const ChatWithAI = () => {
//   const [userInfo, setUserInfo] = useState({});
//   const [userMessage, setUserMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [showJitsi, setShowJitsi] = useState(false); // To toggle Jitsi video call
//   const [roomName, setRoomName] = useState("");
//   const chatEndRef = useRef(null);

//   useEffect(()=>{
//     const getUserDetails = async ()=>{
//       const userInfo = await axios.get('http://localhost:8000/users/get-user-detail', {withCredentials: true});

//       if(userInfo){
//         setUserInfo(userInfo);
//       }
//     };

//     getUserDetails();
//   }, []);

//   useEffect(() => {
//     const loadVoices = () => {
//       let voices = window.speechSynthesis.getVoices();
//       if (voices.length === 0) {
//         window.speechSynthesis.onvoiceschanged = () => {
//           voices = window.speechSynthesis.getVoices();
//           pickRandomVoice(voices);
//         };
//       } else {
//         pickRandomVoice(voices);
//       }
//     };

//     const pickRandomVoice = (voices) => {
//       const englishVoices = voices.filter((voice) =>
//         voice.lang.toLowerCase().startsWith("en")
//       );
//       if (englishVoices.length > 0) {
//         const randomVoice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
//         setSelectedVoice(randomVoice);
//       }
//     };

//     loadVoices();
//   }, []);

//   const speakText = (text) => {
//     if ("speechSynthesis" in window && selectedVoice) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.voice = selectedVoice;
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.volume = 1;
//       utterance.lang = "en-US";
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const handleMessageChange = (event) => setUserMessage(event.target.value);

//   const handleSendMessage = async () => {
//     if (userMessage.trim() !== "") {
//       const currentMessage = userMessage;
//       setChatHistory((prev) => [...prev, { user: currentMessage }]);
//       setUserMessage("");
//       setLoading(true);

//       try {
//         const response = await axios.post(
//           "http://localhost:8000/ai/chat/message",
//           { userInput: currentMessage },
//           { withCredentials: true }
//         );

//         const aiReply = response.data.message || "AI did not return a valid response.";
//         setChatHistory((prevHistory) => [...prevHistory, { ai: aiReply }]);
//         speakText(aiReply);
//       } catch (error) {
//         console.error("Error communicating with backend:", error);
//         const errorMsg = "Something went wrong. Please try again later.";
//         setChatHistory((prevHistory) => [...prevHistory, { ai: errorMsg }]);
//         speakText(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleClearChat = () => {
//     setChatHistory([]);
//     setUserMessage("");
//   };

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatHistory]);

//   const handleStartVideoCall = async ()=>{
//     try {
//       setLoading(true);

//       const userId = userInfo.data._id;
//       const resp = await axios.post('http://localhost:8000/ai/start-video-call', {userId}, {withCredentials: true});

//       console.log(resp.data.roomName);
//       if(resp.data){
//         setRoomName(resp.data.roomName);
//         setShowJitsi(true);
//       }else{
//         alert("failed to start a call");
//       }
//     } catch (error) {
//       console.log(error);
//     }finally{
//       setLoading(false);
//     }
//   }

//   return (
//     <Container fluid className="p-4 fontstyle">
//       <Row className="justify-content-center">
//         <Col md={8} className="chat-column">
//           <div className="chat-window">
//             <h4 className="text-center mb-4 fw-bold text-primary">💬 Chat with AI</h4>

//             <div className="chat-box">
//               <div className="message-container">
//                 {chatHistory.map((msg, index) => (
//                   <div key={index}>
//                     {msg.user && (
//                       <div className="message user-msg">{msg.user}</div>
//                     )}
//                     {msg.ai && (
//                       <div className="message ai-msg">{msg.ai}</div>
//                     )}
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="d-flex align-items-center mt-2">
//                     <div className="message ai-msg d-flex align-items-center">
//                       <TypingDots />
//                     </div>
//                   </div>
//                 )}
//                 <div ref={chatEndRef} />
//               </div>
//             </div>

//             <Form.Control
//               type="text"
//               placeholder="Type a message..."
//               value={userMessage}
//               className="rounded-pill px-4 py-2 border-primary shadow-sm"
//               onChange={handleMessageChange}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />

//             <div className="mt-3 d-flex justify-content-between">
//               <Button variant="primary" className="px-4 rounded-pill" onClick={handleSendMessage}>
//                 Send
//               </Button>
//               <Button variant="outline-danger" className="px-4 rounded-pill" onClick={handleClearChat}>
//                 Clear Chat
//               </Button>
//             </div>

//             {/* Add a button to start the video call */}
//             <Button
//               variant="success"
//               className="mt-3 px-4 rounded-pill"
//               onClick={handleStartVideoCall}
//             >
//               Start Video Call
//             </Button>

//             {/* Jitsi Video Call */}
//             {showJitsi && (
//               <div className="jitsi-container mt-4">
//                 <Card className="shadow-sm border-0">
//                   <Card.Body>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <h5 className="fw-bold mb-0">🔴 Live Video Call</h5>
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         onClick={() => setShowJitsi(false)}
//                       >
//                         Close Video Call
//                       </Button>
//                     </div>

//                     <JitsiMeeting
//                       roomName={roomName}
//                       getIFrameRef={(iframeRef) => {
//                         iframeRef.style.height = "500px";
//                         iframeRef.style.width = "100%";
//                         iframeRef.allow =
//                           "camera; microphone; fullscreen; display-capture";
//                       }}
//                       configOverwrite={{
//                         startWithAudioMuted: false,
//                         startWithVideoMuted: false,
//                       }}
//                       userInfo={{ displayName: "User" }}
//                     />
//                   </Card.Body>
//                 </Card>
//               </div>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ChatWithAI;

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import removeMarkdown from "remove-markdown";
import axios from "axios";
import { JitsiMeeting } from "@jitsi/react-sdk";
import "./ChatWithAI.css";

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
  const [userInfo, setUserInfo] = useState({});
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showJitsi, setShowJitsi] = useState(false);
  const [roomName, setRoomName] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const userInfo = await axios.get(
        "http://localhost:8000/users/get-user-detail",
        { withCredentials: true }
      );

      if (userInfo) {
        setUserInfo(userInfo);
      }
    };

    getUserDetails();
  }, []);

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
        const randomVoice =
          englishVoices[Math.floor(Math.random() * englishVoices.length)];
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
          "http://localhost:8000/ai/message",
          { userInput: currentMessage },
          { withCredentials: true }
        );

        const aiReply =
          response.data.message || "AI did not return a valid response.";
        setChatHistory((prevHistory) => [...prevHistory, { ai: aiReply }]);

        const cleanText = removeMarkdown(aiReply);
        speakText(cleanText);
      } catch (error) {
        console.error("Error communicating with backend:", error);
        const errorMsg = "Something went wrong. Please try again later.";
        setChatHistory((prevHistory) => [...prevHistory, { ai: errorMsg }]);

        const cleanText = removeMarkdown(errorMsg);
        speakText(cleanText);
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

  const handleStartVideoCall = async () => {
    try {
      setLoading(true);

      const userId = userInfo.data._id;
      const resp = await axios.post(
        "http://localhost:8000/ai/start-video-call",
        { userId },
        { withCredentials: true }
      );

      if (resp.data) {
        setRoomName(resp.data.roomName);
        setShowJitsi(true);
      } else {
        alert("failed to start a call");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to stop the voice assistant
  const handleStopVoice = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); 
    }
  };

  return (
    <Container fluid className="p-4 fontstyle">
      <Row className="justify-content-center">
        <Col md={8} className="chat-column">
          <div className="chat-window">
            <h4 className="text-center mb-4 fw-bold text-primary">
              💬 Chat with AI
            </h4>

            <div className="chat-box">
              <div className="message-container">
                {chatHistory.map((msg, index) => (
                  <div key={index}>
                    {msg.user && (
                      <div className="message user-msg">{msg.user}</div>
                    )}
                    {msg.ai && (
                      <div className="message ai-msg">
                        <ReactMarkdown>{msg.ai}</ReactMarkdown>
                      </div>
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
              <Button
                variant="primary"
                className="px-4 rounded-pill"
                onClick={handleSendMessage}
              >
                Send
              </Button>
              <Button
                variant="outline-danger"
                className="px-4 rounded-pill"
                onClick={handleClearChat}
              >
                Clear Chat
              </Button>
            </div>

            <Button
              variant="success"
              className="mt-3 px-4 rounded-pill"
              onClick={handleStartVideoCall}
            >
              Start Video Call
            </Button>

            {/* Stop Voice Assistant Button */}
            <Button
              variant="danger"
              className="mt-3 mx-2 px-4 rounded-pill"
              onClick={handleStopVoice}
            >
              Stop Voice Assistant
            </Button>

            {showJitsi && (
              <div className="jitsi-container mt-4">
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">🔴 Live Video Call</h5>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setShowJitsi(false)}
                      >
                        Close Video Call
                      </Button>
                    </div>

                    <JitsiMeeting
                      roomName={roomName}
                      configOverwrite={{
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        prejoinPageEnabled: false, // ✅ Auto-join here
                      }}
                      interfaceConfigOverwrite={{
                        SHOW_JITSI_WATERMARK: false,
                      }}
                      getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = "500px";
                        iframeRef.style.width = "100%";
                        iframeRef.allow =
                          "camera; microphone; fullscreen; display-capture";
                      }}
                      userInfo={{ displayName: userInfo?.data?.name || "User" }}
                    />
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatWithAI;