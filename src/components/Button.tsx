import React from "react";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  onClick?: () => void;
  styles?: string;
  type?: "button" | "submit";
  to?: string;
};

const Button = ({ text, onClick, styles, type = "button", to }: Props) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`text-white inline-flex items-center justify-center p-[6px_12px] rounded-md leading-6 border border-inherit font-normal cursor-pointer text-center align-middle ${styles} text-base no-underline`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white inline-flex items-center justify-center p-[6px_12px] rounded-md leading-6 border border-inherit font-normal cursor-pointer text-center align-middle ${styles} text-base`}
    >
      {text}
    </button>
  );
};

export default Button;