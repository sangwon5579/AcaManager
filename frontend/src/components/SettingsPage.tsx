import { useState } from 'react';
import { Users, Shield, FileText, DollarSign, Save } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'templates' | 'salary'>('users');

  const users = [
    { id: 'U001', name: '김원장', role: 'MASTER_TEACHER', email: 'master@academy.com', status: '활성' },
    { id: 'U002', name: '이선생님', role: 'TEACHER', email: 'teacher1@academy.com', status: '활성' },
    { id: 'U003', name: '박선생님', role: 'TEACHER', email: 'teacher2@academy.com', status: '활성' },
    { id: 'U004', name: '조교 이민지', role: 'SUB_TEACHER', email: 'sub1@academy.com', status: '활성' },
    { id: 'U005', name: '조교 박준혁', role: 'SUB_TEACHER', email: 'sub2@academy.com', status: '활성' },
  ];

  const permissions = [
    {
      role: 'MASTER_TEACHER',
      label: '원장',
      permissions: {
        학생관리: '전체',
        수업관리: '전체',
        출결관리: '전체',
        과제관리: '전체',
        테스트관리: '전체',
        학부모메시지: '전체',
        조교관리: '전체',
        설정: '전체',
      },
    },
    {
      role: 'TEACHER',
      label: '교사',
      permissions: {
        학생관리: '담당반만',
        수업관리: '담당반만',
        출결관리: '담당반만',
        과제관리: '담당반만',
        테스트관리: '담당반만',
        학부모메시지: '담당반만',
        조교관리: '조회만',
        설정: '없음',
      },
    },
    {
      role: 'SUB_TEACHER',
      label: '조교',
      permissions: {
        학생관리: '조회만',
        수업관리: '조회만',
        출결관리: '조회만',
        과제관리: '조회만',
        테스트관리: '조회만',
        학부모메시지: '없음',
        조교관리: '본인만',
        설정: '없음',
      },
    },
  ];

  const messageTemplates = [
    {
      id: 'T001',
      name: '주간 학습 리포트',
      category: '정기',
      lastModified: '2025-12-10',
    },
    {
      id: 'T002',
      name: '결석 안내',
      category: '긴급',
      lastModified: '2025-11-20',
    },
    {
      id: 'T003',
      name: '보강 안내',
      category: '일반',
      lastModified: '2025-11-15',
    },
    {
      id: 'T004',
      name: '교재비 안내',
      category: '행정',
      lastModified: '2025-10-05',
    },
  ];

  const salaryRates = [
    { position: '정규 교사', hourlyRate: 0, monthlyRate: 3500000, type: '월급' },
    { position: '시간제 강사', hourlyRate: 50000, monthlyRate: 0, type: '시급' },
    { position: '조교 (경력)', hourlyRate: 15000, monthlyRate: 0, type: '시급' },
    { position: '조교 (신입)', hourlyRate: 12000, monthlyRate: 0, type: '시급' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>설정</h2>
        <p className="text-gray-600 mt-1">시스템 설정 및 권한 관리</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'users'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          사용자 관리
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'permissions'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          권한 설정
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'templates'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          메시지 템플릿
        </button>
        <button
          onClick={() => setActiveTab('salary')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'salary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          급여 단가
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>사용자 목록</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                사용자 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600">사용자 ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">이름</th>
                    <th className="text-left py-3 px-4 text-gray-600">역할</th>
                    <th className="text-left py-3 px-4 text-gray-600">이메일</th>
                    <th className="text-center py-3 px-4 text-gray-600">상태</th>
                    <th className="text-center py-3 px-4 text-gray-600">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{user.id}</td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.role === 'MASTER_TEACHER' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'TEACHER' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.role === 'MASTER_TEACHER' ? '원장' :
                           user.role === 'TEACHER' ? '교사' : '조교'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-blue-600 hover:underline text-sm mr-3">
                          수정
                        </button>
                        <button className="text-red-600 hover:underline text-sm">
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">Role별 권한 설정</h3>

            <div className="space-y-4">
              {permissions.map((perm) => (
                <div key={perm.role} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      {perm.label} ({perm.role})
                    </h4>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      수정
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(perm.permissions).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{key}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          value === '전체' ? 'bg-green-100 text-green-700' :
                          value === '담당반만' || value === '본인만' ? 'bg-blue-100 text-blue-700' :
                          value === '조회만' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>메시지 템플릿 관리</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                템플릿 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600">템플릿 ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">템플릿명</th>
                    <th className="text-left py-3 px-4 text-gray-600">카테고리</th>
                    <th className="text-center py-3 px-4 text-gray-600">최종 수정일</th>
                    <th className="text-center py-3 px-4 text-gray-600">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {messageTemplates.map((template) => (
                    <tr key={template.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{template.id}</td>
                      <td className="py-3 px-4">{template.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          template.category === '정기' ? 'bg-blue-100 text-blue-700' :
                          template.category === '긴급' ? 'bg-red-100 text-red-700' :
                          template.category === '일반' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {template.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">{template.lastModified}</td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-blue-600 hover:underline text-sm mr-3">
                          수정
                        </button>
                        <button className="text-gray-600 hover:underline text-sm mr-3">
                          미리보기
                        </button>
                        <button className="text-red-600 hover:underline text-sm">
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Template Editor Example */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">템플릿 편집기</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">템플릿명</label>
                <input
                  type="text"
                  placeholder="템플릿 이름"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">카테고리</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>정기</option>
                  <option>긴급</option>
                  <option>일반</option>
                  <option>행정</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">템플릿 내용</label>
                <textarea
                  rows={8}
                  placeholder="템플릿 내용을 입력하세요. {학생명}, {반명} 등의 변수를 사용할 수 있습니다."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Save className="w-4 h-4" />
                  저장
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Salary Tab */}
      {activeTab === 'salary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>급여 단가 설정</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                단가 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-600">직급/구분</th>
                    <th className="text-center py-3 px-4 text-gray-600">급여 유형</th>
                    <th className="text-center py-3 px-4 text-gray-600">시급</th>
                    <th className="text-center py-3 px-4 text-gray-600">월급</th>
                    <th className="text-center py-3 px-4 text-gray-600">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryRates.map((rate, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{rate.position}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          rate.type === '월급' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {rate.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {rate.hourlyRate > 0 ? (
                          <input
                            type="number"
                            defaultValue={rate.hourlyRate}
                            className="w-32 px-3 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {rate.monthlyRate > 0 ? (
                          <input
                            type="number"
                            defaultValue={rate.monthlyRate}
                            className="w-32 px-3 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-blue-600 hover:underline text-sm">
                          수정
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" />
                변경사항 저장
              </button>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">추가 설정</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="mb-1">급여 지급일</div>
                  <div className="text-sm text-gray-600">매월 급여 지급 날짜 설정</div>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>매월 25일</option>
                  <option>매월 말일</option>
                  <option>매월 1일</option>
                  <option>매월 10일</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="mb-1">근무시간 승인 알림</div>
                  <div className="text-sm text-gray-600">조교 근무시간 등록 시 알림 받기</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
