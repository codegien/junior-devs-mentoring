import React from 'react';
import { useAuth }   from '../context/AuthContext';
import { useSocial } from '../context/SocialContext';
import { useUI }     from '../context/UIContext';
import PostCard      from '../components/social/PostCard';
import { EmptyState } from '../components/ui/UIComponents';
import { PencilSquareIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

export default function FeedPage() {
  const { currentUser } = useAuth();
  const { posts }       = useSocial();
  const { openModal }   = useUI();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Compose Box */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <img
            src={currentUser?.image}
            alt={currentUser?.firstName}
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
          <button
            onClick={() => openModal('post')}
            style={{
              flex: 1, textAlign: 'left',
              background: 'var(--bg-overlay)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 18px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: 14,
              transition: 'border-color 0.2s',
            }}
          >
            What's on your mind, {currentUser?.firstName}?
          </button>
        </div>
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
          {[
            { icon: <PhotoIcon style={{ width: 18, height: 18 }} />, label: 'Photo' },
            { icon: <VideoCameraIcon style={{ width: 18, height: 18 }} />, label: 'Video' },
            { icon: <PencilSquareIcon style={{ width: 18, height: 18 }} />, label: 'Write' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => openModal('post')}
              className="btn btn-ghost"
              style={{ flex: 1, gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No posts yet"
          description="Be the first to share something with the community."
          action={<button className="btn btn-primary" onClick={() => openModal('post')}>Create Post</button>}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} delay={i * 60} />
          ))}
        </div>
      )}
    </div>
  );
}
