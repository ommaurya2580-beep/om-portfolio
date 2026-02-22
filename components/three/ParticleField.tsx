'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const count = 3000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.05;
            ref.current.rotation.y = state.clock.elapsedTime * 0.08;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00f5ff"
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

function FloatingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null);
    const mesh2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.3;
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
        }
        if (mesh2Ref.current) {
            mesh2Ref.current.rotation.x = -t * 0.2;
            mesh2Ref.current.rotation.z = t * 0.3;
            mesh2Ref.current.position.y = Math.cos(t * 0.5) * 0.3;
        }
    });

    return (
        <>
            {/* Wireframe icosahedron */}
            <mesh ref={meshRef} position={[3, 0, -2]}>
                <icosahedronGeometry args={[1.2, 1]} />
                <meshBasicMaterial color="#00f5ff" wireframe opacity={0.15} transparent />
            </mesh>
            {/* Wireframe octahedron */}
            <mesh ref={mesh2Ref} position={[-3.5, 0.5, -3]}>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#bf00ff" wireframe opacity={0.15} transparent />
            </mesh>
            {/* Torus */}
            <mesh position={[0, -2, -4]} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2, 0.02, 16, 100]} />
                <meshBasicMaterial color="#00ff88" opacity={0.1} transparent />
            </mesh>
        </>
    );
}

export default function ParticleField() {
    return (
        <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
        >
            <StarField />
            <FloatingGeometry />
        </Canvas>
    );
}
