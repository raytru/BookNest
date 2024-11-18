import { useState, useEffect } from "react";

export function useUsernameValidation(username, usernameTouched) {
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (usernameTouched) {
      if (username.length === 0) {
        setUsernameError(""); // Clear error if no input
      } else if (username.length < 3) {
        setUsernameError("Username should be more than 3 characters.");
      } else if (username.length > 15) {
        setUsernameError("Username should be less than 15 characters.");
      } else if (/[!@#$%^&*(),.?":{}|<>]/.test(username)) {
        setUsernameError(
          "Username contains invalid characters. Please remove special characters like !, @, #, $, %, etc."
        );
      } else {
        setUsernameError(""); // Clear error if valid
      }
    }
  }, [username, usernameTouched]);

  return usernameError;
}
