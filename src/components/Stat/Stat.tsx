import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StatData } from '../../api';

type IProps = StatData & {
  onEdit?: (id: string, value: string) => boolean;
};

const Stat = ({ onEdit, ...props }: IProps) => {
  const [value, setValue] = useState(props.value);

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.target.value === props.value.toString()) {
        return;
      }
      const keep = !!onEdit && onEdit(props.id, e.target.value || '');
      if (!keep) {
        setValue(props.value);
      }
    },
    [onEdit, props.id, props.value]
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    []
  );

  useLayoutEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className="flex flex-col bg-gray-800 w-36 shrink-0">
      <div className="shrink-0 bg-gray-700 text-center p-2 text-xl">
        {props.title}
      </div>
      <div className="shrink-0 text-5xl m-0.5">
        <input
          className="w-full h-full overflow-hidden py-3 bg-transparent text-center"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          disabled={!onEdit}
        />
      </div>
    </div>
  );
};

export default Stat;
