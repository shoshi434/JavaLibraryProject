
const API_URL = 'http://localhost:8080/lending';

export const getAllLendings = async () => {
  try {
    const res = await fetch(`${API_URL}/getAll`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching all lendings:', error);
    return [];
  }
};

export const getAllLendingsById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/getAllById/${id}`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching lendings by ID:', error);
    return [];
  }
};

export const addLending = async (lending) => {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lending)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'שגיאה בהוספת השאלה');
    }
    return res.json();
  } catch (error) {
    console.error('Error adding lending:', error);
    throw error;
  }
};

export const pay = async (id) => {
  try {
    const res = await fetch(`${API_URL}/pay/${id}`);
    if (!res.ok) {
      throw new Error('שגיאה בעת התשלום');
    }
    return res.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};
export const returnBook1 = async (lendingId) => {
 
  const response = await fetch(`${API_URL}/returnBook/${lendingId}`, {
    method: 'PUT',
  });
  if (!response.ok) {
    throw new Error('שגיאה בעת החזרת הספר');
  }
};

