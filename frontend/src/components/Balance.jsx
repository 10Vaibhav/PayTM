const Balance = ({ value }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-blue-100 text-sm font-medium mb-2 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Available Balance</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-white">₹{value}</span>
            <span className="text-blue-200 text-sm font-medium bg-white/10 px-2 py-1 rounded-full">INR</span>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Balance;
