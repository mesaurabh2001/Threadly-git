
//////////////////////////////////////////////////////////////////
export const getUserById = async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);

  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  
  const data = await response.json();
  console.log(data);
  return data;
}
