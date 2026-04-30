// Profile.jsx - Public Profile Page with Edit Functionality
// Displays user information, skills, ratings, achievements, and swap history
// Includes an edit mode to modify profile details

import { useState } from "react";
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
  MdCancel,
  MdAccessTime,
  MdTrendingUp,
  MdSchool,
  MdWork,
  MdMessage,
  MdBadge,
  MdCameraAlt,
} from "react-icons/md";
import { Link } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────

// Current user profile data (editable)
const initialUserData = {
  name: "Sarah Mohamed",
  title: "Senior Frontend Developer & UI/UX Enthusiast",
  location: "Cairo, Egypt",
  joined: "January 2024",
  about:
    "Passionate frontend developer with over 6 years of experience building modern web applications. I specialize in React, TypeScript, and Tailwind CSS. I believe in learning by teaching and love helping others grow their coding skills. Currently looking to expand my creative abilities by learning graphic design and video editing.",
  avatar: "SM",
  isVerified: true,
  isExpert: true,
  contributionRank: "Top 5% Contributor",
  reputation: 4.8,
  totalReviews: 42,
  totalSwaps: 28,
  swapSuccessRate: 96,
  responseTime: "< 1 hour",
  avgSessionLength: "45 mins",
  email: "sarah.mohamed@email.com",
  website: "sarahdev.me",
};

// Skills offered by the user (with qualification badges)
const initialSkillsOffered = [
  { id: 1, name: "React Development", category: "Programming", level: "Advanced", testScore: 94, isQualified: true },
  { id: 2, name: "TypeScript", category: "Programming", level: "Advanced", testScore: 89, isQualified: true },
  { id: 3, name: "Tailwind CSS", category: "Design", level: "Intermediate", testScore: 85, isQualified: true },
  { id: 4, name: "Git & GitHub", category: "Tools", level: "Intermediate", testScore: 78, isQualified: true },
];

// Skills the user wants to learn
const initialSkillsWanted = [
  { id: 1, name: "Graphic Design", category: "Design", level: "Beginner" },
  { id: 2, name: "Video Editing", category: "Creative", level: "Beginner" },
  { id: 3, name: "Public Speaking", category: "Soft Skills", level: "Beginner" },
  { id: 4, name: "Spanish Language", category: "Languages", level: "Beginner" },
];

// Recent successful swaps
const recentSwaps = [
  { id: 1, partner: "Alex Rivera", partnerAvatar: "AR", skillGiven: "React Development", skillReceived: "UI Design", date: "Mar 15, 2024", rating: 5 },
  { id: 2, partner: "Priya Sharma", partnerAvatar: "PS", skillGiven: "Git & GitHub", skillReceived: "Spanish Basics", date: "Mar 10, 2024", rating: 5 },
  { id: 3, partner: "Omar Khalid", partnerAvatar: "OK", skillGiven: "TypeScript", skillReceived: "Photography", date: "Mar 5, 2024", rating: 4 },
  { id: 4, partner: "Maya Chen", partnerAvatar: "MC", skillGiven: "Tailwind CSS", skillReceived: "Figma Basics", date: "Feb 28, 2024", rating: 5 },
];

// Reviews from swap partners
const reviews = [
  { id: 1, reviewer: "Alex Rivera", reviewerAvatar: "AR", rating: 5, text: "Sarah is an amazing React tutor! She explains complex concepts in a very simple and practical way. Highly recommended.", date: "Mar 16, 2024" },
  { id: 2, reviewer: "Priya Sharma", reviewerAvatar: "PS", rating: 5, text: "Consistently provides high-quality technical insights and clear communication. Learned so much about Git workflows.", date: "Mar 11, 2024" },
  { id: 3, reviewer: "Omar Khalid", reviewerAvatar: "OK", rating: 4, text: "Great TypeScript instructor. Very patient and thorough with explanations. Would swap again!", date: "Mar 6, 2024" },
  { id: 4, reviewer: "James Wilson", reviewerAvatar: "JW", rating: 5, text: "Sarah helped me understand Tailwind CSS in just two sessions. Her teaching style is engaging and effective.", date: "Feb 20, 2024" },
];

