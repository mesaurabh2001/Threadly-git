



///////////////////////////////////////////////////////////
export const getCommunityById = async (id) => {
  const response = await fetch(`http://localhost:3000/communities/${id}`);

  if(!response.ok){
    throw new Error('Failed to fetch community');
  }
  
  const data = await response.json();
  console.log(data);
  return data;
}

///////////////////////////////////////////////////////////
export const getCommunitiesSummaries = async () => {
  const response = await fetch('http://localhost:3000/communities/summaries');

  if(!response.ok){
    throw new Error('Failed to fetch community summaries');
  }
  
  return response.json();
}

///////////////////////////////////////////////////////////
export const getCommunityPosts = async (id) => {
  const response = await fetch(`http://localhost:3000/communities/${id}/posts`);
  
  if(!response.ok) {
    const errorData = await response.json();
    throw new Error (errorData.message);
  }
  
  return response.json();
}

///////////////////////////////////////////////////////////
export const addCommunity = async (communityObj) => {
  const response = await fetch('http://localhost:3000/communities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(communityObj),
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error (errorData.message);
  }

  return response.json();
}