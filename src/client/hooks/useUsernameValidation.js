import { useState, useEffect } from "react";

export function useUsernameValidation(username, usernameTouched, config = {}) {
  const {
    minLength = 3,
    maxLength = 15,
    disallowedChars = /[!@#$%^&*(),.?":{}|<>]/,
    containsWhitespace = /\s/,
  } = config;

  const [usernameError, setUsernameError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (usernameTouched) {
      if (username.length === 0) {
        setUsernameError("");
        setIsValid(false);
      } else if (username.length < minLength) {
        setUsernameError(`Username should be at least ${minLength} characters.`);
        setIsValid(false);
      } else if (username.length > maxLength) {
        setUsernameError(`Username should be less than ${maxLength} characters.`);
        setIsValid(false);
      } else if (disallowedChars.test(username)) {
        setUsernameError("Username contains invalid characters.");
        setIsValid(false);
      } else if (containsWhitespace.test(username)) {
        setUsernameError("Username cannot contain spaces");
      } else {
        setUsernameError("");
        setIsValid(true);
      }
    }
  }, [username, usernameTouched, minLength, maxLength, disallowedChars, containsWhitespace]);

  return { usernameError, isValid };
}

