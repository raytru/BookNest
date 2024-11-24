import { useState, useEffect } from "react";

export function usePasswordMatch(password, confirmPassword) {
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Check if password and confirm password match
        if (confirmPassword === '') {
            setPasswordMatch(true); 
            setIsValid(false); 
        } else if (password === confirmPassword) {
            setPasswordMatch(true);
            setIsValid(true); 
        } else {
            setPasswordMatch(false);
            setIsValid(false); 
        }
    }, [password, confirmPassword]);

    return { passwordMatch, isValid };
}
