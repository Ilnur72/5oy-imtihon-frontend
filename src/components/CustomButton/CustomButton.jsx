import React from "react";
import "./custom-button.scss";

const CustomButton = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const animateButton = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div className="text-center">
      <button
        className={`btn submit-habit ${isAnimating ? "onclick" : ""}`}
        id="submit-habit"
        onClick={animateButton}
      >
        <span className="submit-habit-label text-white">Completed</span>
        <span
          className={`checkmark ${
            isAnimating ? "hide flex justify-center" : ""
          }`}
          id="submit-habit-checkmark"
        >
          <svg viewBox="0 0 24 24">
            <polyline
              className="path"
              fill="none"
              points="4,12 9,17 20,6"
              stroke="#fff"
              strokeWidth="3"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default CustomButton;