// Achievements earned
const achievements = [
  { id: 1, name: "Quick Responder", description: "Responds to requests within 1 hour", icon: MdAccessTime },
  { id: 2, name: "Top Mentor", description: "Completed 25+ successful swaps", icon: MdSchool },
  { id: 3, name: "Skill Verified", description: "Passed 4 qualification tests", icon: MdVerified },
  { id: 4, name: "Rising Star", description: "Top 5% contributor this month", icon: MdTrendingUp },
];

// ─── Helper Components ─────────────────────────────────────────────────────────

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

const Profile = () => {
  // State management
  const [userData, setUserData] = useState(initialUserData);
  const [skillsOffered, setSkillsOffered] = useState(initialSkillsOffered);
  const [skillsWanted, setSkillsWanted] = useState(initialSkillsWanted);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...initialUserData });

  // Toggle edit mode
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditData({ ...userData });
    } else {
      // Start editing - copy current data
      setEditData({ ...userData });
    }
    setIsEditing(!isEditing);
  };

  // Save edited data
  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Remove a skill from offered list
  const handleRemoveOfferedSkill = (skillId) => {
    setSkillsOffered((prev) => prev.filter((s) => s.id !== skillId));
  };

  // Remove a skill from wanted list
  const handleRemoveWantedSkill = (skillId) => {
    setSkillsWanted((prev) => prev.filter((s) => s.id !== skillId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Cover / Header Section ──────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 h-48 relative">
        {/* Edit cover photo button */}
        {isEditing && (
          <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-all backdrop-blur-sm">
            <MdCameraAlt className="text-lg" />
            Change Cover
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* ─── Profile Card ──────────────────────────────────────────────── */}
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
                  <MdLocationOn className="text-sm" /> {isEditing ? (
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

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-all shadow-sm"
                  >
                    <MdSave className="text-lg" /> Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    <MdClose className="text-lg" /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    <MdEdit className="text-lg" /> Edit Profile
                  </button>
                  <Link
                    to="/messages"
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all shadow-sm"
                  >
                    <MdMessage className="text-lg" /> Message
                  </Link>
                </>
              )}
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
        </div>

        {/* ─── Skills Section ─────────────────────────────────────────────── */}
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
              {skillsOffered.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
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
                  <button
                    onClick={() => handleRemoveOfferedSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                    title="Remove skill"
                  >
                    <MdClose className="text-sm" />
                  </button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-xl text-sm text-gray-400 hover:text-blue-500 transition-all">
                <MdAdd className="text-lg" /> Add New Skill
              </button>
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
              {skillsWanted.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
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
                  <button
                    onClick={() => handleRemoveWantedSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                    title="Remove skill"
                  >
                    <MdClose className="text-sm" />
                  </button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 hover:border-violet-300 rounded-xl text-sm text-gray-400 hover:text-violet-500 transition-all">
                <MdAdd className="text-lg" /> Add Skill to Learn
              </button>
            </div>
          </div>
        </div>

        {/* ─── Achievements ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MdBadge className="text-amber-500" /> Achievements
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
                    <Icon className="text-xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{achievement.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Recent Swaps ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MdSwapHoriz className="text-blue-500" /> Recent Swaps
            </h3>
            <span className="text-xs text-gray-400">Last 30 days</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentSwaps.map((swap) => (
              <div key={swap.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
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

        {/* ─── Reviews ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MdStar className="text-amber-500" /> Reviews & Feedback
            </h3>
            <span className="text-sm text-gray-400">{reviews.length} reviews</span>
          </div>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
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
            View all {reviews.length} reviews
          </button>
        </div>

        {/* ─── Contact Info ────────────────────────────────────────────────── */}
        {isEditing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  value={editData.website}
                  onChange={handleInputChange}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
