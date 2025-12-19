"use client";

import { useState } from "react";
import {
  Users,
  Shield,
  FileText,
  DollarSign,
  Save,
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
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function SettingsPage() {
  const [tab, setTab] = useState("users");

  const users = [
    { id: "U001", name: "김원장", role: "MASTER_TEACHER", email: "master@academy.com", status: "활성" },
    { id: "U002", name: "이선생님", role: "TEACHER", email: "teacher1@academy.com", status: "활성" },
    { id: "U003", name: "박선생님", role: "TEACHER", email: "teacher2@academy.com", status: "활성" },
    { id: "U004", name: "조교 이민지", role: "SUB_TEACHER", email: "sub1@academy.com", status: "활성" },
  ];

  const permissions = [
    {
      role: "MASTER_TEACHER",
      label: "원장",
      permissions: {
        학생관리: "전체",
        수업관리: "전체",
        출결관리: "전체",
        과제관리: "전체",
        테스트관리: "전체",
        설정: "전체",
      },
    },
    {
      role: "TEACHER",
      label: "교사",
      permissions: {
        학생관리: "담당반만",
        수업관리: "담당반만",
        출결관리: "담당반만",
        과제관리: "담당반만",
        테스트관리: "담당반만",
        설정: "없음",
      },
    },
  ];

  const salaryRates = [
    { position: "정규 교사", type: "월급", monthly: 3500000, hourly: null },
    { position: "시간제 강사", type: "시급", hourly: 50000, monthly: null },
    { position: "조교 (경력)", type: "시급", hourly: 15000, monthly: null },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>설정</h2>
        <p className="text-muted-foreground mt-1">
          시스템 설정 및 권한 관리
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" /> 사용자
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="mr-2 h-4 w-4" /> 권한
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" /> 템플릿
          </TabsTrigger>
          <TabsTrigger value="salary">
            <DollarSign className="mr-2 h-4 w-4" /> 급여
          </TabsTrigger>
        </TabsList>

        {/* USERS */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>사용자 관리</CardTitle>
              <Button>사용자 추가</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>역할</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead className="text-center">상태</TableHead>
                    <TableHead className="text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.id}</TableCell>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{u.role}</Badge>
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-100 text-green-700">
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button size="sm" variant="link">수정</Button>
                        <Button size="sm" variant="link" className="text-red-600">
                          삭제
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERMISSIONS */}
        <TabsContent value="permissions">
          <div className="space-y-4">
            {permissions.map((p) => (
              <Card key={p.role}>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>
                    <Shield className="inline mr-2 h-4 w-4" />
                    {p.label}
                  </CardTitle>
                  <Button size="sm" variant="outline">수정</Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(p.permissions).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between rounded-md bg-muted p-3 text-sm"
                    >
                      <span>{k}</span>
                      <Badge variant="secondary">{v}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TEMPLATES */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>메시지 템플릿 편집</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="템플릿명" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="정기">정기</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                  <SelectItem value="행정">행정</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                rows={8}
                placeholder="템플릿 내용 (예: {학생명}, {반명})"
              />
              <div className="flex gap-2">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> 저장
                </Button>
                <Button variant="outline">취소</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SALARY */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>급여 단가 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {salaryRates.map((s) => (
                <div
                  key={s.position}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <div className="font-medium">{s.position}</div>
                    <Badge variant="secondary">{s.type}</Badge>
                  </div>
                  {s.hourly && (
                    <Input className="w-40 text-right" defaultValue={s.hourly} />
                  )}
                  {s.monthly && (
                    <Input className="w-40 text-right" defaultValue={s.monthly} />
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div>
                  <div className="font-medium">근무시간 승인 알림</div>
                  <div className="text-sm text-muted-foreground">
                    조교 근무시간 등록 시 알림
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  변경사항 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
