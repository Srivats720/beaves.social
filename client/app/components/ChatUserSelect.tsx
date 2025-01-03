"use client";

import { useRouter } from "next/navigation";

interface Options {
  id: string,
  username: string,
  latestMessageAuthor: string,
  latestMessageText: string,
  isMessage: boolean,
}

export default function ChatUserSelect(options: Options) {
  const router = useRouter();
  const { username, latestMessageAuthor, latestMessageText } = options;
  const handleUserClick = (_: any, id: number): void => router.push(`/you/chats/${id}`);

  return (
    <li>
      <a style={{cursor: "pointer"}} onClick={(e) => handleUserClick(e, options.id)} className="flex items-center p-2 h-16 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <img src="https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg" className="flex items-center float-left h-11 w-11 mr-5 ms-2 rounded-full" alt="server-icon"/>
        <div className="rows-2">
          <div className="text-base">
            <span className="text-orange-400">{username}</span>
          </div>

          <div className="text-sm text-gray-400">
            <span className="text-white">{latestMessageAuthor}{options.isMessage ? ": " : "No messages"}{latestMessageText}</span>
          </div>
        </div>
      </a>
    </li>
  )
}