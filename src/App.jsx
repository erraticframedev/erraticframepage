import { useState, useRef, useEffect } from 'react'
import './App.css'
import { createApi } from "unsplash-js"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'


const api = createApi({
  accessKey: "e1uyUwS-ZeVJucBPfEHg1tKtwYpH5apYxBCWZI1fBkY"
})

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (
    ref.current.rotation.x += delta,
    ref.current.rotation.y += delta
    ))

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      >
      
      <sphereGeometry args={[1.5, 16, 16]}  />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} stencilWrite={true} wireframe={true}   />
  
      
      
    </mesh>
  )
}

function StaggeredGrid({photos}, columns = 2) {
  return(
    
    <Splide options={{
      
      arrows:false,
      type: "slide",
      focus: "center",
      perMove:1,
      
    
      waitForTransition:true,
      isNavigation:true,
      wheel: true,
      focusableNodes:"img",
      live:true,  
      perPage:3,
      height: "15rem",
      rewind: true,
      gap: "0rem",
      trimSpace:false,
      pagination:false,
    }}>
    {photos.map((a) => 
  
    (
      <SplideSlide key={a.id}>
        <img  src={a.urls.regular} />
      </SplideSlide>
    
    ) 
    )}
    </Splide>
  
  )
}

function App() {
  const [unsplashResult, setPhotosResponse] = useState(null);

  api.users.getPhotos
  useEffect(() => {
    api.users
      .getPhotos({
        username: "erraticframe",
      
        stats: true
      })
      .then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  if (unsplashResult === null) {
    return <div>Loading...</div>;
  } else if (unsplashResult.errors) {
    return (
      <div>
        <div>{unsplashResult.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <>
       <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>
      
      <StaggeredGrid 
      photos = {unsplashResult.response.results}
       columns = {2} />

</>
    )
  }
}

export default App
