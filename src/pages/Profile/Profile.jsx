// Profile.jsx - Public Profile Page with Edit Functionality
// Displays user information, skills, ratings, achievements, and swap history
// Includes an edit mode to modify profile details
// Loads the profile from GET /api/users/:id (route param) or the logged-in user

import { useEffect, useState } from "react";
import {
  MdEdit,
  MdSave,
  MdClose,
  MdAdd,
  MdStar,
  MdVerified,
  MdLocationOn,
  MdCalendarToday,
  MdSwapHoriz,
  MdCheckCircle,
  MdAccessTime,
  MdTrendingUp,
  MdSchool,
  MdMessage,
  MdBadge,
  MdCameraAlt,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/context";
import { getUser } from "../../services/api";


const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const mapApiUser = (u) => ({
  _id: u.id,
  name: u.full_name || "",
  title: u.title || "",
  location: u.location || "",
  joined: u.joined_at
    ? new Date(u.joined_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "",
  about: u.bio || "",
  avatar: getInitials(u.full_name),
  isVerified: !!u.verified,
  isExpert: !!u.verified_expert,
  contributionRank: u.top_contributor ? "Top Contributor" : "",
  reputation: u.rating ?? 0,
  totalReviews: u.reviews_count ?? 0,
  totalSwaps: u.total_swaps ?? 0,
  swapSuccessRate: u.success_rate ?? 0,
  responseTime: u.response_time || "—",
  avgSessionLength: u.session_length || "—",
  email: u.email || "",
  website: u.website || "",
});

const iconMap = {
  MdAccessTime,
  MdSchool,
  MdVerified,
  MdTrendingUp,
};


// Avatar with optional verified badge
const Avatar = ({ initials, size = "md", showVerified = false }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };
  const colors = [
    "bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500",
    "bg-pink-500", "bg-cyan-500", "bg-rose-500", "bg-indigo-500",
  ];
  const colorIndex = initials?.charCodeAt(0) % colors.length || 0;

  return (
    <div className="relative inline-block flex-shrink-0">
      <div className={`${sizes[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold`}>
        {initials}
      </div>
      {showVerified && (
        <MdVerified className="absolute -bottom-0.5 -right-0.5 text-blue-500 text-lg bg-white rounded-full" />
      )}
    </div>
  );
};

// Star rating component
const StarRating = ({ rating, max = 5, showNumber = false }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <MdStar key={i} className={`text-sm ${i < Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`} />
      ))}
      {showNumber && <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>}
    </div>
  );
};

