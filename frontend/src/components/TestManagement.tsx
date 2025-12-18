import { useState } from 'react';
import { Plus, BarChart3, TrendingUp, TrendingDown, Award } from 'lucide-react';

type Test = {
  id: string;
  class: string;
  name: string;
  date: string;
  totalStudents: number;
  completedScores: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  distribution: { range: string; count: number }[];
};

export function TestManagement() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const tests: Test[] = [
    {
      id: 'T001',
      class: '수학 심화반',
      name: '11월 모의고사',
      date: '2025-11-28',
      totalStudents: 15,
      completedScores: 15,
      averageScore: 87.5,
      highestScore: 98,
      lowestScore: 72,
      distribution: [
        { range: '90-100', count: 8 },
        { range: '80-89', count: 5 },
        { range: '70-79', count: 2 },
        { range: '60-69', count: 0 },
      ],
    },
    {
      id: 'T002',
      class: '영어 중급반',
      name: '단어 테스트 Week 12',
      date: '2025-12-14',
      totalStudents: 12,
      completedScores: 10,
      averageScore: 92.3,
      highestScore: 100,
      lowestScore: 85,
      distribution: [
        { range: '90-100', count: 8 },
        { range: '80-89', count: 2 },
        { range: '70-79', count: 0 },
        { range: '60-69', count: 0 },
      ],
    },
    {
      id: 'T003',
      class: '국어 기본반',
      name: '문학 기말평가',
      date: '2025-12-13',
      totalStudents: 10,
      completedScores: 10,
      averageScore: 78.9,
      highestScore: 95,
      lowestScore: 62,
      distribution: [
        { range: '90-100', count: 2 },
        { range: '80-89', count: 4 },
        { range: '70-79', count: 3 },
        { range: '60-69', count: 1 },
      ],
    },
    {
      id: 'T004',
      class: '수학 심화반',
      name: '삼각함수 단원평가',
      date: '2025-12-18',
      totalStudents: 15,
      completedScores: 5,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      distribution: [],
    },
  ];

  const studentScores = [
    { id: 'S001', name: '김민준', score: 92, trend: '+5', rank: 3 },
    { id: 'S004', name: '최수아', score: 98, trend: '+3', rank: 1 },
    { id: 'S007', name: '윤하은', score: 90, trend: '-2', rank: 4 },
    { id: 'S012', name: '이준서', score: 85, trend: '+8', rank: 7 },
    { id: 'S015', name: '박서준', score: 95, trend: '+10', rank: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>테스트 관리</h2>
          <p className="text-gray-600 mt-1">수업별 테스트 등록 및 성적 관리</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          새 테스트 등록
        </button>
      </div>

      {/* Test List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tests.map((test) => {
          const isComplete = test.completedScores === test.totalStudents;
          const scoringProgress = (test.completedScores / test.totalStudents) * 100;

          return (
            <div
              key={test.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedTest(test)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="mb-1">{test.name}</h3>
                  <p className="text-sm text-gray-600">{test.class}</p>
                </div>
                {isComplete ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    완료
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    진행중
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <BarChart3 className="w-4 h-4" />
                <span>시행일: {test.date}</span>
              </div>

              {test.completedScores > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600 mb-1">평균</div>
                      <div className="text-xl text-blue-700">{test.averageScore.toFixed(1)}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xs text-green-600 mb-1">최고</div>
                      <div className="text-xl text-green-700">{test.highestScore}</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-xs text-red-600 mb-1">최저</div>
                      <div className="text-xl text-red-700">{test.lowestScore}</div>
                    </div>
                  </div>

                  {!isComplete && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">성적 입력 진행률</span>
                        <span>{test.completedScores} / {test.totalStudents}명</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: `${scoringProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-8 text-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">성적이 아직 입력되지 않았습니다</p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    성적 입력하기
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Test Detail */}
      {selectedTest && selectedTest.completedScores > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>{selectedTest.name} - 학생별 점수</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedTest.class} · {selectedTest.date}</p>
            </div>
            <button
              onClick={() => setSelectedTest(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              닫기
            </button>
          </div>

          {/* Score Distribution Chart */}
          <div className="mb-6">
            <h4 className="mb-4 text-sm text-gray-600">점수 분포</h4>
            <div className="grid grid-cols-4 gap-4">
              {selectedTest.distribution.map((dist, index) => {
                const maxCount = Math.max(...selectedTest.distribution.map(d => d.count));
                const heightPercentage = maxCount > 0 ? (dist.count / maxCount) * 100 : 0;
                
                return (
                  <div key={index} className="text-center">
                    <div className="h-32 flex items-end justify-center mb-2">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${heightPercentage}%` }}
                      >
                        <div className="text-white text-sm pt-2">{dist.count}명</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{dist.range}점</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student Score Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">순위</th>
                  <th className="text-left py-3 px-4 text-gray-600">학생 ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">이름</th>
                  <th className="text-center py-3 px-4 text-gray-600">점수</th>
                  <th className="text-center py-3 px-4 text-gray-600">전회 대비</th>
                  <th className="text-center py-3 px-4 text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {studentScores.map((student) => {
                  const trendValue = parseInt(student.trend);
                  return (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {student.rank <= 3 && (
                            <Award className={`w-5 h-5 ${
                              student.rank === 1 ? 'text-yellow-500' :
                              student.rank === 2 ? 'text-gray-400' :
                              'text-orange-600'
                            }`} />
                          )}
                          <span>{student.rank}위</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{student.id}</td>
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          student.score >= 90 ? 'bg-green-100 text-green-700' :
                          student.score >= 80 ? 'bg-blue-100 text-blue-700' :
                          student.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {student.score}점
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className={`flex items-center justify-center gap-1 ${
                          trendValue > 0 ? 'text-green-600' :
                          trendValue < 0 ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {trendValue > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : trendValue < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : null}
                          <span className="text-sm">{student.trend}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-blue-600 hover:underline text-sm">
                          상세보기
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <BarChart3 className="w-5 h-5" />
              <span>학습 리포트 자동 연동 준비됨</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              학부모 리포트 발송
            </button>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 테스트</div>
          <div className="text-2xl">{tests.length}건</div>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-600 mb-1">완료된 테스트</div>
          <div className="text-2xl text-green-600">
            {tests.filter(t => t.completedScores === t.totalStudents).length}건
          </div>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-4">
          <div className="text-sm text-yellow-600 mb-1">성적 입력 대기</div>
          <div className="text-2xl text-yellow-600">
            {tests.filter(t => t.completedScores < t.totalStudents && t.completedScores > 0).length}건
          </div>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-600 mb-1">전체 평균</div>
          <div className="text-2xl text-blue-600">
            {(
              tests.filter(t => t.averageScore > 0).reduce((sum, t) => sum + t.averageScore, 0) /
              tests.filter(t => t.averageScore > 0).length
            ).toFixed(1)}점
          </div>
        </div>
      </div>

      {/* Pending Tests */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          성적 입력 필요 테스트
        </h3>
        <div className="space-y-3">
          {tests
            .filter(t => t.completedScores < t.totalStudents)
            .map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span>{test.name}</span>
                    <span className="text-sm text-gray-600">({test.class})</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    시행일: {test.date}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">미입력</div>
                    <div className="text-xl text-red-600">
                      {test.totalStudents - test.completedScores}명
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    성적 입력
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
