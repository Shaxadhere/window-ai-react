# window-ai-react
`window-ai-react` is a React hook that simplifies the integration of the Window.ai browser extension into your web applications. With this hook, you can check if the Window.ai extension is installed, prompt users to install it if necessary, and interact with AI models directly from your React components—all without the need for API keys or backend setups.

## Features
Check Installation: Automatically detects if the Window.ai extension is installed in the user's browser.
User Prompt: Notifies users to install the extension if it's not found.
Generate AI Text: Easily generate text responses using the installed AI model.
Get AI Completion: Stream AI model completions in real-time.

## Installation

```bash
npm install window-ai-react
```

Or via yarn:
```bash
yarn add window-ai-react
```
## Usage
Here's how you can use the `useWindowAI` hook in your React components:

### Basic Setup
```javascript
import React, { useState } from 'react';
import { useWindowAI } from 'window-ai-react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const { isWindowAIInstalled, loading, error, generateText } = useWindowAI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isWindowAIInstalled) return;

    setResponse(''); // Clear previous response
    await generateText(
      message,
      (res) => setResponse(prev => prev + res.text)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>AI Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;
```

## Hook API
``isWindowAIInstalled``
- Type: boolean
- Description: Indicates whether the Window.ai extension is installed.

``loading``
- Type: boolean
- Description: Indicates if the hook is still checking for the extension.

``error``
- Type: string | null
- Description: Contains error messages if any issues occur.

``generateText(prompt, onStreamResult)``
- Parameters:
  - prompt: A string containing the text prompt for the AI.
  - onStreamResult: A callback function that receives the streamed results.
  - Description: Sends a text prompt to the AI model and streams the generated text result.

``getCompletion(prompt, onStreamResult)``
- Parameters:
  - prompt: A string containing the text prompt for the AI.
  - onStreamResult: A callback function that receives the streamed completion results.
  - Description: Sends a text prompt to the AI model and streams the completion result.

## How It Works
1. Check Installation: The hook checks if the `window.ai` variable exists, which indicates that the Window.ai extension is installed.
2. Prompt for Installation: If the extension is not found, the hook can be used to alert the user to install it.
3. Leverage AI Capabilities: If the extension is installed, you can use the `generateText` and `getCompletion` functions to interact with the AI model.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request on the GitHub repository.

## License
This project is licensed under the MIT License.