import React, { useCallback, useState } from 'react';
import { Unified, validate } from '../../../api';
import { useExportData, useImportData } from '../../../hooks/external';
import useProfile from '../../../hooks/useProfile';

type IProps = {
  closeModal: () => void;
};

const style: React.CSSProperties = {
  width: '80%',
  height: '80%',
};

const EditModal = ({ closeModal }: IProps) => {
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const [profile] = useProfile();
  const { data } = useExportData(profile);
  const { mutate: apply } = useImportData(profile);

  const handleSave = useCallback(
    (raw: Unified) => {
      apply(raw, {
        onSettled: closeModal,
      });
    },
    [apply, closeModal]
  );

  const handleCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <>
      <div className="modal-backdrop" />
      <div
        className="modal-wrapper flex flex-col items-center justify-center"
        onClick={closeModal}
      >
        <div
          className="bg-gray-700 rounded flex flex-col items-center p-3"
          style={style}
          onClick={stopPropagation}
        >
          {data && (
            <Editor
              initialData={data}
              save={handleSave}
              cancel={handleCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};

type EditorProps = {
  initialData: Unified;
  save: (raw: Unified) => void;
  cancel: () => void;
};

const Editor = ({ initialData, save, cancel }: EditorProps) => {
  const [data, setData] = useState(JSON.stringify(initialData, undefined, 4));
  const [error, setError] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      setData(e.target.value);
    }, []);

  const handleSave = useCallback(() => {
    const parsed: Unified = JSON.parse(data);
    const isValid = validate(parsed);
    if (isValid) {
      save(parsed);
    } else {
      const err = validate.errors ? validate.errors[0] : null;
      setError(err ? err.instancePath + ' ' + err.message : '');
    }
  }, [data, save]);

  return (
    <>
      <textarea
        value={data}
        className="w-full grow bg-gray-900 resize-none p-2"
        onChange={handleChange}
      />
      <div className="shrink-0 pt-3 flex flex-row justify-between w-full">
        <span className="text-red-400 text-lg">{error}</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModal;
