import { useCallback } from 'react';
import useDay from '../../hooks/useDay';
import MaxStats from '../Stat/MaxStats';
import RepStats from '../Stat/RepStats';
import CurrentDay from './CurrentDay';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Toolbar } from '../Tools/Toolbar';
import { Update } from '../Tools/Update/Update';
import Profile from '../Tools/Profile/Profile';
import Settings from '../Tools/Settings/Settings';
import Undo from '../Tools/Undo/Undo';
import NextSet from '../Tools/NextSet/NextSet';

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
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 m-0.5 flex items-center justify-center"
            onClick={decrement}
          >
            <FaArrowLeft />
          </button>
        </div>
        <CurrentDay />
        <div className="pl-3">
          <button
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 m-0.5 flex items-center justify-center"
            onClick={increment}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="col-span-2 flex flex-col">
        <div className="grid grid-cols-2 gap-2 grow">
          <MaxStats />
          <RepStats />
        </div>
        <div className="py-1 shrink-0 flex flex-row items-center">
          <Toolbar className="mr-2">
            <Update />
            <Undo />
            <NextSet />
          </Toolbar>
          <Toolbar>
            <Profile />
            <Settings />
          </Toolbar>
        </div>
      </div>
    </div>
  );
};

export default MainView;
