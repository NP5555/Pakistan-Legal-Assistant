# Digital Lawyer PK (Pakistan Legal Assistant)

An AI-powered legal assistant web application designed to help Pakistani citizens understand their legal situations and get preliminary legal guidance. This application provides an interactive platform for users to input case details and receive AI-generated legal analysis based on Pakistani law.

## Features

- 🔒 Secure user authentication with CNIC verification
- 📝 Detailed case input form for various legal scenarios
- 🤖 AI-powered legal analysis using Google's Generative AI
- 📚 Comprehensive legal reference database of Pakistani laws
- 📊 Risk assessment and legal implications analysis
- 📋 Detailed verdict generation with recommendations
- 💼 Support for Criminal, Civil, and Family law cases

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI
- **Build Tool**: Vite
- **Code Quality**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/Pakistan-Legal-Assistant.git
cd Pakistan-Legal-Assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google AI API key:
```env
VITE_GOOGLE_AI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/        # React components
│   ├── Analysis.tsx  # Case analysis component
│   ├── CaseInput.tsx # Case details form
│   ├── LegalReference.tsx # Legal reference display
│   ├── Verdict.tsx   # Final verdict display
│   └── Welcome.tsx   # Landing page
├── data/
│   └── legalReferences.ts # Legal database
├── services/
│   └── gemini.ts    # Google AI integration
└── App.tsx          # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security Notice

⚠️ Please note that this application provides preliminary legal guidance only and should not be considered as a replacement for professional legal counsel. Always consult with a qualified legal practitioner for specific legal advice.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Powered by [Google Generative AI](https://ai.google.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)