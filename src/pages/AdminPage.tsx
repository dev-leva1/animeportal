import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { AdminStats, AdminNotification } from '../types/admin';
import { 
  FaUsers, 
  FaFilm, 
  FaBook, 
  FaComments, 
  FaBell, 
  FaUserShield, 
  FaChartLine, 
  FaCog, 
  FaDatabase,
  FaTachometerAlt, 
  FaExclamationTriangle, 
  FaHistory, 
  FaTags
} from 'react-icons/fa';

// Импортируем созданные компоненты для админ-панели
import UsersManagement from '../components/admin/UsersManagement';
import AnimeManagement from '../components/admin/AnimeManagement';
import SystemSettings from '../components/admin/SystemSettings';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const AdminNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NavButton = styled.button<{active?: boolean, theme: string}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${props => props.active 
    ? (props.theme === 'dark' ? '#ff5f5f' : '#ff5f5f') 
    : (props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0')};
  color: ${props => props.active 
    ? '#ffffff' 
    : (props.theme === 'dark' ? '#ffffff' : '#333333')};
  border: none;

  &:hover {
    background-color: ${props => props.active 
      ? '#ff5f5f' 
      : (props.theme === 'dark' ? '#383838' : '#e0e0e0')};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f8f8'};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#9e9e9e' : '#757575'};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const TabContent = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f8f8'};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div<{read: boolean, type: string}>`
  background-color: ${props => props.theme === 'dark' 
    ? (props.read ? '#2a2a2a' : '#383838') 
    : (props.read ? '#f8f8f8' : '#ffffff')};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'info': return '#4a90e2';
      case 'warning': return '#f5a623';
      case 'error': return '#d0021b';
      case 'success': return '#7ed321';
      default: return '#9e9e9e';
    }
  }};
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationMessage = styled.div`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const NotificationDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#9e9e9e' : '#757575'};
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TabTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AdminPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AccessDenied = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  svg {
    font-size: 3rem;
    color: #ff5f5f;
  }
`;

const AccessDeniedMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

// Реализация отдельных компонентов для Dashboard
const Dashboard = ({ stats, theme, t }: { stats: AdminStats, theme: string, t: (key: string) => string }) => (
  <TabContent theme={theme}>
    <TabHeader>
      <TabTitle theme={theme}>
        <FaTachometerAlt /> {t('admin.dashboard')}
      </TabTitle>
    </TabHeader>
    
    <StatsGrid>
      <StatCard theme={theme}>
        <StatTitle theme={theme}>
          <FaUsers /> {t('admin.stats.total_users')}
        </StatTitle>
        <StatValue theme={theme}>{stats.totalUsers}</StatValue>
      </StatCard>
      <StatCard theme={theme}>
        <StatTitle theme={theme}>
          <FaUsers /> {t('admin.stats.active_users')}
        </StatTitle>
        <StatValue theme={theme}>{stats.activeUsers}</StatValue>
      </StatCard>
      <StatCard theme={theme}>
        <StatTitle theme={theme}>
          <FaUsers /> {t('admin.stats.new_users_today')}
        </StatTitle>
        <StatValue theme={theme}>{stats.newUsersToday}</StatValue>
      </StatCard>
      <StatCard theme={theme}>
        <StatTitle theme={theme}>
          <FaFilm /> {t('admin.stats.total_anime')}
        </StatTitle>
        <StatValue theme={theme}>{stats.totalAnime}</StatValue>
      </StatCard>
      <StatCard theme={theme}>
        <StatTitle theme={theme}>
          <FaBook /> {t('admin.stats.total_manga')}
        </StatTitle>
        <StatValue theme={theme}>{stats.totalManga}</StatValue>
      </StatCard>
      <StatCard theme={theme}>
        <StatTitle theme={theme}>
          <FaComments /> {t('admin.stats.total_comments')}
        </StatTitle>
        <StatValue theme={theme}>{stats.totalComments}</StatValue>
      </StatCard>
    </StatsGrid>
  </TabContent>
);

// Компонент для отображения уведомлений
const Notifications = ({ notifications, theme, t }: { notifications: AdminNotification[], theme: string, t: (key: string) => string }) => (
  <TabContent theme={theme}>
    <TabHeader>
      <TabTitle theme={theme}>
        <FaBell /> {t('admin.notifications')}
      </TabTitle>
    </TabHeader>
    
    <NotificationsList>
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          read={notification.read} 
          type={notification.type}
          theme={theme}
        >
          <NotificationMessage theme={theme}>{notification.message}</NotificationMessage>
          <NotificationDate theme={theme}>
            {new Date(notification.date).toLocaleDateString()}
          </NotificationDate>
        </NotificationItem>
      ))}
    </NotificationsList>
  </TabContent>
);

const PlaceholderTab = ({ title, icon, theme, t }: { title: string, icon: React.ReactNode, theme: string, t: (key: string) => string }) => (
  <TabContent theme={theme}>
    <TabHeader>
      <TabTitle theme={theme}>
        {icon} {title}
      </TabTitle>
    </TabHeader>
    <p>{t('admin.feature_in_development')}</p>
  </TabContent>
);

