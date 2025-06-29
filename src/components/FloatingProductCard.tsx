
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
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
  console.log(`FloatingProductCard ${index} initialized at position:`, position);
  
  const [isDragging, setIsDragging] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Physics body for the card
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [2, 2.5, 0.1], // width, height, depth
    material: {
      friction: 0.1,
      restitution: 0.3,
    },
  }));

  const dragStartPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const dragCurrentPos = useRef<THREE.Vector3>(new THREE.Vector3());

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    console.log(`Card ${index} pointer down`);
    setIsDragging(true);
    dragStartPos.current.copy(e.point);
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging) {
      dragCurrentPos.current.copy(e.point);
      // Move the physics body to follow the mouse
      api.position.set(e.point.x, e.point.y, e.point.z);
    }
  };

  const handlePointerUp = (e: any) => {
    if (isDragging) {
      console.log(`Card ${index} thrown`);
      const force = dragCurrentPos.current.clone().sub(dragStartPos.current).multiplyScalar(5);
      // Fix: Ensure we pass exactly 3 elements as a Triplet
      api.applyImpulse([force.x, force.y, force.z] as [number, number, number], [0, 0, 0]);
      setIsDragging(false);
    }
  };

  // Add some random drift
  useFrame(() => {
    if (!isDragging && Math.random() < 0.002) {
      const randomForce: [number, number, number] = [
        (Math.random() - 0.5) * 1, 
        (Math.random() - 0.5) * 1, 
        (Math.random() - 0.5) * 0.5
      ];
      api.applyImpulse(randomForce, [0, 0, 0]);
    }
  });

  return (
    <mesh
      ref={(mesh) => {
        // Assign to both refs properly
        if (mesh) {
          (ref as any).current = mesh;
          meshRef.current = mesh;
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setIsDragging(false)}
    >
      <boxGeometry args={[2, 2.5, 0.1]} />
      <meshStandardMaterial color="orange" transparent opacity={0.1} />
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.1]}
        style={{
          width: '200px',
          height: '250px',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div className="transform scale-50 origin-center">
          <ProductCard product={product} />
        </div>
      </Html>
    </mesh>
  );
}
