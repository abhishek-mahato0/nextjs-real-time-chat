import React from 'react';
import ProfileCard from '../cards/ProfileCard';
import { FaSearch } from 'react-icons/fa';
import FriendCard from '../cards/friendCard';
function FriendList() {
  return (
    <div className="w-full h-full items-center justify-start flex flex-col">
      <ProfileCard />
      <div className="flex w-full items-center justify-center overflow-scroll">
        <FaSearch className="-mr-6 z-10 text-gray-500 font-light text-sm" />
        <input
          type="text"
          className="w-4/5 flex rounded-lg text-sm py-2 pl-8"
          placeholder="Search Friends.."
        ></input>
      </div>
      <div className="w-full flex flex-col">
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
      </div>
    </div>
  );
}

export default FriendList;
