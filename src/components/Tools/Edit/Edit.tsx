import React from 'react';
import ToolbarButton from '../ToolbarButton';
import { FaCode } from 'react-icons/fa';

const Edit = () => {
  return (
    <ToolbarButton title="Edit JSON" aria-label="edit JSON">
      <FaCode />
    </ToolbarButton>
  );
};

export default Edit;
