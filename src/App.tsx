import './App.css';
import AdviceGenerator from './components/AdviceGenerator';

const App: React.FC = () => {

  return (
    <div className='bg-gray-800 size-full fixed top-0 left-0 flex justify-center items-center'>
      <AdviceGenerator />
    </div>
  );
};

export default App
