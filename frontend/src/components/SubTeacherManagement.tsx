"use client";

import { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type WorkRecord = {
  id: string;
  subTeacher: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  task: string;
  status: "승인대기" | "승인완료" | "반려";
};

export function SubTeacherManagement() {
  const [workRecords, setWorkRecords] = useState<WorkRecord[]>([
    {
      id: "W001",
      subTeacher: "조교 이민지",
      date: "2025-12-17",
      startTime: "18:00",
      endTime: "22:00",
      hours: 4,
      task: "수학 심화반 보조",
      status: "승인대기",
    },
    {
      id: "W002",
      subTeacher: "조교 박준혁",
      date: "2025-12-17",
      startTime: "17:00",
      endTime: "21:00",
      hours: 4,
      task: "영어 중급반 보조",
      status: "승인대기",
    },
    {
      id: "W003",
      subTeacher: "조교 이민지",
      date: "2025-12-16",
      startTime: "18:00",
      endTime: "22:00",
      hours: 4,
      task: "수학 심화반 보조",
      status: "승인완료",
    },
  ]);

  const handleApprove = (id: string) => {
    setWorkRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "승인완료" } : r,
      ),
    );
  };

  const handleReject = (id: string) => {
    setWorkRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "반려" } : r,
      ),
    );
  };

  const pending = workRecords.filter((r) => r.status === "승인대기");
  const approved = workRecords.filter((r) => r.status === "승인완료");

  return (
    <div className="space-y-6">
      <div>
        <h2>조교 근무 / 급여 관리</h2>
        <p className="text-muted-foreground">
          조교 근무 시간 승인 및 급여 관리
        </p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            승인 대기 ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            승인 완료
          </TabsTrigger>
        </TabsList>

        {/* 승인 대기 */}
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              {pending.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  승인 대기 내역이 없습니다
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>조교</TableHead>
                      <TableHead className="text-center">
                        근무일
                      </TableHead>
                      <TableHead className="text-center">
                        시간
                      </TableHead>
                      <TableHead className="text-center">
                        근무시간
                      </TableHead>
                      <TableHead>업무</TableHead>
                      <TableHead className="text-center">
                        승인
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pending.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.id}</TableCell>
                        <TableCell>{r.subTeacher}</TableCell>
                        <TableCell className="text-center">
                          {r.date}
                        </TableCell>
                        <TableCell className="text-center">
                          {r.startTime} - {r.endTime}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge>{r.hours}시간</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {r.task}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleApprove(r.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleReject(r.id)}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 승인 완료 */}
        <TabsContent value="approved">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>조교</TableHead>
                    <TableHead className="text-center">
                      근무일
                    </TableHead>
                    <TableHead className="text-center">
                      시간
                    </TableHead>
                    <TableHead className="text-center">
                      근무시간
                    </TableHead>
                    <TableHead>업무</TableHead>
                    <TableHead className="text-center">
                      상태
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approved.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.subTeacher}</TableCell>
                      <TableCell className="text-center">
                        {r.date}
                      </TableCell>
                      <TableCell className="text-center">
                        {r.startTime} - {r.endTime}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge>{r.hours}시간</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.task}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-100 text-green-700">
                          승인완료
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 근무 입력 (조교용) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            근무 시간 입력
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="date" className="input" />
          <input
            type="text"
            placeholder="업무 내용"
            className="input"
          />
          <input type="time" className="input" />
          <input type="time" className="input" />
          <Button className="md:col-span-2">
            근무 시간 등록
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
