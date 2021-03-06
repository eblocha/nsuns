import { useLayoutEffect, useRef } from 'react';
import { CustomLiftSet, CustomLift } from '../../api';
import useActiveSet from '../../hooks/useActiveSet';
import { displaySet } from '../../utils/program';

type SetProps = {
  active?: boolean;
  set: CustomLiftSet;
  onClick: () => void;
};

const SetComponent = (props: SetProps) => {
  const ref = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (props.active) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [props.active]);

  return (
    <li className="my-0.5" ref={ref}>
      <button
        className={`rounded w-full h-full overflow-hidden hover:bg-blue-500 focus:ring-blue-500 focus:ring-2 p-2 text-left ${
          props.active ? 'bg-blue-700' : 'bg-transparent'
        }`}
        onClick={props.onClick}
      >
        <p>{displaySet(props.set)}</p>
        {props.set.description ? <p>{props.set.description}</p> : null}
      </button>
    </li>
  );
};

type SetsProps = {
  lift: CustomLift;
  active?: boolean;
  onClick: () => void;
};

const Sets = (props: SetsProps) => {
  const [activeSet, setActive] = useActiveSet();

  return (
    <>
      <p className="font-bold">{props.lift.name}</p>
      {props.lift.description ? <p>{props.lift.description}</p> : null}

      {props.lift.sets?.map((set, index) => (
        <SetComponent
          set={set}
          key={set.id}
          active={props.active && activeSet === index}
          onClick={() => {
            setActive(index);
            props.onClick();
          }}
        />
      ))}
    </>
  );
};

export default Sets;
