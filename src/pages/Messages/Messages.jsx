// Messages

import { useState, useEffect, useCallback } from "react";
import {
  MdSearch,
  MdSend,
  MdAttachFile,
  MdCheck,
  MdDoneAll,
  MdPersonAdd,
  MdInfo,
} from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from "react-router-dom";

// ─── Mock Data (Fallback) ─────────────────────────────────────────────────────

const defaultCurrentUser = {
  _id: "me",
  name: "Sarah Mohamed",
  avatar: "SM",
  status: "online",
};

const defaultConversations = [
  {
    _id: "conv_1",
    user: { _id: "user_1", name: "Alex Rivera", avatar: "AR", status: "online" },
    lastMessage: "Sure! Let's schedule our next session for Friday.",
    time: "10:32 AM",
    unread: 2,
    typing: false,
    messages: [
      { _id: "m1", senderId: "user_1", text: "Hey Sarah! I saw your profile and I'm really interested in learning React from you.", time: "10:15 AM", status: "read" },
      { _id: "m2", senderId: "me", text: "Hi Alex! I'd be happy to help. I noticed you're great with UI design - maybe we can do a skill swap?", time: "10:18 AM", status: "read" },
      { _id: "m3", senderId: "user_1", text: "That sounds perfect! I've been wanting to improve my React skills.", time: "10:20 AM", status: "read" },
      { _id: "m4", senderId: "me", text: "Great! What topics in React are you most interested in?", time: "10:22 AM", status: "read" },
      { _id: "m5", senderId: "user_1", text: "I'd love to dive into custom hooks, context API patterns, and performance optimization.", time: "10:25 AM", status: "read" },
      { _id: "m6", senderId: "me", text: "Those are all great topics! I can definitely cover custom hooks and context API.", time: "10:28 AM", status: "read" },
      { _id: "m7", senderId: "me", text: "How about we schedule 2 sessions per week? One for React and one for UI design.", time: "10:29 AM", status: "read" },
      { _id: "m8", senderId: "user_1", text: "Sure! Let's schedule our next session for Friday.", time: "10:32 AM", status: "read" },
    ],
  },
  {
    _id: "conv_2",
    user: { _id: "user_2", name: "Maya Chen", avatar: "MC", status: "online" },
    lastMessage: "The UI design review went great, thanks for your help!",
    time: "Yesterday",
    unread: 0,
    typing: false,
    messages: [
      { _id: "m1", senderId: "user_2", text: "Hey! Can you review my latest design mockup?", time: "2:00 PM", status: "read" },
      { _id: "m2", senderId: "me", text: "Of course! Send it over and I'll take a look.", time: "2:05 PM", status: "read" },
      { _id: "m3", senderId: "user_2", text: "The UI design review went great, thanks for your help!", time: "3:30 PM", status: "read" },
    ],
  },
  {
    _id: "conv_3",
    user: { _id: "user_3", name: "Omar Khalid", avatar: "OK", status: "away" },
    lastMessage: "Can you share the resources for React hooks?",
    time: "Yesterday",
    unread: 1,
    typing: false,
    messages: [
      { _id: "m1", senderId: "user_3", text: "Salam! I need some help with TypeScript generics.", time: "11:00 AM", status: "read" },
      { _id: "m2", senderId: "me", text: "Sure thing! What's confusing you?", time: "11:10 AM", status: "read" },
      { _id: "m3", senderId: "user_3", text: "Can you share the resources for React hooks?", time: "11:15 AM", status: "read" },
    ],
  },
  {
    _id: "conv_4",
    user: { _id: "user_4", name: "Priya Sharma", avatar: "PS", status: "online" },
    lastMessage: "I'd love to learn Spanish from you!",
    time: "Monday",
    unread: 0,
    typing: false,
    messages: [
      { _id: "m1", senderId: "user_4", text: "Hi! I saw you offer Spanish lessons.", time: "9:00 AM", status: "read" },
      { _id: "m2", senderId: "me", text: "Yes! I'd be happy to teach you. Want to schedule a session?", time: "9:15 AM", status: "read" },
      { _id: "m3", senderId: "user_4", text: "I'd love to learn Spanish from you!", time: "9:30 AM", status: "read" },
    ],
  },
];

// ─── Helper Components ─────────────────────────────────────────────────────────

// Status indicator dot
const StatusDot = ({ status }) => {
  const colors = {
    online: "bg-emerald-500",
    away: "bg-amber-400",
    offline: "bg-gray-400",
  };
  return (
    <span
      className={`absolute bottom-0 right-0 w-3 h-3 ${colors[status] || "bg-gray-400"} rounded-full border-2 border-white`}
    />
  );
};

