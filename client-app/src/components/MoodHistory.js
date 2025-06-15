import React from 'react';

const MoodHistory = ({ moodEntries }) => {
  const moodEmojis = {
    1: '😢',
    2: '😟',
    3: '😐',
    4: '😊',
    5: '😄',
  };

  const moodLabels = {
    1: 'Very Sad',
    2: 'Sad',
    3: 'Neutral',
    4: 'Happy',
    5: 'Very Happy',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (moodEntries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood History</h2>
          <div className="text-center py-12">
            <span className="text-6xl">📊</span>
            <h3 className="text-xl font-medium text-gray-900 mt-4">No mood entries yet</h3>
            <p className="text-gray-500 mt-2">Start tracking your mood to see your history here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood History</h2>
        
        <div className="space-y-4">
          {moodEntries.map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{moodEmojis[entry.moodRating]}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-900">
                        {moodLabels[entry.moodRating]}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {entry.moodRating}/5
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(entry.entryDate)}
                    </p>
                  </div>
                </div>
              </div>
              
              {entry.notes && (
                <div className="mt-3 ml-16">
                  <p className="text-gray-700 bg-gray-50 rounded p-3 text-sm">
                    {entry.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {moodEntries.length > 10 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {moodEntries.length} mood entries
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;
