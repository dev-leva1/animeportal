import { 
  AdminStats, 
  AdminUser, 
  AdminNotification, 
  UserReport, 
  ContentReport, 
  ModLog, 
  AnimeUpdateRequest, 
  MangaUpdateRequest,
  AnimeContent,
  MangaContent,
  SystemSettings,
  BackupConfig,
  ActivityLog,
  GenreManagement,
  StudioManagement,
  AuthorManagement
} from '../types/admin';
import { User } from '../types/user';

class AdminService {
  async getStats(): Promise<AdminStats> {
    return {
      totalUsers: 15243,
      activeUsers: 5876,
      newUsersToday: 124,
      totalAnime: 12500,
      totalManga: 9750,
      totalComments: 45678
    };
  }

  async getNotifications(): Promise<AdminNotification[]> {
    return [
      {
        id: '1',
        type: 'warning',
        message: 'Обнаружено 5 новых жалоб на контент',
        read: false,
        date: new Date().toISOString()
      },
      {
        id: '2',
        type: 'info',
        message: 'Ежедневный бэкап успешно завершен',
        read: true,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  async getUsers(page = 1, limit = 10): Promise<{ users: User[], total: number }> {
    const users = Array.from({ length: limit }, (_, i) => ({
      id: `user${i + (page - 1) * limit + 1}`,
      username: `user${i + (page - 1) * limit + 1}`,
      email: `user${i + (page - 1) * limit + 1}@example.com`,
      password: 'hashedpassword',
      avatar: `https://i.pravatar.cc/150?u=${i + (page - 1) * limit + 1}`,
      bio: `Био пользователя ${i + (page - 1) * limit + 1}`,
      stats: {
        watchedAnime: Math.floor(Math.random() * 100),
        readManga: Math.floor(Math.random() * 50),
        ratings: Math.floor(Math.random() * 200),
        favoriteAnime: Math.floor(Math.random() * 30),
        favoriteManga: Math.floor(Math.random() * 20)
      },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString()
    }));

    return { users, total: 15243 };
  }

  async getUserDetails(userId: string): Promise<AdminUser> {
    return {
      id: userId,
      username: `user${userId}`,
      email: `user${userId}@example.com`,
      password: 'hashedpassword',
      avatar: `https://i.pravatar.cc/150?u=${userId}`,
      bio: `Био пользователя ${userId}`,
      stats: {
        watchedAnime: Math.floor(Math.random() * 100),
        readManga: Math.floor(Math.random() * 50),
        ratings: Math.floor(Math.random() * 200),
        favoriteAnime: Math.floor(Math.random() * 30),
        favoriteManga: Math.floor(Math.random() * 20)
      },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
      role: 'user',
      permissions: ['view', 'comment'],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  async updateUserRole(_userId: string, _role: 'admin' | 'moderator' | 'user'): Promise<boolean> {
    return true;
  }

  async banUser(_userId: string, _reason: string): Promise<boolean> {
    return true;
  }

  async getReports(type: 'content' | 'user' = 'content', page = 1, limit = 10): Promise<{ reports: (ContentReport | UserReport)[], total: number }> {
    if (type === 'content') {
      const reports = Array.from({ length: limit }, (_, i) => ({
        id: `report${i + (page - 1) * limit + 1}`,
        contentType: Math.random() > 0.5 ? 'anime' : 'manga',
        contentId: `content${i + (page - 1) * limit + 1}`,
        contentTitle: `Название контента ${i + (page - 1) * limit + 1}`,
        reason: 'Неподходящий контент',
        status: ['pending', 'resolved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'resolved' | 'rejected',
        reportedBy: `user${Math.floor(Math.random() * 100)}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        details: 'Детали жалобы на контент'
      })) as ContentReport[];

      return { reports, total: 234 };
    } else {
      const reports = Array.from({ length: limit }, (_, i) => ({
        id: `report${i + (page - 1) * limit + 1}`,
        userId: `user${i + (page - 1) * limit + 1}`,
        username: `user${i + (page - 1) * limit + 1}`,
        reason: 'Спам',
        status: ['pending', 'resolved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'resolved' | 'rejected',
        reportedBy: `user${Math.floor(Math.random() * 100)}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        details: 'Детали жалобы на пользователя'
      })) as UserReport[];

      return { reports, total: 156 };
    }
  }

  async resolveReport(_reportId: string, _type: 'content' | 'user', _action: 'approve' | 'reject'): Promise<boolean> {
    return true;
  }

  async getModLogs(page = 1, limit = 10): Promise<{ logs: ModLog[], total: number }> {
    const logs = Array.from({ length: limit }, (_, i) => ({
      id: `log${i + (page - 1) * limit + 1}`,
      action: ['ban', 'delete', 'edit', 'warn', 'approve', 'reject'][Math.floor(Math.random() * 6)] as 'ban' | 'delete' | 'edit' | 'warn' | 'approve' | 'reject',
      targetType: ['user', 'anime', 'manga', 'comment'][Math.floor(Math.random() * 4)] as 'user' | 'anime' | 'manga' | 'comment',
      targetId: `target${i + (page - 1) * limit + 1}`,
      moderator: `admin${Math.floor(Math.random() * 5) + 1}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      reason: 'Причина модераторского действия'
    }));

    return { logs, total: 567 };
  }

  async getUpdateRequests(type: 'anime' | 'manga' = 'anime', page = 1, limit = 10): Promise<{ requests: (AnimeUpdateRequest | MangaUpdateRequest)[], total: number }> {
    if (type === 'anime') {
      const requests = Array.from({ length: limit }, (_, i) => ({
        id: `request${i + (page - 1) * limit + 1}`,
        animeId: i + (page - 1) * limit + 1,
        title: `Аниме ${i + (page - 1) * limit + 1}`,
        field: ['title', 'synopsis', 'episodes', 'status'][Math.floor(Math.random() * 4)],
        oldValue: 'Старое значение',
        newValue: 'Новое значение',
        status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected',
        requestedBy: `user${Math.floor(Math.random() * 100)}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
      })) as AnimeUpdateRequest[];

      return { requests, total: 123 };
    } else {
      const requests = Array.from({ length: limit }, (_, i) => ({
        id: `request${i + (page - 1) * limit + 1}`,
        mangaId: i + (page - 1) * limit + 1,
        title: `Манга ${i + (page - 1) * limit + 1}`,
        field: ['title', 'synopsis', 'chapters', 'status'][Math.floor(Math.random() * 4)],
        oldValue: 'Старое значение',
        newValue: 'Новое значение',
        status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected',
        requestedBy: `user${Math.floor(Math.random() * 100)}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
      })) as MangaUpdateRequest[];

      return { requests, total: 98 };
    }
  }

  async resolveUpdateRequest(_requestId: string, _type: 'anime' | 'manga', _action: 'approve' | 'reject'): Promise<boolean> {
    return true;
  }

  async getContent(type: 'anime' | 'manga' = 'anime', page = 1, limit = 10, status: 'approved' | 'pending' | 'rejected' | 'all' = 'all'): Promise<{ content: (AnimeContent | MangaContent)[], total: number }> {
    if (type === 'anime') {
      const content = Array.from({ length: limit }, (_, i) => ({
        id: i + (page - 1) * limit + 1,
        title: `Аниме ${i + (page - 1) * limit + 1}`,
        status: status === 'all' ? (['approved', 'pending', 'rejected'][Math.floor(Math.random() * 3)] as 'approved' | 'pending' | 'rejected') : status,
        addedBy: `user${Math.floor(Math.random() * 100)}`,
        addedDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
        views: Math.floor(Math.random() * 50000)
      })) as AnimeContent[];

      return { content, total: 12500 };
    } else {
      const content = Array.from({ length: limit }, (_, i) => ({
        id: i + (page - 1) * limit + 1,
        title: `Манга ${i + (page - 1) * limit + 1}`,
        status: status === 'all' ? (['approved', 'pending', 'rejected'][Math.floor(Math.random() * 3)] as 'approved' | 'pending' | 'rejected') : status,
        addedBy: `user${Math.floor(Math.random() * 100)}`,
        addedDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
        views: Math.floor(Math.random() * 30000)
      })) as MangaContent[];

      return { content, total: 9750 };
    }
  }

  async updateContentStatus(_contentId: number, _type: 'anime' | 'manga', _status: 'approved' | 'pending' | 'rejected'): Promise<boolean> {
    return true;
  }

  async getSystemSettings(): Promise<SystemSettings> {
    return {
      siteName: 'Anime & Manga Portal',
      siteDescription: 'Лучший портал об аниме и манге',
      maintenanceMode: false,
      registrationEnabled: true,
      commentsEnabled: true,
      apiKeys: [
        { name: 'jikanAPI', value: 'your_api_key_here' },
        { name: 'googleAnalytics', value: 'UA-12345678-9' }
      ],
      themeSettings: {
        primaryColor: '#ff5f5f',
        secondaryColor: '#1a1a1a',
        backgroundColor: '#ffffff',
        textColor: '#1a1a1a'
      }
    };
  }

  async updateSystemSettings(_settings: SystemSettings): Promise<boolean> {
    return true;
  }

  async getBackupConfig(): Promise<BackupConfig> {
    return {
      automaticBackups: true,
      backupFrequency: 'daily',
      lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      backupLocations: ['local', 'cloud']
    };
  }

  async updateBackupConfig(_config: BackupConfig): Promise<boolean> {
    return true;
  }

  async triggerBackup(): Promise<boolean> {
    return true;
  }

  async getActivityLogs(page = 1, limit = 10): Promise<{ logs: ActivityLog[], total: number }> {
    const logs = Array.from({ length: limit }, (_, i) => ({
      id: `log${i + (page - 1) * limit + 1}`,
      userId: `user${Math.floor(Math.random() * 1000)}`,
      username: `user${Math.floor(Math.random() * 1000)}`,
      action: ['login', 'logout', 'register', 'update_profile', 'add_comment', 'rate_anime', 'rate_manga'][Math.floor(Math.random() * 7)],
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      date: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString()
    }));

    return { logs, total: 15689 };
  }

  async getGenres(): Promise<GenreManagement[]> {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Жанр ${i + 1}`,
      animeCount: Math.floor(Math.random() * 1000),
      mangaCount: Math.floor(Math.random() * 800),
      enabled: Math.random() > 0.1
    }));
  }

  async updateGenre(_genreId: number, _data: { name?: string, enabled?: boolean }): Promise<boolean> {
    return true;
  }

  async getStudios(): Promise<StudioManagement[]> {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Студия ${i + 1}`,
      animeCount: Math.floor(Math.random() * 500),
      enabled: Math.random() > 0.1
    }));
  }

  async updateStudio(_studioId: number, _data: { name?: string, enabled?: boolean }): Promise<boolean> {
    return true;
  }

  async getAuthors(): Promise<AuthorManagement[]> {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Автор ${i + 1}`,
      mangaCount: Math.floor(Math.random() * 50),
      enabled: Math.random() > 0.1
    }));
  }

  async updateAuthor(_authorId: number, _data: { name?: string, enabled?: boolean }): Promise<boolean> {
    return true;
  }
}

export const adminService = new AdminService(); 