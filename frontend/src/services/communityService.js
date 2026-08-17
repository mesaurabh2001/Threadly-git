

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