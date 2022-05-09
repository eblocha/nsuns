import { useLifts } from '../../hooks/useCurrentLifts';
import { getDayString } from '../../utils/days';
import { capitalize } from '../../utils/string';
import Day from '../Day/Day';

type IProps = {
  day: number;
};

const CurrentDay = ({ day }: IProps) => {
  const lifts = useLifts(day);

  const dayString = capitalize(getDayString(day) as string);

  return <Day lifts={lifts} title={dayString} active={true} />;
};

export default CurrentDay;
