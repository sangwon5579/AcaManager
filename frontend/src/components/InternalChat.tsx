import { useState } from 'react';
import { Send, Search, Users, Tag, MessageCircle } from 'lucide-react';

type Chat = {
  id: string;
  participants: string[];
  lastMessage: string;
  lastTime: string;
  unread: number;
  tags?: string[];
};

type Message = {
  id: string;
  sender: string;
  message: string;
  time: string;
  isMe: boolean;
};

export function InternalChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>('C001');
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    {
      id: 'C001',
      participants: ['이선생님', '조교 이민지'],
      lastMessage: '내일 영어 중급반 자료 준비 부탁드려요',
      lastTime: '14:32',
      unread: 2,
      tags: ['영어 중급반', '자료준비'],
    },
    {
      id: 'C002',
      participants: ['김선생님', '조교 박준혁'],
      lastMessage: '수학 심화반 프린트 완료했습니다',
      lastTime: '12:15',
      unread: 0,
      tags: ['수학 심화반'],
    },
    {
      id: 'C003',
      participants: ['원장님', '교사 전체'],
      lastMessage: '다음 주 교사 회의 일정 공지',
      lastTime: '어제',
      unread: 0,
      tags: ['공지'],
    },
    {
      id: 'C004',
      participants: ['박선생님', '조교 김서연'],
      lastMessage: '국어 기본반 과제 채점 완료',
      lastTime: '2일전',
      unread: 0,
      tags: ['국어 기본반', '과제'],
    },
  ];

  const messages: Message[] = [
    { id: 'M001', sender: '이선생님', message: '안녕하세요. 내일 영어 중급반 수업 관련해서요', time: '14:20', isMe: true },
    { id: 'M002', sender: '조교 이민지', message: '네, 말씀하세요!', time: '14:22', isMe: false },
    { id: 'M003', sender: '이선생님', message: '독해 프린트 30부 준비 부탁드려요. 교재 p.45-52입니다', time: '14:25', isMe: true },
    { id: 'M004', sender: '조교 이민지', message: '알겠습니다. 오늘 6시까지 준비해드릴게요', time: '14:27', isMe: false },
    { id: 'M005', sender: '이선생님', message: '그리고 단어 테스트지도 함께 부탁드립니다', time: '14:30', isMe: true },
    { id: 'M006', sender: '조교 이민지', message: '네, 같이 준비하겠습니다!', time: '14:32', isMe: false },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // 메시지 발송 로직
      setMessageInput('');
    }
  };

  const selectedChatData = chats.find(c => c.id === selectedChat);

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Chat List */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="mb-3">내부 채팅</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="대화 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">
                      {chat.participants.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{chat.lastTime}</span>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 truncate">{chat.lastMessage}</p>
                {chat.tags && chat.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {chat.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <MessageCircle className="w-4 h-4" />
              새 대화 시작
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        {selectedChat && selectedChatData ? (
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3>{selectedChatData.participants.join(', ')}</h3>
                  </div>
                  {selectedChatData.tags && selectedChatData.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {selectedChatData.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  대화 설정
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${msg.isMe ? 'order-2' : 'order-1'}`}>
                    {!msg.isMe && (
                      <div className="text-xs text-gray-600 mb-1 px-2">{msg.sender}</div>
                    )}
                    <div className={`px-4 py-2 rounded-lg ${
                      msg.isMe
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 px-2 ${msg.isMe ? 'text-right' : ''}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  전송
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Shift + Enter로 줄바꿈, Enter로 전송
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>대화를 선택하세요</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Tags Info */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm">자주 사용되는 태그</h3>
        <div className="flex flex-wrap gap-2">
          {['수학 심화반', '영어 중급반', '국어 기본반', '자료준비', '과제', '시험', '공지', '상담'].map((tag, idx) => (
            <button
              key={idx}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
