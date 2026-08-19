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
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error (error.message);
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
  

    