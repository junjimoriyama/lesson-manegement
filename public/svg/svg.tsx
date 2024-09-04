import React from "react";

export const AuthIcon = () => {
  return (
    <svg
      className="authSvg"
      width="90"
      height="74"
      viewBox="0 0 90 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
      
        d="M70.9513 74H0V60.6966C0 52.7146 6.65169 43.7903 17.7378 43.7903H53.2135C67.6255 43.7903 70.9513 53.2135 70.9513 60.6966V74Z"
        fill="black"
      />
      <circle cx="35.1985" cy="19.1236" r="19.1236" fill="black" />
      <circle cx="35.1985" cy="19.1236" r="19.1236" stroke="black" />
      <path
        d="M79.8771 32.0708L76.147 32.086C76.1339 28.8698 75.9354 20.7617 69.8428 20.7865C63.7502 20.8113 63.9681 29.0799 63.6562 32.1367L59.9261 32.1519C59.8063 24.768 62.304 19.8032 65.1311 18.2921C67.4114 17.0733 70.9587 17.0645 74 18.015C78.4345 19.4008 79.9135 27.731 79.8771 32.0708Z"
        fill="black"
      />
      <rect
        x="50.9086"
        y="32.1713"
        width="37.9101"
        height="25.1611"
        rx="9"
        transform="rotate(-0.23286 50.9086 32.1713)"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.4589 43.9946C72.5244 43.4411 73.2502 42.3255 73.245 41.0422C73.2376 39.2142 71.7497 37.7384 69.9218 37.7458C68.0938 37.7533 66.618 39.2411 66.6254 41.0691C66.6306 42.3523 67.3655 43.4621 68.4354 44.0069L66.0916 49.5405L73.8476 49.509L71.4589 43.9946Z"
        fill="black"
      />
    </svg>
  );
};

export const PrevArrow = ({handlePrevMonth}: {handlePrevMonth: () => void}) => {
  return (
    <svg
      className="arrow prevBtn"
      width="60"
      height="40"
      viewBox="0 0 87 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handlePrevMonth}
    >
      <path
        d="M2.42286e-06 26.2857L42.5688 54L42.5688 38.2857L87 38.2857L87 15.7143L42.5688 15.7143L42.5688 -7.699e-06L2.42286e-06 26.2857Z"
        fill="#333333"
      />
    </svg>
  );
};

export const NextArrow = ({handleNextMonth}: {handleNextMonth: () => void}) => {
  return (
    <svg
    className="arrow nextBtn"
      width="60"
      height="40"
      viewBox="0 0 87 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleNextMonth}
    >
      <path
        d="M87 27.7143L44.4312 0V15.7143H0V38.2857H44.4312V54L87 27.7143Z"
        fill="#333333"
      />
    </svg>
  );
};
