import React from "react";

const Mentalhealthchat = () => {
  return (
    <>
      <div className="container-fluid fontstyle p-5 border">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <p className="fs-3 text-center">
              Our Mission <br />
              Empowering Minds, Transforming Lives
            </p>
            <p className="fs-6 p-3 text-center">
              Our AI-powered chatbot is here to listen, understand, and offer
              guidance whenever you need it. With every conversation, we aim to
              create a safe space where you can talk openly and receive helpful
              advice. Your mental well-being is our top priority, and we are
              always here to support you.
            </p>
          </div>
        </div>

        {/* New row for the button */}
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center">
            <button className="btn btn-lg btn-outline-danger">
              Try Out Our Model
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentalhealthchat;
