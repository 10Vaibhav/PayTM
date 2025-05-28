export default function InputBox({label, placeholder, onChange, type = "text", error = "", icon, className = ""}){
    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                {icon && (
                    <span className="text-gray-400">{icon}</span>
                )}
                <span>{label}</span>
            </label>
            <div className="relative">
                <input 
                    type={type}
                    onChange={onChange} 
                    placeholder={placeholder} 
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                        error 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } focus:ring-2 outline-none`}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{error}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

