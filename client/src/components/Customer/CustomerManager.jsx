
import React, { useState, useEffect } from 'react';
import {
  getAllCustomers,
  getCustomerById,
  addCustomer
} from '../../services/CustomerService';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { validateId, validateName, validatePhone } from '../../utils/validation';
import '../../styles/global.css';
import '../../styles/forms.css';
import '../../styles/tables.css';

function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ customerId: '', fName: '', phone: '' });
  const [searchId, setSearchId] = useState('');
  const { modal, showSuccess, showError, showWarning, hideModal } = useModal();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getAllCustomers();
    setCustomers(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    if (!validateId(form.customerId)) {
      showWarning('מזהה לא תקין', 'אנא הזן מזהה לקוח תקין (מספר חיובי)');
      return;
    }
    
    if (!validateName(form.fName)) {
      showWarning('שם לא תקין', 'אנא הזן שם תקין (לפחות 2 אותיות עבריות או אנגליות)');
      return;
    }
    
    if (!validatePhone(form.phone)) {
      showWarning('טלפון לא תקין', 'אנא הזן מספר טלפון ישראלי תקין (דוגמא: 0501234567)');
      return;
    }

    try {
      // בדיקה שהלקוח לא קיים כבר
      const existingCustomer = await getCustomerById(form.customerId);
      if (existingCustomer) {
        showError('לקוח כבר קיים', `לקוח עם מזהה ${form.customerId} כבר קיים במערכת`);
        return;
      }

      await addCustomer(form);
      fetchCustomers();
      setForm({ customerId: '', fName: '', phone: '' });
      showSuccess('הצלחה', 'הלקוח נוסף בהצלחה');
    } catch (error) {
      showError('שגיאה', error.message || 'שגיאה בהוספת הלקוח');
    }
  };

  const handleSearchById = async () => {
    if (!validateId(searchId)) {
      showWarning('מזהה לא תקין', 'אנא הזן מזהה לקוח תקין (מספר חיובי)');
      return;
    }
    const customer = await getCustomerById(searchId);
    if (customer) {
      setCustomers([customer]);
      showSuccess('נמצא!', `נמצא לקוח: ${customer.fName}`);
    } else {
      setCustomers([]);
      showError('לא נמצא', 'לא נמצא לקוח עם המזהה שהוזן');
    }
  };

  return (
    <div className="page-container">
      <div className="card fade-in">
        <div className="card-header">
          <h2 className="card-title">ניהול לקוחות</h2>
        </div>
        
        {/* טופס הוספת לקוח */}
        <div className="form-container">
          <h3 className="form-title">הוסף לקוח חדש</h3>
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
              <label className="form-label">שם מלא</label>
              <input 
                className="form-input" 
                type="text" 
                name="fName" 
                placeholder="הזן שם מלא..." 
                value={form.fName} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">מספר טלפון</label>
              <input 
                className="form-input" 
                type="text" 
                name="phone" 
                placeholder="050-1234567" 
                value={form.phone} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="button" onClick={handleAddCustomer}>
              👤 הוסף לקוח
            </button>
          </div>
        </div>

        {/* אזור חיפוש */}
        <div className="search-container">
          <h3 className="search-title">חיפוש לקוחות</h3>
          <div className="search-row">
            <div className="form-group">
              <label className="form-label">חיפוש לפי מזהה</label>
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
              <button className="btn btn-success" onClick={fetchCustomers}>
                👥 הצג הכל
              </button>
            </div>
          </div>
        </div>

        {/* טבלת לקוחות */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">רשימת לקוחות</h3>
            <span className="table-count">{customers.length} לקוחות</span>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>מזהה</th>
                  <th>שם</th>
                  <th>טלפון</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="table-empty">
                      <span className="table-empty-icon">👥</span>
                      <div className="table-empty-text">לא נמצאו לקוחות</div>
                      <div className="table-empty-subtitle">נסה להוסיף לקוח חדש או לשנות את פרמטרי החיפוש</div>
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.customerId}>
                      <td data-label="מזהה">
                        <span className="table-id">{c.customerId}</span>
                      </td>
                      <td data-label="שם" className="table-name">{c.fName}</td>
                      <td data-label="טלפון" className="table-phone">{c.phone}</td>
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

export default CustomerManager;
