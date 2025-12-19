"use client";

import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  BarChart3,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export function Dashboard() {
  const todayStats = [
    {
      label: "오늘 수업",
      value: "8",
      subtext: "진행 중 2건",
      icon: Users,
      color: "blue",
    },
    {
      label: "출석",
      value: "94",
      subtext: "96.9%",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "결석",
      value: "2",
      subtext: "보강 대상",
      icon: XCircle,
      color: "red",
    },
    {
      label: "지각",
      value: "1",
      subtext: "1.0%",
      icon: Clock,
      color: "yellow",
    },
  ];

  const actionItems = [
    { label: "미처리 과제", value: 12, urgent: true },
    { label: "미입력 테스트", value: 3, urgent: true },
    { label: "학부모 메시지 대기", value: 5, urgent: false },
    { label: "보강 영상 승인 대기", value: 2, urgent: false },
  ];

  const recentTests = [
    {
      className: "고2 수학 심화반",
      test: "11월 모의고사",
      avg: 87.5,
      date: "2025-12-15",
    },
    {
      className: "고1 영어 중급반",
      test: "단어 테스트 Week 12",
      avg: 92.3,
      date: "2025-12-14",
    },
    {
      className: "고3 국어 기본반",
      test: "문학 기말평가",
      avg: 78.9,
      date: "2025-12-13",
    },
  ];

  const parentMessages = [
    { week: "이번주 (12/16-12/22)", sent: 45, total: 50, percent: 90 },
    { week: "지난주 (12/9-12/15)", sent: 48, total: 50, percent: 96 },
  ];

  return (
    <div className="space-y-6">
      {/* Today Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-${s.color}-50 text-${s.color}-600`}
                  >
                    <Icon className="size-6" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="text-3xl font-semibold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.subtext}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              처리 필요 항목
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {actionItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-md p-3 ${
                  item.urgent
                    ? "bg-destructive/10"
                    : "bg-muted"
                }`}
              >
                <span
                  className={
                    item.urgent
                      ? "text-destructive font-medium"
                      : ""
                  }
                >
                  {item.label}
                </span>
                <Badge
                  variant={item.urgent ? "destructive" : "default"}
                >
                  {item.value}건
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              학부모 메시지 발송 현황
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {parentMessages.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{m.week}</span>
                  <span>
                    {m.sent}/{m.total}명
                  </span>
                </div>
                <Progress value={m.percent} />
                <div className="text-xs text-muted-foreground mt-1">
                  {m.percent}% 완료
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            최근 테스트 평균 점수
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>반 이름</TableHead>
                <TableHead>테스트명</TableHead>
                <TableHead>평균 점수</TableHead>
                <TableHead>시행일</TableHead>
                <TableHead>추세</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTests.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>{t.className}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.test}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        t.avg >= 90
                          ? "default"
                          : t.avg >= 80
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {t.avg.toFixed(1)}점
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.date}
                  </TableCell>
                  <TableCell>
                    <TrendingUp className="size-5 text-green-600" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
