import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StatData } from '../../api';

type IProps = StatData & {
  onEdit?: (id: string, value: string) => boolean;
};

const Stat = ({ onEdit, ...props }: IProps) => {
  const [value, setValue] = useState(props.value);

  const handleEdit = useCallback(
    (proposed: string) => {
      if (proposed === props.value.toString()) {
        return;
      }
      const keep = !!onEdit && onEdit(props.id, proposed || '');
      if (!keep) {
        setValue(props.value);
      }
    },
    [onEdit, props.id, props.value]
  );

  const handleBlur: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      handleEdit(e.target.value);
    },
    [handleEdit]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      handleEdit(value.toString());
    },
    [handleEdit, value]
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
        <form onSubmit={handleSubmit}>
          <input
            className="w-full h-full overflow-hidden py-3 bg-transparent text-center"
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            disabled={!onEdit}
          />
        </form>
      </div>
    </div>
  );
};

export default Stat;
