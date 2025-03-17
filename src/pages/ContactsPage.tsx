import { useState } from 'react';
import styled from '@emotion/styled';
import { useApp } from '../context/ThemeContext';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#121212'};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Paragraph = styled.p`
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#333333'};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#333333'};
  font-weight: 500;
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#444' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#333' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff5f5f;
  }
`;

const FormContainer = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #ff4040;
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#cccccc' : '#333333'};
`;

function ContactsPage() {
  const { theme, t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Устанавливаем заголовок страницы
  document.title = `${t('footer.contacts')} - ${t('site.name')}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    alert(t('contacts.form_success'));
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <Container>
      <Title theme={theme}>{t('footer.contacts')}</Title>
      
      <Section>
        <SectionTitle theme={theme}>{t('contacts.get_in_touch')}</SectionTitle>
        <Paragraph theme={theme}>{t('contacts.get_in_touch_text')}</Paragraph>
        
        <FormContainer>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label theme={theme}>{t('contacts.name')}</Label>
              <Input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                theme={theme} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('contacts.email')}</Label>
              <Input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                theme={theme} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('contacts.subject')}</Label>
              <Input 
                type="text" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
                theme={theme} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label theme={theme}>{t('contacts.message')}</Label>
              <TextArea 
                name="message" 
                rows={5} 
                value={formData.message}
                onChange={handleChange}
                required 
                theme={theme} 
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              <FaPaperPlane />
              {t('contacts.send')}
            </SubmitButton>
          </ContactForm>
          
          <ContactInfo>
            <SectionTitle theme={theme}>{t('contacts.contact_info')}</SectionTitle>
            
            <ContactItem theme={theme}>
              <FaEnvelope />
              <span>info@animeportal.com</span>
            </ContactItem>
            
            <ContactItem theme={theme}>
              <FaPhone />
              <span>+7 (123) 456-7890</span>
            </ContactItem>
            
            <ContactItem theme={theme}>
              <FaMapMarkerAlt />
              <span>Москва, Россия</span>
            </ContactItem>
          </ContactInfo>
        </FormContainer>
      </Section>
    </Container>
  );
}

export default ContactsPage; 