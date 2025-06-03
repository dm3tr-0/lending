// api.ts
const API_URL = 'http://localhost:5000/api'; // URL вашего сервера

export const getUserLandings = async (userId) => {
  const response = await fetch(`${API_URL}/landings/${userId}`);
  if (!response.ok) {
    throw new Error('Ошибка при получении лэндингов');
  }
  return await response.json();
};

export const getActiveTemplates = async () => {
  const response = await fetch(`${API_URL}/templates`);
  if (!response.ok) {
    throw new Error('Ошибка при получении шаблонов');
  }
  return await response.json();
};

export const createLanding = async (userId, templateId, name, htmlContent) => {
  const response = await fetch(`${API_URL}/landings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, templateId, name, htmlContent }),
  });
  if (!response.ok) {
    throw new Error('Ошибка при создании лэндинга');
  }
  return await response.json();
};

export const updateLanding = async (landingId, htmlContent) => {
  const response = await fetch(`${API_URL}/landings/${landingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ htmlContent }),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении лэндинга');
  }
  return await response.json();
};

export const deleteLanding = async (landingId) => {
  const response = await fetch(`${API_URL}/landings/${landingId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении лэндинга');
  }
};

// Админские функции
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Ошибка при получении пользователей');
  }
  return await response.json();
};

export const getAllTemplates = async () => {
  const response = await fetch(`${API_URL}/templates`);
  if (!response.ok) {
    throw new Error('Ошибка при получении шаблонов');
  }
  return await response.json();
};

export const createTemplate = async (name, description, htmlContent, thumbnailUrl) => {
  const response = await fetch(`${API_URL}/templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, html_content: htmlContent, thumbnail_url: thumbnailUrl }),
  });
  if (!response.ok) {
    throw new Error('Ошибка при создании шаблона');
  }
  return await response.json();
};

export const updateTemplate = async (templateId, isActive) => {
  const response = await fetch(`${API_URL}/templates/${templateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });
  if (!response.ok) {
    throw new Error('Ошибка при обновлении шаблона');
  }
  return await response.json();
};

export const getLandingById = async (id) => {
  const response = await fetch(`${API_URL}/getlandings/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка при получении лэндинга');
  }
  return await response.json();
};


export const registerUser = async (userData: {
  firebase_uid: string;
  email: string;
}) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to save user data');
  }
  
  return await response.json();
};