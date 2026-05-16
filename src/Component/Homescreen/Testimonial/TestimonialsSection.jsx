import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TestimonialsSection.css";
import { useEffect } from "react";

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 /* const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([formData, ...reviews]); 
    setFormData({ name: "", email: "", rating: 5, message: "" });
  };*/

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("https://school-backend-blond.vercel.app/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  setReviews([data, ...reviews]);
  setFormData({ name: "", email: "", rating: 5, message: "" });
};
useEffect(() => {
  fetch("https://school-backend-blond.vercel.app/api/reviews")
    .then(res => res.json())
    .then(data => setReviews(data));
}, []);

  return (
    <section className="testimonials-section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Testimonials & Reviews</h2>
        <p className="text-center text-muted mb-5">
          See what our students and parents say about us or leave your review below.
        </p>

        <div className="row g-4">
          {/* Review Form */}
          <div className="col-12 col-md-6">
            <div className="card p-4 h-100">
              <h5 className="fw-semibold mb-3">Leave a Review</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name  <span style={{color : "red"}}>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email  <span style={{color : "red"}}>*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">Rating  <span style={{color : "red"}}>*</span></label>
                  <select
                    id="rating"
                    name="rating"
                    className="form-select"
                    value={formData.rating}
                    onChange={handleChange}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={1}>⭐</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message  <span style={{color : "red"}}>*</span> </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Reviews Display */}
          <div className="col-12 col-md-6">
            <div className="reviews-display">
              {reviews.length === 0 ? (
                <p className="text-muted">No reviews yet. Be the first to submit!</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="card mb-3 p-3">
                    <h6 className="fw-semibold mb-1">{review.name} ({review.rating}⭐)</h6>
                    <small className="text-muted">{review.email}</small>
                    <p className="mt-2">{review.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}