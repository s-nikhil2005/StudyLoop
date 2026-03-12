function WhyLearnWithPeers() {
  return (
    <section className="w-full bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm">
            Community First
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Why Learn With Peers?
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Traditional education is rigid. Peer-to-peer learning is fluid,
            personal, and <span className="font-semibold text-gray-900">10× faster</span>.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl mb-5">🌈</div>
            <h3 className="text-xl font-bold text-gray-900">
              Zero Pressure Zone
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              No boring exams or judgmental professors. Learn at your own pace
              in a stress-free environment.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl mb-5">⏰</div>
            <h3 className="text-xl font-bold text-gray-900">
              Hyper-Flexible Timing
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Schedule sessions whenever both you and your peer are free.
              3 AM study session? We’ve got you.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl mb-5">🎯</div>
            <h3 className="text-xl font-bold text-gray-900">
              1-on-1 Deep Focus
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Get the personal attention you’ll never find in a crowded
              classroom of 100+ students.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl mb-5">⚡</div>
            <h3 className="text-xl font-bold text-gray-900">
              Precision Learning
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Don’t waste weeks on generic courses. Solve exactly what you’re
              stuck on — often in minutes.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl mb-5">💡</div>
            <h3 className="text-xl font-bold text-gray-900">
              Teaching Is Learning
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Explaining concepts reinforces understanding. It’s the ultimate
              Feynman Technique in action.
            </p>
          </div>

          {/* CARD 6 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="text-3xl mb-5">🔓</div>
            <h3 className="text-xl font-bold text-gray-900">
              Free & Open Access
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              No high tuition fees. Anyone with knowledge can teach,
              and anyone with curiosity can learn.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyLearnWithPeers;
