import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal]   = useState(null); // null | 'createRoom' | 'createGroup' | 'subscribe' | 'invite' | 'post'
  const [modalData, setModalData]       = useState(null);

  const openModal = useCallback((modalName, data = null) => {
    setActiveModal(modalName);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);

  return (
    <UIContext.Provider value={{
      sidebarOpen, toggleSidebar, setSidebarOpen,
      activeModal, modalData, openModal, closeModal,
    }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
