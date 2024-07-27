import { useState, Fragment, useEffect } from 'react'
import './App.css'
import { createApi } from "unsplash-js"


const api = createApi({
  accessKey: "e1uyUwS-ZeVJucBPfEHg1tKtwYpH5apYxBCWZI1fBkY"
})



function StaggeredGrid(photos, columns = 2) {
  

  return(
    
    <div className='.staggered-grid' >
    {photos.map(a => {
    
    (<li key={a.id}><img  src={a.urls.regular} /> </li>  )
    })}
    </div>
  
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
