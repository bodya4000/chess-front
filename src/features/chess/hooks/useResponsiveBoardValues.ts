import { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive';

const useResponsiveBoardValues = () => {
	const isLargeScreen = useMediaQuery({ query: '(min-width: 901px)' });
	const isMediumScreen = useMediaQuery({ query: '(max-width: 900px) and (min-width: 768px)' });
	const isSmallScreen = useMediaQuery({ query: '(max-width: 767px) and (min-width: 489px)' });
	const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 488px)' });

	const baseCellSize = 1.5;
	const responsiveCellSize = useMemo(() => {
		if (isLargeScreen) return baseCellSize;
		if (isMediumScreen) return baseCellSize * 0.8;
		if (isSmallScreen) return baseCellSize * 0.6;
		if (isExtraSmallScreen) return baseCellSize * 0.4;
		return baseCellSize;
	}, [isLargeScreen, isMediumScreen, isSmallScreen, isExtraSmallScreen]);

	return { cellSize: responsiveCellSize };
};

export default useResponsiveBoardValues;
