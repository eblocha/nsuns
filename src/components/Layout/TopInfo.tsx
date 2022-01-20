import useActiveLift from '../../hooks/useActiveLift';
import useActiveSet from '../../hooks/useActiveSet';
import useDay from '../../hooks/useDay';
import useMaxes from '../../hooks/useMaxes';
import useProfile from '../../hooks/useProfile';
import useProgram from '../../hooks/useProgram';
import useSetDisplay from '../../hooks/useSetDisplay';

const TopInfo = () => {
  const [lift] = useActiveLift();
  const [set] = useActiveSet();
  const [day] = useDay();
  const [profile] = useProfile();

  const { data: program } = useProgram(profile);
  const { data: maxes } = useMaxes(profile);

  const current = useSetDisplay({
    program: program || {},
    day,
    lift: lift,
    maxes: maxes ? maxes[maxes.length - 1] || {} : {},
    set: set,
  });

  const next = useSetDisplay({
    program: program || {},
    day,
    lift: lift,
    maxes: maxes ? maxes[maxes.length - 1] || {} : {},
    set: set + 1,
  });

  return (
    <div className="flex flex-row items-center overflow-hidden w-full h-full p-5 justify-between">
      <div className="flex flex-col grow overflow-hidden">
        <div className="overflow-hidden text-7xl mb-4">{current}</div>
        <div className="overflow-hidden text-5xl opacity-50">Next: {next}</div>
      </div>
      <div className="shrink-0 h-32 w-32">
        <div className="h-full rounded-full w-full bg-blue-500"></div>
      </div>
    </div>
  );
};

export default TopInfo;
