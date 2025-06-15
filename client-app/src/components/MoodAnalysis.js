import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { moodsAPI } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MoodAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await moodsAPI.getMoodAnalysis();
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center py-12">
            <div className="text-lg">Loading analysis...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis || analysis.totalEntries === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mood Analysis</h2>
          <div className="text-center py-12">
            <span className="text-6xl">📈</span>
            <h3 className="text-xl font-medium text-gray-900 mt-4">No data to analyze</h3>
            <p className="text-gray-500 mt-2">Add more mood entries to see your mood trends and analysis.</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare line chart data
  const lineChartData = {
    labels: analysis.trends.map(trend => 
      new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Mood Rating',
        data: analysis.trends.map(trend => trend.moodRating),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  // Prepare doughnut chart data
  const doughnutChartData = {
    labels: Object.keys(analysis.moodDistribution).map(rating => {
      const moodLabels = {
        1: 'Very Sad',
        2: 'Sad',
        3: 'Neutral',
        4: 'Happy',
        5: 'Very Happy',
      };
      return moodLabels[rating];
    }),
    datasets: [
      {
        data: Object.values(analysis.moodDistribution),
        backgroundColor: [
          '#EF4444', // Red for Very Sad
          '#F97316', // Orange for Sad
          '#EAB308', // Yellow for Neutral
          '#22C55E', // Green for Happy
          '#3B82F6', // Blue for Very Happy
        ],
        borderWidth: 0,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Mood Trend Over Time',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Mood Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">
              {analysis.averageMoodRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500 mt-1">Average Mood</div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {analysis.totalEntries}
            </div>
            <div className="text-sm text-gray-500 mt-1">Total Entries</div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {Math.max(...analysis.trends.map(t => t.moodRating))}
            </div>
            <div className="text-sm text-gray-500 mt-1">Highest Mood</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>

      {/* Recent Insights */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-blue-500">💡</span>
            <p className="text-sm text-gray-700">
              Your average mood rating is {analysis.averageMoodRating.toFixed(1)} out of 5.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-green-500">📊</span>
            <p className="text-sm text-gray-700">
              You've logged {analysis.totalEntries} mood entries so far.
            </p>
          </div>
          
          {analysis.trends.length >= 7 && (
            <div className="flex items-start space-x-3">
              <span className="text-purple-500">📈</span>
              <p className="text-sm text-gray-700">
                Keep tracking your mood daily to identify patterns and trends over time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodAnalysis;
