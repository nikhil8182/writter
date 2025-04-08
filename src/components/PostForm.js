import React from 'react';

function PostForm({ 
  userInput, 
  setUserInput, 
  samplePosts, 
  setSamplePosts, 
  platform, 
  setPlatform, 
  isLoading, 
  handleSubmit
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>What would you like to write about?</label>
        <textarea 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your topic or ideas here..."
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label>Paste some of your previous posts for analysis (optional)</label>
        <textarea 
          value={samplePosts}
          onChange={(e) => setSamplePosts(e.target.value)}
          placeholder="Paste some of your previous Twitter or LinkedIn posts to help us understand your style..."
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>Platform</label>
        <select 
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="both">Both Twitter & LinkedIn</option>
          <option value="twitter">Twitter only</option>
          <option value="linkedin">LinkedIn only</option>
        </select>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </form>
  );
}

export default PostForm; 