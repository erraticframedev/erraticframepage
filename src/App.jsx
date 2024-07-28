import { useState, Fragment, useEffect } from 'react'
import './App.css'
import { createApi } from "unsplash-js"
import { Splide, SplideSlide } from "@splidejs/react-splide"


const api = createApi({
  accessKey: "e1uyUwS-ZeVJucBPfEHg1tKtwYpH5apYxBCWZI1fBkY"
})



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
        orientation: "landscape",
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
      <StaggeredGrid 
      photos = {unsplashResult.response.results}
       columns = {2} />
    )
  }
}

export default App
