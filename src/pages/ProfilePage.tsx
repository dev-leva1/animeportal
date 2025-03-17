import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { User, WatchHistory, PasswordChangeData, UserComment } from '../types/user';
import { FaUser, FaEdit, FaKey, FaSave, FaTimes, FaTrash, FaHistory, FaCheck, FaExclamationTriangle, FaChartBar, FaCalendarAlt, FaComment, FaPlus, FaHeart, FaReply } from 'react-icons/fa';

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PasswordChangeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin-top: 1rem;
`;

const PasswordChangeButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #4a90e2;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff5f5f;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
`;

const BioSection = styled.div`
  margin-top: 1rem;
`;

const BioText = styled.p`
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BioTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const CommentsList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentText = styled.p`
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const CommentDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  }
`;

const CommentForm = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentInput = styled.input`
  width: 100%;
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

const AddCommentButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #ff5f5f;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  
  &:hover {
    background-color: #ff4545;
  }
`;

const RegisteredDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LikeButton = styled.button<{ liked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${props => props.liked ? '#ff5f5f' : (props.theme === 'dark' ? '#aaa' : '#666')};
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
  
  &:hover {
    color: #ff5f5f;
  }
`;

const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  }
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
`;

const CommentInteractions = styled.div`
  display: flex;
  gap: 1rem;
`;

const RepliesList = styled.div`
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ReplyItem = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#252525' : '#eaeaea'};
  border-radius: 6px;
  padding: 0.75rem;
  margin-left: 1.5rem;
`;

const ReplyAuthor = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#ddd' : '#333'};
  margin-bottom: 0.25rem;
`;

const ReplyText = styled.p`
  color: ${props => props.theme === 'dark' ? '#bbb' : '#555'};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.25rem;
`;

const ReplyDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#777'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReplyActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function ProfilePage() {
  const { theme, t } = useApp();
  const { user, updateUser, changePassword } = useAuth();
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState('');
  const [comments, setComments] = useState<UserComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editingReplyData, setEditingReplyData] = useState<{
    commentId: string;
    replyId: string;
    text: string;
  } | null>(null);
  
  useEffect(() => {
    if (user) {
      setEditData({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio
      });
      setBioText(user.bio || '');
    }
  }, [user]);
  
  useEffect(() => {
    const history = authService.getWatchHistory();
    setWatchHistory(history);
    
    if (user) {
      setComments(user.comments || []);
    }
    
    // Обновляем статистику при загрузке страницы
    authService.updateUserStats();
  }, [user]);
  
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
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordMessage({
        type: 'error',
        text: t('profile.passwords_not_match')
      });
      return;
    }
    
    try {
      const success = await changePassword(passwordData);
      if (success) {
        setPasswordMessage({
          type: 'success',
          text: t('profile.password_changed')
        });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        setPasswordMessage({
          type: 'error',
          text: t('profile.password_error')
        });
      }
    } catch (error) {
      setPasswordMessage({
        type: 'error',
        text: t('profile.password_error')
      });
    }
  };
  
  const clearWatchHistory = () => {
    if (window.confirm(t('profile.confirm_clear_history'))) {
      authService.clearWatchHistory();
      setWatchHistory([]);
    }
  };
  
  const handleBioSubmit = () => {
    if (user) {
      authService.updateUserBio(bioText);
      if (user) {
        user.bio = bioText;
        updateUser(user);
      }
      setIsEditingBio(false);
    }
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      const addedComment = authService.addUserComment(newComment);
      setComments(prev => [addedComment, ...prev]);
      setNewComment('');
    }
  };
  
  const handleEditComment = (comment: UserComment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };
  
  const handleUpdateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCommentId && editingCommentText.trim()) {
      const updatedComment = authService.updateUserComment(editingCommentId, editingCommentText);
      if (updatedComment) {
        setComments(prev => prev.map(c => c.id === editingCommentId ? updatedComment : c));
      }
      setEditingCommentId(null);
      setEditingCommentText('');
    }
  };
  
  const handleDeleteComment = (id: string) => {
    if (window.confirm(t('profile.confirm_delete_comment'))) {
      const success = authService.deleteUserComment(id);
      if (success) {
        setComments(prev => prev.filter(c => c.id !== id));
      }
    }
  };
  
  const handleLikeComment = (commentId: string) => {
    const updatedComment = authService.likeUserComment(commentId);
    if (updatedComment) {
      setComments(prev => prev.map(c => c.id === commentId ? updatedComment : c));
    }
  };
  
  const handleReplyToComment = (commentId: string) => {
    setReplyingToCommentId(commentId);
    setReplyText('');
  };
  
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyingToCommentId && replyText.trim() && user) {
      const updatedComment = authService.addReplyToComment(
        replyingToCommentId,
        replyText,
        user.username
      );
      
      if (updatedComment) {
        setComments(prev => prev.map(c => c.id === replyingToCommentId ? updatedComment : c));
        setReplyingToCommentId(null);
        setReplyText('');
      }
    }
  };
  
  const handleEditReply = (commentId: string, replyId: string, text: string) => {
    setEditingReplyData({
      commentId,
      replyId,
      text
    });
  };
  
  const handleUpdateReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReplyData && editingReplyData.text.trim()) {
      const updatedComment = authService.updateReply(
        editingReplyData.commentId,
        editingReplyData.replyId,
        editingReplyData.text
      );
      
      if (updatedComment) {
        setComments(prev => prev.map(c => c.id === editingReplyData.commentId ? updatedComment : c));
        setEditingReplyData(null);
      }
    }
  };
  
  const handleDeleteReply = (commentId: string, replyId: string) => {
    if (window.confirm(t('profile.confirm_delete_reply'))) {
      const updatedComment = authService.deleteReply(commentId, replyId);
      if (updatedComment) {
        setComments(prev => prev.map(c => c.id === commentId ? updatedComment : c));
      }
    }
  };
  
  if (!user) {
    return (
      <EmptyState theme={theme}>
        {t('profile.not_logged_in')}
      </EmptyState>
    );
  }
  
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <ProfileContainer>
      <Section>
        <SectionTitle theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaChartBar style={{ marginRight: '0.5rem' }} />
            {t('profile.stats')}
          </div>
        </SectionTitle>
        
        <StatsGrid>
          <StatCard theme={theme}>
            <StatValue>{user.stats?.watchedAnime || 0}</StatValue>
            <StatLabel theme={theme}>{t('profile.stats.watched_anime')}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.readManga || 0}</StatValue>
            <StatLabel theme={theme}>{t('profile.stats.read_manga')}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.ratings || 0}</StatValue>
            <StatLabel theme={theme}>{t('profile.stats.ratings')}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.favoriteAnime || 0}</StatValue>
            <StatLabel theme={theme}>{t('profile.stats.favorite_anime')}</StatLabel>
          </StatCard>
          
          <StatCard theme={theme}>
            <StatValue>{user.stats?.favoriteManga || 0}</StatValue>
            <StatLabel theme={theme}>{t('profile.stats.favorite_manga')}</StatLabel>
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
                <FaSave />
                {t('profile.save')}
              </EditButton>
              <CancelButton 
                type="button" 
                onClick={() => setIsEditing(false)}
                theme={theme}
              >
                <FaTimes />
                {t('profile.cancel')}
              </CancelButton>
            </ButtonGroup>
          </EditProfileForm>
        ) : (
          <ProfileInfo>
            <Username theme={theme}>{user.username}</Username>
            <Email theme={theme}>{user.email}</Email>
            <RegisteredDate theme={theme}>
              <FaCalendarAlt />
              {t('profile.registered_date')}: {formatDate(user.createdAt)}
            </RegisteredDate>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <EditButton onClick={() => setIsEditing(true)}>
                <FaEdit />
                {t('profile.edit')}
              </EditButton>
              <PasswordChangeButton onClick={() => setIsChangingPassword(!isChangingPassword)}>
                <FaKey />
                {t('profile.change_password')}
              </PasswordChangeButton>
            </div>
          </ProfileInfo>
        )}
      </ProfileHeader>
      
      <Section>
        <SectionTitle theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaUser style={{ marginRight: '0.5rem' }} />
            {t('profile.bio')}
          </div>
          <div>
            {!isEditingBio && (
              <EditButton onClick={() => setIsEditingBio(true)}>
                <FaEdit />
                {t('profile.edit')}
              </EditButton>
            )}
          </div>
        </SectionTitle>
        
        {isEditingBio ? (
          <BioSection>
            <BioTextarea 
              value={bioText} 
              onChange={(e) => setBioText(e.target.value)}
              placeholder={t('profile.bio_placeholder')}
              theme={theme}
            />
            <ButtonGroup>
              <EditButton onClick={handleBioSubmit}>
                <FaSave />
                {t('profile.save')}
              </EditButton>
              <CancelButton 
                onClick={() => {
                  setIsEditingBio(false);
                  setBioText(user.bio || '');
                }}
                theme={theme}
              >
                <FaTimes />
                {t('profile.cancel')}
              </CancelButton>
            </ButtonGroup>
          </BioSection>
        ) : (
          <BioText theme={theme}>
            {user.bio || t('profile.bio_placeholder')}
          </BioText>
        )}
      </Section>
      
      <Section>
        <SectionTitle theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaComment style={{ marginRight: '0.5rem' }} />
            {t('profile.comments')}
          </div>
        </SectionTitle>
        
        <CommentForm onSubmit={handleAddComment}>
          <FormGroup>
            <CommentInput
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('profile.comment_placeholder')}
              theme={theme}
            />
          </FormGroup>
          <AddCommentButton type="submit">
            <FaPlus />
            {t('profile.add_comment')}
          </AddCommentButton>
        </CommentForm>
        
        <CommentsList>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} theme={theme}>
                {editingCommentId === comment.id ? (
                  <CommentForm onSubmit={handleUpdateComment}>
                    <FormGroup>
                      <Input
                        type="text"
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        theme={theme}
                      />
                    </FormGroup>
                    <ButtonGroup>
                      <EditButton type="submit">
                        <FaSave />
                        {t('profile.save')}
                      </EditButton>
                      <CancelButton 
                        type="button"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditingCommentText('');
                        }}
                        theme={theme}
                      >
                        <FaTimes />
                        {t('profile.cancel')}
                      </CancelButton>
                    </ButtonGroup>
                  </CommentForm>
                ) : (
                  <>
                    <CommentText theme={theme}>{comment.text}</CommentText>
                    <CommentDate theme={theme}>
                      <span>
                        {formatDate(comment.createdAt)}
                        {comment.updatedAt && ` (${t('profile.updated_at')} ${formatDate(comment.updatedAt)})`}
                      </span>
                      <CommentActions>
                        <CommentButton 
                          onClick={() => handleEditComment(comment)}
                          theme={theme}
                        >
                          {t('profile.edit_comment')}
                        </CommentButton>
                        <CommentButton 
                          onClick={() => handleDeleteComment(comment.id)}
                          theme={theme}
                        >
                          {t('profile.delete_comment')}
                        </CommentButton>
                      </CommentActions>
                    </CommentDate>
                    
                    <CommentFooter theme={theme}>
                      <CommentInteractions>
                        <LikeButton 
                          onClick={() => handleLikeComment(comment.id)}
                          theme={theme}
                          liked={comment.likes > 0}
                        >
                          <FaHeart />
                          {comment.likes || 0}
                        </LikeButton>
                        
                        <ReplyButton 
                          onClick={() => handleReplyToComment(comment.id)}
                          theme={theme}
                        >
                          <FaReply />
                          {t('profile.reply')}
                        </ReplyButton>
                      </CommentInteractions>
                    </CommentFooter>
                    
                    {replyingToCommentId === comment.id && (
                      <CommentForm onSubmit={handleSubmitReply}>
                        <FormGroup>
                          <CommentInput
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={t('profile.reply_placeholder')}
                            theme={theme}
                          />
                        </FormGroup>
                        <ButtonGroup>
                          <EditButton type="submit">
                            <FaSave />
                            {t('profile.submit_reply')}
                          </EditButton>
                          <CancelButton 
                            type="button"
                            onClick={() => setReplyingToCommentId(null)}
                            theme={theme}
                          >
                            <FaTimes />
                            {t('profile.cancel')}
                          </CancelButton>
                        </ButtonGroup>
                      </CommentForm>
                    )}
                    
                    {comment.replies && comment.replies.length > 0 && (
                      <RepliesList>
                        {comment.replies.map((reply) => (
                          <ReplyItem key={reply.id} theme={theme}>
                            {editingReplyData && 
                             editingReplyData.commentId === comment.id && 
                             editingReplyData.replyId === reply.id ? (
                              <CommentForm onSubmit={handleUpdateReply}>
                                <FormGroup>
                                  <CommentInput
                                    type="text"
                                    value={editingReplyData.text}
                                    onChange={(e) => setEditingReplyData({
                                      ...editingReplyData,
                                      text: e.target.value
                                    })}
                                    theme={theme}
                                  />
                                </FormGroup>
                                <ButtonGroup>
                                  <EditButton type="submit">
                                    <FaSave />
                                    {t('profile.save')}
                                  </EditButton>
                                  <CancelButton 
                                    type="button"
                                    onClick={() => setEditingReplyData(null)}
                                    theme={theme}
                                  >
                                    <FaTimes />
                                    {t('profile.cancel')}
                                  </CancelButton>
                                </ButtonGroup>
                              </CommentForm>
                            ) : (
                              <>
                                <ReplyAuthor theme={theme}>{reply.author}</ReplyAuthor>
                                <ReplyText theme={theme}>{reply.text}</ReplyText>
                                <ReplyDate theme={theme}>
                                  <span>
                                    {formatDate(reply.createdAt)}
                                    {reply.updatedAt && ` (${t('profile.updated_at')} ${formatDate(reply.updatedAt)})`}
                                  </span>
                                  {reply.author === user.username && (
                                    <ReplyActions>
                                      <CommentButton 
                                        onClick={() => handleEditReply(comment.id, reply.id, reply.text)}
                                        theme={theme}
                                      >
                                        {t('profile.edit_reply')}
                                      </CommentButton>
                                      <CommentButton 
                                        onClick={() => handleDeleteReply(comment.id, reply.id)}
                                        theme={theme}
                                      >
                                        {t('profile.delete_reply')}
                                      </CommentButton>
                                    </ReplyActions>
                                  )}
                                </ReplyDate>
                              </>
                            )}
                          </ReplyItem>
                        ))}
                      </RepliesList>
                    )}
                  </>
                )}
              </CommentItem>
            ))
          ) : (
            <EmptyState theme={theme}>
              {t('profile.no_comments')}
            </EmptyState>
          )}
        </CommentsList>
      </Section>
      
      {isChangingPassword && (
        <Section>
          <SectionTitle theme={theme}>
            <FaKey style={{ marginRight: '0.5rem' }} />
            {t('profile.change_password')}
          </SectionTitle>
          {passwordMessage && (
            passwordMessage.type === 'success' ? (
              <SuccessMessage>
                <FaCheck />
                {passwordMessage.text}
              </SuccessMessage>
            ) : (
              <ErrorMessage>
                <FaExclamationTriangle />
                {passwordMessage.text}
              </ErrorMessage>
            )
          )}
          <PasswordChangeForm onSubmit={handlePasswordSubmit}>
            <FormGroup>
              <Label theme={theme}>{t('profile.current_password')}</Label>
              <Input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                theme={theme}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('profile.new_password')}</Label>
              <Input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                theme={theme}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('profile.confirm_new_password')}</Label>
              <Input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                theme={theme}
                required
              />
            </FormGroup>
            
            <ButtonGroup>
              <EditButton type="submit">
                <FaSave />
                {t('profile.save')}
              </EditButton>
              <CancelButton 
                type="button" 
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordMessage(null);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                  });
                }}
                theme={theme}
              >
                <FaTimes />
                {t('profile.cancel')}
              </CancelButton>
            </ButtonGroup>
          </PasswordChangeForm>
        </Section>
      )}
      
      <Section>
        <SectionTitle theme={theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaHistory style={{ marginRight: '0.5rem' }} />
            {t('profile.watch_history')}
          </div>
          <div>
            {watchHistory.length > 0 && (
              <ClearButton onClick={clearWatchHistory}>
                <FaTrash />
                {t('profile.clear_history')}
              </ClearButton>
            )}
          </div>
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