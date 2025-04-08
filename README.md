# Social Media Writer

A modern React application that helps users generate customized content for Twitter and LinkedIn based on their input and previous posts.

## Features

- User authentication with Google via Supabase
- Generate content for Twitter and LinkedIn platforms
- Analyze user's previous posts to understand their writing style
- Customize content based on the platform's specific requirements
- Easy copy-to-clipboard functionality
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)
- Supabase account (for authentication)

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. In the Supabase dashboard, go to Authentication > Providers and enable Google authentication
3. Configure your Google OAuth credentials (follow Supabase documentation)
4. Copy your Supabase URL and anonymous key from the API settings
5. Create a `.env` file in the project root and add:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd social-media-writer
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

1. Sign in with your Google account
2. Enter the topic or idea you want to write about in the first text area
3. Optionally, paste some of your previous posts to help the system understand your writing style
4. Select the platform(s) you want to generate content for
5. Click "Generate Content" and wait for the results
6. Use the "Copy to Clipboard" button to copy the generated content

## Future Improvements

- Integration with actual Twitter and LinkedIn APIs for direct posting
- AI-powered content generation based on more sophisticated analysis
- Ability to save and manage multiple generated posts
- OAuth login for accessing user's actual social media history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
