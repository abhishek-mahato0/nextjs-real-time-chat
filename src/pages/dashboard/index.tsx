'use client';

import { FunctionComponent } from 'react';
import FriendList from '@/components/sections/FriendList';
import MessageSection from '@/components/sections/MessageSection';
import { useSession } from 'next-auth/react';

interface indexProps {}

const index: FunctionComponent<indexProps> = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div className="w-screen h-screen flex">
      <div className="w-28 bg-slate-100">
        <FriendList />
      </div>
      <div className="flex w-44">
        <MessageSection />
      </div>
      <div className="w-28 bg-slate-100">third</div>
    </div>
  );
};

export default index;
