import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { adminService } from '../../services/adminService';
import { SystemSettings as SystemSettingsType } from '../../types/admin';
import { FaSave, FaUndo, FaPalette, FaCog, FaGlobe, FaKey } from 'react-icons/fa';

interface SystemSettingsProps {
  t: (key: string) => string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.background.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{variant?: 'primary' | 'danger' | 'default'}>`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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

const ColorInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ColorPreview = styled.div<{color: string}>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Switch = styled.div<{checked: boolean}>`
  width: 50px;
  height: 24px;
  background-color: ${props => props.checked ? '#7ed321' : '#d0021b'};
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

const SwitchLabel = styled.div`
  font-weight: 500;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  flex: 1;
`;

const ApiKeyRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ApiKeyName = styled.div`
  flex: 1;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
  padding: 0.75rem;
  border-radius: 4px;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
`;

const ApiKeyValue = styled.div`
  flex: 2;
  border: 1px solid ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f8f8f8'};
  padding: 0.75rem;
  border-radius: 4px;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddApiKeyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px dashed ${props => props.theme.mode === 'dark' ? '#444' : '#e0e0e0'};
  background-color: transparent;
  width: 100%;
  cursor: pointer;
  color: ${props => props.theme.text.muted};
  transition: all 0.3s ease;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#383838' : '#f0f0f0'};
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1a1a1a'};
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(126, 211, 33, 0.2);
  color: #7ed321;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SystemSettings = ({ t }: SystemSettingsProps) => {
  const [settings, setSettings] = useState<SystemSettingsType>({
    siteName: '',
    siteDescription: '',
    maintenanceMode: false,
    registrationEnabled: true,
    commentsEnabled: true,
    apiKeys: [],
    themeSettings: {
      primaryColor: '#ff5f5f',
      secondaryColor: '#4a90e2',
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a'
    }
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getSystemSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await adminService.updateSystemSettings(settings);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    loadSettings();
  };

  const handleAddApiKey = () => {
    setSettings(prev => ({
      ...prev,
      apiKeys: [...prev.apiKeys, { name: '', value: '' }]
    }));
  };

  const handleRemoveApiKey = (index: number) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.filter((_, i) => i !== index)
    }));
  };

  const handleApiKeyChange = (index: number, field: 'name' | 'value', value: string) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.map((key, i) => 
        i === index ? { ...key, [field]: value } : key
      )
    }));
  };

  return (
    <Container>
      <SettingsForm onSubmit={handleSubmit}>
        {showSuccess && (
          <SuccessMessage>
            <FaSave /> {t('admin.settings.save_success')}
          </SuccessMessage>
        )}

        <Card>
          <CardHeader>
            <FaGlobe />
            <CardTitle>{t('admin.settings.general')}</CardTitle>
          </CardHeader>

          <FormGroup>
            <Label>{t('admin.settings.site_name')}</Label>
            <Input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
            />
          </FormGroup>

          <FormGroup>
            <Label>{t('admin.settings.site_description')}</Label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
            />
          </FormGroup>
        </Card>

        <Card>
          <CardHeader>
            <FaCog />
            <CardTitle>{t('admin.settings.features')}</CardTitle>
          </CardHeader>

          <FormGroup>
            <SwitchContainer onClick={() => setSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}>
              <SwitchLabel>{t('admin.settings.maintenance_mode')}</SwitchLabel>
              <Switch checked={settings.maintenanceMode} />
            </SwitchContainer>
          </FormGroup>

          <FormGroup>
            <SwitchContainer onClick={() => setSettings(prev => ({ ...prev, registrationEnabled: !prev.registrationEnabled }))}>
              <SwitchLabel>{t('admin.settings.registration_enabled')}</SwitchLabel>
              <Switch checked={settings.registrationEnabled} />
            </SwitchContainer>
          </FormGroup>

          <FormGroup>
            <SwitchContainer onClick={() => setSettings(prev => ({ ...prev, commentsEnabled: !prev.commentsEnabled }))}>
              <SwitchLabel>{t('admin.settings.comments_enabled')}</SwitchLabel>
              <Switch checked={settings.commentsEnabled} />
            </SwitchContainer>
          </FormGroup>
        </Card>

        <Card>
          <CardHeader>
            <FaKey />
            <CardTitle>{t('admin.settings.api_keys')}</CardTitle>
          </CardHeader>

          {settings.apiKeys.map((key, index) => (
            <ApiKeyRow key={index}>
              <ApiKeyName>
                <Input
                  type="text"
                  value={key.name}
                  onChange={(e) => handleApiKeyChange(index, 'name', e.target.value)}
                  placeholder={t('admin.settings.api_key_name')}
                />
              </ApiKeyName>
              <ApiKeyValue>
                <Input
                  type="text"
                  value={key.value}
                  onChange={(e) => handleApiKeyChange(index, 'value', e.target.value)}
                  placeholder={t('admin.settings.api_key_value')}
                />
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => handleRemoveApiKey(index)}
                >
                  {t('admin.common.delete')}
                </Button>
              </ApiKeyValue>
            </ApiKeyRow>
          ))}

          <AddApiKeyButton onClick={handleAddApiKey}>
            <FaKey /> {t('admin.settings.add_api_key')}
          </AddApiKeyButton>
        </Card>

        <Card>
          <CardHeader>
            <FaPalette />
            <CardTitle>{t('admin.settings.theme')}</CardTitle>
          </CardHeader>

          <FormGroup>
            <Label>{t('admin.settings.primary_color')}</Label>
            <ColorInput>
              <ColorPreview color={settings.themeSettings.primaryColor} />
              <Input
                type="text"
                value={settings.themeSettings.primaryColor}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  themeSettings: { ...prev.themeSettings, primaryColor: e.target.value }
                }))}
              />
            </ColorInput>
          </FormGroup>

          <FormGroup>
            <Label>{t('admin.settings.secondary_color')}</Label>
            <ColorInput>
              <ColorPreview color={settings.themeSettings.secondaryColor} />
              <Input
                type="text"
                value={settings.themeSettings.secondaryColor}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  themeSettings: { ...prev.themeSettings, secondaryColor: e.target.value }
                }))}
              />
            </ColorInput>
          </FormGroup>

          <FormGroup>
            <Label>{t('admin.settings.background_color')}</Label>
            <ColorInput>
              <ColorPreview color={settings.themeSettings.backgroundColor} />
              <Input
                type="text"
                value={settings.themeSettings.backgroundColor}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  themeSettings: { ...prev.themeSettings, backgroundColor: e.target.value }
                }))}
              />
            </ColorInput>
          </FormGroup>

          <FormGroup>
            <Label>{t('admin.settings.text_color')}</Label>
            <ColorInput>
              <ColorPreview color={settings.themeSettings.textColor} />
              <Input
                type="text"
                value={settings.themeSettings.textColor}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  themeSettings: { ...prev.themeSettings, textColor: e.target.value }
                }))}
              />
            </ColorInput>
          </FormGroup>
        </Card>

        <ButtonGroup>
          <Button type="button" variant="default" onClick={handleReset}>
            <FaUndo /> {t('admin.common.reset')}
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            <FaSave /> {t('admin.common.save')}
          </Button>
        </ButtonGroup>
      </SettingsForm>
    </Container>
  );
};

export default SystemSettings; 