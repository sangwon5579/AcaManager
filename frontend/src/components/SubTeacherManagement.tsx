import { useState } from 'react';
import { Clock, DollarSign, CheckCircle, XCircle, Calendar } from 'lucide-react';

type WorkRecord = {
  id: string;
  subTeacher: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  task: string;
  status: '승인대기' | '승인완료' | '반려';
};

export function SubTeacherManagement() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'salary'>('pending');

  const [workRecords, setWorkRecords] = useState<WorkRecord[]>([
    { id: 'W001', subTeacher: '조교 이민지', date: '2025-12-17', startTime: '18:00', endTime: '22:00', hours: 4, task: '수학 심화반 보조', status: '승인대기' },
    { id: 'W002', subTeacher: '조교 박준혁', date: '2025-12-17', startTime: '17:00', endTime: '21:00', hours: 4, task: '영어 중급반 보조', status: '승인대기' },
    { id: 'W003', subTeacher: '조교 이민지', date: '2025-12-16', startTime: '18:00', endTime: '22:00', hours: 4, task: '수학 심화반 보조', status: '승인완료' },
    { id: 'W004', subTeacher: '조교 박준혁', date: '2025-12-15', startTime: '17:00', endTime: '20:00', hours: 3, task: '시험 감독', status: '승인완료' },
    { id: 'W005', subTeacher: '조교 김서연', date: '2025-12-14', startTime: '14:00', endTime: '18:00', hours: 4, task: '프린트 정리', status: '승인완료' },
  ]);

  const monthlySalary = [
    { subTeacher: '조교 이민지', totalHours: 80, hourlyRate: 15000, totalPay: 1200000, status: '미지급' },
    { subTeacher: '조교 박준혁', totalHours: 72, hourlyRate: 15000, totalPay: 1080000, status: '미지급' },
    { subTeacher: '조교 김서연', totalHours: 60, hourlyRate: 12000, totalPay: 720000, status: '지급완료' },
  ];

  const handleApprove = (id: string) => {
    setWorkRecords(prev => prev.map(record =>
      record.id === id ? { ...record, status: '승인완료' as const } : record
    ));
  };

  const handleReject = (id: string) => {
    setWorkRecords(prev => prev.map(record =>
      record.id === id ? { ...record, status: '반려' as const } : record
    ));
  };

  const pendingRecords = workRecords.filter(r => r.status === '승인대기');
  const approvedRecords = workRecords.filter(r => r.status === '승인완료');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>조교 근무 / 급여 관리</h2>
        <p className="text-gray-600 mt-1">조교 근무 시간 승인 및 급여 계산</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">승인 대기</div>
          <div className="text-2xl text-yellow-600">{pendingRecords.length}건</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-600 mb-1">이번 달 승인</div>
          <div className="text-2xl text-green-600">{approvedRecords.length}건</div>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-600 mb-1">총 근무 시간</div>
          <div className="text-2xl text-blue-600">
            {monthlySalary.reduce((sum, s) => sum + s.totalHours, 0)}시간
          </div>
        </div>
        <div className="bg-white rounded-lg border border-purple-200 p-4">
          <div className="text-sm text-purple-600 mb-1">이번 달 급여</div>
          <div className="text-2xl text-purple-600">
            {(monthlySalary.reduce((sum, s) => sum + s.totalPay, 0) / 10000).toFixed(0)}만원
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'pending'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          승인 대기 ({pendingRecords.length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'approved'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          승인 완료
        </button>
        <button
          onClick={() => setActiveTab('salary')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'salary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          급여 관리
        </button>
      </div>

      {/* Pending Tab */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-lg border border-gray-200">
          {pendingRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600">근무 ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">조교</th>
                    <th className="text-center py-3 px-4 text-gray-600">근무일</th>
                    <th className="text-center py-3 px-4 text-gray-600">시간</th>
                    <th className="text-center py-3 px-4 text-gray-600">근무 시간</th>
                    <th className="text-left py-3 px-4 text-gray-600">업무 내용</th>
                    <th className="text-center py-3 px-4 text-gray-600">승인</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{record.id}</td>
                      <td className="py-3 px-4">{record.subTeacher}</td>
                      <td className="py-3 px-4 text-center">{record.date}</td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {record.startTime} - {record.endTime}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {record.hours}시간
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.task}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApprove(record.id)}
                            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg"
                            title="승인"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleReject(record.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                            title="반려"
                          >
                            <XCircle className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              승인 대기 중인 근무 기록이 없습니다
            </div>
          )}
        </div>
      )}

      {/* Approved Tab */}
      {activeTab === 'approved' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">근무 ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">조교</th>
                  <th className="text-center py-3 px-4 text-gray-600">근무일</th>
                  <th className="text-center py-3 px-4 text-gray-600">시간</th>
                  <th className="text-center py-3 px-4 text-gray-600">근무 시간</th>
                  <th className="text-left py-3 px-4 text-gray-600">업무 내용</th>
                  <th className="text-center py-3 px-4 text-gray-600">상태</th>
                </tr>
              </thead>
              <tbody>
                {approvedRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{record.id}</td>
                    <td className="py-3 px-4">{record.subTeacher}</td>
                    <td className="py-3 px-4 text-center">{record.date}</td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {record.startTime} - {record.endTime}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {record.hours}시간
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{record.task}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        승인완료
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Salary Tab */}
      {activeTab === 'salary' && (
        <div className="space-y-6">
          {/* Monthly Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                2025년 12월 급여 현황
              </h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                급여 명세서 출력
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600">조교명</th>
                    <th className="text-center py-3 px-4 text-gray-600">총 근무 시간</th>
                    <th className="text-center py-3 px-4 text-gray-600">시급</th>
                    <th className="text-center py-3 px-4 text-gray-600">지급액</th>
                    <th className="text-center py-3 px-4 text-gray-600">지급 상태</th>
                    <th className="text-center py-3 px-4 text-gray-600">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySalary.map((salary, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{salary.subTeacher}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {salary.totalHours}시간
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {salary.hourlyRate.toLocaleString()}원
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-lg">
                          {salary.totalPay.toLocaleString()}원
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          salary.status === '지급완료'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {salary.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {salary.status === '미지급' && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                            지급 완료
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td className="py-3 px-4">합계</td>
                    <td className="py-3 px-4 text-center">
                      {monthlySalary.reduce((sum, s) => sum + s.totalHours, 0)}시간
                    </td>
                    <td className="py-3 px-4 text-center">-</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-lg">
                        {monthlySalary.reduce((sum, s) => sum + s.totalPay, 0).toLocaleString()}원
                      </span>
                    </td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Individual Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              조교별 상세 근무 내역
            </h3>

            <div className="space-y-4">
              {monthlySalary.map((salary, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4>{salary.subTeacher}</h4>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">총 급여</div>
                      <div className="text-xl text-blue-600">
                        {salary.totalPay.toLocaleString()}원
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">총 근무시간</div>
                      <div className="text-lg">{salary.totalHours}시간</div>
                    </div>
                    <div>
                      <div className="text-gray-600">시급</div>
                      <div className="text-lg">{salary.hourlyRate.toLocaleString()}원</div>
                    </div>
                    <div>
                      <div className="text-gray-600">근무일수</div>
                      <div className="text-lg">
                        {workRecords.filter(r => r.subTeacher === salary.subTeacher && r.status === '승인완료').length}일
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-teacher Work Input Form (조교용) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          근무 시간 입력 (조교용)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">근무일</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">업무 내용</label>
            <input
              type="text"
              placeholder="예: 수학 심화반 보조"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">시작 시간</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">종료 시간</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          근무 시간 등록
        </button>
      </div>
    </div>
  );
}
