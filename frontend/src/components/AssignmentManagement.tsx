"use client";

import { useState } from "react";
import {
  Plus,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Assignment = {
  id: string;
  class: string;
  title: string;
  description: string;
  dueDate: string;
  totalStudents: number;
  submitted: number;
  performance: { A: number; B: number; C: number; notSubmitted: number };
};

export function AssignmentManagement() {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const assignments: Assignment[] = [
    {
      id: "A001",
      class: "수학 심화반",
      title: "2차 함수 심화 문제",
      description: "교재 p.45-52 문제 풀이",
      dueDate: "2025-12-20",
      totalStudents: 15,
      submitted: 13,
      performance: { A: 8, B: 4, C: 1, notSubmitted: 2 },
    },
    {
      id: "A002",
      class: "영어 중급반",
      title: "독해 지문 분석",
      description: "Reading 10편 정독 및 요약",
      dueDate: "2025-12-19",
      totalStudents: 12,
      submitted: 10,
      performance: { A: 5, B: 4, C: 1, notSubmitted: 2 },
    },
    {
      id: "A003",
      class: "국어 기본반",
      title: "문학 작품 감상문",
      description: "지정 소설 읽고 감상문 작성",
      dueDate: "2025-12-22",
      totalStudents: 10,
      submitted: 10,
      performance: { A: 6, B: 3, C: 1, notSubmitted: 0 },
    },
    {
      id: "A004",
      class: "수학 심화반",
      title: "미적분 기초 연습",
      description: "극한과 미분 문제 50제",
      dueDate: "2025-12-25",
      totalStudents: 15,
      submitted: 5,
      performance: { A: 3, B: 2, C: 0, notSubmitted: 10 },
    },
  ];

  const studentPerformance = [
    { id: "S001", name: "김민준", performance: "A", submittedDate: "2025-12-18", feedback: "우수함" },
    { id: "S004", name: "최수아", performance: "A", submittedDate: "2025-12-17", feedback: "완벽함" },
    { id: "S007", name: "윤하은", performance: "B", submittedDate: "2025-12-19", feedback: "양호" },
    { id: "S012", name: "이준서", performance: "C", submittedDate: "2025-12-19", feedback: "보충 필요" },
    { id: "S015", name: "박서준", performance: null, submittedDate: null, feedback: null },
    { id: "S018", name: "정지우", performance: null, submittedDate: null, feedback: null },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">과제 관리</h2>
          <p className="text-muted-foreground text-sm">
            수업별 과제 등록 및 학생 수행도 평가
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          새 과제 등록
        </Button>
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => {
          const submissionRate =
            (assignment.submitted / assignment.totalStudents) * 100;
          const isOverdue = new Date(assignment.dueDate) < new Date();

          return (
            <Card
              key={assignment.id}
              className="cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {assignment.title}
                  {assignment.performance.notSubmitted > 0 && !isOverdue && (
                    <Badge variant="outline">
                      미제출 {assignment.performance.notSubmitted}명
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{assignment.class}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {assignment.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  마감: {assignment.dueDate}
                  {isOverdue && (
                    <Badge variant="destructive" className="ml-2">
                      마감됨
                    </Badge>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>제출률</span>
                    <span>
                      {assignment.submitted}/{assignment.totalStudents}명 (
                      {submissionRate.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={submissionRate} />
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <Badge className="justify-center">A {assignment.performance.A}</Badge>
                  <Badge variant="secondary" className="justify-center">
                    B {assignment.performance.B}
                  </Badge>
                  <Badge variant="outline" className="justify-center">
                    C {assignment.performance.C}
                  </Badge>
                  <Badge variant="destructive" className="justify-center">
                    미제출 {assignment.performance.notSubmitted}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Assignment Detail */}
      {selectedAssignment && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                {selectedAssignment.title} - 학생별 수행도
              </CardTitle>
              <CardDescription>
                {selectedAssignment.class}
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={() => setSelectedAssignment(null)}>
              닫기
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>학생 ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead className="text-center">제출 상태</TableHead>
                  <TableHead className="text-center">제출일</TableHead>
                  <TableHead className="text-center">수행도</TableHead>
                  <TableHead>피드백</TableHead>
                  <TableHead className="text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentPerformance.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-center">
                      {student.performance ? (
                        <Badge>
                          <CheckCircle className="mr-1 size-3" />
                          제출완료
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <AlertCircle className="mr-1 size-3" />
                          미제출
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.submittedDate ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.performance ? (
                        <Select defaultValue={student.performance}>
                          <SelectTrigger className="w-24 mx-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {student.performance ? (
                        <Input defaultValue={student.feedback ?? ""} />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="link" size="sm">
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">취소</Button>
              <Button>평가 저장</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            마감 임박 과제
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignments
            .filter((a) => new Date(a.dueDate) > new Date())
            .sort(
              (a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime(),
            )
            .slice(0, 3)
            .map((assignment) => {
              const daysLeft = Math.ceil(
                (new Date(assignment.dueDate).getTime() -
                  new Date().getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              return (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between rounded-lg border p-4 bg-muted/50"
                >
                  <div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {assignment.class} · D-{daysLeft}
                    </div>
                  </div>
                  <Badge variant="destructive">
                    미제출 {assignment.performance.notSubmitted}명
                  </Badge>
                </div>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
}
