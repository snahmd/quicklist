import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  senderId: string;
  text: string;
  timestamp: string;
}

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
  avatar: string;
  isSold?: boolean;
}

export default function Component() {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = [
    {
      id: 1,
      senderId: "other",
      text: "Just send the package!",
      timestamp: "14:32",
    },
    {
      id: 2,
      senderId: "me",
      text: "Hi, thank you for the quick delivery!",
      timestamp: "15:32",
    },
    {
      id: 3,
      senderId: "other",
      text: "Just send the package!",
      timestamp: "23:02",
    },
    {
      id: 4,
      senderId: "me",
      text: "I sent the money to your paypal account!",
      timestamp: "28:02",
    },
    {
      id: 5,
      senderId: "other",
      text: "Can you send me the money via paypal?",
      timestamp: "29:02",
    },
    { id: 6, senderId: "me", text: "How should I pay?", timestamp: "28:02" },
  ];

  const chatUsers: ChatUser[] = [
    {
      id: "1",
      name: "John",
      lastMessage: "Just send the package!",
      date: "14:32",
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Steven",
      lastMessage: "Hi, thank you for the quick delivery!",
      date: "11:32",
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Richie",
      lastMessage: "Great!",
      date: "15.03.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "4",
      name: "Christina",
      lastMessage: "Package received, thank you :)",
      date: "01.03.2022",
      avatar: "/placeholder.svg",
      isSold: true,
    },
    {
      id: "5",
      name: "Sandra",
      lastMessage: "Bye!",
      date: "20.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "6",
      name: "Margareta",
      lastMessage: "Package is there :)",
      date: "15.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "7",
      name: "Michael",
      lastMessage: "When can you ship it?",
      date: "14.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "8",
      name: "Emma",
      lastMessage: "Is the price negotiable?",
      date: "13.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "9",
      name: "David",
      lastMessage: "Thanks for the quick response!",
      date: "12.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "10",
      name: "Sophia",
      lastMessage: "Can you provide more details?",
      date: "11.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "11",
      name: "Oliver",
      lastMessage: "I'm interested in buying.",
      date: "10.02.2022",
      avatar: "/placeholder.svg",
    },
    {
      id: "12",
      name: "Isabella",
      lastMessage: "Is this still available?",
      date: "09.02.2022",
      avatar: "/placeholder.svg",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-[#9CCB3B] text-white p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" className="text-white p-2">
            <ArrowLeft className="h-6 w-6 mr-2" />
            Go Back
          </Button>
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        <div className="w-full md:w-80 border-r bg-background flex flex-col">
          <div className="p-4 font-semibold border-b">Messages</div>
          <ScrollArea className="flex-1">
            {chatUsers.map((user) => (
              <div
                key={user.id}
                className={`relative flex items-center gap-3 p-4 hover:bg-accent cursor-pointer border-b ${
                  user.isSold ? "opacity-75" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        user.isSold ? "text-muted-foreground" : ""
                      }`}
                    >
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.lastMessage}
                  </p>
                </div>
                {user.isSold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <span className="text-2xl font-bold text-[#9CCB3B]">
                      SOLD
                    </span>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
          <Button variant="ghost" className="m-4 text-muted-foreground">
            Show older messages
          </Button>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="John" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <span className="font-semibold">John</span>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 flex flex-col-reverse">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.senderId === "me"
                        ? "bg-[#9CCB3B] text-white"
                        : "bg-accent"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
