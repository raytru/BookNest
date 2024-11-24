import { useState, useEffect } from "react";

export function usePasswordValidation(password, passwordTouched, config = {}) {
  const {
    minLength = 8,
    specialCharRequirment = /[!@#$%^&*(),.?":{}|<>]/,  // Positive regex
    numberRequirment = /\d/,  // Positive regex
  } = config;

  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (passwordTouched) {
      // Case: Empty password field
      if (password.length === 0) {
        setPasswordError(""); // Clear error if no input
        setIsValid(false);
      }
      // Case: Password too short
      else if (password.length < minLength) {
        setPasswordError(`Password should be at least ${minLength} characters.`);
        setIsValid(false);
      }
      // Case: Password doesn't meet special character or number requirement
      else if (!specialCharRequirment.test(password) && !numberRequirment.test(password)) {
        setPasswordError(
          "Password must contain at least one number or special character."
        );
        setIsValid(false);
      }
      // Case: Password is valid
      else {
        setPasswordError(""); // Clear error if valid
        setIsValid(true);
      }
    }
  }, [password, passwordTouched, minLength, specialCharRequirment, numberRequirment]);

  return { passwordError, isValid };
}
