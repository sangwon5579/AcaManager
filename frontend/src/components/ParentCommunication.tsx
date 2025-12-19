"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  FileText,
  Eye,
  Calendar,
  Users,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  type:
    | "주간 학습 리포트"
    | "결석 안내"
    | "보강 안내"
    | "공지사항"
    | "교재비 안내";
  recipients: number;
  sentDate: string;
  status: "발송완료" | "발송대기" | "작성중";
};

export function ParentCommunication() {
  const [tab, setTab] = useState("dashboard");
  const [template, setTemplate] = useState("주간 학습 리포트");

  const messages: Message[] = [
    {
      id: "M001",
      type: "주간 학습 리포트",
      recipients: 45,
      sentDate: "2025-12-16",
      status: "발송완료",
    },
    {
      id: "M002",
      type: "결석 안내",
      recipients: 2,
      sentDate: "2025-12-15",
      status: "발송완료",
    },
    {
      id: "M003",
      type: "공지사항",
      recipients: 50,
      sentDate: "2025-12-14",
      status: "발송완료",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>학부모 커뮤니케이션</h2>
        <p className="text-muted-foreground mt-1">
          학부모 메시지 발송 및 학습 리포트 관리
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="dashboard">발송 대시보드</TabsTrigger>
          <TabsTrigger value="create">메시지 작성</TabsTrigger>
          <TabsTrigger value="history">발송 이력</TabsTrigger>
        </TabsList>

        {/* DASHBOARD */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">이번 주 발송</div>
                <div className="text-2xl">2건</div>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="text-sm text-green-600">총 수신자</div>
                <div className="text-2xl text-green-600">47명</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="text-sm text-blue-600">발송 대기</div>
                <div className="text-2xl text-blue-600">0건</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="p-4">
                <div className="text-sm text-purple-600">읽음률</div>
                <div className="text-2xl text-purple-600">94%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>최근 발송 내역</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-lg bg-muted p-4"
                >
                  <div className="flex items-center gap-4">
                    <MessageSquare className="size-5 text-muted-foreground" />
                    <div>
                      <div>{m.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {m.recipients}명 · {m.sentDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{m.status}</Badge>
                    <Button size="icon" variant="ghost">
                      <Eye className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CREATE */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>템플릿 선택</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "주간 학습 리포트", icon: FileText },
                { name: "결석 안내", icon: Bell },
                { name: "보강 안내", icon: Calendar },
                { name: "공지사항", icon: MessageSquare },
                { name: "교재비 안내", icon: FileText },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.name}
                    onClick={() => setTemplate(t.name)}
                    className={cn(
                      "rounded-lg border p-4 text-left transition",
                      template === t.name
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted",
                    )}
                  >
                    <Icon className="mb-2 size-6" />
                    <div>{t.name}</div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>메시지 작성</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="제목을 입력하세요" />
              <Textarea rows={8} placeholder="메시지 내용을 입력하세요" />
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Send className="mr-2 size-4" />
                  발송
                </Button>
                <Button variant="outline">취소</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HISTORY */}
        <TabsContent value="history">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>발송 ID</TableHead>
                    <TableHead>메시지 유형</TableHead>
                    <TableHead className="text-center">수신자</TableHead>
                    <TableHead className="text-center">발송일</TableHead>
                    <TableHead className="text-center">상태</TableHead>
                    <TableHead className="text-center">상세</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.id}</TableCell>
                      <TableCell>{m.type}</TableCell>
                      <TableCell className="text-center">
                        {m.recipients}명
                      </TableCell>
                      <TableCell className="text-center">
                        {m.sentDate}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge>{m.status}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="link">상세보기</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
