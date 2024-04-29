import { Suspense, useEffect, useState} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

import CanvasLoader from '../Loader';


const Computers = ({ isMobile }) => {
  const computer = useGLTF('./blackhole/scene.gltf');
  const meshRef = useRef(); // Reference to the mesh object
  const [isAnimating, setIsAnimating] = useState(true);

  // Rotate the model every frame
  useFrame(() => {
    if (isAnimating) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} onClick={() => setIsAnimating(!isAnimating)}>
      <primitive
        object={computer.scene}
        scale={isMobile ? 1.7 : 2.}
        position={isMobile ? [-0.4, -0.9, -1.2] : [0, -1.25, -1.5]}
        rotation={[0.1, 0.8, 0.1]}
      />

    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);    
    }
  }, [])
  
  return (
    <Canvas
      frameloop='always'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas