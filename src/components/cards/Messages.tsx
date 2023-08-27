import Image from 'next/image';
import { FunctionComponent } from 'react';

interface MessagesProps {}

const Messages: FunctionComponent<MessagesProps> = () => {
  return (
    <div className="w-full flex items-center justify-start h-12 mb-2 p-2 gap-1">
      <Image
        src="/images/logo.png"
        height={120}
        width={120}
        className="flex rounded-100 h-10 w-10 border-2 ml-2"
        alt="profile"
      ></Image>
      <p className="bg-red-400 px-2 py-1 flex justify-start items-center rounded-lg w-auto">
        Message is this
      </p>
    </div>
  );
};

export default Messages;
