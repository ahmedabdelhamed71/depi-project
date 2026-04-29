import { useState } from "react";
import { Link } from "react-router-dom";
import {

  MdDashboard, MdExplore, MdSwapHoriz,
  MdPerson, MdSettings, MdAdd,
  MdClose, MdMenu, MdChevronRight, MdStar, MdCheck, MdBolt,
  MdSchool, MdCode, MdBrush, MdCamera, MdMusicNote,
  MdLanguage, MdTrendingUp, MdSend, MdArrowForward
} from "react-icons/md";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const currentUser = {
  name: "Sarah Mohamed", role: "Member", avatar: "AM",
  reputation: 4.8, reviews: 32, badge: "Top Exchanger",
  joined: "Jan 2024", swapsCompleted: 14,
};

const skillsOffered = [
  { id: 1, name: "React Development", level: "Advanced",     icon: MdCode,       color: "blue"   },
  { id: 2, name: "UI/UX Design",      level: "Intermediate", icon: MdBrush,      color: "purple" },
  { id: 3, name: "Data Engineering",        level: "Intermediate", icon: MdCamera,     color: "amber"  },
];

const skillsWanted = [
  { id: 1, name: "Spanish Language", level: "Beginner",      icon: MdLanguage,   color: "green" },
  { id: 2, name: "Prompt Engineering",   level: "Beginner",      icon: MdMusicNote,  color: "pink"  },
  { id: 3, name: "Data Analysis",    level: "Intermediate",  icon: MdTrendingUp, color: "cyan"  },
];

const initialIncoming = [
  { id: 1, name: "Ali",   avatar: "SC", skill: "React Development", time: "2h ago" },
  { id: 2, name: "Sami",   avatar: "JO", skill: "UI/UX Design",      time: "5h ago" },
  { id: 3, name: "Nour", avatar: "LM", skill: "Photography",        time: "1d ago" },
];

const outgoingRequests = [
  { id: 1, name: "Brad Bitt",   avatar: "TH", skill: "Spanish Language", status: "Pending"  },
  { id: 2, name: "Pedri", avatar: "MJ", skill: "Guitar Playing",   status: "Accepted" },
  { id: 3, name: "Lamine Yamal",   avatar: "DK", skill: "Data Analysis",    status: "Rejected" },
];

const suggestedMatches = [
  { id: 1, name: "Zizo",   avatar: "z", offers: "Python & ML",   wants: "UI Design",  match: 94 },
  { id: 2, name: "Marwan", avatar: "m", offers: "Spanish Tutor", wants: "Web Dev",     match: 91 },
  { id: 3, name: "Mariam",   avatar: "m", offers: "Music Theory",  wants: "Photography", match: 88 },
  { id: 4, name: "Hany",  avatar: "h", offers: "Fitness Coach", wants: "Coding",      match: 85 },
  { id: 5, name: "Abdo", avatar: "a", offers: "Full Stack", wants: "Web Dev",     match: 90 },
  { id: 6, name: "Amr",   avatar: "a", offers: "Music Theory",  wants: "Photography", match: 87 },
  { id: 7, name: "Mohaned",  avatar: "m", offers: "Fitness Coach", wants: "Coding",      match: 70 },
];

const navItems = [
  { label: "Dashboard", icon: MdDashboard, to: "/dashboard" },
  { label: "Discover",  icon: MdExplore,   to: "/discover"  },
  { label: "Requests",  icon: MdSwapHoriz, to: "/requests"  },
  { label: "Profile",   icon: MdPerson,    to: "/profile"   },
  { label: "Settings",  icon: MdSettings,  to: "/settings"  },
];

// ─── Style Maps ───────────────────────────────────────────────────────────────
const levelColors = {
  Beginner:     "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Intermediate: "bg-blue-50    text-blue-700    border border-blue-200",
  Advanced:     "bg-violet-50  text-violet-700  border border-violet-200",
};

const statusColors = {
  Pending:  "bg-amber-50   text-amber-700   border border-amber-200",
  Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Rejected: "bg-red-50     text-red-700     border border-red-200",
};

const skillColorMap = {
  blue:   "bg-blue-50    text-blue-600",
  purple: "bg-violet-50  text-violet-600",
  amber:  "bg-amber-50   text-amber-600",
  green:  "bg-emerald-50 text-emerald-600",
  pink:   "bg-pink-50    text-pink-600",
  cyan:   "bg-cyan-50    text-cyan-600",
};

const avatarColors = [
  "bg-blue-500","bg-violet-500","bg-emerald-500",
  "bg-amber-500","bg-pink-500","bg-cyan-500","bg-rose-500",
];
const getAvatarColor = (str) => avatarColors[str.charCodeAt(0) % avatarColors.length];

