import { useState } from 'react';
import { Plus, FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

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
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const assignments: Assignment[] = [
    {
      id: 'A001',
      class: '수학 심화반',
      title: '2차 함수 심화 문제',
      description: '교재 p.45-52 문제 풀이',
      dueDate: '2025-12-20',
      totalStudents: 15,
      submitted: 13,
      performance: { A: 8, B: 4, C: 1, notSubmitted: 2 },
    },
    {
      id: 'A002',
      class: '영어 중급반',
      title: '독해 지문 분석',
      description: 'Reading 10편 정독 및 요약',
      dueDate: '2025-12-19',
      totalStudents: 12,
      submitted: 10,
      performance: { A: 5, B: 4, C: 1, notSubmitted: 2 },
    },
    {
      id: 'A003',
      class: '국어 기본반',
      title: '문학 작품 감상문',
      description: '지정 소설 읽고 감상문 작성',
      dueDate: '2025-12-22',
      totalStudents: 10,
      submitted: 10,
      performance: { A: 6, B: 3, C: 1, notSubmitted: 0 },
    },
    {
      id: 'A004',
      class: '수학 심화반',
      title: '미적분 기초 연습',
      description: '극한과 미분 문제 50제',
      dueDate: '2025-12-25',
      totalStudents: 15,
      submitted: 5,
      performance: { A: 3, B: 2, C: 0, notSubmitted: 10 },
    },
  ];

  const studentPerformance = [
    { id: 'S001', name: '김민준', performance: 'A', submittedDate: '2025-12-18', feedback: '우수함' },
    { id: 'S004', name: '최수아', performance: 'A', submittedDate: '2025-12-17', feedback: '완벽함' },
    { id: 'S007', name: '윤하은', performance: 'B', submittedDate: '2025-12-19', feedback: '양호' },
    { id: 'S012', name: '이준서', performance: 'C', submittedDate: '2025-12-19', feedback: '보충 필요' },
    { id: 'S015', name: '박서준', performance: null, submittedDate: null, feedback: null },
    { id: 'S018', name: '정지우', performance: null, submittedDate: null, feedback: null },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>과제 관리</h2>
          <p className="text-gray-600 mt-1">수업별 과제 등록 및 학생 수행도 평가</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          새 과제 등록
        </button>
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => {
          const submissionRate = (assignment.submitted / assignment.totalStudents) * 100;
          const isOverdue = new Date(assignment.dueDate) < new Date();

          return (
            <div
              key={assignment.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{assignment.title}</h3>
                    {assignment.performance.notSubmitted > 0 && !isOverdue && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                        미제출 {assignment.performance.notSubmitted}명
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{assignment.class}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Calendar className="w-4 h-4" />
                <span>마감: {assignment.dueDate}</span>
                {isOverdue && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs ml-2">
                    마감됨
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">제출률</span>
                  <span>{assignment.submitted} / {assignment.totalStudents}명 ({submissionRate.toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      submissionRate >= 80 ? 'bg-green-600' :
                      submissionRate >= 50 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${submissionRate}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-xs text-green-600">A (우수)</div>
                  <div className="text-lg text-green-700">{assignment.performance.A}</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-xs text-blue-600">B (양호)</div>
                  <div className="text-lg text-blue-700">{assignment.performance.B}</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <div className="text-xs text-yellow-600">C (보통)</div>
                  <div className="text-lg text-yellow-700">{assignment.performance.C}</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="text-xs text-red-600">미제출</div>
                  <div className="text-lg text-red-700">{assignment.performance.notSubmitted}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignment Detail */}
      {selectedAssignment && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>{selectedAssignment.title} - 학생별 수행도</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedAssignment.class}</p>
            </div>
            <button
              onClick={() => setSelectedAssignment(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              닫기
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">학생 ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">이름</th>
                  <th className="text-center py-3 px-4 text-gray-600">제출 상태</th>
                  <th className="text-center py-3 px-4 text-gray-600">제출일</th>
                  <th className="text-center py-3 px-4 text-gray-600">수행도 평가</th>
                  <th className="text-left py-3 px-4 text-gray-600">피드백</th>
                  <th className="text-center py-3 px-4 text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {studentPerformance.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      {student.performance ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center justify-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          제출완료
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center justify-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          미제출
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {student.submittedDate || '-'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {student.performance ? (
                        <select
                          defaultValue={student.performance}
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="A">A (우수)</option>
                          <option value="B">B (양호)</option>
                          <option value="C">C (보통)</option>
                        </select>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {student.performance ? (
                        <input
                          type="text"
                          defaultValue={student.feedback || ''}
                          placeholder="피드백 입력"
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:underline text-sm">
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              취소
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              평가 저장
            </button>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 과제</div>
          <div className="text-2xl">{assignments.length}건</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-600 mb-1">평균 제출률</div>
          <div className="text-2xl text-green-600">
            {(
              (assignments.reduce((sum, a) => sum + a.submitted, 0) /
                assignments.reduce((sum, a) => sum + a.totalStudents, 0)) *
              100
            ).toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <div className="text-sm text-red-600 mb-1">미제출 학생</div>
          <div className="text-2xl text-red-600">
            {assignments.reduce((sum, a) => sum + a.performance.notSubmitted, 0)}명
          </div>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-600 mb-1">A 평가 비율</div>
          <div className="text-2xl text-blue-600">
            {(
              (assignments.reduce((sum, a) => sum + a.performance.A, 0) /
                assignments.reduce((sum, a) => sum + a.submitted, 0)) *
              100
            ).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          마감 임박 과제
        </h3>
        <div className="space-y-3">
          {assignments
            .filter(a => new Date(a.dueDate) > new Date())
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 3)
            .map((assignment) => {
              const daysLeft = Math.ceil(
                (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span>{assignment.title}</span>
                      <span className="text-sm text-gray-600">({assignment.class})</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      마감: {assignment.dueDate} (D-{daysLeft})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">미제출</div>
                    <div className="text-xl text-red-600">{assignment.performance.notSubmitted}명</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
