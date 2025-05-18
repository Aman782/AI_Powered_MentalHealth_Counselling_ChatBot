// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ExpertDashboard = () => {
//   const [expert, setExpert] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(false);
//   const [callRoom, setCallRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showVideoCall, setShowVideoCall] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setExpert({
//         name: "Dr. Aman Pandey",
//         specialization: "Cognitive Behavioral Therapy",
//         available: true,
//       });
//       setLoading(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const shouldReceiveCall = Math.random() < 0.1;
//       if (shouldReceiveCall && expert?.available && !incomingCall) {
//         setIncomingCall(true);
//         setCallRoom("mental-health-room-1234");
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [expert, incomingCall]);

//   const acceptCall = () => {
//     setIncomingCall(false);
//     setShowVideoCall(true);
//   };

//   const rejectCall = () => {
//     setIncomingCall(false);
//     setCallRoom(null);
//   };

//   const endCall = () => {
//     setShowVideoCall(false);
//     setCallRoom(null);
//   };

//   return (
//     <div 
//       className="d-flex flex-column align-items-center justify-content-center"
//       style={{
//         minHeight: "85vh",
//         background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
//         padding: "0px 0px 40px 0px",
//       }}
//     >
//       {/* Hero Section */}
//       <div className="text-center mb-4">
//         <span style={{ fontSize: "80px" }}>🧑‍💻</span>
//         <h1 style={{ marginTop: "20px", fontWeight: "700", color: "#0077b6" }}>
//           Welcome, {expert?.name || "Expert"}!
//         </h1>
//         <p style={{ color: "#555", fontSize: "18px", marginTop: "10px" }}>
//           {loading ? "Loading your dashboard..." : "Ready to assist users today? 🚀"}
//         </p>
//       </div>

//       {/* Main Card */}
//       {!showVideoCall && (
//         <div 
//           className="d-flex flex-column align-items-center"
//           style={{
//             backgroundColor: "#ffffff",
//             borderRadius: "20px",
//             padding: "30px 40px",
//             maxWidth: "500px",
//             width: "100%",
//             boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
//           }}
//         >
//           {/* Expert Info */}
//           {loading ? (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
//               <div className="spinner-border text-primary" role="status"></div>
//             </div>
//           ) : (
//             <>
//               <h4 style={{ fontWeight: "600", color: "#333" }}>Expert Info 🏆</h4>
//               <p style={{ marginTop: "10px", fontSize: "16px" }}>
//                 <strong>Name:</strong> <span style={{ color: "#555" }}>{expert.name}</span>
//               </p>
//               <p style={{ fontSize: "16px" }}>
//                 <strong>Specialization:</strong> <span style={{ color: "#555" }}>{expert.specialization}</span>
//               </p>

//               {/* Incoming Call Section */}
//               {incomingCall ? (
//                 <div className="mt-4 text-center">
//                   <p className="fw-bold text-warning mb-3">📞 Incoming Call...</p>
//                   <div className="d-flex justify-content-between w-100">
//                     <button 
//                       className="btn btn-success"
//                       style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
//                       onClick={acceptCall}
//                     >
//                       ✅ Accept
//                     </button>
//                     <button 
//                       className="btn btn-danger"
//                       style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
//                       onClick={rejectCall}
//                     >
//                       ❌ Reject
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-muted fst-italic mt-4 text-center">Waiting for incoming calls...</p>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Video Call Section */}
//       {showVideoCall && callRoom && (
//         <div className="container mt-5">
//           <div className="card bg-light shadow-lg p-4 rounded-4">
//             <h5 className="text-center text-primary mb-3">Video Call in Progress 🎥</h5>
//             <iframe
//               src={`https://meet.jit.si/${callRoom}`}
//               allow="camera; microphone; fullscreen; display-capture"
//               className="w-100"
//               style={{ height: "500px", border: "none", borderRadius: "12px" }}
//               title="Expert Video Call"
//             ></iframe>
//             <div className="text-center mt-3">
//               <button className="btn btn-danger" onClick={endCall}>
//                 End Call
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpertDashboard;


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client"; 
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// const ExpertDashboard = () => {
//   const [expert, setExpert] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(false);
//   const [callRoom, setCallRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showVideoCall, setShowVideoCall] = useState(false);
//   const [socket, setSocket] = useState(null);


//   //gettin expert info

//   useEffect(()=>{
//     const fetchExpertDetails = async ()=>{
//       try {
//         const res = await axios.get('http:localhost:8000/users/expert-detail', {withCredentials: true});
  
//         setExpert(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

