import React from "react";
import './HowITWorks.css';

const HowItWorks = () => {
  return (
    <div id="services" className="container my-5 fontstyle p-3 border-1">
      <h2 className="text-center fs-1">How It Works <i className="fa-solid fa-gear"></i></h2>
      <div className="row d-flex justify-content-center p-3">
        
        {/* Step 1 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-center">Step 1: Start a Conversation & Share Your Thoughts</h5>
              <p className="card-text contentFontstyle">
                Open the chatbot and begin talking about any mental health concern or general feelings. The AI listens actively and understands the context of your emotions, providing a safe space for open communication.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-center">Step 2: Receive Empathetic Responses & Actionable Tips</h5>
              <p className="card-text contentFontstyle">
                Based on your responses, the chatbot provides empathetic advice, mindfulness exercises, and strategies for managing stress. It also suggests relevant resources for self-care and mental wellness.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-center">Step 3: Track Mental Health & Identify Critical Conditions</h5>
              <p className="card-text contentFontstyle">
                The chatbot tracks your conversation history and emotional state. If it detects signs of critical mental health conditions, such as severe distress or prolonged negative emotions.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-center">Step 4: Immediate Counseling & Continuous Support</h5>
              <p className="card-text contentFontstyle">
                If critical mental health conditions are detected, the chatbot will immediately connect you with a licensed mental health expert. You will receive personalized counseling and ongoing support.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
