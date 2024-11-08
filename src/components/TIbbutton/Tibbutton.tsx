import { Button } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";
// import Button from "@mui/material-next/Button";

interface TibButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttontype?: "text" | "outlined" | "contained";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

// Defining the TibButton component
export const TibButton = ({
  children,
  onClick,
  buttontype = "contained",
  startIcon,
  endIcon,
  className,
  disabled = false,
  type,
}: TibButtonProps) => {
  // Creating the CSS class name for the button, adding "disableButton" class if disabled
  const buttonClassName = disabled ? `${className} disableButton` : className;

  // Rendering the Button component with provided props and custom CSS class
  return (
    <Button
      id="tib-button"
      onClick={onClick}
      variant={buttontype}
      startIcon={startIcon}
      endIcon={endIcon}
      className={buttonClassName}
      disabled={disabled}
      type={type}
      disableRipple
      disableFocusRipple
    >
      {children}
    </Button>
  );
};
