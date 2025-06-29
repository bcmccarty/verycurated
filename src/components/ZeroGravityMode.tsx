
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { Product } from '@/lib/types';
import { FloatingProductCard } from './FloatingProductCard';

interface ZeroGravityModeProps {
  products: Product[];
}

export function ZeroGravityMode({ products }: ZeroGravityModeProps) {
  console.log('ZeroGravityMode rendered with products:', products.length);

  // Generate random positions for each card
  const getRandomPosition = (index: number): [number, number, number] => {
    const gridCols = Math.ceil(Math.sqrt(products.length));
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    
    return [
      (col - gridCols / 2) * 3 + (Math.random() - 0.5) * 2,
      (row - Math.ceil(products.length / gridCols) / 2) * -3 + (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ];
  };

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-blue-900 via-black to-purple-900">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ 
          background: 'transparent',
          width: '100vw',
          height: '100vh'
        }}
        onCreated={({ gl }) => {
          console.log('Canvas created successfully');
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, 10]} intensity={0.4} />
          
          <Physics
            gravity={[0, -0.5, 0]}
            defaultContactMaterial={{
              friction: 0.1,
              restitution: 0.3,
            }}
          >
            {products.map((product, index) => {
              console.log(`Rendering floating card ${index} for product:`, product.title);
              return (
                <FloatingProductCard
                  key={product.id}
                  product={product}
                  position={getRandomPosition(index)}
                  index={index}
                />
              );
            })}
          </Physics>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={20}
            minDistance={5}
          />
        </Suspense>
      </Canvas>
      
      {/* Instruction overlay */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-center z-50">
        <p className="text-lg font-semibold mb-2">🚀 Zero Gravity Mode Active! 🚀</p>
        <p className="text-sm opacity-80">Drag cards to throw them • Scroll to zoom • Click and drag to look around</p>
      </div>
      
      {/* Debug info */}
      <div className="absolute bottom-4 left-4 text-white text-xs z-50">
        <p>Products loaded: {products.length}</p>
        <p>Canvas should be visible above this text</p>
      </div>
    </div>
  );
}
