import React from "react";
import Confetti from "react-confetti";

const VictoryScreen: React.FC = () => {
  return (
    <div className="message">
      <div className="flex column center">
        <span style={{ color: "#F0E68C" }}>Congratulations, you won!🎉🥳</span>
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default VictoryScreen;
