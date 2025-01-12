import { useEffect, useState } from 'react';

const useSmoothAppearance = (pawnPromotionInfo: boolean) => {
	const [left, setLeft] = useState('-100%');

	useEffect(() => {
		if (pawnPromotionInfo) {
			const timer = setTimeout(() => setLeft('0'), 100);
			return () => clearTimeout(timer);
		}
	}, [pawnPromotionInfo]);

	return { left,setLeft };
};

export default useSmoothAppearance;
