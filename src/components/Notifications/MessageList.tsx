import useStore from '../../stores';
import { MessageComponent } from './Message';

export const MessageList = () => {
  const ids = useStore((state) => state.messageOrder);

  return (
    <div
      className="h-full overflow-y-auto overflow-x-hidden top-0 right-0 absolute p-3 pointer-events-none"
      style={{
        width: '25%',
      }}
    >
      {ids.map((id) => (
        <Message id={id} key={id} />
      ))}
    </div>
  );
};

const Message = ({ id }: { id: string }) => {
  const message = useStore((state) => state.messages[id]);

  if (message) {
    return <MessageComponent {...message} />;
  }
  return null;
};
