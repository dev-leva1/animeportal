import { User, UserCredentials, RegisterData, AuthResponse, WatchHistory, PasswordChangeData, UserComment, UserStats } from '../types/user';
import { favoritesService } from './favoritesService';

// const API_URL = 'https://api.example.com'; // Замените на реальный URL API
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Имитация базы данных пользователей
let users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2023-01-01T00:00:00.000Z',
    bio: 'Администратор сайта',
    comments: [],
    stats: {
      watchedAnime: 42,
      readManga: 15,
      ratings: 38,
      favoriteAnime: 12,
      favoriteManga: 5
    }
  }
];

// Текущий пользователь
let currentUser: User | null = null;

// Получение текущего пользователя
const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    currentUser = JSON.parse(userJson);
    return currentUser;
  }
  
  return null;
};

// Обновление пользователя
const updateUser = (user: User): void => {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  // Обновляем пользователя в "базе данных"
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
  }
};

// Вход в систему
const login = (data: UserCredentials): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        u => u.email === data.email && u.password === data.password
      );
      
      if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        const token = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
        resolve({ user, token });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

// Регистрация
const register = (data: RegisterData): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = users.find(u => u.email === data.email);
      
      if (existingUser) {
        reject(new Error('User with this email already exists'));
        return;
      }
      
      const newUser: User = {
        id: (users.length + 1).toString(),
        username: data.username,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString(),
        bio: '',
        comments: [],
        stats: {
          watchedAnime: 0,
          readManga: 0,
          ratings: 0,
          favoriteAnime: 0,
          favoriteManga: 0
        }
      };
      
      users.push(newUser);
      currentUser = newUser;
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      const token = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
      resolve({ user: newUser, token });
    }, 500);
  });
};

// Выход из системы
const logout = (): void => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Смена пароля
const changePassword = (data: PasswordChangeData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getCurrentUser();
      
      if (!user) {
        reject(new Error('User not logged in'));
        return;
      }
      
      if (user.password !== data.currentPassword) {
        reject(new Error('Current password is incorrect'));
        return;
      }
      
      user.password = data.newPassword;
      updateUser(user);
      resolve(true);
    }, 500);
  });
};

// История просмотров
const getWatchHistory = (): WatchHistory[] => {
  const historyJson = localStorage.getItem('watchHistory');
  return historyJson ? JSON.parse(historyJson) : [];
};

const addToWatchHistory = (item: WatchHistory): void => {
  const history = getWatchHistory();
  
  // Удаляем предыдущую запись с таким же animeId, если она существует
  const filteredHistory = history.filter(h => h.animeId !== item.animeId);
  
  // Добавляем новую запись в начало списка
  filteredHistory.unshift(item);
  
  // Ограничиваем историю до 20 элементов
  const limitedHistory = filteredHistory.slice(0, 20);
  
  localStorage.setItem('watchHistory', JSON.stringify(limitedHistory));
  
  // Обновляем статистику пользователя
  updateUserStats();
};

const clearWatchHistory = (): void => {
  localStorage.removeItem('watchHistory');
  
  // Обновляем статистику пользователя
  updateUserStats();
};

// Статистика пользователя
const updateUserStats = (): void => {
  const user = getCurrentUser();
  if (!user) return;
  
  const watchHistory = getWatchHistory();
  const favorites = favoritesService.getFavorites();
  
  const stats: UserStats = {
    watchedAnime: watchHistory.length,
    readManga: 0, // Будет обновляться при добавлении функционала чтения манги
    ratings: 0, // Будет обновляться при добавлении функционала оценок
    favoriteAnime: favorites.filter(item => item.type === 'anime').length,
    favoriteManga: favorites.filter(item => item.type === 'manga').length
  };
  
  user.stats = stats;
  updateUser(user);
};

// Биография пользователя
const updateUserBio = (bio: string): void => {
  const user = getCurrentUser();
  if (!user) return;
  
  user.bio = bio;
  updateUser(user);
};

