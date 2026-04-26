import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar    from './Sidebar';
import Topbar     from './Topbar';
import RightPanel from './RightPanel';
import ModalManager from '../modals/ModalManager';

export default function MainLayout() {
  return (
    <>
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-base)',
      }}>
        {/* Sidebar - hidden on mobile, visible on desktop */}
        <div style={{ display: 'flex' }} className="sidebar-wrapper">
          <Sidebar />
        </div>

        {/* Main Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Topbar />
          <div style={{
            flex: 1,
            display: 'flex',
            gap: 0,
            maxWidth: '100%',
          }}>
            {/* Page Content */}
            <main style={{
              flex: 1,
              padding: '24px 24px',
              minWidth: 0,
              maxWidth: 680,
            }}>
              <Outlet />
            </main>

            {/* Right Panel - hidden on small screens */}
            <div className="right-panel-wrapper">
              <RightPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Global Modal Manager */}
      <ModalManager />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1100px) {
          .right-panel-wrapper { display: none; }
        }
        @media (max-width: 768px) {
          .sidebar-wrapper { display: none; }
          main { padding: 16px !important; }
        }
      `}</style>
    </>
  );
}
