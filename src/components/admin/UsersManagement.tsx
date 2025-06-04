import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { adminService } from '../../services/adminService';
import { User } from '../../types/user';
import { AdminUser } from '../../types/admin';
import { FaSearch, FaEdit, FaBan, FaTrash, FaUserShield, FaInfoCircle } from 'react-icons/fa';
import { useApp } from '../../context/ThemeContext';

interface UsersManagementProps {
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9e9e9e;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{active?: boolean}>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.active ? '#ff5f5f' : props.theme.mode === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.active ? '#ffffff' : props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#ff4545' : props.theme.mode === 'dark' ? '#383838' : '#e0e0e0'};
  }
`;

const UsersTable = styled.table`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  }
  
  th {
    background-color: ${props => props.theme.mode === 'dark' ? '#1a1a1a' : '#f0f0f0'};
    font-weight: 600;
  }
  
  tr {
    background-color: ${props => props.theme.background.secondary};
    
    &:hover {
      background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
    }
  }
`;

const UsersStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: ${props => props.theme.background.secondary};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.background.secondary};
  padding: 1rem;
  border-radius: 8px;
`;

const PageInfo = styled.div`
  margin: 0 1rem;
`;

const PerPageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  select {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
    background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#ffffff'};
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  }
`;

const PageButton = styled.button<{active?: boolean}>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.active ? '#ff5f5f' : props.theme.mode === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.active ? '#ffffff' : props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:hover {
    background-color: ${props => props.active ? '#ff4545' : props.theme.mode === 'dark' ? '#383838' : '#e0e0e0'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.background.secondary};
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.theme.text.muted};
  
  &:hover {
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  strong {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  
  span {
    font-size: 0.875rem;
    color: ${props => props.theme.text.muted};
  }
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:nth-of-type(1) {
    background-color: #9013fe;
    color: white;
    
    &:hover {
      background-color: #8003ee;
    }
  }
  
  &:nth-of-type(2) {
    background-color: #4a90e2;
    color: white;
    
    &:hover {
      background-color: #3a80d2;
    }
  }
  
  &:nth-of-type(3) {
    background-color: #7ed321;
    color: white;
    
    &:hover {
      background-color: #6ec311;
    }
  }
  
  &:nth-of-type(4) {
    background-color: #f5a623;
    color: white;
    
    &:hover {
      background-color: #e59613;
    }
  }
  
  &:nth-of-type(5) {
    background-color: #d0021b;
    color: white;
    
    &:hover {
      background-color: #c0020b;
    }
  }
`;

const Button = styled.button<{variant?: 'primary' | 'danger' | 'default'}>`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: ${props => {
    switch(props.variant) {
      case 'primary': return '#ff5f5f';
      case 'danger': return '#d0021b';
      default: return props.theme.mode === 'dark' ? '#383838' : '#e0e0e0';
    }
  }};
  
  color: ${props => {
    switch(props.variant) {
      case 'primary':
      case 'danger':
        return '#ffffff';
      default:
        return props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a';
    }
  }};
  
  &:hover {
    background-color: ${props => {
      switch(props.variant) {
        case 'primary': return '#ff4545';
        case 'danger': return '#c0020b';
        default: return props.theme.mode === 'dark' ? '#444' : '#d0d0d0';
      }
    }};
  }
`;