// Avatar with initials
const Avatar = ({ initials, size = "md", status }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };
  const colors = [
    "bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500",
    "bg-pink-500", "bg-cyan-500", "bg-rose-500", "bg-indigo-500",
  ];
  const colorIndex = initials?.charCodeAt(0) % colors.length || 0;

  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizes[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold`}>
        {initials}
      </div>
      {status && <StatusDot status={status} />}
    </div>
  );
};

// Message bubble
const MessageBubble = ({ message, isMine }) => {
  const StatusIcon = () => {
    if (!isMine) return null;
    if (message.status === "read") return <MdDoneAll className="text-blue-400 text-sm" />;
    if (message.status === "delivered") return <MdDoneAll className="text-gray-400 text-sm" />;
    return <MdCheck className="text-gray-400 text-sm" />;
  };

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`flex ${isMine ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[75%]`}>
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isMine
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-gray-100 text-gray-800 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <div className={`flex items-center gap-1 flex-shrink-0 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-xs text-gray-400">{message.time}</span>
          <StatusIcon />
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const Messages = ({
  // Props for dynamic data
  conversations: propConversations,
  currentUser: propCurrentUser,
  messages: propMessages,               // Pre-fetched messages for the selected chat
  onSendMessage,                         // callback: (conversationId, messageText) => Promise
  onSelectChat,                          // callback: (conversationId) => Promise (marks as read server-side)
}) => {
  const currentUser = propCurrentUser || defaultCurrentUser;
  const userId = currentUser._id || currentUser.id || "me";

  // State
  const [conversationsList, setConversationsList] = useState(propConversations || defaultConversations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Update conversations when props change
  useEffect(() => {
    if (propConversations) {
      setConversationsList(propConversations);
    }
  }, [propConversations]);

  // Filter conversations based on search
  const filteredConversations = conversationsList.filter((conv) => {
    const userName = conv.user?.name || "";
    return userName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handle chat selection
  const handleSelectChat = useCallback((conv) => {
    setSelectedChat(conv);
    setShowSidebar(false);

    // Mark as read locally
    setConversationsList((prev) =>
      prev.map((c) =>
        (c._id || c.id) === (conv._id || conv.id)
          ? { ...c, unread: 0 }
          : c
      )
    );

    // Use messages from the conversation object itself (for mock mode)
    if (conv.messages) {
      setCurrentMessages(conv.messages);
    }
    // Or use pre-fetched messages from props
    else if (propMessages) {
      setCurrentMessages(propMessages);
    } else {
      setCurrentMessages([]);
    }

    // Notify server that messages were read
    if (onSelectChat) {
      onSelectChat(conv._id || conv.id).catch(console.error);
    }
  }, [propMessages, onSelectChat]);

  // Handle sending a new message
  const handleSend = async () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const chatId = selectedChat._id || selectedChat.id;
    const messageText = newMessage.trim();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Build new message object
    const message = {
      _id: `temp_${Date.now()}`,
      senderId: userId,
      text: messageText,
      time: now,
      status: "sent",
    };

    // Update messages locally first (optimistic update)
    setCurrentMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Update last message in sidebar
    setConversationsList((prev) =>
      prev.map((c) =>
        (c._id || c.id) === chatId
          ? { ...c, lastMessage: messageText, time: now }
          : c
      )
    );

    // Send to backend if callback provided
    if (onSendMessage) {
      try {
        await onSendMessage(chatId, messageText);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  // Send on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50 flex">
      {/* ─── Conversations Sidebar ─────────────────────────────────────── */}
      <div
        className={`${
          showSidebar ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white flex-shrink-0`}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500">
              <MdPersonAdd className="text-xl" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
              <MdSearch className="text-5xl mb-3 opacity-30" />
              <p className="text-sm font-medium">No conversations found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const convId = conv._id || conv.id;
              const selectedId = selectedChat?._id || selectedChat?.id;
              const isActive = selectedId === convId;

              return (
                <div
                  key={convId}
                  onClick={() => handleSelectChat(conv)}
                  className={`flex items-center gap-3 p-3 mx-2 my-0.5 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                    isActive
                      ? "bg-blue-50 hover:bg-blue-50 border border-blue-100"
                      : "border border-transparent"
                  }`}
                >
                  <Avatar initials={conv.user.avatar} size="md" status={conv.user.status} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {conv.user.name}
                      </h3>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-sm text-gray-500 truncate">
                        {conv.typing ? (
                          <span className="text-blue-500 italic">typing...</span>
                        ) : (
                          conv.lastMessage
                        )}
                      </p>
                      {conv.unread > 0 && !isActive && (
                        <span className="ml-2 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ─── Chat Window ──────────────────────────────────────────────── */}
      <div
        className={`${
          !showSidebar ? "flex" : "hidden"
        } md:flex flex-col flex-1 bg-white`}
      >
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                {/* Back button (mobile) */}
                <button
                  onClick={() => setShowSidebar(true)}
                  className="md:hidden w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <Avatar initials={selectedChat.user.avatar} size="md" status={selectedChat.user.status} />

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {selectedChat.user.name}
                  </h2>
                  <p className="text-xs text-gray-500 capitalize">
                    {selectedChat.user.status === "online" ? (
                      <span className="text-emerald-500">● Online</span>
                    ) : selectedChat.user.status === "away" ? (
                      <span className="text-amber-500">● Away</span>
                    ) : (
                      <span className="text-gray-400">● Offline</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Chat actions - view profile only */}
              <div className="flex items-center gap-1">
                <Link
                  to={`/profile?userId=${selectedChat.user._id || selectedChat.user.name}`}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500"
                  title="View Profile"
                >
                  <MdInfo className="text-xl" />
                </Link>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#f8f9fb]">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-gray-400">Loading messages...</p>
                </div>
              ) : currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p className="text-sm">No messages yet. Say hello!</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                      Beginning of conversation
                    </span>
                  </div>
                  {currentMessages.map((msg) => (
                    <MessageBubble
                      key={msg._id || msg.id}
                      message={msg}
                      isMine={(msg.senderId === userId) || (msg.senderId === "me")}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Message input */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-colors text-gray-500">
                  <MdAttachFile className="text-xl rotate-45" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-4 pr-12 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <BsEmojiSmile className="text-lg" />
                  </button>
                </div>

                <button
                  onClick={handleSend}
                  disabled={newMessage.trim() === ""}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    newMessage.trim()
                      ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <MdSend className="text-lg" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MdSend className="text-4xl opacity-30" />
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-1">Your Messages</h3>
            <p className="text-sm text-center max-w-xs">
              Select a conversation from the left to start chatting with other SkillSwap members.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;