// Комментарии пользователя
const addUserComment = (text: string): UserComment => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not logged in');
  
  const comment: UserComment = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: []
  };
  
  if (!user.comments) {
    user.comments = [];
  }
  
  user.comments.unshift(comment);
  updateUser(user);
  
  return comment;
};

const updateUserComment = (id: string, text: string): UserComment | null => {
  const user = getCurrentUser();
  if (!user || !user.comments) return null;
  
  const commentIndex = user.comments.findIndex(c => c.id === id);
  if (commentIndex === -1) return null;
  
  const updatedComment: UserComment = {
    ...user.comments[commentIndex],
    text,
    updatedAt: new Date().toISOString()
  };
  
  user.comments[commentIndex] = updatedComment;
  updateUser(user);
  
  return updatedComment;
};

const deleteUserComment = (id: string): boolean => {
  const user = getCurrentUser();
  if (!user || !user.comments) return false;
  
  const initialLength = user.comments.length;
  user.comments = user.comments.filter(c => c.id !== id);
  
  if (user.comments.length === initialLength) {
    return false;
  }
  
  updateUser(user);
  return true;
};

const likeUserComment = (commentId: string): UserComment | null => {
  const user = getCurrentUser();
  if (!user || !user.comments) return null;
  
  const commentIndex = user.comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  const updatedComment = {
    ...user.comments[commentIndex],
    likes: (user.comments[commentIndex].likes || 0) + 1
  };
  
  user.comments[commentIndex] = updatedComment;
  updateUser(user);
  
  return updatedComment;
};

const addReplyToComment = (commentId: string, replyText: string, authorName: string): UserComment | null => {
  const user = getCurrentUser();
  if (!user || !user.comments) return null;
  
  const commentIndex = user.comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  const comment = user.comments[commentIndex];
  
  if (!comment.replies) {
    comment.replies = [];
  }
  
  const reply = {
    id: Date.now().toString(),
    text: replyText,
    createdAt: new Date().toISOString(),
    author: authorName
  };
  
  comment.replies.push(reply);
  updateUser(user);
  
  return comment;
};

const updateReply = (commentId: string, replyId: string, text: string): UserComment | null => {
  const user = getCurrentUser();
  if (!user || !user.comments) return null;
  
  const commentIndex = user.comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  const comment = user.comments[commentIndex];
  if (!comment.replies) return null;
  
  const replyIndex = comment.replies.findIndex(r => r.id === replyId);
  if (replyIndex === -1) return null;
  
  comment.replies[replyIndex] = {
    ...comment.replies[replyIndex],
    text,
    updatedAt: new Date().toISOString()
  };
  
  updateUser(user);
  
  return comment;
};

const deleteReply = (commentId: string, replyId: string): UserComment | null => {
  const user = getCurrentUser();
  if (!user || !user.comments) return null;
  
  const commentIndex = user.comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  const comment = user.comments[commentIndex];
  if (!comment.replies) return null;
  
  comment.replies = comment.replies.filter(r => r.id !== replyId);
  updateUser(user);
  
  return comment;
};

// Для демонстрации
const getMockUser = (): User => {
  return {
    id: '999',
    username: 'demo_user',
    email: 'demo@example.com',
    password: 'demo123',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2023-05-15T00:00:00.000Z',
    bio: 'Это демо-пользователь для тестирования функционала',
    comments: [],
    stats: {
      watchedAnime: Math.floor(Math.random() * 50),
      readManga: Math.floor(Math.random() * 30),
      ratings: Math.floor(Math.random() * 40),
      favoriteAnime: Math.floor(Math.random() * 20),
      favoriteManga: Math.floor(Math.random() * 15)
    }
  };
};

export const authService = {
  getCurrentUser,
  updateUser,
  login,
  register,
  logout,
  changePassword,
  getWatchHistory,
  addToWatchHistory,
  clearWatchHistory,
  updateUserStats,
  updateUserBio,
  addUserComment,
  updateUserComment,
  deleteUserComment,
  getMockUser,
  likeUserComment,
  addReplyToComment,
  updateReply,
  deleteReply
}; 