import { useState, useEffect } from "react";

export function usePasswordMatch(password, confirmPassword) {
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        // Check if password and confirm password match
        setPasswordMatch(password === confirmPassword || confirmPassword === '');
      }, [password, confirmPassword]);

      return passwordMatch;
}