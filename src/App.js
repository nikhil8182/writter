import { useState } from 'react';
import './App.css';
import PostForm from './components/PostForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [userInput, setUserInput] = useState('');
  const [samplePosts, setSamplePosts] = useState('');
  const [generatedContent, setGeneratedContent] = useState({ twitter: '', linkedin: '' });
  const [platform, setPlatform] = useState('both');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Mock API call for content generation
    // In a real app, this would call your backend service
    setTimeout(() => {
      try {
        // Analyze user input and sample posts
        const analysisResult = analyzeUserInput(userInput, samplePosts);
        
        const twitterContent = generateTwitterPost(userInput, analysisResult);
        const linkedinContent = generateLinkedInPost(userInput, analysisResult);
        
        setGeneratedContent({
          twitter: twitterContent,
          linkedin: linkedinContent
        });
      } catch (error) {
        setError('Failed to generate content. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
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
      
      <main className="App-main">
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

export default App;
