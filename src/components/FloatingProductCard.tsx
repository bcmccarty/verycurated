
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox, usePlane } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import * as THREE from 'three';

interface FloatingProductCardProps {
  product: Product;
  position: [number, number, number];
  index: number;
}

export function FloatingProductCard({ product, position, index }: FloatingProductCardProps) {
  const { viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  
  // Physics body for the card
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [2, 2.5, 0.1], // width, height, depth
    material: {
      friction: 0.1,
      restitution: 0.3,
    },
  })) as any;

  // Create invisible walls to contain the cards
  usePlane(() => ({ position: [viewport.width / 2 + 1, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
  usePlane(() => ({ position: [-viewport.width / 2 - 1, 0, 0], rotation: [0, Math.PI / 2, 0] }));
  usePlane(() => ({ position: [0, viewport.height / 2 + 1, 0], rotation: [-Math.PI / 2, 0, 0] }));
  usePlane(() => ({ position: [0, -viewport.height / 2 - 1, 0], rotation: [Math.PI / 2, 0, 0] }));

  const dragStartPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const dragCurrentPos = useRef<THREE.Vector3>(new THREE.Vector3());

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current.copy(e.point);
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging) {
      dragCurrentPos.current.copy(e.point);
    }
  };

  const handlePointerUp = (e: any) => {
    if (isDragging) {
      const force = dragCurrentPos.current.clone().sub(dragStartPos.current).multiplyScalar(10);
      api.applyImpulse([force.x, force.y, 0], [0, 0, 0]);
      setIsDragging(false);
    }
  };

  // Add some random drift
  useFrame(() => {
    if (!isDragging && Math.random() < 0.001) {
      const randomForce = [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, 0];
      api.applyImpulse(randomForce, [0, 0, 0]);
    }
  });

  return (
    <mesh
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setIsDragging(false)}
    >
      <boxGeometry args={[2, 2.5, 0.1]} />
      <meshBasicMaterial transparent opacity={0} />
      <Html
        transform
        occlude
        position={[0, 0, 0.1]}
        style={{
          width: '300px',
          height: '375px',
          pointerEvents: isDragging ? 'none' : 'auto',
          cursor: 'grab',
        }}
      >
        <div className="transform scale-75 origin-center">
          <ProductCard product={product} />
        </div>
      </Html>
    </mesh>
  );
}
