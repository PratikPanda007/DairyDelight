
import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

// Note: This component expects a glb/gltf 3D model file
// In a real app, you would have proper models for each product
// For now, we'll use a fallback model for demonstration purposes

interface ModelViewerProps {
  modelUrl: string;
}

function Model({ modelUrl }: ModelViewerProps) {
  const groupRef = useRef(null);
  
  // Instead of loading potentially missing models, we'll use simple geometry
  useEffect(() => {
    // Add animation effect when component loads
    if (groupRef.current) {
      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }, []);
  
  // Gentle continuous rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[1, 1, 2.5, 32]} />
        <meshStandardMaterial color="#f8f8f8" />
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </mesh>
    </group>
  );
}

// Fallback component if no model URL is provided
function FallbackModel() {
  const meshRef = useRef(null);
  
  useEffect(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.position, {
        y: -2,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    }
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 2.5, 32]} />
      <meshStandardMaterial color="#f8f8f8" />
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </mesh>
  );
}

export function ProductModel({ modelUrl }: { modelUrl?: string }) {
  return (
    <div className="h-72 w-full rounded-lg overflow-hidden bg-cream-100 dark:bg-gray-800">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Suspense fallback={null}>
          {modelUrl ? <Model modelUrl={modelUrl} /> : <FallbackModel />}
        </Suspense>
      </Canvas>
    </div>
  );
}
