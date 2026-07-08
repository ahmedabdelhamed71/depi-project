import { useState } from "react";
import { Link } from "react-router-dom";

const incomingRequests = [
  {
    id: 1,
    name: "Sarah Mohamed",
    skill: "Web Development",
    time: "2 hours ago",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    name: "Omar Tarek",
    skill: "JavaScript",
    time: "1 day ago",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "Laila Hassan",
    skill: "English",
    time: "2 days ago",
    image: "https://i.pravatar.cc/100?img=32",
  },
];

const sentRequests = [
  {
    id: 4,
    name: "Ahmed Ali",
    skill: "React",
    time: "Yesterday",
    image: "https://i.pravatar.cc/100?img=15",
  },
];

const completedRequests = [
  {
    id: 5,
    name: "Mona Adel",
    skill: "UI/UX",
    time: "Last Week",
    image: "https://i.pravatar.cc/100?img=25",
  },
];

export default function Requests() {
  const [activeTab, setActiveTab] = useState("incoming");

  const getData = () => {
    switch (activeTab) {
      case "sent":
        return sentRequests;
      case "completed":
        return completedRequests;
      default:
        return incomingRequests;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Swap Requests</h1>

          <Link
            to="/search-skill"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            + New Request
          </Link>
        </div>

        {/* Tabs */}

        <div className="flex gap-8 border-b mb-8">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`pb-3 ${
              activeTab === "incoming"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Incoming
          </button>

          <button
            onClick={() => setActiveTab("sent")}
            className={`pb-3 ${
              activeTab === "sent"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Sent
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3 ${
              activeTab === "completed"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Cards */}

        <div className="space-y-4">
          {getData().map((request) => (
            <div
              key={request.id}
              className="border rounded-xl p-5 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={request.image}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-bold text-lg">{request.name}</h2>

                  <p className="text-gray-500">
                    wants to learn{" "}
                    <span className="font-medium text-black">
                      "{request.skill}"
                    </span>
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {request.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">

                {activeTab === "incoming" && (
                  <>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
                      Accept
                    </button>

                    <button className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg">
                      Decline
                    </button>
                  </>
                )}

                <button className="border px-5 py-2 rounded-lg hover:bg-gray-100">
                  View
                </button>

              </div>
            </div>
          ))}
        </div>

        {getData().length === 0 && (
          <div className="text-center text-gray-400 py-16">
            No requests found.
          </div>
        )}

      </div>
    </div>
  );
}