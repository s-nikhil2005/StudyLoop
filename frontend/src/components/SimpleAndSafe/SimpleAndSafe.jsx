function StudyLoopSimplicity() {
  return (
    <section className="w-full bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP HEADING ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* LEFT */}
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-indigo-600 uppercase mb-4">
              Simplicity & Security
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              How We Keep It Simple <br /> &amp; Safe
            </h2>
          </div>

          {/* RIGHT */}
          <div className="lg:text-right">
            <p className="text-lg text-gray-600 max-w-md ml-auto">
              Learning should be the only thing on your mind.
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="rounded-[2.5rem] bg-blue-50 p-10">
            <div className="text-3xl mb-6">✍️</div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Request-Based Learning
            </h3>

            <p className="text-gray-600 leading-relaxed">
              No endless scrolling through catalogs. Post exactly what you
              need, and our system notifies relevant peers instantly.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-[2.5rem] bg-emerald-50 p-10">
            <div className="text-3xl mb-6">🤝</div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              One-to-One Focus
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Experience the power of individualized attention. No
              distractions, no group noise — just pure learning momentum.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="rounded-[2.5rem] bg-yellow-50 p-10">
            <div className="text-3xl mb-6">⭐</div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Feedback Ecosystem
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Trust is our currency. Post-session ratings ensure only the
              most helpful peers lead the community forward.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StudyLoopSimplicity;
