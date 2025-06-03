import { useState, useEffect, memo } from 'react';
import styled from '@emotion/styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img<{ isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isLoaded ? 1 : 0};
`;

const PlaceholderDiv = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${props => props.isVisible ? 'loading 1.5s infinite' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9rem;
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const LazyImage = memo(({
  src,
  alt,
  placeholder = 'Загрузка...',
  className,
  style,
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isVisible && !imageSrc && !hasError) {
      setImageSrc(src);
    }
  }, [isVisible, src, imageSrc, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <ImageContainer ref={elementRef} className={className} style={style}>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          isLoaded={isLoaded}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {(!isLoaded || hasError) && (
        <PlaceholderDiv isVisible={isVisible}>
          {hasError ? 'Ошибка загрузки' : placeholder}
        </PlaceholderDiv>
      )}
    </ImageContainer>
  );
});

export default LazyImage; 