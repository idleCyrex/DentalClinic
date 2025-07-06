import React, { useState, useRef, useEffect } from "react";

const reviews = [
  {
    name: "Leslie Alexander",
    role: "Satisfied Patient",
    rating: 5,
    title: "Professional and Friendly!",
    text:
      "Dr. Mariana and her team made me feel comfortable from the moment I walked in. The care and attention to detail were outstanding. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Bessie Lane",
    role: "Satisfied Patient",
    rating: 5,
    title: "Highly Recommended!",
    text:
      "I was nervous about my dental visit, but the staff was so welcoming and gentle. My treatment was painless and the results are amazing!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "John Doe",
    role: "Patient",
    rating: 4,
    title: "Great Service",
    text:
      "Very professional staff and clean clinic. Will come again for sure.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "Patient",
    rating: 4,
    title: "Comfortable Experience",
    text:
      "The dentist explained everything clearly and made me feel at ease.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Michael Brown",
    role: "Patient",
    rating: 3.5,
    title: "Good but Room for Improvement",
    text:
      "Overall good, but the wait time was a bit long.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily White",
    role: "Patient",
    rating: 5,
    title: "Exceptional Care",
    text:
      "Best dental experience I've ever had. Thank you!",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

function Reviews() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const REVIEWS_PER_PAGE = isMobile ? 1 : 2;

  const [page, setPage] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [cardFade, setCardFade] = useState(false);
  const dragRef = useRef(null);

  const [fadeInStage, setFadeInStage] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInViewport(true);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (isInViewport) {
      const timeouts = [
        setTimeout(() => setFadeInStage(1), 200),
        setTimeout(() => setFadeInStage(2), 500),
        setTimeout(() => setFadeInStage(3), 900),
      ];
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isInViewport]);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  useEffect(() => {
    setCardFade(false);
    const timeout = setTimeout(() => setCardFade(true), 50);
    return () => clearTimeout(timeout);
  }, [page, isMobile]);

  const handlePageChange = (idx) => {
    if (idx >= 0 && idx < totalPages) setPage(idx);
  };

  const handleDragStart = (e) => {
    setDragging(true);
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };

  const handleDragEnd = (e) => {
    if (!dragging) return;
    const endX = e.type === "touchend"
      ? (e.changedTouches[0]?.clientX ?? 0)
      : e.clientX;
    const diff = endX - dragStartX;
    if (diff > 60) {
      handlePageChange(page - 1);
    } else if (diff < -60) {
      handlePageChange(page + 1);
    }
    setDragging(false);
    setDragStartX(null);
  };

  const paginatedReviews = reviews.slice(
    page * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );

  return (
    <div className="reviews-section" ref={sectionRef}>
      <span className={`reviews-subtitle ${fadeInStage >= 1 ? "fadeIn" : "hidden"}`}>TESTIMONIALS</span>
      <h2 className={`reviews-title ${fadeInStage >= 2 ? "fadeIn" : "hidden"}`}>
        What Our <span className="reviews-title-highlight">Patients</span> Have to Say
      </h2>
      <div className="reviews-flex-row">
        <button
          aria-label="Previous"
          className={`reviews-arrow reviews-arrow-btn${page === 0 ? " disabled" : ""}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div
          className={`reviews-cards ${fadeInStage >= 3 ? "fadeIn" : "hidden"}`}
          ref={dragRef}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {paginatedReviews.map((review, idx) => (
            <div
              className={`review-card review-card-draggable${cardFade ? " fadeIn" : ""}`}
              key={idx}
              draggable
              onDragStart={e => {
                handleDragStart(e);
                if (e.dataTransfer) {
                  const img = document.createElement("img");
                  img.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=";
                  e.dataTransfer.setDragImage(img, 0, 0);
                }
              }}
              onDragEnd={handleDragEnd}
            >
              <div className="review-rating-row">
                <span className="review-stars">
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (i < Math.floor(review.rating)) {
                      return <i className="fa-solid fa-star" key={i}></i>;
                    } else if (i < review.rating) {
                      return <i className="fa-solid fa-star-half-stroke" key={i}></i>;
                    } else {
                      return <i className="fa-regular fa-star" key={i}></i>;
                    }
                  })}
                </span>
                <span className="review-rating">{review.rating.toFixed(1)}</span>
              </div>
              <div className="review-title">{review.title}</div>
              <div className="review-text">{review.text}</div>
              <div className="review-user-row">
                <img className="review-avatar" src={review.avatar} alt={review.name} />
                <div>
                  <div className="review-user-name">{review.name}</div>
                  <div className="review-user-role">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          aria-label="Next"
          className={`reviews-arrow reviews-arrow-btn${page === totalPages - 1 ? " disabled" : ""}`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div className={`reviews-pagination ${fadeInStage >= 3 ? "fadeIn" : "hidden"}`}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <div
            key={idx}
            className={`reviews-dot${page === idx ? " reviews-dot-active" : ""}`}
            onClick={() => handlePageChange(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;