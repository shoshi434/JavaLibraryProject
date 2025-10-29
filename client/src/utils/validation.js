// פונקציות בדיקת תקינות לשדות
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) return false;
  // בדיקה לטלפון ישראלי - מקבל 10 ספרות או עם קידומת
  const cleanPhone = phone.replace(/[\s-]/g, '');
  const phoneRegex = /^(\+972|0)([5-9]\d{8}|\d{8,9})$/;
  return phoneRegex.test(cleanPhone) || /^0[5-9]\d{8}$/.test(cleanPhone);
};

export const validateId = (id) => {
  // בדיקה שהמזהה הוא מספר חיובי
  const numId = parseInt(id);
  return !isNaN(numId) && numId > 0;
};

export const validateDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  const today = new Date();
  
  // בדיקה שהתאריך תקין ולא בעתיד
  return dateObj instanceof Date && !isNaN(dateObj) && dateObj <= today;
};

export const validateLendingDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);
  
  // בדיקה שתאריך ההשאלה הוא בחודש האחרון או היום
  return dateObj instanceof Date && !isNaN(dateObj) && dateObj >= oneMonthAgo && dateObj <= today;
};

export const validateYear = (year) => {
  const numYear = parseInt(year);
  const currentYear = new Date().getFullYear();
  return !isNaN(numYear) && numYear > 1000 && numYear <= currentYear;
};

export const validateName = (name) => {
  if (!name || name.trim().length === 0) return false;
  // בדיקה שהשם מכיל לפחות 2 תווים ורק אותיות עבריות, אנגליות ורווחים
  const nameRegex = /^[א-ת\u0590-\u05FFa-zA-Z\s]{2,}$/;
  return nameRegex.test(name.trim());
};

export const validateBookName = (bookName) => {
  // בדיקה שהשם מכיל לפחות 2 תווים
  return bookName && bookName.trim().length >= 2;
};

export const validateAuthor = (author) => {
  // בדיקה שהמחבר מכיל לפחות 2 תווים
  return author && author.trim().length >= 2;
};

// פונקציה כללית לבדיקת שדות ריקים
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim().length === 0) {
    return { isValid: false, error: `${fieldName} הוא שדה חובה` };
  }
  return { isValid: true };
};

// פונקציה לבדיקת אורך מינימלי
export const validateMinLength = (value, minLength, fieldName) => {
  if (!value || value.toString().trim().length < minLength) {
    return { isValid: false, error: `${fieldName} חייב להכיל לפחות ${minLength} תווים` };
  }
  return { isValid: true };
};

// פונקציה לבדיקת תאריך עתידי (מועיל להשאלות)
export const validateFutureDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // איפוס השעה לתחילת היום
  
  return dateObj instanceof Date && !isNaN(dateObj) && dateObj >= today;
};