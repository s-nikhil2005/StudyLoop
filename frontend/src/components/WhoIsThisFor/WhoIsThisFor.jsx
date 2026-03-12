function WhoIsThisFor() {
  return (
    <section className="w-full bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-indigo-600 text-sm font-bold tracking-[0.25em] uppercase">
            Target Audience
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Who Is This For?
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Anyone who wants to learn or share knowledge without barriers.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* CARD 1 */}
          <div className="group relative h-90 rounded-[2.5rem] overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
              alt="University Students"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
              <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold rounded-full bg-indigo-600 w-fit">
                Academic Excellence
              </span>
              <h3 className="text-2xl font-bold mb-2">
                University Students
              </h3>
              <p className="text-white/80 max-w-sm">
                The ultimate study group available 24/7. Learn together, explain
                concepts, and clear doubts faster.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group relative h-90 rounded-[2.5rem] overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Absolute Beginners"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
              <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold rounded-full bg-purple-600 w-fit">
                Career Starters
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Absolute Beginners
              </h3>
              <p className="text-white/80 max-w-sm">
                Start learning coding, design, or business without fear, pressure,
                or boring classrooms.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group relative h-90 rounded-[2.5rem] overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
              alt="Exam Candidates"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
              <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold rounded-full bg-indigo-600 w-fit">
                Deep Mastery
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Exam Candidates
              </h3>
              <p className="text-white/80 max-w-sm">
                Crush exams and certifications with real-time explanations and
                concept-level clarity.
              </p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="group relative h-90 rounded-[2.5rem] overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
              alt="Knowledge Sharers"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
              <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold rounded-full bg-purple-600 w-fit">
                Skill Monetization
              </span>
              <h3 className="text-2xl font-bold mb-2">
                Knowledge Sharers
              </h3>
              <p className="text-white/80 max-w-sm">
                Teach what you know, reinforce your skills, and earn while helping
                others grow.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhoIsThisFor;
