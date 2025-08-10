'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Breeze Test Page</h1>
        <p className="text-lg text-gray-600">This is a test to see if the basic page renders.</p>
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}