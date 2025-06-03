import styled from '@emotion/styled';
import { FaUser, FaCalendarAlt, FaChartBar, FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { User } from '../../types/user';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileHeader = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#eee'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ff5f5f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  flex-shrink: 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Username = styled.h1<{ theme: string }>`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const Email = styled.p<{ theme: string }>`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin-bottom: 1rem;
`;

const RegisteredDate = styled.p<{ theme: string }>`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AdminButton = styled(Link)`
  text-decoration: none;
  background-color: #ff9800;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #f57c00;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2<{ theme: string }>`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div<{ theme: string }>`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff5f5f;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div<{ theme: string }>`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const BioSection = styled.div`
  margin-top: 1rem;
`;

interface ProfileLayoutProps {
  theme: string;
  user: User;
  isAdmin: boolean;
  formatDate: (dateString: string) => string;
  labels: {
    bio: string;
    bioPlaceholder: string;
    stats: string;
    watchedAnime: string;
    readManga: string;
    ratings: string;
    favoriteAnime: string;
    favoriteManga: string;
    registeredDate: string;
    admin: string;
  };
  profileFormSlot: React.ReactNode;
  bioFormSlot: React.ReactNode;
  favoritesSlot?: React.ReactNode;
  watchHistorySlot?: React.ReactNode;
  commentsSlot?: React.ReactNode;
  className?: string;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  theme,
  user,
  isAdmin,
  formatDate,
  labels,
  profileFormSlot,
  bioFormSlot,
  favoritesSlot,
  watchHistorySlot,
  commentsSlot,
  className
}) => {
  return (
    <ProfileContainer className={className}>
      <Section>
        <SectionTitle theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaChartBar style={{ marginRight: '0.5rem' }} />
            {labels.stats}
          </div>
        </SectionTitle>
        
        <StatsGrid>
          <StatCard theme={theme}>
            <StatValue>{user.stats?.watchedAnime || 0}</StatValue>
            <StatLabel theme={theme}>{labels.watchedAnime}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.readManga || 0}</StatValue>
            <StatLabel theme={theme}>{labels.readManga}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.ratings || 0}</StatValue>
            <StatLabel theme={theme}>{labels.ratings}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.favoriteAnime || 0}</StatValue>
            <StatLabel theme={theme}>{labels.favoriteAnime}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.favoriteManga || 0}</StatValue>
            <StatLabel theme={theme}>{labels.favoriteManga}</StatLabel>
          </StatCard>
        </StatsGrid>
      </Section>
      
      <ProfileHeader theme={theme}>
        <Avatar>
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            <FaUser size={48} />
          )}
        </Avatar>
        
        <ProfileInfo>
          <Username theme={theme}>{user.username}</Username>
          <Email theme={theme}>{user.email}</Email>
          <RegisteredDate theme={theme}>
            <FaCalendarAlt />
            {labels.registeredDate}: {formatDate(user.createdAt)}
          </RegisteredDate>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {profileFormSlot}
            {isAdmin && (
              <AdminButton to="/admin">
                <FaUserShield />
                {labels.admin}
              </AdminButton>
            )}
          </div>
        </ProfileInfo>
      </ProfileHeader>
      
      <Section>
        <SectionTitle theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaUser style={{ marginRight: '0.5rem' }} />
            {labels.bio}
          </div>
        </SectionTitle>
        
        <BioSection>
          {bioFormSlot}
        </BioSection>
      </Section>

      {favoritesSlot && (
        <Section>
          {favoritesSlot}
        </Section>
      )}

      {watchHistorySlot && (
        <Section>
          {watchHistorySlot}
        </Section>
      )}

      {commentsSlot && (
        <Section>
          {commentsSlot}
        </Section>
      )}
    </ProfileContainer>
  );
};

export default ProfileLayout; 