import Image from 'next/image';
import { FunctionComponent } from 'react';

interface FriendCardProps {}

const FriendCard: FunctionComponent<FriendCardProps> = () => {
  return (
    <div className="w-full h-18 flex justify-center align-center mb-2 p-2">
      <div className="w-28 flex h-16 items-center justify-center">
        <Image
          src="/images/logo.png"
          height={180}
          width={180}
          className="flex rounded-100 h-14 w-14"
          alt="profile"
        ></Image>
      </div>
      <div className="flex flex-col items-center justify-start w-1/2 h-full mt-2 -ml-2">
        <p className="w-full font-bold text-red-600">John Mayer</p>
        <p className="w-full text-xs font-light">
          You have done great and congrats.
        </p>
      </div>
      <div className="w-1/5 h-full flex flex-col mt-2 gap-2">
        <p className="text-sm font-thin">10:45 AM</p>
      </div>
    </div>
  );
};

export default FriendCard;
