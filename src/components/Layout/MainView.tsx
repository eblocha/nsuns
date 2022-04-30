import { useCallback } from 'react';
import useDay from '../../hooks/useDay';
import MaxStats from '../Stat/MaxStats';
import RepStats from '../Stat/RepStats';
import CurrentDay from './CurrentDay';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const MainView = () => {
  const [day, setDay] = useDay();

  const increment = useCallback(() => {
    day === 6 ? setDay(0) : setDay(day + 1);
  }, [day, setDay]);

  const decrement = useCallback(() => {
    day === 0 ? setDay(6) : setDay(day - 1);
  }, [day, setDay]);

  return (
    <div className="w-full h-full overflow-hidden grid grid-cols-3 gap-2 p-5">
      <div className="flex flex-row items-center overflow-hidden">
        <div className="pr-3">
          <button
            className="w-12 h-12 rounded-full bg-gray-500 m-0.5 flex items-center justify-center"
            onClick={decrement}
          >
            <FaArrowLeft />
          </button>
        </div>
        <CurrentDay />
        <div className="pl-3">
          <button
            className="w-12 h-12 rounded-full bg-gray-500 m-0.5 flex items-center justify-center"
            onClick={increment}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <MaxStats />
      <RepStats />
    </div>
  );
};

export default MainView;
