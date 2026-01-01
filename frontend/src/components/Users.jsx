import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [filter]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Send Money To</span>
                </h2>
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search users by name..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50/50 text-sm"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    {filter && (
                        <button
                            onClick={() => setFilter("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium">Finding users...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto">
                            {filter ? `No users match "${filter}". Try a different search term.` : "No users available at the moment."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-sm text-gray-500 mb-4">
                            {users.length} user{users.length !== 1 ? 's' : ''} found
                        </div>
                        <div className="grid gap-3">
                            {users.map((user) => (
                                <User key={user._id} user={user} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const getInitials = (firstName, lastName) => {
        return `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase();
    };

    const getAvatarColor = (name) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-green-500 to-green-600',
            'from-orange-500 to-orange-600',
            'from-pink-500 to-pink-600',
            'from-indigo-500 to-indigo-600',
            'from-red-500 to-red-600',
            'from-teal-500 to-teal-600'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 space-y-4 sm:space-y-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br ${getAvatarColor(user.firstName)} flex items-center justify-center shadow-sm transform transition-all duration-200 ${isHovered ? 'scale-110' : ''}`}>
                    <span className="text-lg lg:text-xl text-white font-semibold">
                        {getInitials(user.firstName, user.lastName)}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg truncate">
                        {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <p className="text-sm text-gray-500">Available for transfer</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Instant</span>
                </div>
                <Button
                    onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName);
                    }}
                    label="Send Money"
                    variant="primary"
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium"
                />
            </div>
        </div>
    );
}
