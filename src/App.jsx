import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }   from './context/AuthContext';
import { SocialProvider } from './context/SocialContext';
import { UIProvider }     from './context/UIContext';

import MainLayout          from './components/layout/MainLayout';
import FeedPage            from './pages/FeedPage';
import ExplorePage         from './pages/ExplorePage';
import ProfilePage         from './pages/ProfilePage';
import RoomsPage           from './pages/RoomsPage';
import GroupsPage          from './pages/GroupsPage';
import ChannelsPage        from './pages/ChannelsPage';
import NotificationsPage   from './pages/NotificationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocialProvider>
          <UIProvider>
            <Routes>
              {/* All pages share the MainLayout (sidebar + topbar) */}
              <Route element={<MainLayout />}>
                <Route path="/"               element={<FeedPage />} />
                <Route path="/explore"         element={<ExplorePage />} />
                <Route path="/profile"         element={<ProfilePage />} />
                <Route path="/profile/:id"     element={<ProfilePage />} />
                <Route path="/rooms"           element={<RoomsPage />} />
                <Route path="/groups"          element={<GroupsPage />} />
                <Route path="/channels"        element={<ChannelsPage />} />
                <Route path="/notifications"   element={<NotificationsPage />} />
                {/* Catch-all */}
                <Route path="*"               element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </UIProvider>
        </SocialProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
