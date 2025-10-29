
const API_URL = 'http://localhost:8080/customer';

export const getAllCustomers = async () => {
  try {
    const res = await fetch(`${API_URL}/getAll`);
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching all customers:', error);
    return [];
  }
};

export const getCustomerById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/getById/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    return null;
  }
};

export const addCustomer = async (customer) => {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'שגיאה בהוספת הלקוח');
    }
    return res.json();
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};
