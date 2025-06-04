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
  color: ${props => props.theme.text.primary};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Paragraph = styled.p`
  color: ${props => props.theme.text.secondary};
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
  color: ${props => props.theme.text.secondary};
  font-weight: 500;
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border.primary};
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
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
  color: ${props => props.theme.text.secondary};
`;

function ContactsPage() {
  const { t } = useApp();
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
      <Title>{t('footer.contacts')}</Title>
      
      <Section>
        <SectionTitle>{t('contacts.get_in_touch')}</SectionTitle>
        <Paragraph>{t('contacts.get_in_touch_text')}</Paragraph>
        
        <FormContainer>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>{t('contacts.name')}</Label>
              <Input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>{t('contacts.email')}</Label>
              <Input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>{t('contacts.subject')}</Label>
              <Input 
                type="text" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>{t('contacts.message')}</Label>
              <TextArea 
                name="message" 
                rows={5} 
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              <FaPaperPlane />
              {t('contacts.send')}
            </SubmitButton>
          </ContactForm>
          
          <ContactInfo>
            <SectionTitle>{t('contacts.contact_info')}</SectionTitle>
            
            <ContactItem>
              <FaEnvelope />
              <span>info@animeportal.com</span>
            </ContactItem>
            
            <ContactItem>
              <FaPhone />
              <span>+7 (123) 456-7890</span>
            </ContactItem>
            
            <ContactItem>
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