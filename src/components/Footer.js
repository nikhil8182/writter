import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="App-footer">
      <p>© {currentYear} Social Media Writer | AI-Powered Content Generator</p>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  );
}

export default Footer; 