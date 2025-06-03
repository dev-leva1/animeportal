import { useState } from 'react';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { PasswordChangeData, WatchHistory as WatchHistoryType } from '../types/user';
import { ProfileLayout, ProfileForm, WatchHistory, FavoritesList } from '../components';

// Заглушки для данных - в реальном приложении эти данные будут загружаться из API
const sampleWatchHistory: WatchHistoryType[] = [
  {
    animeId: 1,
    title: "Attack on Titan",
    image: "https://via.placeholder.com/200x120",
    lastWatched: "2024-01-15T10:30:00Z",
    episodeNumber: 25
  },
  {
    animeId: 2,
    title: "Demon Slayer",
    image: "https://via.placeholder.com/200x120",
    lastWatched: "2024-01-14T20:15:00Z",
    episodeNumber: 12
  }
];

const sampleFavorites = [
  {
    id: 1,
    title: "Your Name",
    image: "https://via.placeholder.com/200x200",
    rating: 8.9,
    genres: ["Romance", "Drama", "Supernatural"]
  },
  {
    id: 2,
    title: "Spirited Away",
    image: "https://via.placeholder.com/200x200",
    rating: 9.2,
    genres: ["Adventure", "Family"]
  }
];

function ProfilePage() {
  const { theme, t } = useApp();
  const { user, updateUser, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || '');
  const [watchHistory, setWatchHistory] = useState<WatchHistoryType[]>(sampleWatchHistory);

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAdmin = user.email === 'admin@example.com';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditSubmit = async (userData: Partial<typeof user>) => {
    try {
      const updatedUser = { ...user, ...userData };
      await authService.updateUser(updatedUser);
      updateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordSubmit = async (data: PasswordChangeData): Promise<boolean> => {
    try {
      const success = await changePassword(data);
      if (success) {
        setIsChangingPassword(false);
      }
      return success;
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  };

  const clearWatchHistory = () => {
    setWatchHistory([]);
  };

  const handleBioSubmit = () => {
    const updatedUser = { ...user, bio: bioText };
    updateUser(updatedUser);
    setIsEditingBio(false);
  };

  const labels = {
    bio: t('profile.bio'),
    bioPlaceholder: t('profile.bio_placeholder'),
    stats: t('profile.stats'),
    watchedAnime: t('profile.stats.watched_anime'),
    readManga: t('profile.stats.read_manga'),
    ratings: t('profile.stats.ratings'),
    favoriteAnime: t('profile.stats.favorite_anime'),
    favoriteManga: t('profile.stats.favorite_manga'),
    registeredDate: t('profile.registered_date'),
    admin: t('nav.admin')
  };

  const profileFormLabels = {
    edit: t('profile.edit'),
    save: t('profile.save'),
    cancel: t('profile.cancel'),
    username: t('profile.username'),
    email: t('profile.email'),
    avatarUrl: t('profile.avatar_url'),
    avatarUrlPlaceholder: t('profile.avatar_url_placeholder'),
    changePassword: t('profile.change_password'),
    currentPassword: t('profile.current_password'),
    newPassword: t('profile.new_password'),
    confirmPassword: t('profile.confirm_password')
  };

  const watchHistoryLabels = {
    title: t('profile.watch_history'),
    clear: t('profile.clear_history'),
    empty: t('profile.no_watch_history')
  };

  const favoritesLabels = {
    title: t('profile.favorites'),
    empty: t('profile.no_favorites')
  };

  // Bio form slot
  const bioFormSlot = isEditingBio ? (
    <div>
      <textarea
        value={bioText}
        onChange={(e) => setBioText(e.target.value)}
        placeholder={t('profile.bio_placeholder')}
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '0.75rem',
          borderRadius: '4px',
          border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
          backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
          color: theme === 'dark' ? '#fff' : '#333',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
      />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={handleBioSubmit}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#ff5f5f',
            color: 'white',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {t('profile.save')}
        </button>
        <button
          onClick={() => {
            setIsEditingBio(false);
            setBioText(user.bio || '');
          }}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
            backgroundColor: 'transparent',
            color: theme === 'dark' ? '#ffffff' : '#121212',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          {t('profile.cancel')}
        </button>
      </div>
    </div>
  ) : (
    <div>
      <p style={{ 
        color: theme === 'dark' ? '#ffffff' : '#121212',
        lineHeight: '1.6',
        marginBottom: '1rem'
      }}>
        {user.bio || t('profile.bio_placeholder')}
      </p>
      <button
        onClick={() => setIsEditingBio(true)}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#ff5f5f',
          color: 'white',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        {t('profile.edit')}
      </button>
    </div>
  );

  return (
    <ProfileLayout
      theme={theme}
      user={user}
      isAdmin={isAdmin}
      formatDate={formatDate}
      labels={labels}
      profileFormSlot={
        <ProfileForm
          theme={theme}
          user={user}
          isEditing={isEditing}
          isChangingPassword={isChangingPassword}
          onStartEdit={() => setIsEditing(true)}
          onCancelEdit={() => setIsEditing(false)}
          onSubmitEdit={handleEditSubmit}
          onTogglePasswordChange={() => setIsChangingPassword(!isChangingPassword)}
          onSubmitPasswordChange={handlePasswordSubmit}
          labels={profileFormLabels}
        />
      }
      bioFormSlot={bioFormSlot}
      favoritesSlot={
        <FavoritesList
          theme={theme}
          favorites={sampleFavorites}
          labels={favoritesLabels}
        />
      }
      watchHistorySlot={
        <WatchHistory
          theme={theme}
          history={watchHistory}
          onClearHistory={clearWatchHistory}
          formatDate={formatDate}
          labels={watchHistoryLabels}
        />
      }
    />
  );
}

export default ProfilePage; 