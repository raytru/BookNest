import { useState, useEffect } from "react";

export function usePasswordValidation(password, passwordTouched) {
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (passwordTouched) {
      if (password.length === 0) {
        setPasswordError(""); // Clear error if no input
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters.");
      } else if (
        !/[!@#$%^&*(),.?":{}|<>]/.test(password) &&
        !/\d/.test(password)
      ) {
        setPasswordError(
          "Password must contain at least one number or special character."
        );
      } else {
        setPasswordError(""); // Clear error if valid
      }
    }
  }, [password, passwordTouched]);

  return passwordError;
}
