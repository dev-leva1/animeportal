import { useState, useMemo, useCallback, memo } from 'react';
import styled from '@emotion/styled';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

const Container = styled.div<{ height: number }>`
  height: ${props => props.height}px;
  overflow-y: auto;
  position: relative;
`;

const InnerContainer = styled.div<{ height: number }>`
  height: ${props => props.height}px;
  position: relative;
`;

const ItemContainer = styled.div<{ top: number }>`
  position: absolute;
  top: ${props => props.top}px;
  left: 0;
  right: 0;
`;

export const VirtualList = memo(<T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = useMemo(() => items.length * itemHeight, [items.length, itemHeight]);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    const { startIndex, endIndex } = visibleRange;
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index
    }));
  }, [items, visibleRange]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <Container
      height={containerHeight}
      onScroll={handleScroll}
      className={className}
    >
      <InnerContainer height={totalHeight}>
        {visibleItems.map(({ item, index }) => (
          <ItemContainer
            key={index}
            top={index * itemHeight}
          >
            {renderItem(item, index)}
          </ItemContainer>
        ))}
      </InnerContainer>
    </Container>
  );
}) as <T>(props: VirtualListProps<T>) => React.ReactElement;

export default VirtualList; 