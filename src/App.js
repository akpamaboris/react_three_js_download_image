import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import React, { useRef, useState } from "react";
import canvasToImage from "canvas-to-image";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function App() {
  const takePicture = useRef(null);
  const canvasEl = document.getElementById("myCanvas");

  return (
    <>
      <Canvas
        id="myCanvas"
        ref={takePicture}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <button
        onClick={() => {
          var canvas = document.querySelector("canvas");
          var link = document.createElement("a");
          link.innerHTML = "download image";
          link.href = canvas.toDataURL();
          console.log(canvas.toDataURL());
          link.download = "mypainting.png";
          link.click();
        }}
      >
        {" "}
        HEY
      </button>
    </>
  );
}

export default App;
