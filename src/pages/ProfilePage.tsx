import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { User, WatchHistory } from '../types/user';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileHeader = styled.div`
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
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Username = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const Email = styled.p`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin-bottom: 1rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #ff5f5f;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff4545;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: #666;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    background-color: #555;
  }
`;

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const HistoryItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const HistoryImage = styled.div<{ imageUrl: string }>`
  height: 120px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const HistoryInfo = styled.div`
  padding: 0.75rem;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
`;

const HistoryTitle = styled.h3`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HistoryDate = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const EditProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  font-weight: 500;
  cursor: pointer;
`;

function ProfilePage() {
  const { theme, t } = useApp();
  const { user, updateUser } = useAuth();
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  
  useEffect(() => {
    if (user) {
      setEditData({
        username: user.username,
        email: user.email,
        avatar: user.avatar
      });
    }
  }, [user]);
  
  useEffect(() => {
    const history = authService.getWatchHistory();
    setWatchHistory(history);
  }, []);
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && editData) {
      const updatedUser: User = {
        ...user,
        ...editData as Pick<User, 'username' | 'email' | 'avatar'>
      };
      updateUser(updatedUser);
      setIsEditing(false);
    }
  };
  
  const clearWatchHistory = () => {
    if (window.confirm(t('profile.confirm_clear_history'))) {
      authService.clearWatchHistory();
      setWatchHistory([]);
    }
  };
  
  if (!user) {
    return (
      <EmptyState theme={theme}>
        {t('profile.not_logged_in')}
      </EmptyState>
    );
  }
  
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <ProfileContainer>
      <ProfileHeader theme={theme}>
        <Avatar>
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            getInitials(user.username)
          )}
        </Avatar>
        
        {isEditing ? (
          <EditProfileForm onSubmit={handleEditSubmit}>
            <FormGroup>
              <Label theme={theme}>{t('profile.username')}</Label>
              <Input
                type="text"
                name="username"
                value={editData.username || ''}
                onChange={handleEditChange}
                theme={theme}
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('profile.email')}</Label>
              <Input
                type="email"
                name="email"
                value={editData.email || ''}
                onChange={handleEditChange}
                theme={theme}
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('profile.avatar_url')}</Label>
              <Input
                type="text"
                name="avatar"
                value={editData.avatar || ''}
                onChange={handleEditChange}
                theme={theme}
                placeholder={t('profile.avatar_url_placeholder')}
              />
            </FormGroup>
            
            <ButtonGroup>
              <EditButton type="submit">
                {t('profile.save')}
              </EditButton>
              <CancelButton 
                type="button" 
                onClick={() => setIsEditing(false)}
                theme={theme}
              >
                {t('profile.cancel')}
              </CancelButton>
            </ButtonGroup>
          </EditProfileForm>
        ) : (
          <ProfileInfo>
            <Username theme={theme}>{user.username}</Username>
            <Email theme={theme}>{user.email}</Email>
            <EditButton onClick={() => setIsEditing(true)}>
              {t('profile.edit')}
            </EditButton>
          </ProfileInfo>
        )}
      </ProfileHeader>
      
      <Section>
        <SectionTitle theme={theme}>
          {t('profile.watch_history')}
          {watchHistory.length > 0 && (
            <ClearButton onClick={clearWatchHistory}>
              {t('profile.clear_history')}
            </ClearButton>
          )}
        </SectionTitle>
        
        {watchHistory.length > 0 ? (
          <HistoryGrid>
            {watchHistory.map((item) => (
              <HistoryItem key={item.animeId} to={`/anime/${item.animeId}`}>
                <HistoryImage imageUrl={item.image} />
                <HistoryInfo theme={theme}>
                  <HistoryTitle theme={theme}>{item.title}</HistoryTitle>
                  <HistoryDate theme={theme}>
                    {formatDate(item.lastWatched)}
                  </HistoryDate>
                </HistoryInfo>
              </HistoryItem>
            ))}
          </HistoryGrid>
        ) : (
          <EmptyState theme={theme}>
            {t('profile.no_history')}
          </EmptyState>
        )}
      </Section>
    </ProfileContainer>
  );
}

export default ProfilePage; 