// Skill level badge
const LevelBadge = ({ level }) => {
  const colors = {
    Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Intermediate: "bg-blue-50 text-blue-700 border-blue-200",
    Advanced: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[level] || colors.Beginner}`}>
      {level}
    </span>
  );
};

// ─── Main Profile Component ────────────────────────────────────────────────────

const Profile = ({
  // Props for dynamic data from parent/API
  userData: propUserData,
  skillsOffered: propSkillsOffered,
  skillsWanted: propSkillsWanted,
  recentSwaps: propRecentSwaps,
  reviews: propReviews,
  achievements: propAchievements,
  isOwner = false,        // true if viewing own profile
  onSave,                 // callback: (updatedData) => Promise
  onRemoveSkill,          // callback: (skillId, type) => Promise  [type: "offered" | "wanted"]
}) => {
  const { id: routeUserId } = useParams();
  const { user: authUser, loading: authLoading } = useAuth();

  // Use props if provided, otherwise load from the API
  const [userData, setUserData] = useState(propUserData || null);
  const [skillsOffered, setSkillsOffered] = useState(propSkillsOffered || []);
  const [skillsWanted, setSkillsWanted] = useState(propSkillsWanted || []);
  const [swaps] = useState(propRecentSwaps || []);
  const [reviewList] = useState(propReviews || []);
  const [achievementList] = useState(propAchievements || []);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(!propUserData);
  const [profileError, setProfileError] = useState(null);

  // Fetch the profile: route param id (someone else) or the logged-in user
  useEffect(() => {
    if (propUserData) return; // parent supplied the data
    if (authLoading) return; // wait for the auth check to finish

    const targetId = routeUserId || authUser?.id || authUser?._id;

    if (!targetId) {
      setProfileError("Please log in to view your profile.");
      setProfileLoading(false);
      return;
    }

    let ignore = false;

    const fetchProfile = async () => {
      setProfileLoading(true);
      setProfileError(null);

      try {
        const data = await getUser(targetId);

        if (!ignore) {
          const mapped = mapApiUser(data.user);
          setUserData(mapped);
          setEditData(mapped);
        }
      } catch (e) {
        if (!ignore) {
          setProfileError(
            e.status === 404
              ? "User not found."
              : e.status === 401
              ? "Please log in to view profiles."
              : e.message || "Failed to load profile."
          );
        }
      } finally {
        if (!ignore) setProfileLoading(false);
      }
    };

    fetchProfile();

    return () => {
      ignore = true;
    };
  }, [propUserData, routeUserId, authUser, authLoading]);

  // Determine if user can edit (owner of profile)
  const authUserId = authUser?.id || authUser?._id;
  const canEdit =
    isOwner ||
    (!!authUserId && (routeUserId ? routeUserId === authUserId : true));

  // Toggle edit mode
  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...userData });
      setSaveSuccess(false);
    } else {
      setEditData({ ...userData });
    }
    setIsEditing(!isEditing);
  };

  // Save edited data
  const handleSave = async () => {
    // Basic validation
    if (!editData.name?.trim()) return;

    setSaveLoading(true);

    try {
      // If onSave callback provided (API), use it; otherwise update locally
      if (onSave) {
        await onSave(editData);
      }
      setUserData({ ...editData });
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  // Remove a skill
  const handleRemoveSkill = (skillId, type) => {
    if (onRemoveSkill) {
      onRemoveSkill(skillId, type);
    }
    if (type === "offered") {
      setSkillsOffered((prev) => prev.filter((s) => (s._id || s.id) !== skillId));
    } else {
      setSkillsWanted((prev) => prev.filter((s) => (s._id || s.id) !== skillId));
    }
  };

  // Sync with prop changes (when data loads from API after initial render)
  if (propUserData && propUserData._id !== userData?._id) {
    setUserData(propUserData);
    setEditData(propUserData);
  }

  // Loading state
  if (profileLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-4" />
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Error / not found state
  if (profileError || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-400 text-xl flex items-center justify-center mb-4">
          !
        </div>
        <h1 className="text-lg font-bold text-gray-900">
          Couldn't load this profile
        </h1>
        <p className="mt-2 text-sm text-gray-500 max-w-md">
          {profileError || "Something went wrong."}
        </p>
        <Link
          to="/discover"
          className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 h-48 relative">
        {isEditing && (
          <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-all backdrop-blur-sm">
            <MdCameraAlt className="text-lg" />
            Change Cover
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Success message */}
        {saveSuccess && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
            <MdCheckCircle className="text-lg" /> Profile saved successfully!
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="relative -mt-16 sm:-mt-20">
              <Avatar initials={userData.avatar} size="xl" showVerified={userData.isVerified} />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all">
                  <MdCameraAlt className="text-sm" />
                </button>
              )}
            </div>

            {/* User info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="text-xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent outline-none text-center sm:text-left"
                  />
                ) : (
                  <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
                )}
                {userData.isVerified && <MdVerified className="text-blue-500 text-lg" />}
                {userData.isExpert && (
                  <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <MdBadge className="text-sm" /> Verified Expert
                  </span>
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleInputChange}
                  className="text-sm text-gray-500 border-b border-gray-300 bg-transparent outline-none w-full max-w-md mt-1 block mx-auto sm:mx-0"
                />
              ) : (
                <p className="text-sm text-gray-500">{userData.title}</p>
              )}

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MdLocationOn className="text-sm" />
                  {isEditing ? (
                    <input type="text" name="location" value={editData.location} onChange={handleInputChange} className="border-b border-gray-300 bg-transparent outline-none w-24" />
                  ) : userData.location}
                </span>
                <span className="flex items-center gap-1">
                  <MdCalendarToday className="text-sm" /> Joined {userData.joined}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <MdTrendingUp className="text-sm" /> {userData.contributionRank}
                </span>
              </div>
            </div>

            {/* Action buttons - only show Edit if owner */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {canEdit && (
                isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saveLoading}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-all shadow-sm disabled:opacity-50"
                    >
                      <MdSave className="text-lg" /> {saveLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
                    >
                      <MdClose className="text-lg" /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    <MdEdit className="text-lg" /> Edit Profile
                  </button>
                )
              )}
              <Link
                to={`/messages?userId=${userData._id || userData.name}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all shadow-sm"
              >
                <MdMessage className="text-lg" /> Message
              </Link>
            </div>
          </div>

          {/* About section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
            {isEditing ? (
              <textarea
                name="about"
                value={editData.about}
                onChange={handleInputChange}
                rows={3}
                className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">{userData.about}</p>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Reputation", value: userData.reputation, sub: `${userData.totalReviews} reviews`, icon: MdStar, color: "text-amber-500" },
              { label: "Total Swaps", value: userData.totalSwaps, sub: `${userData.swapSuccessRate}% success`, icon: MdSwapHoriz, color: "text-blue-500" },
              { label: "Response Time", value: userData.responseTime, sub: "average", icon: MdAccessTime, color: "text-emerald-500" },
              { label: "Session Length", value: userData.avgSessionLength, sub: "average", icon: MdTrendingUp, color: "text-violet-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <stat.icon className={`${stat.color} text-xl mx-auto mb-1`} />
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xs text-gray-400">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Contact Info - visible in both modes */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                ) : (
                  <p className="text-sm text-gray-700">{userData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Website</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="website"
                    value={editData.website}
                    onChange={handleInputChange}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                ) : (
                  <p className="text-sm text-gray-700">{userData.website}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Skills Offered */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MdSchool className="text-blue-500" /> Skills I Offer
              </h3>
              <span className="text-xs text-gray-400">{skillsOffered.length} skills</span>
            </div>
            <div className="space-y-2">
              {skillsOffered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No skills listed yet.
                </p>
              )}
              {skillsOffered.map((skill) => (
                <div key={skill._id || skill.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                      {skill.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{skill.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <LevelBadge level={skill.level} />
                        {skill.isQualified && (
                          <span className="text-xs text-emerald-600 flex items-center gap-0.5">
                            <MdCheckCircle className="text-xs" /> Score: {skill.testScore}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => handleRemoveSkill(skill._id || skill.id, "offered")}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                      title="Remove skill"
                    >
                      <MdClose className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
              {canEdit && (
                <Link
                  to="https://depi-project-wme9.vercel.app/search-skill"
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-xl text-sm text-gray-400 hover:text-blue-500 transition-all"
                >
                  <MdAdd className="text-lg" />
                  Add New Skill
                </Link>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MdTrendingUp className="text-violet-500" /> Skills I Want to Learn
              </h3>
              <span className="text-xs text-gray-400">{skillsWanted.length} skills</span>
            </div>
            <div className="space-y-2">
              {skillsWanted.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No skills added yet.
                </p>
              )}
              {skillsWanted.map((skill) => (
                <div key={skill._id || skill.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-sm font-bold">
                      {skill.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{skill.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <LevelBadge level={skill.level} />
                        <span className="text-xs text-gray-400">{skill.category}</span>
                      </div>
                    </div>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => handleRemoveSkill(skill._id || skill.id, "wanted")}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                      title="Remove skill"
                    >
                      <MdClose className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
              {canEdit && (
                <Link
                  to="https://depi-project-wme9.vercel.app/discover"
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 hover:border-violet-300 rounded-xl text-sm text-gray-400 hover:text-violet-500 transition-all"
                >
                  <MdAdd className="text-lg" />
                  Add Skill to Learn
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MdBadge className="text-amber-500" /> Achievements
          </h3>
          {achievementList.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              No achievements yet.
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievementList.map((achievement) => {
              const IconComponent = iconMap[achievement.icon] || MdBadge;
              return (
                <div key={achievement._id || achievement.id} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
                    <IconComponent className="text-xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{achievement.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Swaps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MdSwapHoriz className="text-blue-500" /> Recent Swaps
            </h3>
            <span className="text-xs text-gray-400">Last 30 days</span>
          </div>
          {swaps.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              No swaps yet.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {swaps.map((swap) => (
              <div key={swap._id || swap.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Avatar initials={swap.partnerAvatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{swap.partner}</p>
                  <p className="text-xs text-gray-500">
                    <span className="text-blue-600">Gave:</span> {swap.skillGiven}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="text-violet-600">Received:</span> {swap.skillReceived}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <StarRating rating={swap.rating} />
                  <p className="text-xs text-gray-400 mt-0.5">{swap.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MdStar className="text-amber-500" /> Reviews & Feedback
            </h3>
            <span className="text-sm text-gray-400">{reviewList.length} reviews</span>
          </div>
          {reviewList.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              No reviews yet.
            </p>
          )}
          <div className="space-y-3">
            {reviewList.map((review) => (
              <div key={review._id || review.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar initials={review.reviewerAvatar} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{review.reviewer}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-500 hover:text-blue-600 font-medium py-2 text-center">
            View all {reviewList.length} reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
