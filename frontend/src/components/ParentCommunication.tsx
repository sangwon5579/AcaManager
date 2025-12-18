import { useState } from 'react';
import { MessageSquare, Send, FileText, Eye, Calendar, Users, Bell } from 'lucide-react';

type Message = {
  id: string;
  type: '주간 학습 리포트' | '결석 안내' | '보강 안내' | '공지사항' | '교재비 안내';
  recipients: number;
  sentDate: string;
  status: '발송완료' | '발송대기' | '작성중';
};

export function ParentCommunication() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'history'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState('주간 학습 리포트');

  const messages: Message[] = [
    { id: 'M001', type: '주간 학습 리포트', recipients: 45, sentDate: '2025-12-16', status: '발송완료' },
    { id: 'M002', type: '결석 안내', recipients: 2, sentDate: '2025-12-15', status: '발송완료' },
    { id: 'M003', type: '공지사항', recipients: 50, sentDate: '2025-12-14', status: '발송완료' },
    { id: 'M004', type: '주간 학습 리포트', recipients: 48, sentDate: '2025-12-09', status: '발송완료' },
    { id: 'M005', type: '교재비 안내', recipients: 50, sentDate: '2025-12-05', status: '발송완료' },
  ];

  const templates = [
    { name: '주간 학습 리포트', icon: FileText, description: '주간 학습 내용과 성취도 공유' },
    { name: '결석 안내', icon: Bell, description: '결석 학생 학부모께 안내' },
    { name: '보강 안내', icon: Calendar, description: '보강 일정 안내' },
    { name: '공지사항', icon: MessageSquare, description: '학원 전체 공지사항' },
    { name: '교재비 안내', icon: FileText, description: '교재비 납부 안내' },
  ];

  const weeklyReport = {
    student: '김민준',
    class: '수학 심화반',
    week: '12/11 - 12/17',
    attendance: '100%',
    topics: ['이차함수의 활용', '함수의 최대최소', '그래프 해석'],
    assignments: { total: 3, completed: 3, performance: 'A' },
    tests: [{ name: '단원평가', score: 92, avg: 87.5 }],
    feedback: '이번 주 학습 태도와 성취도가 매우 우수합니다. 심화 문제에 대한 이해도가 높아졌으며, 꾸준한 복습이 좋은 결과로 이어지고 있습니다.',
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div>
        <h2>학부모 커뮤니케이션</h2>
        <p className="text-gray-600 mt-1">학부모 메시지 발송 및 학습 리포트 관리</p>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'dashboard'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          발송 대시보드
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'create'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          메시지 작성
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          발송 이력
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600 mb-1">이번 주 발송</div>
              <div className="text-2xl">2건</div>
            </div>
            <div className="bg-white rounded-lg border border-green-200 p-4">
              <div className="text-sm text-green-600 mb-1">총 수신자</div>
              <div className="text-2xl text-green-600">47명</div>
            </div>
            <div className="bg-white rounded-lg border border-blue-200 p-4">
              <div className="text-sm text-blue-600 mb-1">발송 대기</div>
              <div className="text-2xl text-blue-600">0건</div>
            </div>
            <div className="bg-white rounded-lg border border-purple-200 p-4">
              <div className="text-sm text-purple-600 mb-1">읽음률</div>
              <div className="text-2xl text-purple-600">94%</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">빠른 발송</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setSelectedTemplate('주간 학습 리포트');
                  setActiveTab('create');
                }}
                className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
              >
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <div className="mb-1">주간 학습 리포트</div>
                <div className="text-sm text-gray-600">자동 생성 리포트 발송</div>
              </button>
              <button
                onClick={() => {
                  setSelectedTemplate('결석 안내');
                  setActiveTab('create');
                }}
                className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left"
              >
                <Bell className="w-8 h-8 text-red-600 mb-2" />
                <div className="mb-1">결석 안내</div>
                <div className="text-sm text-gray-600">결석 학생 학부모 알림</div>
              </button>
              <button
                onClick={() => {
                  setSelectedTemplate('공지사항');
                  setActiveTab('create');
                }}
                className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
              >
                <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
                <div className="mb-1">공지사항</div>
                <div className="text-sm text-gray-600">학원 전체 공지</div>
              </button>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">최근 발송 내역</h3>
            <div className="space-y-3">
              {messages.slice(0, 5).map((message) => (
                <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      message.type === '주간 학습 리포트' ? 'bg-blue-100' :
                      message.type === '결석 안내' ? 'bg-red-100' :
                      message.type === '보강 안내' ? 'bg-yellow-100' :
                      message.type === '공지사항' ? 'bg-purple-100' :
                      'bg-green-100'
                    }`}>
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div>{message.type}</div>
                      <div className="text-sm text-gray-600">
                        {message.recipients}명 · {message.sentDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {message.status}
                    </span>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">템플릿 선택</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.name}
                    onClick={() => setSelectedTemplate(template.name)}
                    className={`p-4 border-2 rounded-lg transition-colors text-left ${
                      selectedTemplate === template.name
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${
                      selectedTemplate === template.name ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <div className="mb-1">{template.name}</div>
                    <div className="text-sm text-gray-600">{template.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview & Send */}
          {selectedTemplate === '주간 학습 리포트' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Message Preview */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  미리보기
                </h3>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="mb-4 pb-4 border-b border-gray-300">
                    [{weeklyReport.class}] {weeklyReport.student} 학생 주간 학습 리포트
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">📅 기간</div>
                      <div>{weeklyReport.week}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">✅ 출석률</div>
                      <div>{weeklyReport.attendance}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">📚 학습 내용</div>
                      <ul className="list-disc list-inside space-y-1">
                        {weeklyReport.topics.map((topic, idx) => (
                          <li key={idx}>{topic}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">✏️ 과제</div>
                      <div>
                        제출: {weeklyReport.assignments.completed}/{weeklyReport.assignments.total}건
                        (수행도: {weeklyReport.assignments.performance})
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">📊 테스트</div>
                      {weeklyReport.tests.map((test, idx) => (
                        <div key={idx}>
                          {test.name}: {test.score}점 (반평균 {test.avg}점)
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">💬 교사 피드백</div>
                      <div className="text-sm">{weeklyReport.feedback}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-300 text-xs text-gray-500">
                    강남대치학원 · 문의: 02-1234-5678
                  </div>
                </div>
              </div>

              {/* Recipients Selection */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  발송 대상 선택
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">반 선택</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>전체 반</option>
                      <option selected>수학 심화반 (15명)</option>
                      <option>영어 중급반 (12명)</option>
                      <option>국어 기본반 (10명)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">발송 방식</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">SMS 발송</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">카카오톡 발송</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm">이메일 발송</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 mb-2">발송 요약</div>
                    <div className="text-sm">
                      <div>• 수신자: 15명</div>
                      <div>• 예상 비용: 약 450원</div>
                      <div>• 발송 시간: 즉시</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Send className="w-5 h-5" />
                      즉시 발송
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      임시 저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTemplate !== '주간 학습 리포트' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4">메시지 작성</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">제목</label>
                  <input
                    type="text"
                    placeholder="메시지 제목을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">내용</label>
                  <textarea
                    rows={10}
                    placeholder="메시지 내용을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Send className="w-5 h-5" />
                    발송
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">발송 ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">메시지 유형</th>
                  <th className="text-center py-3 px-4 text-gray-600">수신자</th>
                  <th className="text-center py-3 px-4 text-gray-600">발송일</th>
                  <th className="text-center py-3 px-4 text-gray-600">상태</th>
                  <th className="text-center py-3 px-4 text-gray-600">상세</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{message.id}</td>
                    <td className="py-3 px-4">{message.type}</td>
                    <td className="py-3 px-4 text-center">{message.recipients}명</td>
                    <td className="py-3 px-4 text-center text-gray-600">{message.sentDate}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        message.status === '발송완료' ? 'bg-green-100 text-green-700' :
                        message.status === '발송대기' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {message.status}
                      </span>
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
        </div>
      )}
    </div>
  );
}
