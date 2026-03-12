function StudyLoopDifference() {
  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-105 h-105 bg-indigo-600/20 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-indigo-400 font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Why StudyLoop
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            What makes StudyLoop different?
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            We didn’t build another course platform.  
            We built a place where learning actually happens.
          </p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-10">

          {/* ITEM */}
          {[
            {
              id: "01",
              title: "Peer-First Learning",
              text:
                "StudyLoop connects you directly with people who recently solved the same problem you’re facing. No outdated videos. No waiting. Just real help, right when you need it.",
              border: "border-indigo-500/30 hover:border-indigo-500/70 hover:bg-indigo-500/10",
            },
            {
              id: "02",
              title: "Learn. Teach. Switch Anytime.",
              text:
                "On StudyLoop, roles are flexible. You can learn one topic today and help someone else tomorrow. Knowledge flows both ways — and everyone benefits.",
              border: "border-purple-500/30 hover:border-purple-500/70 hover:bg-purple-500/10",
            },
            {
              id: "03",
              title: "Real-Time Problem Solving",
              text:
                "Chat, voice, screen share, code together — all in real time. StudyLoop feels like sitting next to a friend in a library, not staring at another silent dashboard.",
              border: "border-pink-500/30 hover:border-pink-500/70 hover:bg-pink-500/10",
            },
          ].map((item) => (
            <div
              key={item.id}
              className={`group relative flex flex-col lg:flex-row gap-10 items-start lg:items-center
              p-10 lg:p-14 rounded-[2.5rem] border transition-all duration-500
              hover:-translate-y-1 cursor-pointer ${item.border}`}
            >
              {/* NUMBER */}
              <div className="text-6xl lg:text-8xl font-black text-white/10 group-hover:text-white/20 transition">
                {item.id}
              </div>

              {/* CONTENT */}
              <div className="max-w-4xl">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition">
                  {item.text}
                </p>
              </div>

              {/* ARROW (hover only) */}
              <div
                className="
                  absolute right-10
                  opacity-0 translate-x-4
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-300
                  hidden lg:block
                "
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudyLoopDifference;
