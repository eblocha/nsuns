import { useCurrentLifts } from '../../hooks/useCurrentLifts';
import useDay from '../../hooks/useDay';
import { getDayString } from '../../utils/days';
import { capitalize } from '../../utils/string';
import Day from '../Day/Day';

const CurrentDay = () => {
  const lifts = useCurrentLifts();
  const [day] = useDay();

  const dayString = capitalize(getDayString(day) as string);

  return <Day lifts={lifts} title={dayString} active={true} />;
};

export default CurrentDay;