//     fetchExpertDetails();
//   }, []);

//   useEffect(() => {
//     // Simulate expert details load
//     setTimeout(() => {
//       const expertData = {
//         _id: "expert1234", // 👈 add real expertId here when you implement login
//         name: "Dr. Aman Pandey",
//         specialization: "Cognitive Behavioral Therapy",
//         available: true,
//       };
//       setExpert(expertData);
//       setLoading(false);

//       // After expert details loaded, connect to socket server
//       const newSocket = io('http://localhost:5000', {
//         query: {
//           userId: expertData._id, // 🔥 pass expert's id in query
//         },
//       });

//       setSocket(newSocket);

//       // When a new session is received
//       newSocket.on('new_session', ({ roomName, userId }) => {
//         console.log(`Incoming session from user: ${userId}, Room: ${roomName}`);
//         setIncomingCall(true);
//         setCallRoom(roomName);
//       });

//       newSocket.on('connect', () => {
//         console.log('Connected to socket server ✅');
//       });

//       newSocket.on('disconnect', () => {
//         console.log('Disconnected from socket server ❌');
//       });

//       // Clean up when component unmounts
//       return () => {
//         newSocket.disconnect();
//       };
//     }, 1000);
//   }, []);

//   const acceptCall = () => {
//     setIncomingCall(false);
//     setShowVideoCall(true);
//   };

//   const rejectCall = () => {
//     setIncomingCall(false);
//     setCallRoom(null);
//   };

//   const endCall = () => {
//     setShowVideoCall(false);
//     setCallRoom(null);
//   };

//   return (
//     <div 
//       className="d-flex flex-column align-items-center justify-content-center"
//       style={{
//         minHeight: "85vh",
//         background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
//         padding: "0px 0px 40px 0px",
//       }}
//     >
//       {/* Hero Section */}
//       <div className="text-center mb-4">
//         <span style={{ fontSize: "80px" }}>🧑‍💻</span>
//         <h1 style={{ marginTop: "20px", fontWeight: "700", color: "#0077b6" }}>
//           Welcome, {expert?.name || "Expert"}!
//         </h1>
//         <p style={{ color: "#555", fontSize: "18px", marginTop: "10px" }}>
//           {loading ? "Loading your dashboard..." : "Ready to assist users today? 🚀"}
//         </p>
//       </div>

//       {/* Main Card */}
//       {!showVideoCall && (
//         <div 
//           className="d-flex flex-column align-items-center"
//           style={{
//             backgroundColor: "#ffffff",
//             borderRadius: "20px",
//             padding: "30px 40px",
//             maxWidth: "500px",
//             width: "100%",
//             boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
//           }}
//         >
//           {/* Expert Info */}
//           {loading ? (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
//               <div className="spinner-border text-primary" role="status"></div>
//             </div>
//           ) : (
//             <>
//               <h4 style={{ fontWeight: "600", color: "#333" }}>Expert Info 🏆</h4>
//               <p style={{ marginTop: "10px", fontSize: "16px" }}>
//                 <strong>Name:</strong> <span style={{ color: "#555" }}>{expert.name}</span>
//               </p>
//               <p style={{ fontSize: "16px" }}>
//                 <strong>Specialization:</strong> <span style={{ color: "#555" }}>{expert.specialization}</span>
//               </p>

//               {/* Incoming Call Section */}
//               {incomingCall ? (
//                 <div className="mt-4 text-center">
//                   <p className="fw-bold text-warning mb-3">📞 Incoming Call...</p>
//                   <div className="d-flex justify-content-between w-100">
//                     <button 
//                       className="btn btn-success"
//                       style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
//                       onClick={acceptCall}
//                     >
//                       ✅ Accept
//                     </button>
//                     <button 
//                       className="btn btn-danger"
//                       style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
//                       onClick={rejectCall}
//                     >
//                       ❌ Reject
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-muted fst-italic mt-4 text-center">Waiting for incoming calls...</p>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Video Call Section */}
//       {showVideoCall && callRoom && (
//         <div className="container mt-5">
//           <div className="card bg-light shadow-lg p-4 rounded-4">
//             <h5 className="text-center text-primary mb-3">Video Call in Progress 🎥</h5>
//             <iframe
//               src={`https://meet.jit.si/${callRoom}`}
//               allow="camera; microphone; fullscreen; display-capture"
//               className="w-100"
//               style={{ height: "500px", border: "none", borderRadius: "12px" }}
//               title="Expert Video Call"
//             ></iframe>
//             <div className="text-center mt-3">
//               <button className="btn btn-danger" onClick={endCall}>
//                 End Call
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpertDashboard;


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client"; 
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// const ExpertDashboard = () => {
//   const [expert, setExpert] = useState(null);
//   const [incomingCall, setIncomingCall] = useState(false);
//   const [callRoom, setCallRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showVideoCall, setShowVideoCall] = useState(false);
//   const [socket, setSocket] = useState(null);

