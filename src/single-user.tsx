import { useQuery } from "@tanstack/react-query";
import { getApiV1UsersByIdOptions } from "./client/@tanstack/react-query.gen";
import { getRouteApi, Link } from "@tanstack/react-router";
import type { User } from "./client/types.gen";

const routeApi = getRouteApi("/$id");

export default function SingleUser() {
  const { id: routeId } = routeApi.useParams();
  const { data, isLoading, error } = useQuery(
    getApiV1UsersByIdOptions({ path: { id: parseInt(routeId) } })
  );

  const user = data as User;

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
          <Link
            to="/"
            className="mt-4 inline-block text-sm text-gray-600 hover:text-gray-900 underline"
          >
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-gray-900 text-xl font-semibold mb-2">
            User not found
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            The user with ID {routeId} could not be found.
          </p>
          <Link
            to="/"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 underline"
          >
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </Link>

        {/* User Card */}
        <div className="border border-gray-200 rounded-lg p-8">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Avatar */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-600 font-semibold mb-4">
              <span className="text-2xl">
                {user.userName?.[0]?.toUpperCase() || "?"}
              </span>
            </div>

            {/* User Name */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {user.userName || "Unknown User"}
            </h1>
          </div>

          {/* User Details */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500">User ID</span>
              <span className="text-sm text-gray-900 font-mono">
                {user.id ?? "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500">
                Username
              </span>
              <span className="text-sm text-gray-900">
                {user.userName || "Not provided"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-gray-500">
                Password
              </span>
              <span className="text-sm text-gray-900 font-mono">
                {user.password ? "••••••••" : "Not set"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
