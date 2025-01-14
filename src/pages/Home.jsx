import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Trophy, Clock, Target } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex flex-col items-center text-center">
      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mb-4">
        <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Master Your Typing Skills
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            Improve your typing speed and accuracy with our interactive tests. 
            Track your progress and watch your skills grow over time!
          </p>
          <Link 
            to="/test"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Keyboard className="mr-2" size={24} />
            Start Typing Test
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Clock}
            title="Real-time Speed Tracking"
            description="Monitor your WPM and accuracy as you type with instant feedback"
          />
          <FeatureCard
            icon={Trophy}
            title="Track Progress"
            description="View detailed statistics and track your improvement over time"
          />
          <FeatureCard
            icon={Target}
            title="Custom Goals"
            description="Set personal typing goals and challenge yourself to improve"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1M+</div>
              <div className="text-gray-600 dark:text-gray-300">Tests Completed</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-300">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;