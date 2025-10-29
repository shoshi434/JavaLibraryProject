
const API_URL = 'http://localhost:8080/book';

export const getAllBooks = async () => {
  try {
    const res = await fetch(`${API_URL}/getAll`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching all books:', error);
    return [];
  }
};

export const getBookById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/getByIb/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    return null;
  }
};

export const addBook = async (book) => {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'שגיאה בהוספת הספר');
    }
    return res.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (id, book) => {
  try {
    const res = await fetch(`${API_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'שגיאה בעדכון הספר');
    }
    return res.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const getBookByName = async (name) => {
  try {
    const res = await fetch(`${API_URL}/getByName/${name}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching book by name:', error);
    return null;
  }
};

export const getBookByPublishDate = async (year) => {
  try {
    const res = await fetch(`${API_URL}/getByPublishDate/${year}`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching books by publish date:', error);
    return [];
  }
};
