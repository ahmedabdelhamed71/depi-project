import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/context";
import {
  getIncomingRequests,
  getOutgoingRequests,
  getRequest,
  acceptRequest,
  rejectRequest,
} from "../../services/api";


const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const avatarColors = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-cyan-500",
];

const getAvatarColor = (str = "") =>
  avatarColors[(str.charCodeAt(0) || 0) % avatarColors.length];

const timeAgo = (dateString) => {
  if (!dateString) return "";
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(dateString).toLocaleDateString();
};

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  rejected: "bg-red-50 text-red-600 border border-red-200",
};

const StatusBadge = ({ status }) => (
  <span
    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
      statusStyles[status] || statusStyles.pending
    }`}
  >
    {status}
  </span>
);


const RequestDetailModal = ({ requestId, onClose }) => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getRequest(requestId);
        if (!ignore) setRequest(data.request);
      } catch (e) {
        if (!ignore) {
          setError(
            e.status === 404
              ? "Request not found."
              : e.status === 403
              ? "You are not allowed to view this request."
              : e.message || "Failed to load request."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [requestId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-3" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <p className="text-sm text-red-500 py-6 text-center">{error}</p>
        ) : (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Status</span>
              <StatusBadge status={request.status} />
            </div>

            <div>
              <p className="text-gray-500 mb-1">From</p>
              <p className="font-semibold text-gray-900">
                {request.sender?.full_name}
                {request.sender?.verified && (
                  <span className="ml-1 text-blue-500" title="Verified">✓</span>
                )}
              </p>
              {request.sender?.title && (
                <p className="text-gray-500">{request.sender.title}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-1">To</p>
              <p className="font-semibold text-gray-900">
                {request.receiver?.full_name}
                {request.receiver?.verified && (
                  <span className="ml-1 text-blue-500" title="Verified">✓</span>
                )}
              </p>
              {request.receiver?.title && (
                <p className="text-gray-500">{request.receiver.title}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 mb-1">Requested skill</p>
              <p className="font-semibold text-gray-900">
                {request.requested_skill?.name}
              </p>
            </div>

            {request.message && (
              <div>
                <p className="text-gray-500 mb-1">Message</p>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                  "{request.message}"
                </p>
              </div>
            )}

            <p className="text-xs text-gray-400">
              Sent {timeAgo(request.created_at)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


export default function Requests() {
  const { user: authUser } = useAuth();
  const authUserId = authUser?.id || authUser?._id;
  const [activeTab, setActiveTab] = useState("incoming");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [actingId, setActingId] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const [incomingData, outgoingData] = await Promise.all([
          getIncomingRequests(),
          getOutgoingRequests(),
        ]);

        if (!ignore) {
          setIncoming(incomingData.requests || []);
          setOutgoing(outgoingData.requests || []);
        }
      } catch (e) {
        if (!ignore) {
          setError(
            e.status === 401
              ? "Please log in to view your swap requests."
              : e.message || "Failed to load requests."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchRequests();

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  // Accept or reject an incoming request (PATCH /requests/:id/accept|reject)
  const handleAction = async (id, action) => {
    setActingId(id);
    setActionError(null);

    try {
      const data =
        action === "accept" ? await acceptRequest(id) : await rejectRequest(id);

      setIncoming((prev) =>
        prev.map((r) => (r.id === id ? data.request : r))
      );
    } catch (e) {
      setActionError(e.message || `Failed to ${action} request.`);
    } finally {
      setActingId(null);
    }
  };

  const completed = [...incoming, ...outgoing].filter(
    (r) => r.status === "accepted"
  );

  const getData = () => {
    switch (activeTab) {
      case "sent":
        return outgoing;
      case "completed":
        return completed;
      default:
        return incoming;
    }
  };

  const tabData = getData();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Swap Requests</h1>

          <Link
            to="/discover"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            + New Request
          </Link>
        </div>

        {/* Tabs */}

        <div className="flex gap-8 border-b mb-8">
          {[
            { key: "incoming", label: "Incoming" },
            { key: "sent", label: "Sent" },
            { key: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action error */}
        {actionError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center justify-between">
            <span>{actionError}</span>
            <button
              onClick={() => setActionError(null)}
              className="text-red-400 hover:text-red-600 ml-4"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-4" />
            <p className="text-sm text-gray-500">Loading requests...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => setReloadKey((prev) => prev + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Cards */}

            <div className="space-y-4">
              {tabData.map((request) => {
                // Show the counterpart: the sender for received requests,
                // the receiver for requests the logged-in user sent
                const person =
                  activeTab === "sent" ||
                  (authUserId && request.sender?.id === authUserId)
                    ? request.receiver
                    : request.sender;
                const name = person?.full_name || "Unknown user";
                const isPendingIncoming =
                  activeTab === "incoming" && request.status === "pending";
                const isActing = actingId === request.id;

                return (
                  <div
                    key={request.id}
                    className="border rounded-xl p-5 flex items-center justify-between hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold ${getAvatarColor(
                          name
                        )}`}
                      >
                        {getInitials(name)}
                      </div>

                      <div>
                        <h2 className="font-bold text-lg">{name}</h2>

                        <p className="text-gray-500">
                          {activeTab === "sent" ? "you requested" : "wants to learn"}{" "}
                          <span className="font-medium text-black">
                            "{request.requested_skill?.name}"
                          </span>
                        </p>

                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-gray-400">
                            {timeAgo(request.created_at)}
                          </p>
                          <StatusBadge status={request.status} />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">

                      {isPendingIncoming && (
                        <>
                          <button
                            onClick={() => handleAction(request.id, "accept")}
                            disabled={isActing}
                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isActing ? "..." : "Accept"}
                          </button>

                          <button
                            onClick={() => handleAction(request.id, "reject")}
                            disabled={isActing}
                            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isActing ? "..." : "Decline"}
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setDetailId(request.id)}
                        className="border px-5 py-2 rounded-lg hover:bg-gray-100"
                      >
                        View
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

            {tabData.length === 0 && (
              <div className="text-center text-gray-400 py-16">
                {activeTab === "incoming"
                  ? "No incoming requests yet."
                  : activeTab === "sent"
                  ? "You haven't sent any requests yet."
                  : "No completed swaps yet."}
              </div>
            )}
          </>
        )}

      </div>

      {detailId && (
        <RequestDetailModal
          requestId={detailId}
          onClose={() => setDetailId(null)}
        />
      )}
    </div>
  );
}
