import React, { useState, type FormEvent } from 'react';

function GeminiChat(): JSX.Element {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    setError(null);

    try {
      const backendUrl = 'http://localhost:3001/api/generate'; // Matches your backend's URL and endpoint

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }), // Send the prompt to your backend
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data: { response: string } = await res.json();
      setResponse(data.response); // Get the 'response' property from your backend's JSON

    } catch (err: any) {
      console.error("Error generating content:", err);
      setError(`Failed to get a response from Gemini: ${err.message}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Gemini AI Chat</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          cols={50}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini something..."
          disabled={loading}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Send to Gemini'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h2>Gemini's Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default GeminiChat;
