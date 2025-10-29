import React, { useState, useEffect } from 'react';
import {
  getAllLendings,
  getAllLendingsById,
  addLending,
  pay,
  returnBook,
  returnBook1, // פונקציה חדשה שתצטרך להוסיף ב-LendingService
} from '../../services/LendingService';
import { getCustomerById } from '../../services/CustomerService';
import { getBookById } from '../../services/BookService';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { validateId, validateLendingDate } from '../../utils/validation';
import '../../styles/global.css';
import '../../styles/forms.css';
import '../../styles/tables.css';

function LendingManager() {
  const [lendings, setLendings] = useState([]);
  const [form, setForm] = useState({ lendingId: '', customerId: '', bookId: '', lendingDate: ''});
  const [searchId, setSearchId] = useState('');
  const [payId, setPayId] = useState('');
  const [payAmount, setPayAmount] = useState(null);
  const { modal, showSuccess, showError, showWarning, showInfo, hideModal } = useModal();

  useEffect(() => {
    fetchLendings();
  }, []);

  const fetchLendings = async () => {

    const data = await getAllLendings();
    setLendings(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLending = async () => {
    // בדיקות תקינות בסיסיות
    if (!validateId(form.customerId)) {
      showWarning('מזהה לקוח לא תקין', 'אנא הזן מזהה לקוח תקין (מספר חיובי)');
      return;
    }
    
    if (!validateId(form.bookId)) {
      showWarning('מזהה ספר לא תקין', 'אנא הזן מזהה ספר תקין (מספר חיובי)');
      return;
    }
    
    if (!validateLendingDate(form.lendingDate)) {
      showWarning('תאריך לא תקין', 'אנא הזן תאריך השאלה תקין (לא בעתיד ולא יותר מחודש אחורה)');
      return;
    }

    try {
      // בדיקה שהלקוח קיים
      const customer = await getCustomerById(form.customerId);
      if (!customer) {
        showError('לקוח לא קיים', `לא נמצא לקוח עם מזהה ${form.customerId}`);
        return;
      }

      // בדיקה שהספר קיים
      const book = await getBookById(form.bookId);
      if (!book) {
        showError('ספר לא קיים', `לא נמצא ספר עם מזהה ${form.bookId}`);
        return;
      }

      // אם הכל תקין, נוסיף את ההשאלה
      await addLending(form);
      fetchLendings();
      setForm({ lendingId: '', customerId: '', bookId: '', lendingDate: ''});
      showSuccess('הצלחה', `השאלה נוספה בהצלחה - ספר "${book.bookName}" ללקוח "${customer.fName}"`);
    } catch (error) {
      showError('שגיאה', error.message || 'שגיאה בהוספת ההשאלה');
    }
  };

  const handleSearchById = async () => {
    if (!validateId(searchId)) {
      showWarning('מזהה לא תקין', 'אנא הזן מזהה לקוח תקין (מספר חיובי)');
      return;
    }
    const data = await getAllLendingsById(searchId);
    if (data && data.length > 0) {
      setLendings(data);
      showSuccess('נמצא!', `נמצאו ${data.length} השאלות עבור הלקוח`);
    } else {
      setLendings([]);
      showError('לא נמצא', 'לא נמצאו השאלות עבור הלקוח שהוזן');
    }
  };

  const handlePay = async () => {
    if (!validateId(payId)) {
      showWarning('מזהה לא תקין', 'אנא הזן מזהה לקוח תקין (מספר חיובי)');
      return;
    }
    try {
      const amount = await pay(payId);
      setPayAmount(amount);
      fetchLendings();
      showInfo('תשלום', `סכום לתשלום: ₪${amount.toFixed(2)}`);
    } catch (error) {
      showError('שגיאה', 'שגיאה בעת ביצוע התשלום: לא נמצא לקוח עם המזהה שהוזן');
      setPayAmount(null);
    }
  };

  const handleReturnBook = async (lendingId) => {
    try {
      await returnBook1(lendingId);
      fetchLendings();
      showSuccess('הצלחה', 'הספר סומן כהוחזר בהצלחה');
    } catch (error) {
      showError('שגיאה', 'שגיאה בעת החזרת הספר');
    }
  };

  return (
    <div className="container">
      <h2>ניהול השאלות</h2>
      <form>
        <input type="text" name="customerId" placeholder="מזהה לקוח" value={form.customerId} onChange={handleInputChange} />
        <input type="text" name="bookId" placeholder="מזהה ספר" value={form.bookId} onChange={handleInputChange} />
        <input type="date" name="lendingDate" placeholder="תאריך השאלה" value={form.lendingDate} onChange={handleInputChange} />
        <button type="button" onClick={handleAddLending}>הוסף השאלה</button>
      </form>

      <div style={{ marginTop: '2em' }}>
        <input type="text" placeholder="חפש השאלות לפי מזהה לקוח" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={handleSearchById}>חפש</button>
        <button onClick={fetchLendings} style={{ marginLeft: '10px', backgroundColor: '#28a745', color: 'white' }}>הצג הכל</button>
      </div>

      <div style={{ marginTop: '2em' }}>
        <input type="text" placeholder="הזן מזהה לקוח לתשלום" value={payId} onChange={(e) => setPayId(e.target.value)} />
        <button onClick={handlePay}>שלם</button>
      </div>

      <table border="1" style={{ marginTop: '2em', width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>מזהה</th>
            <th>מזהה לקוח</th>
            <th>מזהה ספר</th>
            <th>תאריך השאלה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {lendings.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', fontStyle: 'italic' }}>
                לא נמצאו השאלות
              </td>
            </tr>
          ) : (
            lendings.map((l) => (
              <tr key={l.lendingId}>
                <td>{l.lendingId}</td>
                <td>{l.customerId}</td>
                <td>{l.bookId}</td>
                <td>{l.lendingDate}</td>
       <td>
    {l.returned ? (
      <span>הספר הוחזר</span>
    ) : (
      <button onClick={() => handleReturnBook(l.lendingId)}>סמן כהוחזר</button>
    )}
  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={hideModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}

export default LendingManager;
