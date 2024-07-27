import { useState, Fragment, useEffect } from 'react'
import './App.css'
import { createApi } from "unsplash-js"


const api = createApi({
  accessKey: fff
})



function StaggeredGrid(data, columns = 2) {
  

  return(
    <>
    <div className='staggeredGrid'>
    {data.map(a => {
    const { id, user, urls } = a
    
    return ( <img key={id} src={urls.regular} /> )
   }
    )}
    </div>
    </>
  )
}

function App() {
  const [data, setPhotosResponse] = useState(null);

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

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <StaggeredGrid data = {data.response.results} />
    )
  }
}

export default App
