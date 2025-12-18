import { ArrowLeft, Phone, Mail, User, Calendar, BarChart3, FileText, Video, MessageSquare } from 'lucide-react';

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
    { date: '2025-12-17', status: '출석', class: '수학 심화반' },
    { date: '2025-12-16', status: '출석', class: '수학 심화반' },
    { date: '2025-12-14', status: '출석', class: '수학 심화반' },
    { date: '2025-12-13', status: '지각', class: '수학 심화반' },
    { date: '2025-12-10', status: '출석', class: '수학 심화반' },
  ];

  const assignments = [
    { subject: '수학', title: '2차 함수 심화 문제', performance: 'A', dueDate: '2025-12-15', status: '완료' },
    { subject: '수학', title: '미분 기초 연습', performance: 'B', dueDate: '2025-12-12', status: '완료' },
    { subject: '수학', title: '함수의 극한 문제', performance: 'A', dueDate: '2025-12-08', status: '완료' },
    { subject: '수학', title: '삼각함수 활용', performance: 'C', dueDate: '2025-12-05', status: '완료' },
  ];

  const testScores = [
    { name: '11월 모의고사', score: 92, date: '2025-11-28', avg: 87.5 },
    { name: '중간평가', score: 88, date: '2025-11-15', avg: 85.2 },
    { name: '단원평가 #3', score: 95, date: '2025-11-05', avg: 89.1 },
    { name: '단원평가 #2', score: 90, date: '2025-10-25', avg: 86.3 },
  ];

  const clinicSchedule = [
    { date: '2025-12-20', time: '19:00-20:00', topic: '함수 심화 보충', teacher: '김선생님' },
    { date: '2025-12-18', time: '18:00-19:00', topic: '오답 노트 리뷰', teacher: '김선생님' },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2>{student.name} 학생 상세 정보</h2>
          <p className="text-gray-600 mt-1">{student.school} {student.grade} · {student.class}</p>
        </div>
      </div>

      {/* Basic Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3>기본 정보</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">학생 ID:</span>
              <span>{student.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">학년:</span>
              <span>{student.grade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">재원 상태:</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{student.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">등록일:</span>
              <span>2025-03-02</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3>연락처 정보</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <div className="text-gray-600 mb-1">학생 연락처</div>
              <div>{student.phone}</div>
            </div>
            <div className="pt-2">
              <div className="text-gray-600 mb-1">학부모 연락처</div>
              <div>{student.parentPhone}</div>
            </div>
            <div className="pt-2">
              <div className="text-gray-600 mb-1">이메일</div>
              <div className="text-blue-600">minjun.kim@email.com</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3>학습 현황</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">출석률</span>
                <span>95.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95.8%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">과제 수행도</span>
                <span>A (우수)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <div className="pt-2 text-sm">
              <div className="text-gray-600">평균 성적</div>
              <div className="text-2xl text-blue-600 mt-1">91.3점</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance History */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            출결 이력
          </h3>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className={`w-3 h-3 rounded-full ${
                  record.status === '출석' ? 'bg-green-500' :
                  record.status === '지각' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm">{record.class}</div>
                  <div className="text-xs text-gray-500">{record.date}</div>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  record.status === '출석' ? 'bg-green-50 text-green-700' :
                  record.status === '지각' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            과제 수행도
          </h3>
          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <div className="text-sm">{assignment.title}</div>
                  <div className="text-xs text-gray-500">마감: {assignment.dueDate}</div>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  assignment.performance === 'A' ? 'bg-green-100 text-green-700' :
                  assignment.performance === 'B' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {assignment.performance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Scores Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          테스트 점수 추이
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">시험명</th>
                <th className="text-left py-3 px-4 text-gray-600">시행일</th>
                <th className="text-left py-3 px-4 text-gray-600">학생 점수</th>
                <th className="text-left py-3 px-4 text-gray-600">반 평균</th>
                <th className="text-left py-3 px-4 text-gray-600">차이</th>
              </tr>
            </thead>
            <tbody>
              {testScores.map((test, index) => {
                const diff = test.score - test.avg;
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{test.name}</td>
                    <td className="py-3 px-4 text-gray-600">{test.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                        {test.score}점
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{test.avg}점</td>
                    <td className="py-3 px-4">
                      <span className={diff > 0 ? 'text-green-600' : 'text-red-600'}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinic Schedule */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" />
          클리닉 / 보강 일정
        </h3>
        <div className="space-y-3">
          {clinicSchedule.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-blue-600">{schedule.date}</div>
                  <div className="text-xs text-gray-600">{schedule.time}</div>
                </div>
                <div>
                  <div className="text-sm">{schedule.topic}</div>
                  <div className="text-xs text-gray-600">담당: {schedule.teacher}</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                예약 확인
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Parent Communication */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            학부모 연락 내역
          </h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            새 메시지 발송
          </button>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm">주간 학습 리포트</span>
              <span className="text-xs text-gray-500">2025-12-16</span>
            </div>
            <p className="text-sm text-gray-600">이번 주 학습 내용과 성취도를 공유드립니다...</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm">테스트 결과 안내</span>
              <span className="text-xs text-gray-500">2025-12-10</span>
            </div>
            <p className="text-sm text-gray-600">11월 모의고사 결과가 좋습니다...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
