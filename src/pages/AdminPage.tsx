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
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const AdminNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NavButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${props => props.active 
    ? (props.theme.mode === 'dark' ? '#ff5f5f' : '#ff5f5f') 
    : (props.theme.mode === 'dark' ? '#2a2a2a' : '#f0f0f0')};
  color: ${props => props.active 
    ? '#ffffff' 
    : (props.theme.mode === 'dark' ? '#ffffff' : '#333333')};
  border: none;

  &:hover {
    background-color: ${props => props.active 
      ? '#ff5f5f' 
      : (props.theme.mode === 'dark' ? '#383838' : '#e0e0e0')};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.background.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.text.muted};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const TabContent = styled.div`
  background-color: ${props => props.theme.background.secondary};
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
  background-color: ${props => props.theme.mode === 'dark' 
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
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const NotificationDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.text.muted};
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
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
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
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  
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
const Dashboard = ({ stats, t }: { stats: AdminStats, t: (key: string) => string }) => (
  <TabContent>
    <TabHeader>
      <TabTitle>
        <FaTachometerAlt /> {t('admin.dashboard')}
      </TabTitle>
    </TabHeader>
    
    <StatsGrid>
      <StatCard>
        <StatTitle>
          <FaUsers /> {t('admin.stats.total_users')}
        </StatTitle>
        <StatValue>{stats.totalUsers}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>
          <FaUsers /> {t('admin.stats.active_users')}
        </StatTitle>
        <StatValue>{stats.activeUsers}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>
          <FaUsers /> {t('admin.stats.new_users_today')}
        </StatTitle>
        <StatValue>{stats.newUsersToday}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>
          <FaFilm /> {t('admin.stats.total_anime')}
        </StatTitle>
        <StatValue>{stats.totalAnime}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>
          <FaBook /> {t('admin.stats.total_manga')}
        </StatTitle>
        <StatValue>{stats.totalManga}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>
          <FaComments /> {t('admin.stats.total_comments')}
        </StatTitle>
        <StatValue>{stats.totalComments}</StatValue>
      </StatCard>
    </StatsGrid>
  </TabContent>
);

// Компонент для отображения уведомлений
const Notifications = ({ notifications, t }: { notifications: AdminNotification[], t: (key: string) => string }) => (
  <TabContent>
    <TabHeader>
      <TabTitle>
        <FaBell /> {t('admin.notifications')}
      </TabTitle>
    </TabHeader>
    
    <NotificationsList>
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          read={notification.read} 
          type={notification.type}
        >
          <NotificationMessage>{notification.message}</NotificationMessage>
          <NotificationDate>
            {new Date(notification.date).toLocaleDateString()}
          </NotificationDate>
        </NotificationItem>
      ))}
    </NotificationsList>
  </TabContent>
);

const PlaceholderTab = ({ title, icon, t }: { title: string, icon: React.ReactNode, t: (key: string) => string }) => (
  <TabContent>
    <TabHeader>
      <TabTitle>
        {icon} {title}
      </TabTitle>
    </TabHeader>
    <p>{t('admin.feature_in_development')}</p>
  </TabContent>
);

function AdminPage() {

  const { t } = useApp();
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
      <AccessDenied>
        <FaExclamationTriangle />
        <AccessDeniedMessage>{t('admin.common.error')}</AccessDeniedMessage>
        <p>{t('admin.feature_in_development')}</p>
      </AccessDenied>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>{t('nav.admin')}</AdminTitle>
      </AdminHeader>

      <AdminNavigation>
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
        >
          <FaTachometerAlt /> {t('admin.dashboard')}
        </NavButton>
        <NavButton 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> {t('admin.users')}
        </NavButton>
        <NavButton 
          active={activeTab === 'anime'} 
          onClick={() => setActiveTab('anime')}
        >
          <FaFilm /> {t('admin.anime')}
        </NavButton>
        <NavButton 
          active={activeTab === 'manga'} 
          onClick={() => setActiveTab('manga')}
        >
          <FaBook /> {t('admin.manga')}
        </NavButton>
        <NavButton 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
        >
          <FaExclamationTriangle /> {t('admin.reports')}
        </NavButton>
        <NavButton 
          active={activeTab === 'moderation'} 
          onClick={() => setActiveTab('moderation')}
        >
          <FaUserShield /> {t('admin.moderation')}
        </NavButton>
        <NavButton 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          <FaChartLine /> {t('admin.statistics')}
        </NavButton>
        <NavButton 
          active={activeTab === 'taxonomy'} 
          onClick={() => setActiveTab('taxonomy')}
        >
          <FaTags /> {t('admin.taxonomy')}
        </NavButton>
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          <FaCog /> {t('admin.settings')}
        </NavButton>
        <NavButton 
          active={activeTab === 'backup'} 
          onClick={() => setActiveTab('backup')}
        >
          <FaDatabase /> {t('admin.backup')}
        </NavButton>
        <NavButton 
          active={activeTab === 'activity'} 
          onClick={() => setActiveTab('activity')}
        >
          <FaHistory /> {t('admin.activity')}
        </NavButton>
        <NavButton 
          active={activeTab === 'notifications'} 
          onClick={() => setActiveTab('notifications')}
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
        {activeTab === 'dashboard' && <Dashboard stats={stats} t={t} />}
        {activeTab === 'notifications' && <Notifications notifications={notifications} t={t} />}
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'anime' && <AnimeManagement t={t} />}
        {activeTab === 'manga' && <PlaceholderTab title={t('admin.manga')} icon={<FaBook />} t={t} />}
        {activeTab === 'reports' && <PlaceholderTab title={t('admin.reports')} icon={<FaExclamationTriangle />} t={t} />}
        {activeTab === 'moderation' && <PlaceholderTab title={t('admin.moderation')} icon={<FaUserShield />} t={t} />}
        {activeTab === 'stats' && <PlaceholderTab title={t('admin.statistics')} icon={<FaChartLine />} t={t} />}
        {activeTab === 'taxonomy' && <PlaceholderTab title={t('admin.taxonomy')} icon={<FaTags />} t={t} />}
        {activeTab === 'settings' && <SystemSettings t={t} />}
        {activeTab === 'backup' && <PlaceholderTab title={t('admin.backup')} icon={<FaDatabase />} t={t} />}
        {activeTab === 'activity' && <PlaceholderTab title={t('admin.activity')} icon={<FaHistory />} t={t} />}
      </AdminPanel>
    </AdminContainer>
  );
}

export default AdminPage; 