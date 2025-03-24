import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { adminService } from '../../services/adminService';
import { AnimeContent } from '../../types/admin';
import { FaSearch, FaEdit, FaTrash, FaEye, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

interface AnimeManagementProps {
  theme: string;
  t: (key: string) => string;
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
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f8f8'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ff5f5f;
  color: white;
  
  &:hover {
    background-color: #ff4545;
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
  background-color: ${props => props.active ? '#ff5f5f' : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.active ? '#ffffff' : props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#ff4545' : props.theme === 'dark' ? '#383838' : '#e0e0e0'};
  }
`;

const AnimeTable = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  padding: 1rem;
  font-weight: 600;
`;

const TableCell = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#383838' : '#f8f8f8'};
  }
`;

const AnimeTitle = styled.div`
  font-weight: 500;
`;

const ViewCount = styled.div`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span<{status: string}>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  
  background-color: ${props => {
    switch(props.status) {
      case 'approved': return '#7ed321';
      case 'pending': return '#f5a623';
      case 'rejected': return '#d0021b';
      default: return '#9e9e9e';
    }
  }};
  color: white;
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
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
  
  &.edit {
    background-color: #4a90e2;
    color: white;
    
    &:hover {
      background-color: #3a80d2;
    }
  }
  
  &.approve {
    background-color: #7ed321;
    color: white;
    
    &:hover {
      background-color: #6ec311;
    }
  }
  
  &.reject {
    background-color: #d0021b;
    color: white;
    
    &:hover {
      background-color: #c0020b;
    }
  }
  
  &.delete {
    background-color: #d0021b;
    color: white;
    
    &:hover {
      background-color: #c0020b;
    }
  }
  
  &.view {
    background-color: #9013fe;
    color: white;
    
    &:hover {
      background-color: #8003ee;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
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
  background-color: ${props => props.active ? '#ff5f5f' : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.active ? '#ffffff' : props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:hover {
    background-color: ${props => props.active ? '#ff4545' : props.theme === 'dark' ? '#383838' : '#e0e0e0'};
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
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
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

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#9e9e9e' : '#757575'};
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme === 'dark' ? '#383838' : '#f8f8f8'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme === 'dark' ? '#383838' : '#f8f8f8'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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
      default: return props.theme === 'dark' ? '#383838' : '#e0e0e0';
    }
  }};
  
  color: ${props => {
    switch(props.variant) {
      case 'primary':
      case 'danger':
        return '#ffffff';
      default:
        return props.theme === 'dark' ? '#ffffff' : '#1a1a1a';
    }
  }};
  
  &:hover {
    background-color: ${props => {
      switch(props.variant) {
        case 'primary': return '#ff4545';
        case 'danger': return '#c0020b';
        default: return props.theme === 'dark' ? '#444' : '#d0d0d0';
      }
    }};
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#9e9e9e' : '#757575'};
`;

const AnimeManagement = ({ theme, t }: AnimeManagementProps) => {
  const [animeList, setAnimeList] = useState<AnimeContent[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<AnimeContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<AnimeContent | null>(null);
  const [newStatus, setNewStatus] = useState<'approved' | 'pending' | 'rejected'>('approved');

  const animePerPage = 10;

  useEffect(() => {
    loadAnime();
  }, [currentPage, selectedStatus]);

  useEffect(() => {
    if (searchQuery) {
      filterAnime();
    } else {
      setFilteredAnime(animeList);
    }
  }, [searchQuery, animeList]);

  const loadAnime = async () => {
    try {
      const status = selectedStatus !== 'all' ? selectedStatus as 'approved' | 'pending' | 'rejected' : 'all';
      const { content, total } = await adminService.getContent('anime', currentPage, animePerPage, status);
      setAnimeList(content as AnimeContent[]);
      setFilteredAnime(content as AnimeContent[]);
      setTotalPages(Math.ceil(total / animePerPage));
    } catch (error) {
      console.error('Failed to load anime:', error);
    }
  };

  const filterAnime = () => {
    const filtered = animeList.filter(anime => 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAnime(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openStatusModal = (anime: AnimeContent) => {
    setSelectedAnime(anime);
    setNewStatus(anime.status);
    setShowStatusModal(true);
  };

  const openDeleteModal = (anime: AnimeContent) => {
    setSelectedAnime(anime);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowDeleteModal(false);
    setShowStatusModal(false);
    setSelectedAnime(null);
    setNewStatus('approved');
  };

  const handleStatusChange = async () => {
    if (!selectedAnime) return;
    
    try {
      await adminService.updateContentStatus(selectedAnime.id, 'anime', newStatus);
      // Reload anime to get updated data
      loadAnime();
      closeModals();
    } catch (error) {
      console.error('Failed to update anime status:', error);
    }
  };

  return (
    <Container>
      <Header>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder={t('admin.anime.search')}
            value={searchQuery}
            onChange={handleSearchChange}
            theme={theme}
          />
        </SearchBar>
        <AddButton onClick={() => {}}>
          {t('admin.anime.add')}
        </AddButton>
      </Header>

      <Filters>
        <FilterButton
          active={selectedStatus === 'all'}
          onClick={() => setSelectedStatus('all')}
          theme={theme}
        >
          {t('admin.filters.all')}
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'approved'}
          onClick={() => setSelectedStatus('approved')}
          theme={theme}
        >
          {t('admin.anime.status.approved')}
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'pending'}
          onClick={() => setSelectedStatus('pending')}
          theme={theme}
        >
          {t('admin.anime.status.pending')}
        </FilterButton>
        <FilterButton
          active={selectedStatus === 'rejected'}
          onClick={() => setSelectedStatus('rejected')}
          theme={theme}
        >
          {t('admin.anime.status.rejected')}
        </FilterButton>
      </Filters>

      <AnimeTable>
        <TableHeader theme={theme}>
          <TableCell>{t('admin.anime.id')}</TableCell>
          <TableCell>{t('admin.anime.title')}</TableCell>
          <TableCell>{t('admin.anime.status')}</TableCell>
          <TableCell>{t('admin.anime.views')}</TableCell>
          <TableCell>{t('admin.anime.added_date')}</TableCell>
          <TableCell>{t('admin.anime.actions')}</TableCell>
        </TableHeader>
        
        {filteredAnime.length > 0 ? (
          filteredAnime.map(anime => (
            <TableRow key={anime.id} theme={theme}>
              <TableCell>{anime.id}</TableCell>
              <TableCell>
                <AnimeTitle>{anime.title}</AnimeTitle>
              </TableCell>
              <TableCell>
                <StatusBadge status={anime.status}>
                  {anime.status === 'approved' && <FaCheckCircle />}
                  {anime.status === 'pending' && <FaExclamationCircle />}
                  {anime.status === 'rejected' && <FaTimesCircle />}
                  {t(`admin.anime.status.${anime.status}`)}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <ViewCount>
                  <FaEye />
                  {anime.views.toLocaleString()}
                </ViewCount>
              </TableCell>
              <TableCell>
                {new Date(anime.addedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <ActionsCell>
                  <ActionButton className="view" onClick={() => window.open(`/anime/${anime.id}`, '_blank')}>
                    <FaEye />
                  </ActionButton>
                  <ActionButton className="edit">
                    <FaEdit />
                  </ActionButton>
                  <ActionButton className="approve" onClick={() => openStatusModal(anime)}>
                    <FaCheckCircle />
                  </ActionButton>
                  <ActionButton className="delete" onClick={() => openDeleteModal(anime)}>
                    <FaTrash />
                  </ActionButton>
                </ActionsCell>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyState theme={theme}>
            <p>{t('admin.common.no_results')}</p>
          </EmptyState>
        )}
      </AnimeTable>

      <Pagination>
        <PageButton 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          theme={theme}
        >
          {t('admin.pagination.prev')}
        </PageButton>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = i + 1;
          } else if (currentPage <= 3) {
            pageNumber = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
          } else {
            pageNumber = currentPage - 2 + i;
          }
          
          return (
            <PageButton 
              key={pageNumber}
              active={currentPage === pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              theme={theme}
            >
              {pageNumber}
            </PageButton>
          );
        })}
        
        <PageButton 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          theme={theme}
        >
          {t('admin.pagination.next')}
        </PageButton>
      </Pagination>

      {/* Модальное окно для изменения статуса */}
      {showStatusModal && selectedAnime && (
        <Modal>
          <ModalContent theme={theme}>
            <ModalHeader>
              <ModalTitle theme={theme}>{t('admin.anime.change_status')}</ModalTitle>
              <CloseButton onClick={closeModals} theme={theme}>&times;</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label theme={theme}>{t('admin.anime.title')}</Label>
              <Input 
                type="text" 
                value={selectedAnime.title} 
                disabled 
                theme={theme}
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('admin.anime.status')}</Label>
              <Select 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value as 'approved' | 'pending' | 'rejected')}
                theme={theme}
              >
                <option value="approved">{t('admin.anime.status.approved')}</option>
                <option value="pending">{t('admin.anime.status.pending')}</option>
                <option value="rejected">{t('admin.anime.status.rejected')}</option>
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button 
                variant="default" 
                onClick={closeModals}
                theme={theme}
              >
                {t('admin.common.cancel')}
              </Button>
              <Button 
                variant="primary" 
                onClick={handleStatusChange}
                theme={theme}
              >
                {t('admin.common.save')}
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {/* Модальное окно для удаления аниме */}
      {showDeleteModal && selectedAnime && (
        <Modal>
          <ModalContent theme={theme}>
            <ModalHeader>
              <ModalTitle theme={theme}>{t('admin.anime.confirm_delete')}</ModalTitle>
              <CloseButton onClick={closeModals} theme={theme}>&times;</CloseButton>
            </ModalHeader>
            
            <p style={{ marginBottom: '1.5rem' }}>
              {t('admin.anime.confirm_delete_message')} "{selectedAnime.title}"?
            </p>
            
            <ButtonGroup>
              <Button 
                variant="default" 
                onClick={closeModals}
                theme={theme}
              >
                {t('admin.common.cancel')}
              </Button>
              <Button 
                variant="danger" 
                onClick={closeModals}
                theme={theme}
              >
                {t('admin.common.delete')}
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AnimeManagement; 