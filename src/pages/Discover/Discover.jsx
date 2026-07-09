import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/api";

const categories = [
  "Development",
  "Design",
  "Languages",
  "Business",
  "Photography",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const PAGE_LIMIT = 10;

const avatarColors = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-cyan-500",
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Best Match");

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getUsers({
          page,
          limit: PAGE_LIMIT,
          search: debouncedSearch,
        });

        if (!ignore) {
          setPeople(data.users || []);
          setTotalPages(data.total_pages || 1);
          setTotal(data.total || 0);
        }
      } catch (e) {
        if (!ignore) {
          setError(
            e.status === 401
              ? "Please log in to discover people."
              : e.message || "Failed to load users."
          );
          setPeople([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [page, debouncedSearch, reloadKey]);

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
    setPage(1);
  };

  const filteredPeople = useMemo(() => {
    let result = people.filter((person) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        !person.category ||
        selectedCategories.includes(person.category);

      const matchesLevel =
        selectedLevel === "All Levels" ||
        !person.level ||
        person.level === selectedLevel;

      return matchesCategory && matchesLevel;
    });

    if (sortBy === "Name") {
      result = [...result].sort((a, b) =>
        (a.full_name || "").localeCompare(b.full_name || "")
      );
    }

    if (sortBy === "Level") {
      const order = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
      };

      result = [...result].sort(
        (a, b) => (order[a.level] || 0) - (order[b.level] || 0)
      );
    }

    return result;
  }, [people, selectedCategories, selectedLevel, sortBy]);

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
                    placeholder="Search by name or email..."
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
                  {total > 0 && !loading && ` · ${total} people`}
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

            {loading ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                <p className="text-sm text-slate-500">Loading people...</p>
              </div>
            ) : error ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-white p-8 text-center">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-50 text-xl text-red-400">
                  !
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  Couldn't load people
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">{error}</p>

                <button
                  type="button"
                  onClick={() => setReloadKey((prev) => prev + 1)}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : filteredPeople.length > 0 ? (
              <>
                <div className="space-y-4">
                  {filteredPeople.map((person, index) => (
                    <article
                      key={person.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`grid h-16 w-16 place-items-center rounded-full text-lg font-semibold text-white ring-4 ring-blue-50 ${
                              avatarColors[index % avatarColors.length]
                            }`}
                          >
                            {getInitials(person.full_name)}
                          </div>

                          <div>
                            <h2 className="text-base font-bold text-slate-950">
                              {person.full_name}
                              {person.verified && (
                                <span
                                  className="ml-1.5 text-sm text-blue-500"
                                  title="Verified"
                                >
                                  ✓
                                </span>
                              )}
                            </h2>

                            {person.title && (
                              <p className="mt-1 text-sm font-medium text-slate-600">
                                {person.title}
                              </p>
                            )}

                            {person.location && (
                              <p className="mt-1 text-xs text-slate-400">
                                📍 {person.location}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-2">
                              {person.rating != null && (
                                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                                  ★ {person.rating} ({person.reviews_count ?? 0}{" "}
                                  reviews)
                                </span>
                              )}
                              {person.total_swaps != null && (
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                  {person.total_swaps} swaps
                                </span>
                              )}
                              {person.top_contributor && (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                  Top Contributor
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 md:self-center">
                          <Link
                            to={`/profile/${person.id}`}
                            className="rounded-xl bg-blue-100 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-7 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    <span className="text-sm font-medium text-slate-500">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
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
