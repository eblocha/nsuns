import React from 'react';
import { FaFileImport } from 'react-icons/fa';
import ToolbarButton from '../ToolbarButton';

const Import = () => {
  return (
    <ToolbarButton title="Import JSON" aria-label="import JSON">
      <FaFileImport />
    </ToolbarButton>
  );
};

export default Import;
