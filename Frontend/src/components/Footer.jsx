import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white fontstyle py-4">
      <div className="container">
        {/* Contact Information */}
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>
              Email:{" "}
              <a
                href="mailto:support@therapyai.com"
                className="text-decoration-none text-white"
              >
                support@therapyai.com
              </a>
            </p>
            <p>Phone: +1-800-THERAPY (843-7279)</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h5>Follow Us</h5>
            <a
              href="https://facebook.com/therapyai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
            >
              <i className="bi bi-facebook"></i> Facebook
            </a>
            <a
              href="https://twitter.com/therapyai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
            >
              <i className="bi bi-twitter"></i> Twitter
            </a>
            <a
              href="https://instagram.com/therapyai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <i className="bi bi-instagram"></i> Instagram
            </a>
          </div>
        </div>

        {/* Links and Newsletter */}
        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-decoration-none text-white">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-decoration-none text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="text-decoration-none text-white"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Wellness Updates</h5>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p className="mb-2">
              Disclaimer: TherapyAI is not a substitute for professional medical
              advice. If you are in crisis, contact emergency services.
            </p>
            <p className="mb-0">© 2024 TherapyAI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