// ─── Shared Components ────────────────────────────────────────────────────────
const Avatar = ({ initials, size = "md" }) => {
  const sizes = { sm: "w-8 h-8 text-sm", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  return (
    <div className={`${sizes[size]} ${getAvatarColor(initials)} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
};

const SkillCard = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${skillColorMap[skill.color]}`}>
        <Icon className="text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{skill.name}</p>
        <span className={`text-sm px-2 py-0.5 rounded-full ${levelColors[skill.level]}`}>{skill.level}</span>
      </div>
    </div>
  );
};

// ─── Section Components ───────────────────────────────────────────────────────
const UserOverviewCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm">
    <div className="relative mb-3">
      <Avatar initials={currentUser.avatar} size="lg" />
      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" />
    </div>
    <h2 className="font-bold text-gray-900 text-base">{currentUser.name}</h2>
    <span className="text-sm text-gray-500 mt-0.5">{currentUser.role} · Since {currentUser.joined}</span>
    <div className="flex items-center gap-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <MdStar key={i} className={`text-sm ${i < Math.floor(currentUser.reputation) ? "text-amber-400" : "text-gray-200"}`} />
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{currentUser.reputation}</span>
      <span className="text-sm text-gray-400">({currentUser.reviews})</span>
    </div>
    <span className="mt-3 inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-blue-100">
      <MdBolt className="text-sm" /> {currentUser.badge}
    </span>
    <div className="mt-4 w-full grid grid-cols-2 gap-2">
      <div className="bg-gray-50 rounded-xl py-2">
        <p className="text-lg font-bold text-gray-900">{currentUser.swapsCompleted}</p>
        <p className="text-sm text-gray-500">Swaps Done</p>
      </div>
      <div className="bg-gray-50 rounded-xl py-2">
        <p className="text-lg font-bold text-gray-900">{skillsOffered.length}</p>
        <p className="text-sm text-gray-500">Skills Listed</p>
      </div>
    </div>
  </div>
);

const QuickActions = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <h3 className="font-semibold text-gray-900 text-sm mb-4">Quick Actions</h3>
    <div className="space-y-2">
      {[
        { label: "Add a New Skill", icon: MdAdd,     sub: "Share what you know", to: "/profile",  primary: true  },
        { label: "Take Skill Test", icon: MdSchool,  sub: "Verify your level",   to: "/testpage",     primary: false },
        { label: "Go to Discover",  icon: MdExplore, sub: "Find skill matches",  to: "/discover", primary: false },
      ].map(({ label, icon: Icon, sub, to, primary }) => (
        <Link
          key={label}
          to={to}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.01] ${primary ? "bg-blue-600 text-white shadow-sm shadow-blue-200" : "bg-gray-50 hover:bg-gray-100 text-gray-800"}`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${primary ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"}`}>
            <Icon className="text-lg" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">{label}</p>
            <p className={`text-sm ${primary ? "text-blue-200" : "text-gray-400"}`}>{sub}</p>
          </div>
          <MdChevronRight className="ml-auto text-lg opacity-60" />
        </Link>
      ))}
    </div>
  </div>
);

const StatsCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <h3 className="font-semibold text-gray-900 text-sm mb-4">This Month</h3>
    <div className="space-y-4">
      {[
        { label: "Profile Views",      value: 48, max: 100, color: "bg-blue-500"    },
        { label: "Swap Requests Sent", value: 6,  max: 20,  color: "bg-violet-500"  },
        { label: "Matches Found",      value: 12, max: 20,  color: "bg-emerald-500" },
        { label: "Skills Exchanged",   value: 3,  max: 10,  color: "bg-amber-500"   },
      ].map(({ label, value, max, color }) => (
        <div key={label}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full`} style={{ width: `${(value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = ({ skillTab, setSkillTab }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">My Skills</h3>
      <Link to="/profile" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
        <MdAdd /> Add Skill
      </Link>
    </div>
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4 w-fit">
      {[{ key: "offer", label: "Skills I Offer" }, { key: "want", label: "Skills I Want" }].map(t => (
        <button
          key={t.key}
          onClick={() => setSkillTab(t.key)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${skillTab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {(skillTab === "offer" ? skillsOffered : skillsWanted).map(skill => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
      <Link to="/profile" className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 rounded-xl transition-all group">
        <div className="w-9 h-9 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
          <MdAdd className="text-gray-400 group-hover:text-blue-500 text-lg" />
        </div>
        <span className="text-sm text-gray-400 group-hover:text-blue-500 font-medium">Add skill</span>
      </Link>
    </div>
  </div>
);

const IncomingRequests = ({ requests, onAction }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">Incoming Requests</h3>
      {requests.length > 0 && (
        <span className="bg-blue-100 text-blue-700 text-sm font-bold px-2.5 py-1 rounded-full">{requests.length}</span>
      )}
    </div>
    <div className="space-y-3">
      {requests.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <MdSwapHoriz className="text-4xl mx-auto mb-2 opacity-40" />
          <p className="text-sm">No pending requests</p>
        </div>
      ) : requests.map(r => (
        <div key={r.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Avatar initials={r.avatar} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{r.name}</p>
            <p className="text-s text-gray-500 truncate">wants: <span className="text-blue-600">{r.skill}</span></p>
            <p className="text-s text-gray-400">{r.time}</p>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => onAction(r.id)} className="w-8 h-8 bg-emerald-50 hover:bg-blue-gray-50 text-emerald-600 hover:text-blue-500 rounded-lg flex items-center justify-center transition-all">
              <MdCheck className="text-base" />
            </button>
            <button onClick={() => onAction(r.id)} className="w-8 h-8 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all">
              <MdClose className="text-base" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OutgoingRequests = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-gray-900">Outgoing Requests</h3>
      <Link to="/requests" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-0.5">
        View all <MdArrowForward className="text-sm" />
      </Link>
    </div>
    <div className="space-y-3">
      {outgoingRequests.map(r => (
        <div key={r.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Avatar initials={r.avatar} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{r.name}</p>
            <p className="text-sm text-gray-500 truncate">Requested: <span className="text-gray-700">{r.skill}</span></p>
          </div>
          <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${statusColors[r.status]}`}>{r.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const SuggestedMatches = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">Suggested Matches</h3>
      <Link to="/discover" className="text-s text-blue-600 font-medium hover:underline flex items-center gap-0.5">
        See all <MdArrowForward className="text-sm" />
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {suggestedMatches.map(m => (
        <div key={m.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between mb-3">
            <Avatar initials={m.avatar} size="sm" />
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {m.match}% match
            </span>
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">{m.name}</p>
          <p className="text-sm text-gray-500 mb-0.5">Offers: <span className="text-gray-700 font-medium">{m.offers}</span></p>
          <p className="text-sm text-gray-500 mb-3">Wants: <span className="text-gray-700 font-medium">{m.wants}</span></p>
          <div className="flex gap-1.5">
            <Link to="/requests" className="flex-1 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1">
              <MdSend className="text-sm" /> Request
            </Link>
            <Link to={`/profile/${m.id}`} className="flex-1 text-sm border border-gray-200 hover:bg-gray-100 text-gray-700 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeNav, setActiveNav, requestCount }) => (
  <aside className={` fixed md:fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 bg-white border-r border-gray-100 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 `}>
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map(({ label, icon: Icon, to }) => (
        <Link
          key={label}
          to={to}
          onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === label ? "bg-blue-600 text-white shadow-sm shadow-blue-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
        >
          <Icon className="text-lg flex-shrink-0" />
          {label}
          {label === "Requests" && requestCount > 0 && (
            <span className={`ml-auto text-sm font-bold px-2 py-0.5 rounded-full ${activeNav === label ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"}`}>
              {requestCount}
            </span>
          )}
        </Link>
      ))}
    </nav>
    <div className="p-3 border-t border-gray-100">
      <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
        <Avatar initials={currentUser.avatar} size="sm" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
          <p className="text-sm text-gray-500">{currentUser.badge}</p>
        </div>
      </Link>
    </div>
  </aside>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav,   setActiveNav]   = useState("Dashboard");
  const [skillTab,    setSkillTab]    = useState("offer");
  const [requests,    setRequests]    = useState(initialIncoming);

  const handleRequest = (id) => setRequests(prev => prev.filter(r => r.id !== id));

  return (
    <div className="min-h-screen bg-slate-50">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}  setSidebarOpen={setSidebarOpen}
        activeNav={activeNav}      setActiveNav={setActiveNav}
        requestCount={requests.length}
      />

      <main className="md:ml-56 pt-10 min-h-screen">

        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 h-14 flex items-center px-4 gap-3 md:hidden">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setSidebarOpen(true)}>
            <MdMenu className="text-xl text-gray-600" />
          </button>
          <span className="font-bold text-gray-900">Dashboard</span>
        </div>

        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Good morning, {currentUser.name.split(" ")[0]} 👋</h1>
              <p className="text-sm text-gray-500 mt-0.5">You have {requests.length} pending swap requests</p>
            </div>
            <Link to="/profile" className="hidden sm:flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm">
              <MdAdd className="text-lg" /> Add Skill
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UserOverviewCard />
            <QuickActions />
            <StatsCard />
          </div>

          <SkillsSection skillTab={skillTab} setSkillTab={setSkillTab} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IncomingRequests requests={requests} onAction={handleRequest} />
            <OutgoingRequests />
          </div>

          <SuggestedMatches />

        </div>

      </main>
    </div>
  );
};

export default Dashboard;