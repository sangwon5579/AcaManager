"use client";

import { useState } from "react";
import {
  Send,
  Search,
  Users,
  Tag,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Chat = {
  id: string;
  participants: string[];
  lastMessage: string;
  lastTime: string;
  unread: number;
  tags?: string[];
};

type Message = {
  id: string;
  sender: string;
  message: string;
  time: string;
  isMe: boolean;
};

export function InternalChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>("C001");
  const [messageInput, setMessageInput] = useState("");

  const chats: Chat[] = [
    {
      id: "C001",
      participants: ["이선생님", "조교 이민지"],
      lastMessage: "내일 영어 중급반 자료 준비 부탁드려요",
      lastTime: "14:32",
      unread: 2,
      tags: ["영어 중급반", "자료준비"],
    },
    {
      id: "C002",
      participants: ["김선생님", "조교 박준혁"],
      lastMessage: "수학 심화반 프린트 완료했습니다",
      lastTime: "12:15",
      unread: 0,
      tags: ["수학 심화반"],
    },
    {
      id: "C003",
      participants: ["원장님", "교사 전체"],
      lastMessage: "다음 주 교사 회의 일정 공지",
      lastTime: "어제",
      unread: 0,
      tags: ["공지"],
    },
  ];

  const messages: Message[] = [
    {
      id: "M001",
      sender: "이선생님",
      message: "내일 영어 중급반 프린트 부탁드려요",
      time: "14:20",
      isMe: true,
    },
    {
      id: "M002",
      sender: "조교 이민지",
      message: "네! 바로 준비하겠습니다",
      time: "14:22",
      isMe: false,
    },
  ];

  const selectedChatData = chats.find((c) => c.id === selectedChat);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessageInput("");
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 채팅 목록 */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader className="space-y-3">
          <CardTitle>내부 채팅</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="대화 검색" />
          </div>
        </CardHeader>

        <ScrollArea className="flex-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={cn(
                "w-full text-left px-4 py-3 border-b hover:bg-muted transition",
                selectedChat === chat.id && "bg-muted",
              )}
            >
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="size-4" />
                  {chat.participants.join(", ")}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {chat.lastTime}
                  </span>
                  {chat.unread > 0 && (
                    <Badge variant="destructive" className="h-5 px-2">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
              <div className="flex gap-1 mt-2 flex-wrap">
                {chat.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </ScrollArea>

        <div className="p-4 border-t">
          <Button className="w-full">
            <MessageCircle className="mr-2 size-4" />
            새 대화 시작
          </Button>
        </div>
      </Card>

      {/* 메시지 영역 */}
      {selectedChatData ? (
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              {selectedChatData.participants.join(", ")}
            </CardTitle>
            <div className="flex gap-2 flex-wrap mt-2">
              {selectedChatData.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  <Tag className="size-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 px-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.isMe ? "justify-end" : "justify-start",
                )}
              >
                <div className="max-w-md">
                  {!msg.isMe && (
                    <div className="text-xs text-muted-foreground mb-1">
                      {msg.sender}
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm",
                      msg.isMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {msg.message}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-right">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="메시지를 입력하세요..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="size-4 mr-1" />
                전송
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter 전송 / Shift+Enter 줄바꿈
            </p>
          </div>
        </Card>
      ) : (
        <Card className="lg:col-span-2 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MessageCircle className="size-12 mx-auto mb-3" />
            대화를 선택하세요
          </div>
        </Card>
      )}
    </div>
  );
}
