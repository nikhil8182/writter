import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const { signInWithGoogle, authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Google login error:', error.message);
      setError('Failed to log in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Display any auth configuration errors
  const displayError = authError || error;

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Social Media Writer</h1>
        <p>Generate customized content for your social media platforms</p>
        
        {displayError && <div className="error-message">{displayError}</div>}
        
        {authError ? (
          <div className="setup-instructions">
            <h3>Setup Required</h3>
            <p>To use this application, you need to configure Supabase authentication:</p>
            <ol>
              <li>Create a Supabase account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
              <li>Create a new project</li>
              <li>Enable Google authentication in Authentication → Providers</li>
              <li>Copy your Supabase URL and anon key from Settings → API</li>
              <li>Update the .env file with your credentials</li>
            </ol>
          </div>
        ) : (
          <button 
            className="google-login-button" 
            onClick={handleGoogleLogin} 
            disabled={loading}
          >
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/google.svg" alt="Google" />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        )}
        
        <div className="login-footer">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login; 