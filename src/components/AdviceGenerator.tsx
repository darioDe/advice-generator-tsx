import { useState, useEffect } from 'react';
import diceIcon from '../assets/img/icon-dice.svg';
import dividerDesktop from '../assets/img/pattern-divider-desktop.svg';
import dividerMobile from '../assets/img/pattern-divider-mobile.svg';

// Define the Advice type
export type Advice = {
  id: number;
  advice: string;
}

const AdviceGenerator = () => {
  // State to store the advice data
  const [advice, setAdvice] = useState<Advice>({ id: 0, advice: '' });
  // State to handle loading status
  const [loading, setLoading] = useState<boolean>(false);
  // State to track the window width for responsive design
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // State to manage spin animation class
  const [spin, setSpin] = useState<boolean>(false);
  // State to manage fade animation class
  const [fade, setFade] = useState<boolean>(false);
  // State to manage initial fade-in effect
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  // Function to fetch a new advice from the API
  const requestAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
      const json = await response.json();
      const { slip: { id, advice } } = json;
      
      setAdvice({ id, advice });
      setFade(true); // Trigger fade animation for new advice
    } catch (error) {
      console.error(error);
      setAdvice({ id: 404, advice: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle new advice request and spin animation
  const handleNewAdvice = () => {
    setSpin(true);
    requestAdvice();
  };

  // Update window width state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Remove spin class after animation duration
  useEffect(() => {
    if (spin) {
      const timer = setTimeout(() => setSpin(false), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [spin]);

  // Remove fade class after animation duration
  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => setFade(false), 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [fade]);

  // Apply fade-in effect on initial load
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`bg-gray-700 px-8 py-4 rounded-xl flex flex-col justify-between items-center w-[25rem] relative ${fadeIn ? 'fade-in' : ''}`}>
      <div className='flex flex-col items-center'>
        <h1 className='font-extrabold my-4 text-green-300 text-sm '>ADVICE #{advice.id}</h1>
        <p className={`text-2xl text-slate-200 font-extrabold my-4 ${fade ? 'fade' : ''}`}>
          {advice.id == 0 ? `"Roll the dice to get an advice"` : `"${advice.advice}"`}
        </p>
        <img className='my-8 mx-auto' src={windowWidth > 500 ? dividerDesktop : dividerMobile} alt="Divider" />
      </div>
      <div className='absolute bottom-[-1.75rem]'>
        <button
          className='group bg-green-300 w-14 h-14 flex justify-center items-center rounded-full relative'
          onClick={handleNewAdvice}
          disabled={loading}
        >
          <span className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-300' style={{ boxShadow: '0 0 10px #32CD32, 0 0 20px #32CD32, 0 0 30px #32CD32, 0 0 40px #32CD32' }}></span>
          <img src={diceIcon} alt="Icon to refresh advice" className={`w-6 h-6 z-10 ${spin ? 'spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default AdviceGenerator;
