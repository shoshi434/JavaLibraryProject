
import React, { useState, useEffect } from 'react';
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  getBookByName,
  getBookByPublishDate
} from '../../services/BookService';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { validateId, validateDate, validateYear, validateBookName, validateAuthor } from '../../utils/validation';
import '../../styles/global.css';
import '../../styles/forms.css';
import '../../styles/tables.css';

function BookManager() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ bookId: '', bookName: '', author: '', releaseDate: '' });
  const [searchYear, setSearchYear] = useState('');
  const [searchName, setSearchName] = useState('');
  const[searchId,setSearchId]=useState('');
  const { modal, showSuccess, showError, showWarning, hideModal } = useModal();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    // בדיקות תקינות
    if (!validateBookName(form.bookName)) {
      showWarning('שם ספר לא תקין', 'אנא הזן שם ספר תקין (לפחות 2 תווים)');
      return;
    }
    
    if (!validateAuthor(form.author)) {
      showWarning('שם מחבר לא תקין', 'אנא הזן שם מחבר תקין (לפחות 2 תווים)');
      return;
    }
    
    if (!validateDate(form.releaseDate)) {
      showWarning('תאריך לא תקין', 'אנא הזן תאריך תקין (לא בעתיד)');
      return;
    }

    try {
      await addBook(form);
      fetchBooks();
      setForm({ bookId: '', bookName: '', author: '', releaseDate: '' });
      showSuccess('הצלחה', 'הספר נוסף בהצלחה');
    } catch (error) {
      showError('שגיאה', error.message || 'שגיאה בהוספת הספר');
    }
  };

  const handleUpdateBook = async () => {
    if (!validateId(form.bookId)) {
      showWarning('מזהה ספר לא תקין', 'יש להזין מזהה ספר תקין (מספר חיובי)');
      return;
    }

    try {
      // קודם נקבל את הספר הקיים
      const existingBook = await getBookById(form.bookId);
      if (!existingBook) {
        showError('ספר לא נמצא', 'לא נמצא ספר עם המזהה שהוזן');
        return;
      }

      // ניצור אובייקט עדכון עם רק השדות שהוזנו
      const updateData = {
        bookId: form.bookId
      };

      // נוסיף רק שדות שיש בהם ערך חדש
      if (form.bookName && form.bookName.trim()) {
        if (!validateBookName(form.bookName)) {
          showWarning('שם ספר לא תקין', 'אנא הזן שם ספר תקין (לפחות 2 תווים)');
          return;
        }
        updateData.bookName = form.bookName;
      } else {
        updateData.bookName = existingBook.bookName;
      }

      if (form.author && form.author.trim()) {
        if (!validateAuthor(form.author)) {
          showWarning('שם מחבר לא תקין', 'אנא הזן שם מחבר תקין (לפחות 2 תווים)');
          return;
        }
        updateData.author = form.author;
      } else {
        updateData.author = existingBook.author;
      }

      if (form.releaseDate && form.releaseDate.trim()) {
        if (!validateDate(form.releaseDate)) {
          showWarning('תאריך לא תקין', 'אנא הזן תאריך תקין (לא בעתיד)');
          return;
        }
        updateData.releaseDate = form.releaseDate;
      } else {
        updateData.releaseDate = existingBook.releaseDate;
      }

      await updateBook(form.bookId, updateData);
      fetchBooks();
      showSuccess('הצלחה', 'הספר עודכן בהצלחה');
    } catch (error) {
      showError('שגיאה', error.message || 'שגיאה בעדכון הספר');
    }
  };

  const handleSearchByYear = async () => {
    if (!validateYear(searchYear)) {
      showWarning('שנה לא תקינה', 'אנא הזן שנה תקינה (מספר בין 1000 לשנה הנוכחית)');
      return;
    }
    const data = await getBookByPublishDate(searchYear);
    if (data && data.length > 0) {
      setBooks(data);
      showSuccess('נמצא!', `נמצאו ${data.length} ספרים עבור שנת ${searchYear}`);
    } else {
      setBooks([]);
      showError('לא נמצא', 'לא נמצאו ספרים עבור השנה שהוזנה');
    }
  };

  const handleSearchByName = async () => {
    if (!searchName.trim()) {
      showWarning('שדה חסר', 'אנא הזן שם ספר לחיפוש');
      return;
    }
    const book = await getBookByName(searchName);
    if (book) {
      setBooks([book]);
      showSuccess('נמצא!', `נמצא ספר בשם "${book.bookName}"`);
    } else {
      setBooks([]);
      showError('לא נמצא', 'לא נמצא ספר עם השם שהוזן');
    }
  };
   const handleSearchById = async () => {
    if (!validateId(searchId)) {
      showWarning('מזהה לא תקין', 'אנא הזן מזהה ספר תקין (מספר חיובי)');
      return;
    }
    const book = await getBookById(searchId);
    if (book) {
      setBooks([book]);
      showSuccess('נמצא!', `נמצא ספר עם מזהה ${searchId}`);
    } else {
      setBooks([]);
      showError('לא נמצא', 'לא נמצא ספר עם המזהה שהוזן');
    }
  };

  return (
    <div className="page-container">
      <div className="card fade-in">
        <div className="card-header">
          <h2 className="card-title">ניהול ספרים</h2>
        </div>
        
        {/* טופס הוספה ועדכון */}
        <div className="form-container">
          <h3 className="form-title">הוסף או עדכן ספר</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">מזהה ספר (רק לעדכון)</label>
              <input 
                className="form-input" 
                type="text" 
                name="bookId" 
                placeholder="הזן מזהה ספר לעדכון..." 
                value={form.bookId} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">שם הספר</label>
              <input 
                className="form-input" 
                type="text" 
                name="bookName" 
                placeholder="הזן שם הספר..." 
                value={form.bookName} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">מחבר</label>
              <input 
                className="form-input" 
                type="text" 
                name="author" 
                placeholder="הזן שם המחבר..." 
                value={form.author} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">תאריך פרסום</label>
              <input 
                className="form-input" 
                type="date" 
                name="releaseDate" 
                value={form.releaseDate} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="button" onClick={handleAddBook}>
              ➕ הוסף ספר
            </button>
            <button className="btn btn-warning" type="button" onClick={handleUpdateBook}>
              ✏️ עדכן ספר
            </button>
          </div>
        </div>

        {/* אזור חיפוש */}
        <div className="search-container">
          <h3 className="search-title">חיפוש ספרים</h3>
          <div className="search-row">
            <div className="form-group">
              <label className="form-label">חיפוש לפי שם</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="הזן שם ספר..." 
                value={searchName} 
                onChange={(e) => setSearchName(e.target.value)} 
              />
              <button className="btn btn-secondary btn-sm" onClick={handleSearchByName}>
                🔍 חפש
              </button>
            </div>
            <div className="form-group">
              <label className="form-label">חיפוש לפי שנה</label>
              <input 
                className="form-input" 
                type="number" 
                placeholder="הזן שנת פרסום..." 
                value={searchYear} 
                onChange={(e) => setSearchYear(e.target.value)} 
              />
              <button className="btn btn-secondary btn-sm" onClick={handleSearchByYear}>
                📅 חפש
              </button>
            </div>
            <div className="form-group">
              <label className="form-label">חיפוש לפי מזהה</label>
              <input 
                className="form-input" 
                type="number" 
                placeholder="הזן מזהה ספר..." 
                value={searchId} 
                onChange={(e) => setSearchId(e.target.value)} 
              />
              <button className="btn btn-secondary btn-sm" onClick={handleSearchById}>
                🔢 חפש
              </button>
            </div>
            <div className="form-group">
              <button className="btn btn-success" onClick={fetchBooks}>
                📚 הצג הכל
              </button>
            </div>
          </div>
        </div>

        {/* טבלת ספרים */}
        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">רשימת ספרים</h3>
            <span className="table-count">{books.length} ספרים</span>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>מזהה</th>
                  <th>שם הספר</th>
                  <th>מחבר</th>
                  <th>שנת פרסום</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="table-empty">
                      <span className="table-empty-icon">📚</span>
                      <div className="table-empty-text">לא נמצאו ספרים</div>
                      <div className="table-empty-subtitle">נסה להוסיף ספר חדש או לשנות את פרמטרי החיפוש</div>
                    </td>
                  </tr>
                ) : (
                  books.map((b) => (
                    <tr key={b.bookId}>
                      <td data-label="מזהה">
                        <span className="table-id">{b.bookId}</span>
                      </td>
                      <td data-label="שם" className="table-name">{b.bookName}</td>
                      <td data-label="מחבר">{b.author}</td>
                      <td data-label="שנת פרסום" className="table-date">{b.releaseDate}</td>
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

export default BookManager;
