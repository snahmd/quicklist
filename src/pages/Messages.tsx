import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tables } from "@/types/supabase";
import { supabase } from "@/utils/supabaseClient";
import { useUserContext } from "@/context/userContext";

type extendedArticle = Tables<"articles"> & {profile:Tables<"profiles">}

type extendedChat = Tables<"chats"> & {article:extendedArticle}

export default function Component() {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Tables<"messages">[]>([]);
  const [chats, setChats] = useState<extendedChat[]>([])
  const [currentChat, setCurrentChat] = useState<extendedChat|null>(null)
  const [currentChatMessages, setCurrentChatMessages] = useState<Tables<"messages">[]>([])
  const {user} = useUserContext()

  // const messages: Message[] = [
  //   {
  //     id: 1,
  //     senderId: "other",
  //     text: "Just send the package!",
  //     timestamp: "14:32",
  //   },
  //   {
  //     id: 2,
  //     senderId: "me",
  //     text: "Hi, thank you for the quick delivery!",
  //     timestamp: "15:32",
  //   },
  //   {
  //     id: 3,
  //     senderId: "other",
  //     text: "Just send the package!",
  //     timestamp: "23:02",
  //   },
  //   {
  //     id: 4,
  //     senderId: "me",
  //     text: "I sent the money to your paypal account!",
  //     timestamp: "28:02",
  //   },
  //   {
  //     id: 5,
  //     senderId: "other",
  //     text: "Can you send me the money via paypal?",
  //     timestamp: "29:02",
  //   },
  //   { id: 6, senderId: "me", text: "How should I pay?", timestamp: "28:02" },
  // ];

  // const chatUsers: ChatUser[] = [
  //   {
  //     id: "1",
  //     name: "John",
  //     lastMessage: "Just send the package!",
  //     date: "14:32",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "2",
  //     name: "Steven",
  //     lastMessage: "Hi, thank you for the quick delivery!",
  //     date: "11:32",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "3",
  //     name: "Richie",
  //     lastMessage: "Great!",
  //     date: "15.03.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "4",
  //     name: "Christina",
  //     lastMessage: "Package received, thank you :)",
  //     date: "01.03.2022",
  //     avatar: "/placeholder.svg",
  //     isSold: true,
  //   },
  //   {
  //     id: "5",
  //     name: "Sandra",
  //     lastMessage: "Bye!",
  //     date: "20.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "6",
  //     name: "Margareta",
  //     lastMessage: "Package is there :)",
  //     date: "15.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "7",
  //     name: "Michael",
  //     lastMessage: "When can you ship it?",
  //     date: "14.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "8",
  //     name: "Emma",
  //     lastMessage: "Is the price negotiable?",
  //     date: "13.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "9",
  //     name: "David",
  //     lastMessage: "Thanks for the quick response!",
  //     date: "12.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "10",
  //     name: "Sophia",
  //     lastMessage: "Can you provide more details?",
  //     date: "11.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "11",
  //     name: "Oliver",
  //     lastMessage: "I'm interested in buying.",
  //     date: "10.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  //   {
  //     id: "12",
  //     name: "Isabella",
  //     lastMessage: "Is this still available?",
  //     date: "09.02.2022",
  //     avatar: "/placeholder.svg",
  //   },
  // ];

  // articles, chats , messages
  useEffect(() => {
    if(!user) return
    const fetchChats = async () => {
      try{
        const {data, error} = await supabase
        .from('chats')
        .select('*, article:articles(*, profile:profiles(*))')
        .eq('sender_id', user.id)
      
        const {data:my_articles_data, error:error2} = await supabase
        .from('chats')
        .select('*, article:articles(*, profile:profiles(*))')
        .eq('articles.user_id', user.id)

        console.log("user.id", user.id)
        console.log("my_articles_data", my_articles_data)
   

        if(error) throw error
        if(error2) throw error2
        
        const mixedData = data?.concat(my_articles_data)
        // order by created_at
        mixedData?.sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime())
        setCurrentChat(mixedData?mixedData[0]:null)
        setChats(mixedData?mixedData:[])
      }catch(error){
        console.error('Error fetching chats', error)
      }
    }
    fetchChats()
  },[user])


  useEffect(() => {
    if(!chats) return
    const fetchMessages = async () => {
      try{
        const {data, error} = await supabase
        .from('messages')
        .select('*')
        .in('chat_id', chats.map(chat=>chat.id))
        if(error) throw error
        setMessages(data)
        // filter messages by current chat
        const currentChatMessages_ = data?.filter(message=>message.chat_id===currentChat?.id)
        setCurrentChatMessages(currentChatMessages_)

      }catch(error){
        console.error('Error fetching messages', error)
      }
    }
    fetchMessages()
  },[chats])

  const handleChatClick = (chat:extendedChat) => {
    setCurrentChat(chat)
    const currentChatMessages_ = messages?.filter(message=>message.chat_id===chat.id)
    setCurrentChatMessages(currentChatMessages_)
  }
  
  
  
  
  
  
  
  
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

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
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={()=>handleChatClick(chat)}
                className="relative flex items-center gap-3 p-4 hover:bg-accent cursor-pointer border-b"
              >
                <Avatar>
                  <AvatarImage src={""} alt={chat.article.profile.profile_name?chat.article.profile.profile_name:''} />
                  <AvatarFallback>{chat.article.profile.profile_name?chat.article.profile.profile_name[0]:''}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        ""//user.isSold ? "text-muted-foreground" : ""
                      }`}
                    >
                      {chat.article.profile.profile_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(chat.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {messages.find(message=>message.chat_id===chat.id)?.message}
                  </p>
                </div>
                {/* {user.isSold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <span className="text-2xl font-bold text-[#9CCB3B]">
                      SOLD
                    </span>
                  </div>
                )} */}
              </div>
            ))}
          </ScrollArea>
          <Button variant="ghost" className="m-4 text-muted-foreground">
            Show older messages
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          
        </div> 
      </div>
    </div>
  );
}