//   // Fetch expert details from the backend
//   useEffect(() => {
//     const fetchExpertDetails = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/users/expert-detail', { withCredentials: true });
//         setExpert(res.data);  // Set expert data from API response
//         console.log("backend : ", res);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

//     fetchExpertDetails();
//   }, []);

//   useEffect(() => {
//     // If expert data is loaded, establish socket connection
//     if (expert) {
//       const newSocket = io('http://localhost:8000', {
//         query: {
//           userId: expert._id, // Pass expert's id in query for identification
//         },
//         transports: ['websocket'],
//         withCredentials: true,
//       });

//       setSocket(newSocket);

//       // Listen for incoming session requests
//       newSocket.on('new_session', ({ roomName, userId }) => {
//         console.log(`Incoming session from user: ${userId}, Room: ${roomName}`);
//         setIncomingCall(true);
//         setCallRoom(roomName);
//       });

//       newSocket.on('connect', () => {
//         console.log('Connected to socket server ✅');
//       });

//       newSocket.on('disconnect', () => {
//         console.log('Disconnected from socket server ❌');
//       });

//       // Cleanup on component unmount
//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [expert]); // Dependency on expert to re-establish socket connection after expert data is fetched

//   const acceptCall = () => {
//     setIncomingCall(false);
//     setShowVideoCall(true);
//   };

//   const rejectCall = () => {
//     setIncomingCall(false);
//     setCallRoom(null);
//   };

//   const endCall = () => {
//     setShowVideoCall(false);
//     setCallRoom(null);
//   };

//   return (
//     <div 
//       className="d-flex flex-column align-items-center justify-content-center"
//       style={{
//         minHeight: "85vh",
//         background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
//         padding: "0px 0px 40px 0px",
//       }}
//     >
//       {/* Hero Section */}
//       <div className="text-center mb-4">
//         <span style={{ fontSize: "80px" }}>🧑‍💻</span>
//         <h1 style={{ marginTop: "20px", fontWeight: "700", color: "#0077b6" }}>
//           Welcome, {expert?.username || "Expert"}!
//         </h1>
//         <p style={{ color: "#555", fontSize: "18px", marginTop: "10px" }}>
//           {loading ? "Loading your dashboard..." : "Ready to assist users today? 🚀"}
//         </p>
//       </div>

//       {/* Main Card */}
//       {!showVideoCall && (
//         <div 
//           className="d-flex flex-column align-items-center"
//           style={{
//             backgroundColor: "#ffffff",
//             borderRadius: "20px",
//             padding: "30px 40px",
//             maxWidth: "500px",
//             width: "100%",
//             boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
//           }}
//         >
//           {/* Expert Info */}
//           {loading ? (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
//               <div className="spinner-border text-primary" role="status"></div>
//             </div>
//           ) : (
//             <>
//               <h4 style={{ fontWeight: "600", color: "#333" }}>Expert Info 🏆</h4>
//               <p style={{ marginTop: "10px", fontSize: "16px" }}>
//                 <strong>Name:</strong> <span style={{ color: "#555" }}>{expert?.username}</span>
//               </p>
//               <p style={{ fontSize: "16px" }}>
//                 <strong>Specialization:</strong> <span style={{ color: "#555" }}>{expert?.specialization}</span>
//               </p>

//               {/* Incoming Call Section */}
//               {incomingCall ? (
//                 <div className="mt-4 text-center">
//                   <p className="fw-bold text-warning mb-3">📞 Incoming Call...</p>
//                   <div className="d-flex justify-content-between w-100">
//                     <button 
//                       className="btn btn-success"
//                       style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
//                       onClick={acceptCall}
//                     >
//                       ✅ Accept
//                     </button>
//                     <button 
//                       className="btn btn-danger"
//                       style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
//                       onClick={rejectCall}
//                     >
//                       ❌ Reject
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-muted fst-italic mt-4 text-center">Waiting for incoming calls...</p>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Video Call Section */}
//       {showVideoCall && callRoom && (
//         <div className="container mt-5">
//           <div className="card bg-light shadow-lg p-4 rounded-4">
//             <h5 className="text-center text-primary mb-3">Video Call in Progress 🎥</h5>
//             <iframe
//               src={`https://meet.jit.si/${callRoom}`}
//               allow="camera; microphone; fullscreen; display-capture"
//               className="w-100"
//               style={{ height: "500px", border: "none", borderRadius: "12px" }}
//               title="Expert Video Call"
//             ></iframe>
//             <div className="text-center mt-3">
//               <button className="btn btn-danger" onClick={endCall}>
//                 End Call
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpertDashboard;


