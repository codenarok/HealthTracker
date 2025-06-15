import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { moodsAPI } from '../services/api';
import MoodForm from './MoodForm';
import MoodHistory from './MoodHistory';
import MoodAnalysis from './MoodAnalysis';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('entry');
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  const fetchMoodEntries = async () => {
    try {
      const response = await moodsAPI.getMoodEntries();
      setMoodEntries(response.data);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSubmit = async (moodData) => {
    try {
      await moodsAPI.createMoodEntry(moodData);
      fetchMoodEntries(); // Refresh the list
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to save mood entry' 
      };
    }
  };

  const tabs = [
    { id: 'entry', label: 'Daily Entry', icon: '📝' },
    { id: 'history', label: 'History', icon: '📊' },
    { id: 'analysis', label: 'Analysis', icon: '📈' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mood Analyser</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'entry' && (
          <MoodForm onSubmit={handleMoodSubmit} />
        )}
        {activeTab === 'history' && (
          <MoodHistory moodEntries={moodEntries} />
        )}
        {activeTab === 'analysis' && (
          <MoodAnalysis />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
