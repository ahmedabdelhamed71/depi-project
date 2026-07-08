import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "Development",
  "Design",
  "Languages",
  "Business",
  "Photography",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const people = [
  {
    id: 1,
    name: "Youssef Adel",
    title: "Frontend Developer",
    location: "Alexandria, Egypt",
    avatar: "/avatars/avatar1.png",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    category: "Development",
    level: "Intermediate",
  },
  {
    id: 2,
    name: "Mariam Khaled",
    title: "Graphic Designer",
    location: "Cairo, Egypt",
    avatar: "/avatars/avatar2.png",
    skills: ["Photoshop", "Illustrator", "Branding"],
    category: "Design",
    level: "Advanced",
  },
  {
    id: 3,
    name: "Mostafa Ali",
    title: "Mobile Developer",
    location: "Mansoura, Egypt",
    avatar: "/avatars/avatar3.png",
    skills: ["Flutter", "Dart", "Firebase"],
    category: "Development",
    level: "Beginner",
  },
  {
    id: 4,
    name: "Nour Ahmed",
    title: "English Instructor",
    location: "Giza, Egypt",
    avatar: "/avatars/avatar4.png",
    skills: ["Speaking", "Grammar", "IELTS"],
    category: "Languages",
    level: "Intermediate",
  },
  {
    id: 5,
    name: "Karim Hassan",
    title: "Frontend Developer",
    location: "Tanta, Egypt",
    avatar: "/avatars/avatar5.png",
    skills: ["React", "Redux", "Vite"],
    category: "Development",
    level: "Advanced",
  },
  {
    id: 6,
    name: "Salma Magdy",
    title: "UI/UX Designer",
    location: "Zagazig, Egypt",
    avatar: "/avatars/avatar6.png",
    skills: ["Figma", "Wireframing", "Prototyping"],
    category: "Design",
    level: "Beginner",
  },
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Best Match");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedLevel("All Levels");
    setSortBy("Best Match");
  };

  const filteredPeople = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    let result = people.filter((person) => {
      const matchesSearch =
        !value ||
        person.name.toLowerCase().includes(value) ||
        person.title.toLowerCase().includes(value) ||
        person.skills.some((skill) => skill.toLowerCase().includes(value));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(person.category);

      const matchesLevel =
        selectedLevel === "All Levels" || person.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    if (sortBy === "Name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "Level") {
      const order = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
      };

      result = [...result].sort((a, b) => order[a.level] - order[b.level]);
    }

    return result;
  }, [searchTerm, selectedCategories, selectedLevel, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-slate-200 bg-white p-5 lg:border-b-0 lg:border-r">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Filters
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Refine your matches
                </p>
              </div>

              <span className="text-lg text-slate-400">≡</span>
            </div>

            <div className="space-y-7">
              <div>
                <label
                  htmlFor="discover-search"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Search
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    🔍
                  </span>

                  <input
                    id="discover-search"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by name or skill..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-700">
                    Category
                  </h3>

                  {(selectedCategories.length > 0 ||
                    searchTerm ||
                    selectedLevel !== "All Levels") && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="level-filter"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Level
                </label>

                <select
                  id="level-filter"
                  value={selectedLevel}
                  onChange={(event) => setSelectedLevel(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          <section className="bg-slate-50/70 p-5 sm:p-7 lg:p-8">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-950">
                  Discover People
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Find and connect with people to learn and teach skills
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">
                  Sort by:
                </span>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                >
                  <option>Best Match</option>
                  <option>Name</option>
                  <option>Level</option>
                </select>
              </div>
            </div>

            {filteredPeople.length > 0 ? (
              <div className="space-y-4">
                {filteredPeople.map((person) => (
                  <article
                    key={person.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-50"
                        />

                        <div>
                          <h2 className="text-base font-bold text-slate-950">
                            {person.name}
                          </h2>

                          <p className="mt-1 text-sm font-medium text-slate-600">
                            {person.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            📍 {person.location}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {person.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 md:self-center">
                        <Link
                          to="/profile"
                          className="rounded-xl bg-blue-100 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                        >
                          View Profile
                        </Link>

                        <button
                          type="button"
                          aria-label={`Send request to ${person.name}`}
                          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          ↗
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-xl text-slate-400">
                  ×
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  No people found
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Try changing your search keyword, category, or selected level.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default Discover;