const UsersManagement: React.FC<UsersManagementProps> = ({}) => {
  const { t } = useApp();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<AdminUser | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'moderator' | 'user'>('user');
  const [banReason, setBanReason] = useState('');

  const usersPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      filterUsers();
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users, currentFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { users: loadedUsers, total } = await adminService.getUsers(currentPage, usersPerPage);
      setUsers(loadedUsers);
      setFilteredUsers(loadedUsers);
      setTotalUsers(total);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (currentFilter !== 'all') {
      filtered = filtered.filter(user => {
        // Mock checking role since the User type doesn't have role
        const adminUser = user as unknown as AdminUser;
        return adminUser.role === currentFilter;
      });
    }
    
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getUserDetails = async (userId: string) => {
    try {
      const userDetails = await adminService.getUserDetails(userId);
      setUserDetails(userDetails);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Failed to load user details:', error);
    }
  };

  const openEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user as unknown as AdminUser);
    // Mock: assuming we've got the role from somewhere
    setSelectedRole(((user as unknown as AdminUser).role) || 'user');
    setShowRoleModal(true);
  };

  const openBanModal = (user: User) => {
    setSelectedUser(user as unknown as AdminUser);
    setShowBanModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user as unknown as AdminUser);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowEditModal(false);
    setShowRoleModal(false);
    setShowBanModal(false);
    setShowDeleteModal(false);
    setShowDetailsModal(false);
    setSelectedUser(null);
    setSelectedRole('user');
    setBanReason('');
  };

  const handleRoleChange = async () => {
    if (!selectedUser) return;
    
    try {
      await adminService.updateUserRole(selectedUser.id, selectedRole as 'admin' | 'moderator' | 'user');
      // Reload users to get the updated data
      loadUsers();
      closeModals();
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser || !banReason) return;
    
    try {
      await adminService.banUser(selectedUser.id, banReason);
      // Reload users to get the updated data
      loadUsers();
      closeModals();
    } catch (error) {
      console.error('Failed to ban user:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h2>{t('admin.users')}</h2>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder={t('admin.users.search')}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBar>
      </Header>

      <Filters>
        <FilterButton
          active={currentFilter === 'all'}
          onClick={() => handleFilterChange('all')}
        >
          {t('admin.filters.all')}
        </FilterButton>
        <FilterButton
          active={currentFilter === 'admin'}
          onClick={() => handleFilterChange('admin')}
        >
          {t('admin.users.role')}: {t('admin.filters.admin')}
        </FilterButton>
        <FilterButton
          active={currentFilter === 'moderator'}
          onClick={() => handleFilterChange('moderator')}
        >
          {t('admin.users.role')}: {t('admin.filters.moderator')}
        </FilterButton>
      </Filters>

      <UsersStats>
        <StatsItem>
          <strong>{totalUsers}</strong>
          <span>{t('admin.users.total')}</span>
        </StatsItem>
      </UsersStats>

      <UsersTable>
        <thead>
          <tr>
            <th>{t('admin.users.id')}</th>
            <th>{t('admin.users.username')}</th>
            <th>{t('admin.users.email')}</th>
            <th>{t('admin.users.role')}</th>
            <th>{t('admin.users.created')}</th>
            <th>{t('admin.users.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                {t('admin.common.loading')}
              </td>
            </tr>
          ) : filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                {t('admin.common.no_results')}
              </td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {userDetails && userDetails.id === user.id
                    ? userDetails.role
                    : 'user'}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <ActionButtons>
                    <ActionButton onClick={() => getUserDetails(user.id)} title={t('admin.users.info')}>
                      <FaInfoCircle />
                    </ActionButton>
                    <ActionButton onClick={() => openEditUser(user)} title={t('admin.users.edit')}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton onClick={() => openRoleModal(user)} title={t('admin.users.change_role')}>
                      <FaUserShield />
                    </ActionButton>
                    <ActionButton onClick={() => openBanModal(user)} title={t('admin.users.ban')}>
                      <FaBan />
                    </ActionButton>
                    <ActionButton onClick={() => openDeleteModal(user)} title={t('admin.users.delete')}>
                      <FaTrash />
                    </ActionButton>
                  </ActionButtons>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </UsersTable>

      <PaginationContainer>
        <Pagination>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('admin.pagination.prev')}
          </PageButton>
          <PageInfo>
            {t('admin.pagination.page')} {currentPage} {t('admin.pagination.of')}{' '}
            {Math.ceil(totalUsers / itemsPerPage)}
          </PageInfo>
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalUsers / itemsPerPage)}
          >
            {t('admin.pagination.next')}
          </PageButton>
        </Pagination>
        <PerPageSelector>
          <label htmlFor="perPage">{t('admin.pagination.per_page')}:</label>
          <select
            id="perPage"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </PerPageSelector>
      </PaginationContainer>

      {/* Edit User Modal */}
      {selectedUser && showEditModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>{t('admin.users.edit')}: {selectedUser.username}</h3>
              <CloseButton onClick={closeModals}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor="username">{t('admin.users.username')}</Label>
                <Input
                  id="username"
                  value={selectedUser.username}
                  onChange={e => setSelectedUser({ ...selectedUser, username: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">{t('admin.users.email')}</Label>
                <Input
                  id="email"
                  value={selectedUser.email}
                  onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button variant="default" onClick={closeModals}>
                {t('admin.common.cancel')}
              </Button>
              <Button variant="primary" onClick={closeModals}>
                {t('admin.users.save')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Change Role Modal */}
      {selectedUser && showRoleModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>{t('admin.users.change_role')}: {selectedUser.username}</h3>
              <CloseButton onClick={closeModals}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label htmlFor="role">{t('admin.users.role')}</Label>
                <Select
                  id="role"
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as 'admin' | 'moderator' | 'user')}
                >
                  <option value="user">{t('admin.filters.user')}</option>
                  <option value="moderator">{t('admin.filters.moderator')}</option>
                  <option value="admin">{t('admin.filters.admin')}</option>
                </Select>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button variant="default" onClick={closeModals}>
                {t('admin.common.cancel')}
              </Button>
              <Button variant="primary" onClick={handleRoleChange}>
                {t('admin.common.confirm')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Ban User Modal */}
      {selectedUser && showBanModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>{t('admin.users.ban')}: {selectedUser.username}</h3>
              <CloseButton onClick={closeModals}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>{t('admin.users.confirm_ban')}</p>
              <FormGroup>
                <Label htmlFor="reason">{t('admin.users.reason')}</Label>
                <TextArea
                  id="reason"
                  value={banReason}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBanReason(e.target.value)}
                  rows={3}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button variant="default" onClick={closeModals}>
                {t('admin.common.cancel')}
              </Button>
              <Button variant="danger" onClick={handleBanUser}>
                {t('admin.users.ban')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Delete User Modal */}
      {selectedUser && showDeleteModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>{t('admin.users.delete')}: {selectedUser.username}</h3>
              <CloseButton onClick={closeModals}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>{t('admin.users.confirm_delete')}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="default" onClick={closeModals}>
                {t('admin.common.cancel')}
              </Button>
              <Button variant="danger" onClick={closeModals}>
                {t('admin.users.delete')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* User Details Modal */}
      {userDetails && showDetailsModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>{t('admin.users.info')}: {userDetails.username}</h3>
              <CloseButton onClick={closeModals}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>{t('admin.users.role')}</Label>
                <div>{userDetails.role}</div>
              </FormGroup>
              <FormGroup>
                <Label>{t('admin.users.created')}</Label>
                <div>{new Date(userDetails.createdAt).toLocaleDateString()}</div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button variant="default" onClick={closeModals}>
                {t('admin.common.close')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default UsersManagement; 