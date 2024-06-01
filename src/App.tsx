import './App.css';
import AdviceGenerator from './components/AdviceGenerator';
import Footer from './components/Footer';

// Main App component
const App: React.FC = () => {
  return (
    // Main container with flex column layout, full viewport height, and gray background
    <div className='flex flex-col h-screen bg-gray-800'>
      <div className='flex-grow  size-full top-0 left-0 flex flex-col justify-center items-center'>
        <AdviceGenerator />
      </div>
      <Footer />
    </div>
  );
};

export default App
