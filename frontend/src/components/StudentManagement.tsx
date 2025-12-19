"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Download,
} from "lucide-react";

import { StudentDetail } from "./StudentDetail";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

type Student = {
  id: string;
  name: string;
  school: string;
  grade: string;
  class: string;
  status: "재원" | "휴원" | "퇴원";
  recentAttendance: string;
  recentScore: number;
  phone: string;
  parentPhone: string;
};

export function StudentManagement() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");

  const students: Student[] = [
    {
      id: "S001",
      name: "김민준",
      school: "대치고",
      grade: "고2",
      class: "수학 심화반",
      status: "재원",
      recentAttendance: "100%",
      recentScore: 92,
      phone: "010-1234-5678",
      parentPhone: "010-9876-5432",
    },
    {
      id: "S002",
      name: "이서연",
      school: "개포고",
      grade: "고1",
      class: "영어 중급반",
      status: "재원",
      recentAttendance: "95%",
      recentScore: 88,
      phone: "010-2345-6789",
      parentPhone: "010-8765-4321",
    },
    {
      id: "S006",
      name: "강민서",
      school: "단대부고",
      grade: "고3",
      class: "수학 최상반",
      status: "휴원",
      recentAttendance: "0%",
      recentScore: 0,
      phone: "010-6789-0123",
      parentPhone: "010-4321-0987",
    },
  ];

  const classes = [
    "전체",
    "수학 심화반",
    "영어 중급반",
    "국어 기본반",
    "영어 고급반",
    "수학 최상반",
  ];
  const statuses = ["전체", "재원", "휴원", "퇴원"];

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.includes(searchTerm) || s.school.includes(searchTerm);
    const matchClass = filterClass === "전체" || s.class === filterClass;
    const matchStatus = filterStatus === "전체" || s.status === filterStatus;
    return matchSearch && matchClass && matchStatus;
  });

  if (selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>학생 관리</h2>
          <p className="text-muted-foreground">
            전체 {students.length}명 · 재원{" "}
            {students.filter((s) => s.status === "재원").length}명
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            엑셀 다운로드
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            학생 등록
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="학생명 또는 학교명 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />

            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>학생 ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>학교 / 학년</TableHead>
                <TableHead>담당 반</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>출석률</TableHead>
                <TableHead>성취도</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-muted-foreground">
                    {s.id}
                  </TableCell>
                  <TableCell>
                    <div>{s.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {s.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{s.school}</div>
                    <div className="text-xs text-muted-foreground">
                      {s.grade}
                    </div>
                  </TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        s.status === "재원"
                          ? "bg-green-100 text-green-700"
                          : s.status === "휴원"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {s.status === "재원" ? (
                      <div className="flex items-center gap-2">
                        <Progress
                          value={parseInt(s.recentAttendance)}
                          className="w-20"
                        />
                        <span className="text-xs">
                          {s.recentAttendance}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {s.status === "재원" ? (
                      <Badge
                        className={
                          s.recentScore >= 90
                            ? "bg-green-100 text-green-700"
                            : s.recentScore >= 80
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {s.recentScore}점
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudent(s)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">재원생</div>
            <div className="text-2xl">
              {students.filter((s) => s.status === "재원").length}명
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">휴원생</div>
            <div className="text-2xl text-yellow-600">
              {students.filter((s) => s.status === "휴원").length}명
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">평균 출석률</div>
            <div className="text-2xl text-green-600">94.3%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">평균 성취도</div>
            <div className="text-2xl text-blue-600">88.1점</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
