import React from "react";

interface IllegalWordProps {
  word: string;
}

const IllegalWord: React.FC<IllegalWordProps> = ({ word }) => {
  return (
    <div className="message">
      <div className="flex column center">
        <span><span style={{ color: "#BDB76B" }}>{word}</span> is not a valid word!⛔️</span>
      </div>
    </div>
  );
};

export default IllegalWord;
