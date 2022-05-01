import { useState } from 'react';
import { FaMicrophoneAlt, FaSpinner } from 'react-icons/fa';

const VoiceButton = () => {
  const [isActive] = useState(false);
  const [isListening] = useState(false);
  const [isLoading] = useState(false);

  const className = isListening
    ? 'bg-red-500 hover:bg-red-400 focus:ring-red-400'
    : isActive
    ? 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500'
    : 'bg-gray-600 hover:bg-gray-500 focus:ring-gray-500';

  return (
    <div className="shrink-0 h-32 w-32">
      <button
        className={`h-full rounded-full w-full flex items-center justify-center focus:ring-2 ${className}`}
        autoFocus
      >
        {isLoading ? (
          <FaSpinner size={48} className="animate-spin" />
        ) : (
          <FaMicrophoneAlt size={64} />
        )}
      </button>
    </div>
  );
};

export default VoiceButton;
