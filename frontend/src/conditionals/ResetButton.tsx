import React from "react";
import { BiReset } from "react-icons/bi";
import ReactTooltip from 'react-tooltip';

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <div className="button">
        <ReactTooltip/>
        <BiReset onClick={onClick} style={{ width: "2rem", height: "2rem" }} data-tip="New game"/>
    </div>
  );
};

export default ResetButton;
