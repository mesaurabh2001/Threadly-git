

//////////////////////////////////////////////////////////////
export const findInitialUser = async () => {
  const response = await fetch("http://localhost:3000/me", {
    credentials: "include"
  });

  if(!response.ok){
    const errorData = await response.json();
    throw new Error (errorData.message);
  }

  return response.json();
};

//////////////////////////////////////////////////////////////
export const loginUser = async (username, password) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed (from authService)");
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: "include",
  })

  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json();
}

export const signupUser = async (dataObj) => {
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObj),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message);
    error.errorMessages = errorData.errorMessages;
    throw error;
  }

  return response.json();
}