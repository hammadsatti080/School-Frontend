import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
  return (
    <footer className="bg-black text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Column 1: About */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">My App</h4>
            <p>Providing quality education and a bright future for all students.</p>

            <div className="d-flex gap-3 mt-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/Branch" className="text-light text-decoration-none">Branches</a></li>
              <li><a href="/Service" className="text-light text-decoration-none">Services</a></li>
              <li><a href="/Feature" className="text-light text-decoration-none">Features</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Contact</h5>
            <ul className="list-unstyled">

              <li className="mb-2">
                <i className="bi bi-telephone-fill me-2"></i>
                <a href="tel:+923001234567" className="text-light text-decoration-none">
                  +92 300 1234567
                </a>
              </li>

              <li className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                <a href="mailto:info@example.com" className="text-light text-decoration-none">
                  info@example.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Text */}
        <div className="text-center mt-4">
          <small>&copy; {new Date().getFullYear()} My School. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}