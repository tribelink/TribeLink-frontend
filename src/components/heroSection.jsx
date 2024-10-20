import React from 'react';

const HeroSection = () => {
  return (
    <div 
      className="relative w-full h-[400px] md:h-[400px] bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TribeLink</h1>
        <p className="text-lg md:text-xl mb-6">Your one-stop solution for all daily services.</p>
        
      </div>
    </div>
  );
};

export default HeroSection;
