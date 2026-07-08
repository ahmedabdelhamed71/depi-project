import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create your profile",
    text: "Add the skills you can teach and the skills you want to learn.",
  },
  {
    number: "02",
    title: "Discover people",
    text: "Browse members, filter by category, and find the right match for you.",
  },
  {
    number: "03",
    title: "Send a swap request",
    text: "Choose a member and send a simple request to start exchanging skills.",
  },
  {
    number: "04",
    title: "Learn and teach",
    text: "Meet online or offline, share knowledge, and grow together.",
  },
];

const benefits = [
  "Learn without paying money",
  "Share what you already know",
  "Build real connections",
  "Grow your practical skills",
];

const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white px-5 py-10 shadow-sm sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            How SkillSeek works
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Swap skills with people who want to learn and teach
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            SkillSeek helps users exchange knowledge instead of money. You teach
            something you know, and learn something you need from another user.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/discover"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore People
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-600"
            >
              Join Now
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              <span className="text-sm font-bold text-blue-600">
                {step.number}
              </span>

              <h2 className="mt-4 text-lg font-bold text-slate-950">
                {step.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl bg-blue-600 p-6 text-white sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:p-10">
          <div>
            <h2 className="text-2xl font-bold">Why use SkillSeek?</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-50">
              The platform is built around real value exchange. Every user can
              be both a learner and a teacher.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl bg-white/15 px-4 py-4 text-sm font-semibold text-white"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
