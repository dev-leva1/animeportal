import { useEffect } from 'react';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const ToastContainer = styled.div<{ variant: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem 1.5rem;
  background-color: ${props => {
    switch(props.variant) {
      case 'success': return '#4CAF50';
      case 'error': return '#f44336';
      case 'info': return '#2196F3';
      default: return '#333';
    }
  }};
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    min-width: auto;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const Message = styled.div`
  flex: 1;
  font-size: 0.95rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

export interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  variant = 'info',
  duration = 5000,
  onClose 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch(variant) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationCircle />;
      case 'info':
        return <FaExclamationCircle />;
      default:
        return null;
    }
  };

  return (
    <ToastContainer variant={variant}>
      <IconWrapper>{getIcon()}</IconWrapper>
      <Message>{message}</Message>
      <CloseButton onClick={onClose}>
        <FaTimes />
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;

