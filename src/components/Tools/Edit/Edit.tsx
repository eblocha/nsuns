import React, { useCallback, useState } from 'react';
import ToolbarButton from '../ToolbarButton';
import { FaCode } from 'react-icons/fa';
import EditModal from './EditModal';

const Edit = () => {
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <ToolbarButton
        title="Edit JSON"
        aria-label="edit JSON"
        onClick={handleClick}
      >
        <FaCode />
      </ToolbarButton>
      {show && <EditModal closeModal={handleClose} />}
    </>
  );
};

export default Edit;
