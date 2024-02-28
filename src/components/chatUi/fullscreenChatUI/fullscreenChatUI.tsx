"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { CNLLogo } from "@/components/common/logos";
import { LoggedConversation } from "@/types/loggedConversations";
import { v4 } from "uuid";
import { defaultTheme } from "../defaultTheme";
import ChatUIEngineWrapper from "../engineWrapper";
import { Theme } from "../types";
import ThemeEditor from "./themeEditor";

export default function FullScreenChatUI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const onThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  interface Chat extends LoggedConversation {}
  const [chats, setChats] = useState<Chat[]>([]);

  const getCurrentChat = () => {
    return chats.find((chat) => chat.conversation_id === currentChatId);
  };

  const handleNewChat = () => {
    const conversationId = v4();
    const newChat: Chat = {
      conversation_id: conversationId,
      last_activity: new Date().toISOString(),
      conversation_history: [],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(conversationId);
  };

  // Create first chat if history is empty (on start up show last convo)
  useEffect(() => {
    if (chats.length === 0) {
      const conversationId = v4();
      setChats([
        {
          conversation_id: conversationId,
          conversation_history: [],
          last_activity: new Date().toISOString(),
        },
      ]);
      setCurrentChatId(conversationId);
    }
  }, []);

  // Chats cleanup
  const [runChatsCleanup, setRunChatsCleanup] = useState("");
  useEffect(() => {
    setChats((chats_) => {
      let chats = chats_;
      // First message is non empty
      // let chats = chats_.filter(
      //   (chat) => chat.conversation_history[0]?.content?.length > 0
      // );
      chats = chats.slice(0, 100);
      chats.sort((a, b) => b.last_activity.localeCompare(a.last_activity));
      return chats;
    });
  }, [runChatsCleanup]);

  //
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="h-full">
        {/* Mobile sidebar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {/* {chats.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={clsx(
                                    item.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    className={clsx(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))} */}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {/* {chats.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={clsx(
                                    team.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <span
                                    className={clsx(
                                      team.current
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))} */}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white px-6">
            <CNLLogo />
            <div>
              <button
                className=" w-full  rounded-md border border-gray-200 px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 "
                onClick={handleNewChat}
              >
                <span className="-ml-6  flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" /> New chat
                </span>
              </button>
            </div>
            <div className="mt-6">
              <div className="text-xs font-semibold leading-6 text-gray-500">
                Chat history
              </div>
              <div className="mt-3">
                <ul role="list" className="-mx-2 space-y-1">
                  {chats
                    .filter(
                      (chat) =>
                        chat.conversation_history[0]?.content?.length > 0
                    )
                    .map((chat) => {
                      const current = chat.conversation_id === currentChatId;
                      return (
                        <li key={chat.conversation_id}>
                          <button
                            className={clsx(
                              current
                                ? "bg-gray-50"
                                : "text-gray-700 hover:bg-gray-50",
                              "group flex w-full gap-x-3 rounded-md px-2 py-1 text-sm font-medium leading-6"
                            )}
                          >
                            <span className="truncate">
                              {chat.conversation_history[0]?.content}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile top strip that allows to open mobile sidebar */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main
          className="h-full lg:pl-72"
          style={{ backgroundColor: theme.bgColor }}
        >
          <div className="fixed right-0 top-0 z-40">
            <ThemeEditor
              onThemeChange={onThemeChange}
              currentTheme={defaultTheme}
            />
          </div>
          <div className=" h-full ">
            <ChatUIEngineWrapper
              key={currentChatId || ""}
              initialHistory={getCurrentChat()?.conversation_history || []}
              onHistoryChange={({ newHistory }) => {
                setChats((chats) =>
                  chats.map<Chat>((chat) =>
                    chat.conversation_id === currentChatId
                      ? {
                          ...chat,
                          conversation_history: newHistory,
                          last_activity: new Date().toISOString(),
                        }
                      : chat
                  )
                );
                setRunChatsCleanup(v4());
              }}
              theme={theme}
              conversationId={currentChatId || ""}
              engineUrl={`${process.env.NEXT_PUBLIC_CNL_ENGINE_URL}`}
            />
          </div>
        </main>
      </div>
    </>
  );
}
