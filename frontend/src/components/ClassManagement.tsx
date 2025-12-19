"use client";

import { useState } from "react";
import {
  Plus,
  Users,
  Calendar,
  MapPin,
  Edit,
  Eye,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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

type Class = {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  schedule: string[];
  room: string;
  studentCount: number;
  maxStudents: number;
  status: "진행중" | "마감" | "준비중";
};

export function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const classes: Class[] = [
    {
      id: "C001",
      name: "수학 심화반",
      subject: "수학",
      teacher: "김선생님",
      schedule: ["월 19:00-21:00", "수 19:00-21:00", "금 19:00-21:00"],
      room: "301호",
      studentCount: 15,
      maxStudents: 15,
      status: "마감",
    },
    {
      id: "C002",
      name: "영어 중급반",
      subject: "영어",
      teacher: "이선생님",
      schedule: ["화 18:00-20:00", "목 18:00-20:00"],
      room: "201호",
      studentCount: 12,
      maxStudents: 15,
      status: "진행중",
    },
    {
      id: "C003",
      name: "국어 기본반",
      subject: "국어",
      teacher: "박선생님",
      schedule: ["월 17:00-19:00", "목 17:00-19:00"],
      room: "202호",
      studentCount: 10,
      maxStudents: 12,
      status: "진행중",
    },
  ];

  const classStudents = [
    {
      id: "S001",
      name: "김민준",
      school: "대치고",
      grade: "고2",
      attendance: 100,
      avgScore: 92,
    },
    {
      id: "S004",
      name: "최수아",
      school: "세화고",
      grade: "고2",
      attendance: 100,
      avgScore: 95,
    },
    {
      id: "S007",
      name: "윤하은",
      school: "대치고",
      grade: "고2",
      attendance: 100,
      avgScore: 91,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">수업 / 반 관리</h2>
          <p className="text-sm text-muted-foreground">
            전체 {classes.length}개 반 운영 중
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          신규 반 개설
        </Button>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => {
          const rate = (cls.studentCount / cls.maxStudents) * 100;

          return (
            <Card key={cls.id} className="hover:shadow-md transition">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">{cls.name}</CardTitle>
                  <CardDescription>{cls.subject}</CardDescription>
                </div>
                <Badge
                  variant={
                    cls.status === "마감"
                      ? "destructive"
                      : cls.status === "진행중"
                      ? "default"
                      : "secondary"
                  }
                >
                  {cls.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    담당: {cls.teacher}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    {cls.room}
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="size-4 mt-0.5" />
                    <div>
                      {cls.schedule.map((t, i) => (
                        <div key={i}>{t}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>수강 인원</span>
                    <span>
                      {cls.studentCount}/{cls.maxStudents}명
                    </span>
                  </div>
                  <Progress value={rate} />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedClass(cls)}
                  >
                    <Eye className="mr-2 size-4" />
                    상세보기
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Class Detail */}
      {selectedClass && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedClass.name} 학생 구성</CardTitle>
              <CardDescription>{selectedClass.teacher}</CardDescription>
            </div>
            <Button variant="ghost" onClick={() => setSelectedClass(null)}>
              닫기
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>학생 ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>학교 / 학년</TableHead>
                  <TableHead>출석률</TableHead>
                  <TableHead>평균 점수</TableHead>
                  <TableHead>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>
                      <div>{s.school}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.grade}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={s.attendance} className="w-20" />
                        <span className="text-sm">{s.attendance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{s.avgScore}점</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            주간 수업 시간표
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시간</TableHead>
                <TableHead className="text-center">월</TableHead>
                <TableHead className="text-center">화</TableHead>
                <TableHead className="text-center">수</TableHead>
                <TableHead className="text-center">목</TableHead>
                <TableHead className="text-center">금</TableHead>
                <TableHead className="text-center">토</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>19:00-21:00</TableCell>
                <TableCell className="text-center">
                  <Badge>수학 심화반</Badge>
                </TableCell>
                <TableCell />
                <TableCell className="text-center">
                  <Badge>수학 심화반</Badge>
                </TableCell>
                <TableCell />
                <TableCell className="text-center">
                  <Badge>수학 심화반</Badge>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
