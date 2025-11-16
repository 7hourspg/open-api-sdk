import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { GetApiV1UsersResponse, User } from "./client/types.gen";
import { getApiV1UsersOptions } from "./client/@tanstack/react-query.gen";

export default function Home() {
  const { data, isLoading, error } = useQuery(getApiV1UsersOptions());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="border border-red-200 rounded-lg p-8 max-w-md w-full text-center bg-red-50">
          <h2 className="text-gray-900 text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-600 text-sm">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    );
  }

  const users = (data as GetApiV1UsersResponse) || [];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-500 text-sm">
            {users.length} {users.length === 1 ? "user" : "users"}
          </p>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Link to={`/$id`} params={{ id: user.id?.toString() ?? "" }}>
      <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 font-medium shrink-0">
            <span className="text-sm">
              {user.userName?.[0]?.toUpperCase() || "?"}
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium truncate">
              {user.userName || "Unknown User"}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-gray-500 text-xs">
                ID: {user.id ?? "N/A"}
              </span>
              {user.password && (
                <span className="text-gray-400 text-xs">••••</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
