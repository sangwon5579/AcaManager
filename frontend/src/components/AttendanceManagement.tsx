import { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Video, Filter } from 'lucide-react';

type AttendanceRecord = {
  studentId: string;
  studentName: string;
  status: '출석' | '결석' | '지각' | null;
  videoRequired: boolean;
  videoWatched: boolean;
};

export function AttendanceManagement() {
  const [selectedClass, setSelectedClass] = useState('수학 심화반');
  const [selectedDate, setSelectedDate] = useState('2025-12-18');

  const classes = ['수학 심화반', '영어 중급반', '국어 기본반', '영어 고급반'];

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { studentId: 'S001', studentName: '김민준', status: '출석', videoRequired: false, videoWatched: false },
    { studentId: 'S004', studentName: '최수아', status: '출석', videoRequired: false, videoWatched: false },
    { studentId: 'S007', studentName: '윤하은', status: '지각', videoRequired: false, videoWatched: false },
    { studentId: 'S012', studentName: '이준서', status: '결석', videoRequired: true, videoWatched: false },
    { studentId: 'S015', studentName: '박서준', status: '출석', videoRequired: false, videoWatched: false },
    { studentId: 'S018', studentName: '정지우', status: null, videoRequired: false, videoWatched: false },
    { studentId: 'S021', studentName: '강민재', status: null, videoRequired: false, videoWatched: false },
  ]);

  const handleAttendanceChange = (studentId: string, status: '출석' | '결석' | '지각') => {
    setAttendance(prev => prev.map(record => {
      if (record.studentId === studentId) {
        return {
          ...record,
          status,
          videoRequired: status === '결석',
          videoWatched: status === '결석' ? false : record.videoWatched,
        };
      }
      return record;
    }));
  };

  const handleVideoWatchedChange = (studentId: string, watched: boolean) => {
    setAttendance(prev => prev.map(record =>
      record.studentId === studentId ? { ...record, videoWatched: watched } : record
    ));
  };

  const stats = {
    total: attendance.length,
    present: attendance.filter(r => r.status === '출석').length,
    absent: attendance.filter(r => r.status === '결석').length,
    late: attendance.filter(r => r.status === '지각').length,
    pending: attendance.filter(r => r.status === null).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>출결 관리</h2>
        <p className="text-gray-600 mt-1">수업별 출결 체크 및 보강 영상 관리</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">수업 선택</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">날짜 선택</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">시간</label>
            <div className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
              수 19:00-21:00
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">전체</div>
          <div className="text-2xl">{stats.total}명</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-600 mb-1">출석</div>
          <div className="text-2xl text-green-600">{stats.present}명</div>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <div className="text-sm text-red-600 mb-1">결석</div>
          <div className="text-2xl text-red-600">{stats.absent}명</div>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-4">
          <div className="text-sm text-yellow-600 mb-1">지각</div>
          <div className="text-2xl text-yellow-600">{stats.late}명</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">미체크</div>
          <div className="text-2xl text-gray-600">{stats.pending}명</div>
        </div>
      </div>

      {/* Attendance Check Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3>출결 체크</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600">학생 ID</th>
                <th className="text-left py-3 px-4 text-gray-600">이름</th>
                <th className="text-center py-3 px-4 text-gray-600">출결 상태</th>
                <th className="text-center py-3 px-4 text-gray-600">보강 영상</th>
                <th className="text-center py-3 px-4 text-gray-600">영상 시청</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">{record.studentId}</td>
                  <td className="py-4 px-4">{record.studentName}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAttendanceChange(record.studentId, '출석')}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                          record.status === '출석'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        출석
                      </button>
                      <button
                        onClick={() => handleAttendanceChange(record.studentId, '결석')}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                          record.status === '결석'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        결석
                      </button>
                      <button
                        onClick={() => handleAttendanceChange(record.studentId, '지각')}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                          record.status === '지각'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        지각
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {record.videoRequired ? (
                      <div className="flex items-center justify-center">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          보강 대상
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {record.videoRequired ? (
                      <div className="flex items-center justify-center">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={record.videoWatched}
                            onChange={(e) => handleVideoWatchedChange(record.studentId, e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm">
                            {record.videoWatched ? '시청 완료' : '미시청'}
                          </span>
                        </label>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-600">
          {stats.pending > 0 ? (
            <span className="text-yellow-600">⚠️ 아직 {stats.pending}명의 출결이 체크되지 않았습니다</span>
          ) : (
            <span className="text-green-600">✓ 모든 학생의 출결이 체크되었습니다</span>
          )}
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          저장하기
        </button>
      </div>

      {/* Video Makeup Schedule */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" />
          보강 영상 현황
        </h3>
        <div className="space-y-3">
          {attendance.filter(r => r.videoRequired).map((record) => (
            <div
              key={record.studentId}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                record.videoWatched
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span>{record.studentName}</span>
                  <span className="text-sm text-gray-600">({record.studentId})</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedDate} {selectedClass}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {record.videoWatched ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    ✓ 시청 완료
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    미시청
                  </span>
                )}
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  영상 링크 발송
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attendance History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          최근 출결 이력 ({selectedClass})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600">날짜</th>
                <th className="text-center py-3 px-4 text-gray-600">출석</th>
                <th className="text-center py-3 px-4 text-gray-600">결석</th>
                <th className="text-center py-3 px-4 text-gray-600">지각</th>
                <th className="text-center py-3 px-4 text-gray-600">출석률</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-12-16', present: 14, absent: 0, late: 1, rate: 93.3 },
                { date: '2025-12-13', present: 15, absent: 0, late: 0, rate: 100 },
                { date: '2025-12-11', present: 13, absent: 1, late: 1, rate: 86.7 },
                { date: '2025-12-09', present: 14, absent: 1, late: 0, rate: 93.3 },
              ].map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{record.date}</td>
                  <td className="py-3 px-4 text-center text-green-600">{record.present}명</td>
                  <td className="py-3 px-4 text-center text-red-600">{record.absent}명</td>
                  <td className="py-3 px-4 text-center text-yellow-600">{record.late}명</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      record.rate >= 95 ? 'bg-green-100 text-green-700' :
                      record.rate >= 85 ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
