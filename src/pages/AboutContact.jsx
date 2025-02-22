import React from 'react';
import { Mail } from 'lucide-react';

function AboutContact() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About TypeTrail</h1>
      <p className="mb-4">
        TypeTrail is a modern typing speed test application designed to help you improve your typing skills.
        With real-time tracking, detailed statistics, and a user-friendly interface, TypeTrail makes it easy and fun to enhance your typing speed and accuracy.
      </p>
      <h2 className="text-2xl font-bold mb-2">Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Real-time typing tests with random words</li>
        <li>Instant feedback on speed and accuracy</li>
        <li>Detailed statistics and progress tracking</li>
        <li>Responsive design for use on any device</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p className="flex items-center">
        <Mail className="mr-2" size={20} />
        <a href="mailto:contact@typetrail.com" className="text-blue-500 hover:underline">
          contact@typetrail.com
        </a>
      </p>
    </div>
  );
}

export default AboutContact;

