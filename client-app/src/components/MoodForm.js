import React, { useState } from 'react';

const MoodForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    moodRating: 3,
    notes: '',
    entryDate: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'moodRating' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await onSubmit({
      ...formData,
      entryDate: new Date(formData.entryDate).toISOString(),
    });

    if (result.success) {
      setSuccess('Mood entry saved successfully!');
      setFormData({
        moodRating: 3,
        notes: '',
        entryDate: new Date().toISOString().split('T')[0],
      });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling today?</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="entryDate"
              value={formData.entryDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Mood Rating
            </label>
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, moodRating: rating })}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    formData.moodRating === rating
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-4xl mb-2">{moodEmojis[rating]}</span>
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="text-xs text-gray-500">{moodLabels[rating]}</span>
                </button>
              ))}
            </div>
            <input
              type="range"
              name="moodRating"
              min="1"
              max="5"
              value={formData.moodRating}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="What's on your mind? Any particular reason for this mood?"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Mood Entry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MoodForm;
