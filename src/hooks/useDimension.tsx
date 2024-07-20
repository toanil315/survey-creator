import { BREAKPOINTS, DIMENSIONS } from '@/styles/breakpoints';
import { EnumUtils } from '@/utils';
import { useEffect, useRef, useState } from 'react';

type Dimension = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
interface UseDimensionReturn {
  currentDimension: Dimension;
  dimensions: boolean[];
}

const isLessThan = (windowSize: number, breakPoint: number) => windowSize < breakPoint;
const isGreaterOrEqual = (windowSize: number, breakPoint: number) => windowSize >= breakPoint;

export const useDimension = (): UseDimensionReturn => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [currentDimension, setCurrentDimension] = useState<Dimension>('' as 'xs');
  const windowResizeDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (windowResizeDebounceRef.current) {
        clearTimeout(windowResizeDebounceRef.current);
      }
      windowResizeDebounceRef.current = setTimeout(() => {
        setWindowSize(window.innerWidth);
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleGetDimension();
  }, [windowSize]);

  const handleGetDimension = () => {
    if (isLessThan(windowSize, BREAKPOINTS.sm)) {
      setCurrentDimension('xs');
      return;
    }

    const breakPoints = EnumUtils.numericEnumToArray(BREAKPOINTS);
    for (let i = 0; i < breakPoints.length; i++) {
      const currentBreakPoint = breakPoints[i];
      if (isGreaterOrEqual(windowSize, currentBreakPoint.value)) {
        setCurrentDimension(currentBreakPoint.key as Dimension);
      }
    }
  };

  return {
    currentDimension,
    dimensions: EnumUtils.getStringEnumKeys(DIMENSIONS).map((d) => currentDimension === d),
  };
};
