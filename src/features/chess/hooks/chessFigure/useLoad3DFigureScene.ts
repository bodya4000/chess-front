import { useGLTF } from '@react-three/drei';

const useLoad3DFigureScene = (figure: string) => {
	const modelPaths: Record<string, string> = {
		king: 'assets/models/king.glb',
		queen: 'assets/models/queen.glb',
		rook: 'assets/models/rook.glb',
		bishop: 'assets/models/bishop.glb',
		knight: 'assets/models/knight.glb',
		pawn: 'assets/models/pawn.glb',
	};

	const gltf = useGLTF(modelPaths[figure] || modelPaths.pawn);
	const clonedScene = gltf.scene.clone();

	return { scene: clonedScene };
};

export default useLoad3DFigureScene;
