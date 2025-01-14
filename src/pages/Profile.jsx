import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTestResults, clearTestResults } from '../utils/storage';
import { Trophy, Clock, Target, Timer, Trash2 } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
        <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [testResults, setTestResults] = useState([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setTestResults(getTestResults());
  }, []);

  const handleClearHistory = () => {
    clearTestResults();
    setTestResults([]);
    setShowConfirmClear(false);
  };

  const data = testResults.map((result, index) => ({
    name: `Test ${index + 1}`,
    wpm: result.wpm,
    accuracy: result.accuracy || 0,
  }));

  const totalTests = testResults.length;
  const maxWPM = Math.max(...testResults.map(result => result.wpm), 0);
  const avgWPM = testResults.length
    ? Math.round(testResults.reduce((acc, curr) => acc + curr.wpm, 0) / testResults.length)
    : 0;
  const recentWPM = testResults[testResults.length - 1]?.wpm || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Typing Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and see how your typing skills improve over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Trophy}
            title="Best Speed"
            value={`${maxWPM} WPM`}
            subtitle="Your highest typing speed"
          />
          <StatCard
            icon={Clock}
            title="Average Speed"
            value={`${avgWPM} WPM`}
            subtitle="Your typical performance"
          />
          <StatCard
            icon={Timer}
            title="Recent Speed"
            value={`${recentWPM} WPM`}
            subtitle="Your last test result"
          />
          <StatCard
            icon={Target}
            title="Total Tests"
            value={totalTests}
            subtitle="Tests completed"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Performance History
          </h2>
          <div className="h-80">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                No test data available yet. Take a test to see your progress!
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          {showConfirmClear ? (
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Confirm Clear
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;