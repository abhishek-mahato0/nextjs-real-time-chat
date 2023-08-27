import { FunctionComponent } from 'react';
import MessageTop from '../cards/MessageTop';
import Messages from '../cards/Messages';
import { AiOutlineSend } from 'react-icons/ai';
interface MessageSectionProps {}

const MessageSection: FunctionComponent<MessageSectionProps> = () => {
  return (
    <div className="w-full flex flex-col">
      <MessageTop />
      <div className="w-full h-3/4 overflow-auto">
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
      </div>
      <div className="w-2/5 h-10 flex items-center justify-center fixed bottom-6 z-50 left-96">
        <input
          type="text"
          placeholder="Write Your Message Here.."
          className="w-11/12 h-full bg-slate-100 rounded-lg pl-4"
        ></input>
        <AiOutlineSend className="text-xl text-black font-bold cursor-pointer h-full -ml-6" />
      </div>
    </div>
  );
};

export default MessageSection;
