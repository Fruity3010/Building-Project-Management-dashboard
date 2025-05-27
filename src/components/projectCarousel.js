import React, { useState } from "react";
import { Row, Col } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ProjectImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://ubec.gov.ng/wp-content/uploads/2021/11/14-1024x631.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREDdJNiBCPZtRWfaR--geXlv9-pZfHJQxYxw&s",
    "https://cdn.pmnewsnigeria.com/2021/05/What-UBECs-smart-school-may-look-like-.jpg",
"https://ubec.gov.ng/wp-content/uploads/2021/11/14-1024x631.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREDdJNiBCPZtRWfaR--geXlv9-pZfHJQxYxw&s",
    "https://cdn.pmnewsnigeria.com/2021/05/What-UBECs-smart-school-may-look-like-.jpg",
  ];

  const getVisibleImages = () => {
    const circularImages = [...images, ...images];
    return circularImages.slice(activeIndex, activeIndex + 3);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const visibleImages = getVisibleImages();

  return (
    <div style={{ position: "relative", padding: "0 40px", marginBottom: "2rem" }}>
      <Row className="g-3" style={{ minHeight: "250px" }}>
        {visibleImages.map((src, i) => (
          <Col key={`${activeIndex}-${i}`} xs={12} md={4}>
            <div
              style={{
                height: "250px",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={src}
                alt={`Project ${(activeIndex + i) % images.length + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "white",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Project {(activeIndex + i) % images.length + 1}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.9)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.9)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Dots Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "8px",
        }}
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: activeIndex === idx ? "#28a745" : "#d1d7e0",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectImageCarousel;
