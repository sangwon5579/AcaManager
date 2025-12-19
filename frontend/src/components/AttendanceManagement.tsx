"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Video,
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type AttendanceStatus = "출석" | "결석" | "지각" | null;

type AttendanceRecord = {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  videoRequired: boolean;
  videoWatched: boolean;
};

export function AttendanceManagement() {
  const [selectedClass, setSelectedClass] = useState("수학 심화반");
  const [selectedDate, setSelectedDate] = useState("2025-12-18");

  const classes = ["수학 심화반", "영어 중급반", "국어 기본반", "영어 고급반"];

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { studentId: "S001", studentName: "김민준", status: "출석", videoRequired: false, videoWatched: false },
    { studentId: "S004", studentName: "최수아", status: "출석", videoRequired: false, videoWatched: false },
    { studentId: "S007", studentName: "윤하은", status: "지각", videoRequired: false, videoWatched: false },
    { studentId: "S012", studentName: "이준서", status: "결석", videoRequired: true, videoWatched: false },
    { studentId: "S015", studentName: "박서준", status: "출석", videoRequired: false, videoWatched: false },
    { studentId: "S018", studentName: "정지우", status: null, videoRequired: false, videoWatched: false },
    { studentId: "S021", studentName: "강민재", status: null, videoRequired: false, videoWatched: false },
  ]);

  const handleAttendanceChange = (studentId: string, status: Exclude<AttendanceStatus, null>) => {
    setAttendance((prev) =>
      prev.map((r) =>
        r.studentId === studentId
          ? {
              ...r,
              status,
              videoRequired: status === "결석",
              videoWatched: status === "결석" ? false : r.videoWatched,
            }
          : r,
      ),
    );
  };

  const handleVideoWatchedChange = (studentId: string, watched: boolean) => {
    setAttendance((prev) =>
      prev.map((r) =>
        r.studentId === studentId ? { ...r, videoWatched: watched } : r,
      ),
    );
  };

  const stats = {
    total: attendance.length,
    present: attendance.filter((r) => r.status === "출석").length,
    absent: attendance.filter((r) => r.status === "결석").length,
    late: attendance.filter((r) => r.status === "지각").length,
    pending: attendance.filter((r) => r.status === null).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">출결 관리</h2>
        <p className="text-muted-foreground text-sm">
          수업별 출결 체크 및 보강 영상 관리
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div>
            <label className="text-sm text-muted-foreground">수업 선택</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">날짜 선택</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">시간</label>
            <div className="mt-2 h-9 flex items-center rounded-md border px-3 text-sm">
              수 19:00-21:00
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent className="pt-6"><div className="text-sm">전체</div><div className="text-2xl">{stats.total}명</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-sm text-green-600">출석</div><div className="text-2xl text-green-600">{stats.present}명</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-sm text-red-600">결석</div><div className="text-2xl text-red-600">{stats.absent}명</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-sm text-yellow-600">지각</div><div className="text-2xl text-yellow-600">{stats.late}명</div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="text-sm">미체크</div><div className="text-2xl">{stats.pending}명</div></CardContent></Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>출결 체크</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>학생 ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead className="text-center">출결 상태</TableHead>
                <TableHead className="text-center">보강 영상</TableHead>
                <TableHead className="text-center">영상 시청</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((r) => (
                <TableRow key={r.studentId}>
                  <TableCell>{r.studentId}</TableCell>
                  <TableCell>{r.studentName}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant={r.status === "출석" ? "default" : "outline"}
                        onClick={() => handleAttendanceChange(r.studentId, "출석")}
                      >
                        <CheckCircle className="mr-1 size-4" /> 출석
                      </Button>
                      <Button
                        size="sm"
                        variant={r.status === "결석" ? "destructive" : "outline"}
                        onClick={() => handleAttendanceChange(r.studentId, "결석")}
                      >
                        <XCircle className="mr-1 size-4" /> 결석
                      </Button>
                      <Button
                        size="sm"
                        variant={r.status === "지각" ? "secondary" : "outline"}
                        onClick={() => handleAttendanceChange(r.studentId, "지각")}
                      >
                        <Clock className="mr-1 size-4" /> 지각
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {r.videoRequired ? (
                      <Badge variant="destructive">
                        <Video className="mr-1 size-3" /> 보강 대상
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {r.videoRequired ? (
                      <div className="flex justify-center items-center gap-2">
                        <Checkbox
                          checked={r.videoWatched}
                          onCheckedChange={(v) =>
                            handleVideoWatchedChange(r.studentId, !!v)
                          }
                        />
                        <span className="text-sm">
                          {r.videoWatched ? "시청 완료" : "미시청"}
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Save */}
      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <p className="text-sm">
            {stats.pending > 0 ? (
              <span className="text-yellow-600">
                ⚠️ 아직 {stats.pending}명의 출결이 체크되지 않았습니다
              </span>
            ) : (
              <span className="text-green-600">
                ✓ 모든 학생의 출결이 체크되었습니다
              </span>
            )}
          </p>
          <Button>저장하기</Button>
        </CardContent>
      </Card>

      {/* Video Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="size-5" /> 보강 영상 현황
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {attendance.filter((r) => r.videoRequired).map((r) => (
            <div
              key={r.studentId}
              className={`flex items-center justify-between rounded-lg border p-4 ${
                r.videoWatched ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                <div className="font-medium">
                  {r.studentName} ({r.studentId})
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedDate} · {selectedClass}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={r.videoWatched ? "default" : "destructive"}>
                  {r.videoWatched ? "시청 완료" : "미시청"}
                </Badge>
                <Button size="sm">영상 링크 발송</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            최근 출결 이력 ({selectedClass})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>날짜</TableHead>
                <TableHead className="text-center">출석</TableHead>
                <TableHead className="text-center">결석</TableHead>
                <TableHead className="text-center">지각</TableHead>
                <TableHead className="text-center">출석률</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "2025-12-16", present: 14, absent: 0, late: 1, rate: 93.3 },
                { date: "2025-12-13", present: 15, absent: 0, late: 0, rate: 100 },
                { date: "2025-12-11", present: 13, absent: 1, late: 1, rate: 86.7 },
                { date: "2025-12-09", present: 14, absent: 1, late: 0, rate: 93.3 },
              ].map((r) => (
                <TableRow key={r.date}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell className="text-center text-green-600">
                    {r.present}명
                  </TableCell>
                  <TableCell className="text-center text-red-600">
                    {r.absent}명
                  </TableCell>
                  <TableCell className="text-center text-yellow-600">
                    {r.late}명
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge>{r.rate}%</Badge>
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
