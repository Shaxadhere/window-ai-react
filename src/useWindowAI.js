import { useState, useEffect } from 'react';

// Custom hook to check for Window.ai and interact with it
export const useWindowAI = () => {
    const [isWindowAIInstalled, setIsWindowAIInstalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if Window.ai is installed
        const interval = setInterval(() => {
            console.log("Checking", window.ai);
            if (typeof window.ai !== 'undefined') {
                setIsWindowAIInstalled(true);
                clearInterval(interval)
            } else {
                setIsWindowAIInstalled(false);
            }
        }, 1000)
        setLoading(false);
        return (() => clearInterval(interval))
    }, []);

    // Function to generate text using Window.ai
    const generateText = async (prompt, onStreamResult) => {
        if (!isWindowAIInstalled) {
            setError('Window.ai is not installed.');
            return;
        }

        try {
            const response = await window.ai.generateText(
                { prompt },
                { onStreamResult }
            );
            return response;
        } catch (err) {
            setError(err.message);
        }
    };

    const getCompletion = async (prompt, onStreamResult) => {
        if (!isWindowAIInstalled) {
            setError('Window.ai is not installed.');
            return;
        }

        try {
            const response = await window.ai.getCompletion(
                { prompt },
                { onStreamResult }
            );
            return response;
        } catch (err) {
            setError(err.message);
        }
    };

    return {
        isWindowAIInstalled,
        loading,
        error,
        generateText,
        getCompletion
    };
};