function AdminPage() {
  const { theme, t } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalAnime: 0,
    totalManga: 0,
    totalComments: 0
  });
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Проверка прав администратора
    // В реальном приложении здесь должна быть настоящая проверка прав
    setIsAdmin(true);

    // Загрузка статистики и уведомлений
    if (isAdmin) {
      const loadData = async () => {
        try {
          const statsData = await adminService.getStats();
          setStats(statsData);
          
          const notificationsData = await adminService.getNotifications();
          setNotifications(notificationsData);
        } catch (error) {
          console.error('Failed to load admin data:', error);
        }
      };
      
      loadData();
    }
  }, [isAdmin]);

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  if (!isAdmin) {
    return (
      <AccessDenied theme={theme}>
        <FaExclamationTriangle />
        <AccessDeniedMessage>{t('admin.common.error')}</AccessDeniedMessage>
        <p>{t('admin.feature_in_development')}</p>
      </AccessDenied>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle theme={theme}>{t('nav.admin')}</AdminTitle>
      </AdminHeader>

      <AdminNavigation>
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
          theme={theme}
        >
          <FaTachometerAlt /> {t('admin.dashboard')}
        </NavButton>
        <NavButton 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
          theme={theme}
        >
          <FaUsers /> {t('admin.users')}
        </NavButton>
        <NavButton 
          active={activeTab === 'anime'} 
          onClick={() => setActiveTab('anime')}
          theme={theme}
        >
          <FaFilm /> {t('admin.anime')}
        </NavButton>
        <NavButton 
          active={activeTab === 'manga'} 
          onClick={() => setActiveTab('manga')}
          theme={theme}
        >
          <FaBook /> {t('admin.manga')}
        </NavButton>
        <NavButton 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
          theme={theme}
        >
          <FaExclamationTriangle /> {t('admin.reports')}
        </NavButton>
        <NavButton 
          active={activeTab === 'moderation'} 
          onClick={() => setActiveTab('moderation')}
          theme={theme}
        >
          <FaUserShield /> {t('admin.moderation')}
        </NavButton>
        <NavButton 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
          theme={theme}
        >
          <FaChartLine /> {t('admin.statistics')}
        </NavButton>
        <NavButton 
          active={activeTab === 'taxonomy'} 
          onClick={() => setActiveTab('taxonomy')}
          theme={theme}
        >
          <FaTags /> {t('admin.taxonomy')}
        </NavButton>
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
          theme={theme}
        >
          <FaCog /> {t('admin.settings')}
        </NavButton>
        <NavButton 
          active={activeTab === 'backup'} 
          onClick={() => setActiveTab('backup')}
          theme={theme}
        >
          <FaDatabase /> {t('admin.backup')}
        </NavButton>
        <NavButton 
          active={activeTab === 'activity'} 
          onClick={() => setActiveTab('activity')}
          theme={theme}
        >
          <FaHistory /> {t('admin.activity')}
        </NavButton>
        <NavButton 
          active={activeTab === 'notifications'} 
          onClick={() => setActiveTab('notifications')}
          theme={theme}
        >
          <FaBell /> {t('admin.notifications')}
          {notifications.filter(n => !n.read).length > 0 && (
            <span style={{
              backgroundColor: '#ff5f5f',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem'
            }}>
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </NavButton>
      </AdminNavigation>

      <AdminPanel>
        {activeTab === 'dashboard' && <Dashboard stats={stats} theme={theme} t={t} />}
        {activeTab === 'notifications' && <Notifications notifications={notifications} theme={theme} t={t} />}
        {activeTab === 'users' && <UsersManagement theme={theme} />}
        {activeTab === 'anime' && <AnimeManagement theme={theme} t={t} />}
        {activeTab === 'manga' && <PlaceholderTab title={t('admin.manga')} icon={<FaBook />} theme={theme} t={t} />}
        {activeTab === 'reports' && <PlaceholderTab title={t('admin.reports')} icon={<FaExclamationTriangle />} theme={theme} t={t} />}
        {activeTab === 'moderation' && <PlaceholderTab title={t('admin.moderation')} icon={<FaUserShield />} theme={theme} t={t} />}
        {activeTab === 'stats' && <PlaceholderTab title={t('admin.statistics')} icon={<FaChartLine />} theme={theme} t={t} />}
        {activeTab === 'taxonomy' && <PlaceholderTab title={t('admin.taxonomy')} icon={<FaTags />} theme={theme} t={t} />}
        {activeTab === 'settings' && <SystemSettings theme={theme} t={t} />}
        {activeTab === 'backup' && <PlaceholderTab title={t('admin.backup')} icon={<FaDatabase />} theme={theme} t={t} />}
        {activeTab === 'activity' && <PlaceholderTab title={t('admin.activity')} icon={<FaHistory />} theme={theme} t={t} />}
      </AdminPanel>
    </AdminContainer>
  );
}

export default AdminPage; 