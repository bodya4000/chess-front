import React, { createContext, useState } from 'react';

type FigurePositions = Record<string, [number, number, number]>;

interface FigurePositionContextType {
	positions: FigurePositions;
	setPositions: React.Dispatch<React.SetStateAction<FigurePositions>>;
}

export const FigurePositionContext = createContext<FigurePositionContextType | undefined>(undefined);

export const FigurePositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [positions, setPositions] = useState<FigurePositions>({});

	return (
		<FigurePositionContext.Provider value={{ positions, setPositions }}>
			{children}
		</FigurePositionContext.Provider>
	);
};

