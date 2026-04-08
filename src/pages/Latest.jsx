import React from 'react';
import Hero from '../components/Hero';

const Latest = () => {
  return (
    <div className="latest-page">
      <Hero 
        image="/secondary-hero.png" 
        title="Latest Releases" 
        subtitle="Stay up to date with the newest additions to the big screen. Don't miss out on the movies everyone is talking about."
      />
      <div className="container py-4 text-center">
        <h2 className="section-title">Now Showing</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          Explore our handpicked selection of the latest movies currently dominating the box office. 
          From critically acclaimed indie films to explosive blockbusters, find your next favorite movie here.
        </p>
      </div>
    </div>
  );
};

export default Latest;
