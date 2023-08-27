import Image from 'next/image';
import React, { FunctionComponent } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { GrEdit } from 'react-icons/gr';
import { signOut } from 'next-auth/react';
interface ProfileCardProps {}

const ProfileCard: FunctionComponent<ProfileCardProps> = () => {
  return (
    <div className="w-full h-18 flex justify-center align-center my-4 p-2">
      <div className="w-28 flex h-16 items-center justify-center">
        <Image
          src="/images/logo.png"
          height={180}
          width={180}
          className="flex rounded-100 h-14 w-14 border-2 border-red-600 p-1"
          alt="profile"
        ></Image>
      </div>
      <div className="flex flex-col items-center justify-start w-1/2 h-full mt-2 -ml-2">
        <p className="w-full font-bold text-red-600">John Mayer</p>
        <p className="w-full text-sm">Software Engineer</p>
      </div>
      <div className="w-1/5 h-full flex flex-col mt-2 gap-2">
        <GrEdit className="flex w-full justify-end text-black" />
        <IoExitOutline
          className="flex w-full justify-end text-red-400 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
