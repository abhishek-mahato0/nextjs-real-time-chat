import Image from 'next/image';
import { FunctionComponent } from 'react';

interface MessageTopProps {}

const MessageTop: FunctionComponent<MessageTopProps> = () => {
  return (
    <div className="w-full h-18 flex justify-start align-center mt-2 mb-2 p-2 border-b-2">
      <div className="w-18 flex h-14 items-center justify-center">
        <Image
          src="/images/logo.png"
          height={180}
          width={180}
          className="flex rounded-100 h-12 w-12 border-2 border-green-600 p-1"
          alt="profile"
        ></Image>
      </div>
      <div className="flex h-16 flex-col items-center justify-start w-28 h-full mt-4 -ml-6 text-black font-bold">
        John Mayer
      </div>
    </div>
  );
};

export default MessageTop;
