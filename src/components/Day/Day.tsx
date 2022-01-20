import React from 'react';
import { CustomLift } from '../../api';
import useActiveLift from '../../hooks/useActiveLift';
import Sets from './Sets';

type IProps = {
  title: string;
  lifts: CustomLift[];
  active?: boolean;
  onClick: () => void;
};

const Day = (props: IProps) => {
  const [active, setActive] = useActiveLift();

  return (
    <div className="flex flex-col bg-gray-800 h-full w-full overflow-hidden">
      <div className="shrink-0 px-3 py-2 text-center text-2xl bg-gray-700">
        {props.title}
      </div>
      <div className="grow overflow-y-auto flex flex-col p-3">
        {props.lifts.map((lift, index) => (
          <React.Fragment key={lift.id}>
            <Sets
              lift={lift}
              active={props.active && active === index}
              onClick={() => {
                setActive(index);
                props.onClick();
              }}
            />
            {index !== props.lifts.length - 1 ? <hr className="my-2" /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Day;
