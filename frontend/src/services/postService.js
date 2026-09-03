export const getPosts =  async () => {
        
  const response = await fetch("http://localhost:3000/posts");
  
  if(!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  
  const data = await response.json();
  return data;
}

export const getPostById = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`);

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
}

export const addPost = async (post) => {
  
  const formData = new FormData();
  
  formData.append('communityId', post.communityId);
  formData.append('title', post.title);
  formData.append('description', post.description);
  formData.append('genre', post.genre);
  formData.append('mediaDimension', post.mediaDimension);
  formData.append('tags', JSON.stringify(post.tags));

  post.images.forEach((image) => {
    formData.append('images', image);
  })

  if(post.video) {
    formData.append('video', post.video);
  }
  
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    credentials: "include",
    body: formData
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error (errorData.message);
  }

  return response.json();
}

export const deletePost = async (id) => {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message);
  }

  return response.json();
}
  

    