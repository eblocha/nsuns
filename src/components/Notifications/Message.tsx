import { CSSProperties, useCallback, useMemo, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { useTimer } from '../../hooks/useTimer';
import useStore, { PostedMessage, Store } from '../../stores';

const selector = (state: Store) => state.removeMessage;

export const MessageComponent = ({
  level,
  message,
  timeout,
  id,
}: PostedMessage) => {
  const [isHovering, setIsHovering] = useState(false);
  const removeMessage = useStore(selector);

  const onComplete = useCallback(() => {
    removeMessage(id);
  }, [id, removeMessage]);

  const onEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const onLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const timeLeft = useTimer({ timeout, onComplete, pause: isHovering });

  return (
    <div
      className="h-12 w-full flex flex-row items-center rounded overflow-hidden bg-gray-800 pointer-events-auto mb-2 last:mb-0"
      title={message}
      aria-label={message}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="w-10 h-full shrink-0 text-2xl">
        <MessageTimer level={level} timeout={timeout} timeLeft={timeLeft} />
      </div>
      <div className="grow overflow-hidden overflow-ellipsis p-2">
        {message}
      </div>
      <button
        className="shrink-0 p-1 m-2 hover:bg-gray-600 rounded"
        onClick={onComplete}
        aria-label="dismiss"
      >
        <VscClose />
      </button>
    </div>
  );
};

export const MessageTimer = ({
  level,
  timeLeft,
  timeout,
}: {
  timeLeft: number;
  level: PostedMessage['level'];
  timeout: PostedMessage['timeout'];
}) => {
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${(timeLeft / timeout) * 100}%`,
    }),
    [timeLeft, timeout]
  );

  let bg = '';
  let sandBg = '';

  switch (level) {
    case 'error':
      bg = 'bg-red-700';
      sandBg = 'bg-red-500';
      break;
    case 'info':
      bg = 'bg-blue-700';
      sandBg = 'bg-blue-500';
      break;
    case 'success':
      bg = 'bg-green-700';
      sandBg = 'bg-green-500';
      break;
    case 'warning':
      bg = 'bg-yellow-700';
      sandBg = 'bg-yellow-500';
      break;
  }

  return (
    <div className={`w-full h-full relative ${bg}`}>
      <div
        style={style}
        className={`w-full overflow-hidden absolute bottom-0 left-0 ${sandBg}`}
      />
    </div>
  );
};
