import React from 'react';
import { CustomLift } from '../../api';
import useActiveLift from '../../hooks/useActiveLift';
import Sets from './Sets';

type IProps = {
  /** The name of the day, e.g. "Friday" */
  title: string;
  /** The compiled lifts for the day */
  lifts: CustomLift[];
  /** Whether or not the user is performing the workout for this day */
  active?: boolean;
  /** Callback to run when the user clicks a set item */
  onClick?: () => void;
};

const Day = (props: IProps) => {
  const [active, setActive] = useActiveLift();

  return (
    <div className="flex flex-col bg-gray-800 h-full w-full overflow-hidden rounded">
      <div className="shrink-0 px-3 py-2 text-center text-2xl bg-gray-700">
        {props.title}
      </div>
      <ul className="grow overflow-y-auto flex flex-col p-3">
        {props.lifts.map((lift, index) => (
          <React.Fragment key={lift.id}>
            <Sets
              lift={lift}
              active={props.active && active === index}
              onClick={() => {
                setActive(index);
                props.onClick && props.onClick();
              }}
            />
            {index !== props.lifts.length - 1 ? <hr className="my-2" /> : null}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Day;
