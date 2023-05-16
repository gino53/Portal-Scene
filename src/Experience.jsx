import { shaderMaterial, Sparkles, useTexture, useGLTF, PresentationControls } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import { Howl } from 'howler';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#abdbe3'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience() {
    const { nodes } = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    const sparkles = [];
    for (let i = 0; i < 100; i++) {
        const position = [0, 0.8, -i * 0.1 - 2]
        const scale = [1, 1, 1]
        sparkles.push(
            <Sparkles
                key={i}
                size={6}
                scale={scale}
                position={position}
                speed={0.2}
                color={'#abdbe3'}
            />
        )
    }

    const sound = new Howl({
        src: ['./portal.mp3']
    });

    function portalAudio() {
        if (sound.playing()) {
            sound.pause();
        } else {
            sound.play();
        }
    }

    return <>
        <color args={['#201919']} attach={'background'} />
<fog />
        <PresentationControls global polar={[- 0.2, 0.4]} azimuth={[- 1, 0.75]}>
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh onPointerOver={portalAudio} geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
                <portalMaterial ref={portalMaterial} />
            </mesh>
            {sparkles}
        </PresentationControls>
    </>
}