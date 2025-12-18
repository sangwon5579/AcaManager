import { Users, CheckCircle, XCircle, Clock, FileText, BarChart3, MessageSquare, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const todayStats = [
    { label: '오늘 수업', value: '8', subtext: '진행 중 2건', icon: Users, color: 'blue' },
    { label: '출석', value: '94', subtext: '96.9%', icon: CheckCircle, color: 'green' },
    { label: '결석', value: '2', subtext: '보강 대상', icon: XCircle, color: 'red' },
    { label: '지각', value: '1', subtext: '1.0%', icon: Clock, color: 'yellow' },
  ];

  const actionItems = [
    { label: '미처리 과제', value: '12', urgent: true },
    { label: '미입력 테스트', value: '3', urgent: true },
    { label: '학부모 메시지 대기', value: '5', urgent: false },
    { label: '보강 영상 승인 대기', value: '2', urgent: false },
  ];

  const recentTests = [
    { class: '고2 수학 심화반', test: '11월 모의고사', avg: 87.5, date: '2025-12-15' },
    { class: '고1 영어 중급반', test: '단어 테스트 Week 12', avg: 92.3, date: '2025-12-14' },
    { class: '고3 국어 기본반', test: '문학 기말평가', avg: 78.9, date: '2025-12-13' },
  ];

  const parentMessages = [
    { week: '이번주 (12/16-12/22)', sent: 45, total: 50, percentage: 90 },
    { week: '지난주 (12/9-12/15)', sent: 48, total: 50, percentage: 96 },
  ];

  return (
    <div className="space-y-6">
      {/* 오늘 수업 현황 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            red: 'bg-red-50 text-red-600',
            yellow: 'bg-yellow-50 text-yellow-600',
          }[stat.color];

          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className="text-3xl mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* 주요 알림 & 액션 아이템 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            처리 필요 항목
          </h3>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  item.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.urgent && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                  <span className={item.urgent ? 'text-red-900' : 'text-gray-700'}>
                    {item.label}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.urgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.value}건
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            학부모 메시지 발송 현황
          </h3>
          <div className="space-y-4">
            {parentMessages.map((msg, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{msg.week}</span>
                  <span className="text-sm">
                    {msg.sent} / {msg.total} 명
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${msg.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{msg.percentage}% 완료</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 최근 테스트 평균 점수 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          최근 테스트 평균 점수
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">반 이름</th>
                <th className="text-left py-3 px-4 text-gray-600">테스트명</th>
                <th className="text-left py-3 px-4 text-gray-600">평균 점수</th>
                <th className="text-left py-3 px-4 text-gray-600">시행일</th>
                <th className="text-left py-3 px-4 text-gray-600">추세</th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map((test, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{test.class}</td>
                  <td className="py-3 px-4 text-gray-600">{test.test}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      test.avg >= 90 ? 'bg-green-100 text-green-700' :
                      test.avg >= 80 ? 'bg-blue-100 text-blue-700' :
                      test.avg >= 70 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {test.avg.toFixed(1)}점
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{test.date}</td>
                  <td className="py-3 px-4">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 금주 일정 요약 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4">금주 주요 일정 (12/16 - 12/22)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 mb-1">12/18 (수)</div>
            <div className="mb-2">고3 전국연합모의고사</div>
            <div className="text-sm text-gray-600">전체 고3 학생 대상</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 mb-1">12/20 (금)</div>
            <div className="mb-2">학부모 상담 주간 시작</div>
            <div className="text-sm text-gray-600">예약 현황: 23건</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 mb-1">12/22 (일)</div>
            <div className="mb-2">수학 특강 (겨울방학)</div>
            <div className="text-sm text-gray-600">신청 인원: 34명</div>
          </div>
        </div>
      </div>
    </div>
  );
}
