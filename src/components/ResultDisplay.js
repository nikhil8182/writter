import React, { useState } from 'react';

function ResultDisplay({ type, content }) {
  const [copySuccess, setCopySuccess] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="result-box">
      <h2>{type === 'twitter' ? 'Twitter Post' : 'LinkedIn Post'}</h2>
      <div className={`content-box ${type}`}>
        {content}
      </div>
      <button onClick={handleCopy}>
        {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}

export default ResultDisplay; 