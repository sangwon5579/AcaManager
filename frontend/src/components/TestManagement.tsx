"use client";

import { useState } from "react";
import {
  Plus,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Award,
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

type Test = {
  id: string;
  class: string;
  name: string;
  date: string;
  totalStudents: number;
  completedScores: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  distribution: { range: string; count: number }[];
};

export function TestManagement() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const tests: Test[] = [
    {
      id: "T001",
      class: "수학 심화반",
      name: "11월 모의고사",
      date: "2025-11-28",
      totalStudents: 15,
      completedScores: 15,
      averageScore: 87.5,
      highestScore: 98,
      lowestScore: 72,
      distribution: [
        { range: "90-100", count: 8 },
        { range: "80-89", count: 5 },
        { range: "70-79", count: 2 },
        { range: "60-69", count: 0 },
      ],
    },
    {
      id: "T002",
      class: "영어 중급반",
      name: "단어 테스트 Week 12",
      date: "2025-12-14",
      totalStudents: 12,
      completedScores: 10,
      averageScore: 92.3,
      highestScore: 100,
      lowestScore: 85,
      distribution: [
        { range: "90-100", count: 8 },
        { range: "80-89", count: 2 },
        { range: "70-79", count: 0 },
        { range: "60-69", count: 0 },
      ],
    },
  ];

  const studentScores = [
    { id: "S001", name: "김민준", score: 92, trend: +5, rank: 3 },
    { id: "S004", name: "최수아", score: 98, trend: +3, rank: 1 },
    { id: "S007", name: "윤하은", score: 90, trend: -2, rank: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>테스트 관리</h2>
          <p className="text-muted-foreground">
            수업별 테스트 및 성적 관리
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          새 테스트 등록
        </Button>
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tests.map((test) => {
          const progress =
            (test.completedScores / test.totalStudents) * 100;
          const done =
            test.completedScores === test.totalStudents;

          return (
            <Card
              key={test.id}
              className="cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedTest(test)}
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{test.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {test.class}
                  </p>
                </div>
                <Badge
                  variant={done ? "default" : "secondary"}
                >
                  {done ? "완료" : "진행중"}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {test.completedScores > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <Stat label="평균" value={test.averageScore.toFixed(1)} />
                      <Stat label="최고" value={test.highestScore} />
                      <Stat label="최저" value={test.lowestScore} />
                    </div>

                    {!done && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            성적 입력
                          </span>
                          <span>
                            {test.completedScores}/{test.totalStudents}
                          </span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    아직 성적이 입력되지 않았습니다
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail */}
      {selectedTest && selectedTest.completedScores > 0 && (
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>{selectedTest.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedTest.class} · {selectedTest.date}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setSelectedTest(null)}
            >
              닫기
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Distribution */}
            <div>
              <h4 className="text-sm mb-3 text-muted-foreground">
                점수 분포
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {selectedTest.distribution.map((d, i) => {
                  const max = Math.max(
                    ...selectedTest.distribution.map(
                      (x) => x.count,
                    ),
                  );
                  const h =
                    max === 0 ? 0 : (d.count / max) * 100;

                  return (
                    <div key={i} className="text-center">
                      <div className="h-32 flex items-end">
                        <div
                          className="w-full bg-primary rounded-t text-xs text-white"
                          style={{ height: `${h}%` }}
                        >
                          {d.count}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {d.range}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>순위</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead className="text-center">
                    점수
                  </TableHead>
                  <TableHead className="text-center">
                    추이
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentScores.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="flex items-center gap-2">
                      {s.rank <= 3 && (
                        <Award
                          className={`h-4 w-4 ${
                            s.rank === 1
                              ? "text-yellow-500"
                              : s.rank === 2
                              ? "text-gray-400"
                              : "text-orange-600"
                          }`}
                        />
                      )}
                      {s.rank}위
                    </TableCell>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge>{s.score}점</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div
                        className={`flex items-center justify-center gap-1 ${
                          s.trend > 0
                            ? "text-green-600"
                            : s.trend < 0
                            ? "text-red-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {s.trend > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {s.trend}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5" />
                학습 리포트 자동 연동
              </div>
              <Button>학부모 리포트 발송</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center p-3 rounded-lg bg-muted">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
