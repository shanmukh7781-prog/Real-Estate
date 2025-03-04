import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, Text, PerspectiveCamera, Cylinder, Cone, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface PlotProps {
  size: string;
  facing: string;
  viewMode: 'house' | 'plot';
  propertyType?: string;
}

const DirectionalText: React.FC<{ position: [number, number, number]; text: string }> = ({ position, text }) => (
  <Text
    position={position}
    fontSize={1.2}
    color="#1a237e"
    anchorX="center"
    anchorY="middle"
    font={undefined}
    outlineWidth={0.05}
    outlineColor="#ffffff"
    renderOrder={2}
    material-toneMapped={false}
  >
    {text}
  </Text>
);

const DimensionText: React.FC<{ position: [number, number, number]; length: number }> = ({ position, length }) => (
  <Text
    position={position}
    fontSize={1.2} // Increased from 0.8
    color="#000000"
    anchorX="center"
    anchorY="middle"
    font={undefined}
    outlineWidth={0.05} // Increased from 0.03
    outlineColor="#ffffff"
    material-toneMapped={false}
  >
    {`${length.toFixed(1)}m`}
  </Text>
);

const Plot: React.FC<PlotProps> = ({ size, facing, viewMode, propertyType = 'standard' }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [dimensions] = useState(() => {
    const sizeMatch = size.match(/\d+/);
    const sqft = sizeMatch ? parseInt(sizeMatch[0]) : 2400;
    const width = Math.sqrt(sqft) * 0.15;
    const height = width * 0.8; // Adjusted height for better proportions
    return { width, height };
  });
  const boundaryWidth = dimensions.width + 0.2; // Add boundary markers

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.01;
    }
  });

  const getFacingRotation = () => {
    switch(facing.toLowerCase()) {
      case 'north': return 0;
      case 'east': return Math.PI / 2;
      case 'south': return Math.PI;
      case 'west': return -Math.PI / 2;
      case 'north-east': return Math.PI / 4;
      case 'south-east': return (3 * Math.PI) / 4;
      case 'south-west': return -(3 * Math.PI) / 4;
      case 'north-west': return -Math.PI / 4;
      default: return 0;
    }
  };

  return (
    <group ref={meshRef} rotation-y={getFacingRotation()}>
      {/* Direction Indicators with enhanced visibility */}
      <DirectionalText position={[0, 1, dimensions.width + 0.8]} text="N" />
      <DirectionalText position={[0, 1, -(dimensions.width + 0.8)]} text="S" />
      <DirectionalText position={[dimensions.width + 0.8, 1, 0]} text="E" />
      <DirectionalText position={[-(dimensions.width + 0.8), 1, 0]} text="W" />
      
      {/* Dimension Indicators */}
      <DimensionText position={[0, 0.3, dimensions.width/2 + 0.3]} length={dimensions.width * 2} />
      <DimensionText position={[dimensions.width/2 + 0.3, 0.3, 0]} length={dimensions.width * 2} />
      {viewMode === 'plot' ? (
        <group>
          {/* Garden elements for garden view plots */}
          {propertyType?.toLowerCase().includes('garden') && (
            <group>
              {/* Trees */}
              {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, z], i) => (
                <group key={i} position={[x * dimensions.width * 0.3, 0.5, z * dimensions.width * 0.3]}>
                  <Cylinder args={[0.1, 0.15, 1, 8]} castShadow>
                    <meshPhysicalMaterial color="#5D4037" roughness={0.8} />
                  </Cylinder>
                  <Cone args={[0.6, 1.2, 8]} position={[0, 0.8, 0]} castShadow>
                    <meshPhysicalMaterial color="#2E7D32" roughness={0.6} metalness={0.1} />
                  </Cone>
                  <Cone args={[0.5, 1, 8]} position={[0, 1.3, 0]} castShadow>
                    <meshPhysicalMaterial color="#388E3C" roughness={0.6} metalness={0.1} />
                  </Cone>
                  <Cone args={[0.4, 0.8, 8]} position={[0, 1.7, 0]} castShadow>
                    <meshPhysicalMaterial color="#43A047" roughness={0.6} metalness={0.1} />
                  </Cone>
                </group>
              ))}
              {/* Decorative flowers */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = dimensions.width * 0.35;
                return (
                  <group key={i} position={[
                    Math.cos(angle) * radius,
                    0.1,
                    Math.sin(angle) * radius
                  ]}>
                    <Cylinder args={[0.02, 0.02, 0.2, 8]} position={[0, 0.1, 0]} castShadow>
                      <meshPhysicalMaterial color="#558B2F" roughness={0.6} />
                    </Cylinder>
                    <Sphere args={[0.1, 8, 8]} position={[0, 0.25, 0]} castShadow>
                      <meshPhysicalMaterial
                        color={['#E91E63', '#F44336', '#FF9800', '#FFC107'][i % 4]}
                        roughness={0.3}
                        metalness={0.2}
                        clearcoat={1}
                      />
                    </Sphere>
                  </group>
                );
              })}
            </group>
          )}
          {/* Luxury villa elements */}
          {propertyType?.toLowerCase().includes('luxury') && (
            <group>
              {/* Decorative pillars */}
              {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, z], i) => (
                <Box
                  key={i}
                  args={[0.3, 1.5, 0.3]}
                  position={[x * dimensions.width * 0.4, 0.75, z * dimensions.width * 0.4]}
                  castShadow
                >
                  <meshPhysicalMaterial
                    color="#B0BEC5"
                    roughness={0.2}
                    metalness={0.8}
                    clearcoat={1}
                  />
                </Box>
              ))}
              {/* Decorative pathway */}
              <Box
                args={[dimensions.width * 0.3, 0.05, dimensions.width * 0.8]}
                position={[0, 0.03, 0]}
                castShadow
                receiveShadow
              >
                <meshPhysicalMaterial
                  color="#90A4AE"
                  roughness={0.4}
                  metalness={0.6}
                  clearcoat={0.8}
                />
              </Box>
            </group>
          )}
          {/* Plot ground */}
          <Box args={[dimensions.width, 0.05, dimensions.width]} position={[0, -0.025, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#8BC34A"
              roughness={0.8}
              metalness={0.1}
              clearcoat={0.4}
              clearcoatRoughness={0.3}
              envMapIntensity={1}
            />
          </Box>
          {/* Plot surface */}
          <Box args={[dimensions.width * 0.98, 0.1, dimensions.width * 0.98]} position={[0, 0.025, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#B0BEC5"
              roughness={0.5}
              metalness={0.3}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
              envMapIntensity={1.2}
            />
          </Box>
          {/* Plot boundaries */}
          <Box args={[boundaryWidth, 0.15, 0.05]} position={[0, 0.075, dimensions.width/2]} castShadow>
            <meshPhysicalMaterial color="#455A64" roughness={0.5} metalness={0.5} />
          </Box>
          <Box args={[boundaryWidth, 0.15, 0.05]} position={[0, 0.075, -dimensions.width/2]} castShadow>
            <meshPhysicalMaterial color="#455A64" roughness={0.5} metalness={0.5} />
          </Box>
          <Box args={[0.05, 0.15, boundaryWidth]} position={[dimensions.width/2, 0.075, 0]} castShadow>
            <meshPhysicalMaterial color="#455A64" roughness={0.5} metalness={0.5} />
          </Box>
          <Box args={[0.05, 0.15, boundaryWidth]} position={[-dimensions.width/2, 0.075, 0]} castShadow>
            <meshPhysicalMaterial color="#455A64" roughness={0.5} metalness={0.5} />
          </Box>
          <Box args={[0.3, 0.3, 0.05]} position={[0, 0.1, dimensions.width/2]} castShadow>
            <meshPhysicalMaterial
              color="red"
              roughness={0.3}
              metalness={0.7}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Box>
        </group>
      ) : (
        <group>
          {/* House structure */}
          <group position={[0, dimensions.height/2, 0]}>
            {/* Main building */}
            <Box args={[dimensions.width, dimensions.height, dimensions.width]} castShadow receiveShadow>
              <meshPhysicalMaterial
                color="#ECEFF1"
                roughness={0.2}
                metalness={0.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                envMapIntensity={2}
                transmission={0.1}
                transparent
              />
            </Box>
            {/* Windows */}
            {[[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, z], i) => (
              <Box
                key={i}
                args={[dimensions.width * 0.2, dimensions.height * 0.3, 0.1]}
                position={[x * dimensions.width * 0.3, 0, z * dimensions.width * 0.3]}
                rotation={[0, z === 1 ? Math.PI : 0, 0]}
              >
                <meshPhysicalMaterial
                  color="#90CAF9"
                  roughness={0.1}
                  metalness={0.8}
                  clearcoat={1}
                  transparent
                  opacity={0.8}
                  transmission={0.2}
                  envMapIntensity={1.5}
                />
              </Box>
            ))}
          </group>
          {/* Roof */}
          <group position={[0, dimensions.height + 0.5, 0]}>
            <Cone
              args={[dimensions.width * 0.8, dimensions.height * 0.6, 4]}
              rotation={[0, Math.PI / 4, 0]}
              castShadow
            >
              <meshPhysicalMaterial
                color="#37474F"
                roughness={0.4}
                metalness={0.6}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
                envMapIntensity={1.5}
              />
            </Cone>
          </group>
          <Box args={[dimensions.width, 0.05, dimensions.width]} position={[0, 0, 0]} receiveShadow>
            <meshPhysicalMaterial
              color="#4CAF50"
              roughness={0.7}
              metalness={0.1}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
              envMapIntensity={0.8}
            />
          </Box>
          <Box args={[0.3, 0.3, 0.05]} position={[0, 0.1, dimensions.width/2]} castShadow>
            <meshPhysicalMaterial
              color="red"
              roughness={0.3}
              metalness={0.7}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Box>
        </group>
      )}
    </group>
  );
};

interface PropertyModelProps {
  size: string;
  facing: string;
  viewMode: 'house' | 'plot';
  propertyType?: string;
}

const PropertyModel: React.FC<PropertyModelProps> = ({ size, facing, viewMode, propertyType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const preloadScene = async () => {
      try {
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load 3D scene');
      }
    };
    preloadScene();
  }, [size, facing, viewMode]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '300px', maxHeight: 'calc(100vh - 200px)' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      )}
      <Canvas
        camera={{
          position: [8, 6, 8],
          fov: window.innerWidth < 768 ? 60 : 50, // Adjusted FOV for mobile
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'linear-gradient(to bottom, #e2e8f0, #f8fafc)' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 2]}
        className="touch-none" // Added touch-none to prevent unwanted touch events
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005} 
          />
          <directionalLight position={[-10, 12, -10]} intensity={0.8} />
          <hemisphereLight intensity={0.5} groundColor="#000000" />
          <Plot size={size} facing={facing} viewMode={viewMode} propertyType={propertyType} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={3}
            maxDistance={30}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            target={[0, 1, 0]}
            enableDamping
            dampingFactor={0.08}
            zoomSpeed={1.5}
            rotateSpeed={0.6}
            panSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PropertyModel;