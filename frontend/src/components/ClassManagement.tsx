import { useState } from 'react';
import { Plus, Users, Calendar, MapPin, Edit, Eye, Clock } from 'lucide-react';

type Class = {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  schedule: string[];
  room: string;
  studentCount: number;
  maxStudents: number;
  status: '진행중' | '마감' | '준비중';
};

export function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const classes: Class[] = [
    {
      id: 'C001',
      name: '수학 심화반',
      subject: '수학',
      teacher: '김선생님',
      schedule: ['월 19:00-21:00', '수 19:00-21:00', '금 19:00-21:00'],
      room: '301호',
      studentCount: 15,
      maxStudents: 15,
      status: '마감',
    },
    {
      id: 'C002',
      name: '영어 중급반',
      subject: '영어',
      teacher: '이선생님',
      schedule: ['화 18:00-20:00', '목 18:00-20:00'],
      room: '201호',
      studentCount: 12,
      maxStudents: 15,
      status: '진행중',
    },
    {
      id: 'C003',
      name: '국어 기본반',
      subject: '국어',
      teacher: '박선생님',
      schedule: ['월 17:00-19:00', '목 17:00-19:00'],
      room: '202호',
      studentCount: 10,
      maxStudents: 12,
      status: '진행중',
    },
    {
      id: 'C004',
      name: '영어 고급반',
      subject: '영어',
      teacher: '이선생님',
      schedule: ['화 20:00-22:00', '목 20:00-22:00'],
      room: '201호',
      studentCount: 8,
      maxStudents: 10,
      status: '진행중',
    },
    {
      id: 'C005',
      name: '수학 최상반',
      subject: '수학',
      teacher: '정선생님',
      schedule: ['수 20:00-22:00', '토 14:00-17:00'],
      room: '302호',
      studentCount: 0,
      maxStudents: 12,
      status: '준비중',
    },
  ];

  const classStudents = [
    { id: 'S001', name: '김민준', school: '대치고', grade: '고2', attendance: '100%', avgScore: 92 },
    { id: 'S004', name: '최수아', school: '세화고', grade: '고2', attendance: '100%', avgScore: 95 },
    { id: 'S007', name: '윤하은', school: '대치고', grade: '고2', attendance: '100%', avgScore: 91 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>수업 / 반 관리</h2>
          <p className="text-gray-600 mt-1">전체 {classes.length}개 반 운영 중</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          신규 반 개설
        </button>
      </div>

      {/* Class List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="mb-1">{cls.name}</h3>
                <p className="text-sm text-gray-600">{cls.subject}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                cls.status === '마감' ? 'bg-red-100 text-red-700' :
                cls.status === '진행중' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {cls.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>담당: {cls.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{cls.room}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 mt-0.5" />
                <div className="flex-1">
                  {cls.schedule.map((time, idx) => (
                    <div key={idx}>{time}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">수강 인원</span>
                <span>{cls.studentCount} / {cls.maxStudents}명</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    cls.studentCount >= cls.maxStudents ? 'bg-red-600' : 'bg-blue-600'
                  }`}
                  style={{ width: `${(cls.studentCount / cls.maxStudents) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedClass(cls)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Eye className="w-4 h-4" />
                상세보기
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Class Detail */}
      {selectedClass && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>{selectedClass.name} - 학생 구성</h3>
            <button
              onClick={() => setSelectedClass(null)}
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
                  <th className="text-left py-3 px-4 text-gray-600">학교 / 학년</th>
                  <th className="text-left py-3 px-4 text-gray-600">출석률</th>
                  <th className="text-left py-3 px-4 text-gray-600">평균 점수</th>
                  <th className="text-left py-3 px-4 text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">
                      <div>{student.school}</div>
                      <div className="text-sm text-gray-500">{student.grade}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: student.attendance }}
                          />
                        </div>
                        <span className="text-sm">{student.attendance}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {student.avgScore}점
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:underline text-sm">
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Weekly Schedule Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          주간 수업 시간표
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 bg-gray-50">시간</th>
                <th className="text-center py-3 px-4 text-gray-600 bg-gray-50">월</th>
                <th className="text-center py-3 px-4 text-gray-600 bg-gray-50">화</th>
                <th className="text-center py-3 px-4 text-gray-600 bg-gray-50">수</th>
                <th className="text-center py-3 px-4 text-gray-600 bg-gray-50">목</th>
                <th className="text-center py-3 px-4 text-gray-600 bg-gray-50">금</th>
                <th className="text-center py-3 px-4 text-gray-600 bg-gray-50">토</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">17:00-19:00</td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-blue-50 p-2 rounded border border-blue-200">
                    <div className="text-sm">국어 기본반</div>
                    <div className="text-xs text-gray-600">202호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-blue-50 p-2 rounded border border-blue-200">
                    <div className="text-sm">국어 기본반</div>
                    <div className="text-xs text-gray-600">202호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">18:00-20:00</td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-green-50 p-2 rounded border border-green-200">
                    <div className="text-sm">영어 중급반</div>
                    <div className="text-xs text-gray-600">201호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-green-50 p-2 rounded border border-green-200">
                    <div className="text-sm">영어 중급반</div>
                    <div className="text-xs text-gray-600">201호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">19:00-21:00</td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-purple-50 p-2 rounded border border-purple-200">
                    <div className="text-sm">수학 심화반</div>
                    <div className="text-xs text-gray-600">301호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-purple-50 p-2 rounded border border-purple-200">
                    <div className="text-sm">수학 심화반</div>
                    <div className="text-xs text-gray-600">301호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-purple-50 p-2 rounded border border-purple-200">
                    <div className="text-sm">수학 심화반</div>
                    <div className="text-xs text-gray-600">301호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-600">20:00-22:00</td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-green-50 p-2 rounded border border-green-200">
                    <div className="text-sm">영어 고급반</div>
                    <div className="text-xs text-gray-600">201호</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-purple-50 p-2 rounded border border-purple-200">
                    <div className="text-sm">수학 최상반</div>
                    <div className="text-xs text-gray-600">302호</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="bg-green-50 p-2 rounded border border-green-200">
                    <div className="text-sm">영어 고급반</div>
                    <div className="text-xs text-gray-600">201호</div>
                  </div>
                </td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
