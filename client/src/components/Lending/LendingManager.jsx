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
    <div className="page-container">
      <div className="card fade-in">
        <div className="card-header">
          <h2 className="card-title">ניהול השאלות</h2>
        </div>
        
        {/* טופס הוספת השאלה */}
        <div className="form-container">
          <h3 className="form-title">הוסף השאלה חדשה</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">מזהה לקוח</label>
              <input 
                className="form-input" 
                type="text" 
                name="customerId" 
                placeholder="הזן מזהה לקוח..." 
                value={form.customerId} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">מזהה ספר</label>
              <input 
                className="form-input" 
                type="text" 
                name="bookId" 
                placeholder="הזן מזהה ספר..." 
                value={form.bookId} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">תאריך השאלה</label>
              <input 
                className="form-input" 
                type="date" 
                name="lendingDate" 
                value={form.lendingDate} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="button" onClick={handleAddLending}>
              📚 הוסף השאלה
            </button>
          </div>
        </div>

        {/* אזור חיפוש */}
        <div className="search-container">
          <h3 className="search-title">חיפוש השאלות</h3>
          <div className="search-row">
            <div className="form-group">
              <label className="form-label">חיפוש לפי מזהה לקוח</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="הזן מזהה לקוח..." 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
              />
              <button className="btn btn-secondary btn-sm" onClick={handleSearchById}>
                🔍 חפש
              </button>
            </div>
            <div className="form-group">
              <button className="btn btn-success" onClick={fetchLendings}>
                📋 הצג הכל
              </button>
            </div>
          </div>
        </div>

        {/* אזור תשלומים */}
        <div className="form-container">
          <h3 className="form-title">חישוב תשלום</h3>
          <div className="search-row">
            <div className="form-group">
              <label className="form-label">מזהה לקוח לתשלום</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="הזן מזהה לקוח..." 
                value={payId} 
                onChange={(e) => setPayId(e.target.value)} 
              />
              <button className="btn btn-warning" onClick={handlePay}>
                💰 חשב תשלום
              </button>
            </div>
          </div>
        </div>

        {/* טבלת השאלות */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">רשימת השאלות</h3>
            <span className="table-count">{lendings.length} השאלות</span>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>מזהה השאלה</th>
                  <th>מזהה לקוח</th>
                  <th>מזהה ספר</th>
                  <th>תאריך השאלה</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {lendings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="table-empty">
                      <span className="table-empty-icon">📚</span>
                      <div className="table-empty-text">לא נמצאו השאלות</div>
                      <div className="table-empty-subtitle">נסה להוסיף השאלה חדשה או לשנות את פרמטרי החיפוש</div>
                    </td>
                  </tr>
                ) : (
                  lendings.map((l) => (
                    <tr key={l.lendingId}>
                      <td data-label="מזהה השאלה">
                        <span className="table-id">{l.lendingId}</span>
                      </td>
                      <td data-label="מזהה לקוח">
                        <span className="table-id">{l.customerId}</span>
                      </td>
                      <td data-label="מזהה ספר">
                        <span className="table-id">{l.bookId}</span>
                      </td>
                      <td data-label="תאריך השאלה" className="table-date">{l.lendingDate}</td>
                      <td data-label="פעולות" className="table-actions">
                        {l.returned ? (
                          <span className="table-btn table-btn-disabled">✅ הוחזר</span>
                        ) : (
                          <button 
                            className="table-btn table-btn-success" 
                            onClick={() => handleReturnBook(l.lendingId)}
                          >
                            📤 החזר
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
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