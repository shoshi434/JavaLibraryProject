import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showModal = (title, message, type = 'info') => {
    setModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const showSuccess = (title, message) => {
    showModal(title, message, 'success');
  };

  const showError = (title, message) => {
    showModal(title, message, 'error');
  };

  const showWarning = (title, message) => {
    showModal(title, message, 'warning');
  };

  const showInfo = (title, message) => {
    showModal(title, message, 'info');
  };

  const hideModal = () => {
    setModal(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return {
    modal,
    showModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideModal
  };
};