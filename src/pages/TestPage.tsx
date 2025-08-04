import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page Working!</h1>
        <p className="text-gray-300">If you see this, the basic setup is working.</p>
        <div className="mt-8">
          <a href="/demo" className="text-blue-400 hover:text-blue-300 underline">
            Go to Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
