"use client";

import {
  ArrowLeft,
  Phone,
  User,
  Calendar,
  BarChart3,
  FileText,
  Video,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

type Student = {
  id: string;
  name: string;
  school: string;
  grade: string;
  class: string;
  status: string;
  phone: string;
  parentPhone: string;
};

type StudentDetailProps = {
  student: Student;
  onBack: () => void;
};

export function StudentDetail({ student, onBack }: StudentDetailProps) {
  const attendanceHistory = [
    { date: "2025-12-17", status: "출석", class: "수학 심화반" },
    { date: "2025-12-16", status: "출석", class: "수학 심화반" },
    { date: "2025-12-13", status: "지각", class: "수학 심화반" },
  ];

  const assignments = [
    { title: "2차 함수 심화 문제", grade: "A", due: "2025-12-15" },
    { title: "미분 기초 연습", grade: "B", due: "2025-12-12" },
  ];

  const tests = [
    { name: "11월 모의고사", score: 92, avg: 87.5, date: "2025-11-28" },
    { name: "중간평가", score: 88, avg: 85.2, date: "2025-11-15" },
  ];

  const clinics = [
    { date: "2025-12-20", time: "19:00-20:00", topic: "함수 심화", teacher: "김선생님" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2>{student.name} 학생</h2>
          <p className="text-muted-foreground">
            {student.school} · {student.grade} · {student.class}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>ID</span>
              <span>{student.id}</span>
            </div>
            <div className="flex justify-between">
              <span>학년</span>
              <span>{student.grade}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>상태</span>
              <Badge className="bg-green-100 text-green-700">
                {student.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <CardTitle>연락처</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <div className="text-muted-foreground">학생</div>
              <div>{student.phone}</div>
            </div>
            <div>
              <div className="text-muted-foreground">학부모</div>
              <div>{student.parentPhone}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>학습 지표</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>출석률</span>
                <span>95.8%</span>
              </div>
              <Progress value={95.8} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>과제 수행</span>
                <span>92%</span>
              </div>
              <Progress value={92} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance & Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              출결 이력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {attendanceHistory.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b last:border-0 pb-2"
              >
                <div>
                  <div className="text-sm">{a.class}</div>
                  <div className="text-xs text-muted-foreground">{a.date}</div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    a.status === "출석"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {a.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              과제 수행도
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assignments.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b last:border-0 pb-2"
              >
                <div>
                  <div className="text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground">
                    마감 {a.due}
                  </div>
                </div>
                <Badge>{a.grade}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Test Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            테스트 성적
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시험</TableHead>
                <TableHead>일자</TableHead>
                <TableHead>점수</TableHead>
                <TableHead>평균</TableHead>
                <TableHead>차이</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((t, i) => {
                const diff = t.score - t.avg;
                return (
                  <TableRow key={i}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.date}
                    </TableCell>
                    <TableCell>
                      <Badge>{t.score}</Badge>
                    </TableCell>
                    <TableCell>{t.avg}</TableCell>
                    <TableCell
                      className={
                        diff >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {diff > 0 ? "+" : ""}
                      {diff.toFixed(1)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Clinic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            클리닉 / 보강
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clinics.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div>
                <div className="text-sm">{c.topic}</div>
                <div className="text-xs text-muted-foreground">
                  {c.date} · {c.time} · {c.teacher}
                </div>
              </div>
              <Button size="sm">확인</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Parent Communication */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            학부모 연락
          </CardTitle>
          <Button size="sm">새 메시지</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md bg-muted p-4 text-sm">
            <div className="flex justify-between mb-1">
              <span>주간 학습 리포트</span>
              <span className="text-muted-foreground">2025-12-16</span>
            </div>
            <p className="text-muted-foreground">
              이번 주 학습 내용과 성취도를 공유드립니다…
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
