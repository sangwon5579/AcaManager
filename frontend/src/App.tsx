import { useState } from 'react'

import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Wallet, 
  MessageCircle, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/StudentManagement';
import { ClassManagement } from './components/ClassManagement';
import { AttendanceManagement } from './components/AttendanceManagement';
import { AssignmentManagement } from './components/AssignmentManagement';
import { TestManagement } from './components/TestManagement';
import { ParentCommunication } from './components/ParentCommunication';
import { SubTeacherManagement } from './components/SubTeacherManagement';
import { InternalChat } from './components/InternalChat';
import { SettingsPage } from './components/SettingsPage';

type MenuItem = {
  id: string;
  label: string;
  icon: any;
  component: any;
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, component: Dashboard },
  { id: 'students', label: '학생 관리', icon: Users, component: StudentManagement },
  { id: 'classes', label: '수업 / 반 관리', icon: BookOpen, component: ClassManagement },
  { id: 'attendance', label: '출결 관리', icon: ClipboardCheck, component: AttendanceManagement },
  { id: 'assignments', label: '과제 관리', icon: FileText, component: AssignmentManagement },
  { id: 'tests', label: '테스트 관리', icon: BarChart3, component: TestManagement },
  { id: 'parent-comm', label: '학부모 커뮤니케이션', icon: MessageSquare, component: ParentCommunication },
  { id: 'sub-teacher', label: '조교 근무 / 급여 관리', icon: Wallet, component: SubTeacherManagement },
  { id: 'chat', label: '내부 채팅', icon: MessageCircle, component: InternalChat },
  { id: 'settings', label: '설정', icon: Settings, component: SettingsPage },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications] = useState(5);

  const ActiveComponent = menuItems.find(item => item.id === activeMenu)?.component || Dashboard;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-blue-600">AcaManager</h1>
          <p className="text-sm text-gray-500 mt-1">학원 관리 시스템</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  activeMenu === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="px-4 py-2 text-sm text-gray-600">
            <div>강남대치학원</div>
            <div className="text-blue-600 mt-1">원장 (MASTER_TEACHER)</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-gray-800">
              {menuItems.find(item => item.id === activeMenu)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">로그아웃</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
