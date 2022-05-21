import { PicovoiceWorkerFactory } from '@picovoice/picovoice-web-en-worker';
import { usePicovoice } from '@picovoice/picovoice-web-react';

import { useCallback, useState } from 'react';
import { FaMicrophoneAlt, FaSpinner } from 'react-icons/fa';
import { useVoice } from '../../hooks/useVoice';

const ACCESS_KEY = import.meta.env.VITE_PICO_ACCESS_KEY;
const JARVIS = import.meta.env.VITE_JARVIS_PPN_B64;
const RHINO = import.meta.env.VITE_RHINO_B64;

type IProps = {
  keywordModel: string;
  keywordName: string;
  ak: string;
  intentModel: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

const PersonalVoiceButton = ({
  keywordModel,
  keywordName,
  ak: accessKey,
  intentModel,
}: IProps) => {
  const [started, setStarted] = useState(false);

  const inferenceEventHandler = useVoice();

  const { isLoaded, isListening, start, stop, engine } = usePicovoice(
    PicovoiceWorkerFactory,
    {
      accessKey,
      porcupineKeyword: {
        base64: keywordModel,
        custom: keywordName,
      },
      rhinoContext: { base64: intentModel },
      start: true,
    },
    noOp,
    inferenceEventHandler
  );

  const handleClick = useCallback(() => {
    setStarted(true);
    if (!isListening) {
      start();
    } else {
      stop();
    }
  }, [isListening, start, stop]);

  return (
    <VoiceButtonInner
      onClick={handleClick}
      isActive={isListening}
      isListening={engine === 'rhn'}
      isLoading={started && !isLoaded}
    />
  );
};

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isListening?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
};

const VoiceButtonInner = ({
  isActive,
  isListening,
  isLoading,
  onClick,
}: ButtonProps) => {
  const className = isListening
    ? 'bg-red-500 hover:bg-red-400 focus:ring-red-400'
    : isActive
    ? 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500'
    : 'bg-gray-600 hover:bg-gray-500 focus:ring-gray-500';

  return (
    <div className="shrink-0 h-32 w-32">
      <button
        className={`h-full rounded-full w-full flex items-center justify-center focus:ring-2 ${className}`}
        onClick={onClick}
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

const VoiceButton = () => {
  const realVoice = RHINO && ACCESS_KEY && JARVIS;

  if (realVoice) {
    return (
      <PersonalVoiceButton
        ak={ACCESS_KEY}
        keywordModel={JARVIS}
        keywordName="Jarvis"
        intentModel={RHINO}
      />
    );
  } else {
    return <VoiceButtonInner />;
  }
};

export default VoiceButton;
