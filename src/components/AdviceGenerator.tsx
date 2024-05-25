import {useState, useEffect } from 'react';
import diceIcon from '../assets/img/icon-dice.svg';
import dividerDesktop from '../assets/img/pattern-divider-desktop.svg';
import dividerMobile from '../assets/img/pattern-divider-mobile.svg';

export type Advice = {
    id: number;
    advice: string;
}

const AdviceGenerator= () => {
    const [advice, setAdvice] = useState<Advice>({
        id: 0,
        advice: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [windnwWidth, setWindnwWidth] = useState<number>(window.innerWidth)


    const requestAdvice = async () =>{
        setLoading(true);
        try {
            const response = await fetch('https://api.adviceslip.com/advice', {cache: 'no-cache'});
            const json = await response.json();
            const { slip : {id, advice}} = json;
            setAdvice({id, advice});
        } catch (error) {
            console.log(error);
            setAdvice({
                id: 404, 
                advice: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        requestAdvice()
    }, []);

    const handleNewAdvice = () => {
        requestAdvice();
    };

    useEffect(() => {
        const handleResize = () => {
            setWindnwWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className='bg-gray-700 px-8 py-4 rounded-xl flex flex-col justify-between items-center w-[25rem]  relative'>
          <div className='flex flex-col items-center'>
            <h1 className='my-4 text-green-300 text-sm font-medium'>ADVICE #{advice.id}</h1>
            <p className='text-2xl text-slate-200 font-semibold my-4'>" {advice.advice} "</p>
            <img className='my-8 mx-auto' src={windnwWidth > 500 ? dividerDesktop : dividerMobile} alt="Divider" />
          </div>
          <div className='absolute bottom-[-1.75rem]'>
            <button
              className='group bg-green-300 w-14 h-14 flex justify-center items-center rounded-full relative'
              onClick={handleNewAdvice}
              disabled={loading}
            >
              <span className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-300' style={{ boxShadow: '0 0 10px #32CD32, 0 0 20px #32CD32, 0 0 30px #32CD32, 0 0 40px #32CD32' }}></span>
              <img src={diceIcon} alt="Icon to refresh advice" className='w-6 h-6 z-10'/>
            </button>
          </div>
        </div>
      );
    };

export default AdviceGenerator;