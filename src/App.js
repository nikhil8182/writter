import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PostForm from './components/PostForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { generateContent, checkApiStatus } from './services/api';

function Dashboard() {
  const [userInput, setUserInput] = useState('');
  const [samplePosts, setSamplePosts] = useState('');
  const [generatedContent, setGeneratedContent] = useState({ twitter: '', linkedin: '' });
  const [platform, setPlatform] = useState('both');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiAvailable, setApiAvailable] = useState(true);
  // eslint-disable-next-line
  const auth = useAuth();

  // Check if API is available on component mount
  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkApiStatus();
      setApiAvailable(isAvailable);
      if (!isAvailable) {
        setError('API server is not available. Content will be generated using mock data.');
      }
    };
    
    checkApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      let content;
      
      if (apiAvailable) {
        // Use the real API if it's available
        content = await generateContent(userInput, samplePosts, platform);
      } else {
        // Use mock implementation if API is not available
        content = await mockGenerateContent();
      }
      
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock functions for fallback content generation
  const mockGenerateContent = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Analyze user input and sample posts
    const analysisResult = analyzeUserInput(userInput, samplePosts);
    
    const twitterContent = generateTwitterPost(userInput, analysisResult);
    const linkedinContent = generateLinkedInPost(userInput, analysisResult);
    
    return {
      twitter: platform === 'linkedin' ? null : twitterContent,
      linkedin: platform === 'twitter' ? null : linkedinContent
    };
  };

  // Mock functions for content analysis and generation
  const analyzeUserInput = (input, samples) => {
    // In a real app, this would use AI/ML to analyze style, tone, etc.
    return {
      tone: samples.toLowerCase().includes('excited') ? 'enthusiastic' : 'professional',
      length: samples.split(' ').length > 50 ? 'long' : 'concise'
    };
  };

  const generateTwitterPost = (input, analysis) => {
    // In a real app, this would generate content using AI based on analysis
    const hashtags = '#SocialMedia #ContentCreation';
    const maxLength = 240;
    
    let content = `${input.substring(0, 100)}`;
    if (analysis.tone === 'enthusiastic') {
      content = `Exciting news! ${content}`;
    }
    
    // Ensure we don't exceed Twitter's limit
    if ((content + hashtags).length > maxLength) {
      content = content.substring(0, maxLength - hashtags.length - 3) + '...';
    }
    
    return `${content} ${hashtags}`;
  };

  const generateLinkedInPost = (input, analysis) => {
    // In a real app, this would generate content using AI based on analysis
    const intro = analysis.tone === 'enthusiastic' 
      ? "I'm thrilled to share this with my network!" 
      : "I wanted to share some thoughts with my professional network.";
    
    const body = input.length > 200 
      ? input 
      : `${input} This is an area I've been focusing on lately, and I believe it's important because it can significantly impact how we approach our professional challenges.`;
    
    const conclusion = "What are your thoughts on this? I'd love to hear your perspective in the comments below.";
    
    return `${intro}\n\n${body}\n\n${conclusion}`;
  };

  return (
    <div className="App">
      <Header />
      <UserProfile />
      
      <main className="App-main">
        {!apiAvailable && (
          <div className="api-warning">
            <p>API server is not available. Using mock data for content generation.</p>
          </div>
        )}
        
        <PostForm 
          userInput={userInput}
          setUserInput={setUserInput}
          samplePosts={samplePosts}
          setSamplePosts={setSamplePosts}
          platform={platform}
          setPlatform={setPlatform}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />

        {error && <div className="error-message">{error}</div>}

        {generatedContent.twitter && platform !== 'linkedin' && (
          <ResultDisplay 
            type="twitter" 
            content={generatedContent.twitter} 
          />
        )}

        {generatedContent.linkedin && platform !== 'twitter' && (
          <ResultDisplay 
            type="linkedin" 
            content={generatedContent.linkedin} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
