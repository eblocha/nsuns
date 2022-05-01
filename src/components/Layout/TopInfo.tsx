import useActiveLift from '../../hooks/useActiveLift';
import useActiveSet from '../../hooks/useActiveSet';
import useDay from '../../hooks/useDay';
import useProfile from '../../hooks/useProfile';
import useSetDisplay from '../../hooks/useSetDisplay';

const TopInfo = () => {
  const [lift] = useActiveLift();
  const [set] = useActiveSet();
  const [day] = useDay();
  const [profile] = useProfile();

  const current = useSetDisplay({
    profile,
    day,
    lift: lift,
    set: set,
  });

  const next = useSetDisplay({
    profile,
    day,
    lift: lift,
    set: set + 1,
  });

  return (
    <div className="flex flex-col grow">
      <div className="text-7xl mb-4">{current.data || 'Nothing!'}</div>
      <div className="text-5xl opacity-50">Next: {next.data || 'Done!'}</div>
    </div>
  );
};

export default TopInfo;