import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpertDashboard = () => {
  const [expert, setExpert] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callRoom, setCallRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [socket, setSocket] = useState(null);

  // Fetch expert details
  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users/expert-detail", {
          withCredentials: true,
        });

        const expertData = {
          ...res.data,
          available: true, // Mark expert as available
        };

        setExpert(expertData);
        setLoading(false);

        // After setting expert, initialize socket connection
        const newSocket = io("http://localhost:8000", {
          query: {
            userId: expertData._id,
          },
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
          console.log("Connected to socket server ✅");
        });

        newSocket.on("disconnect", () => {
          console.log("Disconnected from socket server ❌");
        });

        newSocket.on("new_session", ({ roomName, userId }) => {
          console.log(`Incoming call from user ${userId} in room ${roomName}`);
          setCallRoom(roomName);
          setIncomingCall(true);
        });

        return () => newSocket.disconnect();
      } catch (error) {
        console.error("Error fetching expert details:", error);
        setLoading(false);
      }
    };

    fetchExpertDetails();
  }, []);

  const acceptCall = () => {
    setIncomingCall(false);
    setShowVideoCall(true);
    joinRoom();
  };

  const joinRoom = () => {
    if (callRoom) {
      // Automatically join the Jitsi room without waiting for approval
      const jitsiUrl = `https://meet.jit.si/${callRoom}?moderator=true&autoJoin=true`; // Set `moderator=true` to allow automatic join
      window.location.href = jitsiUrl; // Redirect expert to the Jitsi room directly
    }
  };

  const rejectCall = () => {
    setIncomingCall(false);
    setCallRoom(null);
  };

  const endCall = () => {
    setShowVideoCall(false);
    setCallRoom(null);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "85vh",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
        padding: "0px 0px 40px 0px",
      }}
    >
      {/* Hero Section */}
      <div className="text-center mb-4">
        <span style={{ fontSize: "80px" }}>🧑‍💻</span>
        <h1 style={{ marginTop: "20px", fontWeight: "700", color: "#0077b6" }}>
          Welcome, {expert?.username || "Expert"}!
        </h1>
        <p style={{ color: "#555", fontSize: "18px", marginTop: "10px" }}>
          {loading ? "Loading your dashboard..." : "Ready to assist users today? 🚀"}
        </p>
      </div>

      {/* Main Card */}
      {!showVideoCall && (
        <div
          className="d-flex flex-column align-items-center"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "30px 40px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Expert Info */}
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <>
              <h4 style={{ fontWeight: "600", color: "#333" }}>Expert Info 🏆</h4>
              <p style={{ marginTop: "10px", fontSize: "16px" }}>
                <strong>Name:</strong> <span style={{ color: "#555" }}>{expert.username}</span>
              </p>
              <p style={{ fontSize: "16px" }}>
                <strong>Specialization:</strong>{" "}
                <span style={{ color: "#555" }}>{expert.specialization}</span>
              </p>

              {/* Incoming Call Section */}
              {incomingCall ? (
                <div className="mt-4 text-center">
                  <p className="fw-bold text-warning mb-3">📞 Incoming Call...</p>
                  <div className="d-flex justify-content-between w-100">
                    <button
                      className="btn btn-success"
                      style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
                      onClick={acceptCall}
                    >
                      ✅ Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ width: "48%", fontWeight: "600", borderRadius: "10px" }}
                      onClick={rejectCall}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted fst-italic mt-4 text-center">
                  Waiting for incoming calls...
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* Video Call Section */}
      {showVideoCall && callRoom && (
        <div className="container mt-5">
          <div className="card bg-light shadow-lg p-4 rounded-4">
            <h5 className="text-center text-primary mb-3">Video Call in Progress 🎥</h5>
            <iframe
              src={`https://meet.jit.si/${callRoom}`}
              allow="camera; microphone; fullscreen; display-capture"
              className="w-100"
              style={{ height: "500px", border: "none", borderRadius: "12px" }}
              title="Expert Video Call"
            ></iframe>
            <div className="text-center mt-3">
              <button className="btn btn-danger" onClick={endCall}>
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDashboard;
