import React from "react";
import "./style.css"

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Button = ({children, onClick}: ButtonProps) => (

    <button className="default-button" onClick={ onClick }>{ children }</button>);

export default Button;
