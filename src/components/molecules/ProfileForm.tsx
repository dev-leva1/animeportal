import { useState } from 'react';
import styled from '@emotion/styled';
import { FaSave, FaTimes, FaEdit, FaKey } from 'react-icons/fa';
import { User, PasswordChangeData } from '../../types/user';

const EditProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.border.primary};
  border-radius: 8px;
  background-color: ${props => props.theme.mode === 'dark' ? '#1a1a1a' : '#f9f9f9'};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.text.primary};
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border.primary};
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
  
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: ${props => props.variant === 'secondary' 
    ? `1px solid ${props.theme.mode === 'dark' ? '#444' : '#ddd'}` 
    : 'none'};
  background-color: ${props => {
    if (props.variant === 'secondary') {
      return props.theme.mode === 'dark' ? 'transparent' : 'transparent';
    }
    return '#ff5f5f';
  }};
  color: ${props => {
    if (props.variant === 'secondary') {
      return props.theme.mode === 'dark' ? '#ffffff' : '#121212';
    }
    return 'white';
  }};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => {
      if (props.variant === 'secondary') {
        return props.theme.mode === 'dark' ? '#333' : '#f0f0f0';
      }
      return '#ff4545';
    }};
  }
`;

const ErrorMessage = styled.div`
  color: #ff4545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

interface ProfileFormProps {
  user: User;
  isEditing: boolean;
  isChangingPassword: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSubmitEdit: (userData: Partial<User>) => Promise<void>;
  onTogglePasswordChange: () => void;
  onSubmitPasswordChange: (data: PasswordChangeData) => Promise<boolean>;
  labels: {
    edit: string;
    save: string;
    cancel: string;
    username: string;
    email: string;
    avatarUrl: string;
    avatarUrlPlaceholder: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  className?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user,
  isEditing,
  isChangingPassword,
  onStartEdit,
  onCancelEdit,
  onSubmitEdit,
  onTogglePasswordChange,
  onSubmitPasswordChange,
  labels,
  className
}) => {
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar || ''
  });

  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitEdit(editData);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Пароль должен содержать не менее 6 символов');
      return;
    }

    try {
      const success = await onSubmitPasswordChange(passwordData);
      if (success) {
        setPasswordSuccess('Пароль успешно изменён');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        setPasswordError('Ошибка при смене пароля');
      }
    } catch (error) {
      setPasswordError('Ошибка при смене пароля');
    }
  };

  return (
    <div className={className}>
      {isEditing ? (
        <EditProfileForm onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label>{labels.username}</Label>
            <Input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleEditChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{labels.email}</Label>
            <Input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{labels.avatarUrl}</Label>
            <Input
              type="text"
              name="avatar"
              value={editData.avatar}
              onChange={handleEditChange}
              placeholder={labels.avatarUrlPlaceholder}
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button type="submit">
              <FaSave />
              {labels.save}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={onCancelEdit}
            >
              <FaTimes />
              {labels.cancel}
            </Button>
          </ButtonGroup>
        </EditProfileForm>
      ) : (
        <ButtonGroup>
          <Button onClick={onStartEdit}>
            <FaEdit />
            {labels.edit}
          </Button>
          <Button 
            variant="secondary"
            onClick={onTogglePasswordChange}
          >
            <FaKey />
            {labels.changePassword}
          </Button>
        </ButtonGroup>
      )}

      {isChangingPassword && (
        <PasswordForm onSubmit={handlePasswordSubmit}>
          <FormGroup>
            <Label>{labels.currentPassword}</Label>
            <Input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{labels.newPassword}</Label>
            <Input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{labels.confirmPassword}</Label>
            <Input
              type="password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          
          {passwordError && (
            <ErrorMessage>{passwordError}</ErrorMessage>
          )}
          
          {passwordSuccess && (
            <SuccessMessage>{passwordSuccess}</SuccessMessage>
          )}
          
          <ButtonGroup>
            <Button type="submit">
              <FaSave />
              {labels.save}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={onTogglePasswordChange}
            >
              <FaTimes />
              {labels.cancel}
            </Button>
          </ButtonGroup>
        </PasswordForm>
      )}
    </div>
  );
};

export default ProfileForm; 