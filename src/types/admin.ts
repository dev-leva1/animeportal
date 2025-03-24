import { User } from './user';

export interface AdminUser extends User {
  role: 'admin' | 'moderator' | 'user';
  permissions: string[];
  lastLogin: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalAnime: number;
  totalManga: number;
  totalComments: number;
}

export interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  read: boolean;
  date: string;
}

export interface UserReport {
  id: string;
  userId: string;
  username: string;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  reportedBy: string;
  date: string;
  details: string;
}

export interface ContentReport {
  id: string;
  contentType: 'anime' | 'manga' | 'comment';
  contentId: string;
  contentTitle: string;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  reportedBy: string;
  date: string;
  details: string;
}

export interface ModLog {
  id: string;
  action: 'ban' | 'delete' | 'edit' | 'warn' | 'approve' | 'reject';
  targetType: 'user' | 'anime' | 'manga' | 'comment';
  targetId: string;
  moderator: string;
  date: string;
  reason: string;
}

export interface AnimeUpdateRequest {
  id: string;
  animeId: number;
  title: string;
  field: string;
  oldValue: string;
  newValue: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  date: string;
}

export interface MangaUpdateRequest {
  id: string;
  mangaId: number;
  title: string;
  field: string;
  oldValue: string;
  newValue: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  date: string;
}

export interface AnimeContent {
  id: number;
  title: string;
  status: 'approved' | 'pending' | 'rejected';
  addedBy: string;
  addedDate: string;
  views: number;
}

export interface MangaContent {
  id: number;
  title: string;
  status: 'approved' | 'pending' | 'rejected';
  addedBy: string;
  addedDate: string;
  views: number;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  commentsEnabled: boolean;
  apiKeys: Array<{
    name: string;
    value: string;
  }>;
  themeSettings: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
}

export interface BackupConfig {
  automaticBackups: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  lastBackup: string;
  backupLocations: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  ip: string;
  userAgent: string;
  date: string;
}

export interface GenreManagement {
  id: number;
  name: string;
  animeCount: number;
  mangaCount: number;
  enabled: boolean;
}

export interface StudioManagement {
  id: number;
  name: string;
  animeCount: number;
  enabled: boolean;
}

export interface AuthorManagement {
  id: number;
  name: string;
  mangaCount: number;
  enabled: boolean;
} 