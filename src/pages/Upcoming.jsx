import React from 'react';
import Hero from '../components/Hero';

const Upcoming = () => {
  return (
    <div className="upcoming-page">
      <Hero 
        image="/secondary-hero.png" 
        title="Upcoming Movies" 
        subtitle="Get ready for the next wave of cinematic masterpieces. Here is a sneak peek at what's hitting the theaters soon."
      />
      <div className="container py-4 text-center">
        <h2 className="section-title">The Future of Cinema</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          We are constantly updating our database with the most anticipated upcoming movies. 
          Stay tuned for epic sci-fi adventures, heart-pounding thrillers, and captivating dramas 
          that will define the next era of filmmaking.
        </p>
      </div>
    </div>
  );
};

export default Upcoming;
