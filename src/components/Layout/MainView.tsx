import { useCallback } from 'react';
import useDay from '../../hooks/useDay';
import StatList from '../Stat/StatList';
import CurrentDay from './CurrentDay';

const MainView = () => {
  const [day, setDay] = useDay();

  const increment = useCallback(() => {
    day === 7 ? setDay(0) : setDay(day + 1);
  }, [day, setDay]);

  const decrement = useCallback(() => {
    day === 0 ? setDay(7) : setDay(day - 1);
  }, [day, setDay]);

  return (
    <div className="w-full h-full overflow-hidden grid grid-cols-3 gap-2 p-5">
      <div className="flex flex-row items-center overflow-hidden">
        <div className="pr-3">
          <button
            className="w-12 h-12 rounded-full bg-gray-500"
            onClick={decrement}
          ></button>
        </div>
        <CurrentDay />
        <div className="pl-3">
          <button
            className="w-12 h-12 rounded-full bg-gray-500"
            onClick={increment}
          ></button>
        </div>
      </div>
      <StatList
        title="Maxes"
        stats={[
          {
            title: 'Bench',
            value: 195,
            history: [155, 165, 170, 180, 190, 195],
          },
          {
            title: 'Squat',
            value: 210,
          },
          {
            title: 'Deadlift',
            value: 320,
          },
          {
            title: 'Press',
            value: 130,
          },
        ]}
      />
      <StatList
        title="Reps"
        stats={[
          {
            title: 'Bench',
            value: 2,
          },
          {
            title: 'Squat',
            value: 2,
          },
          {
            title: 'Deadlift',
            value: 2,
          },
          {
            title: 'Press',
            value: 2,
          },
        ]}
      />
    </div>
  );
};

export default MainView;
