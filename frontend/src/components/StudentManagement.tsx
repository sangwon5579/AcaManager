import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Download, ChevronRight } from 'lucide-react';
import { StudentDetail } from './StudentDetail';

type Student = {
  id: string;
  name: string;
  school: string;
  grade: string;
  class: string;
  status: '재원' | '휴원' | '퇴원';
  recentAttendance: string;
  recentScore: number;
  phone: string;
  parentPhone: string;
};

export function StudentManagement() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('전체');
  const [filterStatus, setFilterStatus] = useState('전체');

  const students: Student[] = [
    { id: 'S001', name: '김민준', school: '대치고', grade: '고2', class: '수학 심화반', status: '재원', recentAttendance: '100%', recentScore: 92, phone: '010-1234-5678', parentPhone: '010-9876-5432' },
    { id: 'S002', name: '이서연', school: '개포고', grade: '고1', class: '영어 중급반', status: '재원', recentAttendance: '95%', recentScore: 88, phone: '010-2345-6789', parentPhone: '010-8765-4321' },
    { id: 'S003', name: '박지호', school: '대치고', grade: '고3', class: '국어 기본반', status: '재원', recentAttendance: '90%', recentScore: 85, phone: '010-3456-7890', parentPhone: '010-7654-3210' },
    { id: 'S004', name: '최수아', school: '세화고', grade: '고2', class: '수학 심화반', status: '재원', recentAttendance: '100%', recentScore: 95, phone: '010-4567-8901', parentPhone: '010-6543-2109' },
    { id: 'S005', name: '정우진', school: '대치고', grade: '고1', class: '영어 고급반', status: '재원', recentAttendance: '85%', recentScore: 78, phone: '010-5678-9012', parentPhone: '010-5432-1098' },
    { id: 'S006', name: '강민서', school: '단대부고', grade: '고3', class: '수학 최상반', status: '휴원', recentAttendance: '0%', recentScore: 0, phone: '010-6789-0123', parentPhone: '010-4321-0987' },
    { id: 'S007', name: '윤하은', school: '대치고', grade: '고2', class: '국어 심화반', status: '재원', recentAttendance: '100%', recentScore: 91, phone: '010-7890-1234', parentPhone: '010-3210-9876' },
    { id: 'S008', name: '임태양', school: '개포고', grade: '고1', class: '영어 중급반', status: '재원', recentAttendance: '95%', recentScore: 87, phone: '010-8901-2345', parentPhone: '010-2109-8765' },
  ];

  const classes = ['전체', '수학 심화반', '영어 중급반', '국어 기본반', '영어 고급반', '수학 최상반', '국어 심화반'];
  const statuses = ['전체', '재원', '휴원', '퇴원'];

  const filteredStudents = students.filter(student => {
    const matchSearch = student.name.includes(searchTerm) || student.school.includes(searchTerm);
    const matchClass = filterClass === '전체' || student.class === filterClass;
    const matchStatus = filterStatus === '전체' || student.status === filterStatus;
    return matchSearch && matchClass && matchStatus;
  });

  if (selectedStudent) {
    return <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2>학생 관리</h2>
          <p className="text-gray-600 mt-1">전체 {students.length}명 (재원 {students.filter(s => s.status === '재원').length}명)</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            학생 등록
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="학생명 또는 학교명 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600">학생 ID</th>
                <th className="text-left py-3 px-4 text-gray-600">이름</th>
                <th className="text-left py-3 px-4 text-gray-600">학교 / 학년</th>
                <th className="text-left py-3 px-4 text-gray-600">담당 반</th>
                <th className="text-left py-3 px-4 text-gray-600">재원 상태</th>
                <th className="text-left py-3 px-4 text-gray-600">최근 출결</th>
                <th className="text-left py-3 px-4 text-gray-600">최근 성취도</th>
                <th className="text-left py-3 px-4 text-gray-600">상세</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600">{student.id}</td>
                  <td className="py-3 px-4">
                    <div>{student.name}</div>
                    <div className="text-sm text-gray-500">{student.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{student.school}</div>
                    <div className="text-sm text-gray-500">{student.grade}</div>
                  </td>
                  <td className="py-3 px-4">{student.class}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      student.status === '재원' ? 'bg-green-100 text-green-700' :
                      student.status === '휴원' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: student.recentAttendance }}
                        />
                      </div>
                      <span className="text-sm">{student.recentAttendance}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {student.status === '재원' ? (
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        student.recentScore >= 90 ? 'bg-green-100 text-green-700' :
                        student.recentScore >= 80 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.recentScore}점
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1 text-blue-600"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">보기</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">재원생</div>
          <div className="text-2xl">{students.filter(s => s.status === '재원').length}명</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">휴원생</div>
          <div className="text-2xl text-yellow-600">{students.filter(s => s.status === '휴원').length}명</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">평균 출석률</div>
          <div className="text-2xl text-green-600">94.3%</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">평균 성취도</div>
          <div className="text-2xl text-blue-600">88.1점</div>
        </div>
      </div>
    </div>
  );
}
