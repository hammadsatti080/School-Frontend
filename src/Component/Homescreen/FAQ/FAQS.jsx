import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FAQS.css";

export default function FAQS() {
  const faqs = [
    {
      question: "What are the school timings?",
      answer:
        "Our school operates from 8:00 AM to 3:00 PM, Monday to Friday, with extracurricular activities included in the schedule.",
    },
    {
      question: "Which classes are available?",
      answer:
        "We offer classes from Nursery to Higher Secondary (12th) with a focus on both academics and skill development.",
    },
    {
      question: "Do you provide computer and coding courses?",
      answer:
        "Yes! We have computer labs and offer programming and coding courses for different age groups, including web development basics.",
    },
    {
      question: "Are extracurricular activities available?",
      answer:
        "Absolutely! Sports, arts, music, debate, competitions, and workshops are all part of our school curriculum.",
    },
    {
      question: "Do you offer scholarships?",
      answer:
        "Yes, meritorious and deserving students are eligible for scholarships and awards to encourage excellence.",
    },
    {
      question: "How can I enroll my child?",
      answer:
        "You can contact our admissions office through the 'Contact' page or visit the school to complete the enrollment process.",
    },
  ];

  return (
    <section className="faqs-section py-5">
      <div className="container">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h2 className="fw-bold">Frequently Asked Questions</h2>
            <p className="text-muted">
              Here are some common questions about our school and programs.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <div className="accordion" id="faqsAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqsAccordion"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}