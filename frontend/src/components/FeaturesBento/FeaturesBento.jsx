function FeaturesBento() {
  return (
    <section className="w-full py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION TITLE */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-20">
          Why Students Love Learning Together
        </h2>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 md:h-155">

          {/* CARD 1 */}
          <div className="md:col-span-3 bg-indigo-50 rounded-4xl p-10 flex flex-col justify-between
            border border-indigo-100/60 relative overflow-hidden
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-xl">
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-indigo-900 mb-3">
                24/7 Peer Availability
              </h3>
              <p className="text-indigo-700/80 font-medium max-w-sm">
                Our global student community ensures someone is always online
                to help you — no waiting, no scheduling stress.
              </p>
            </div>

            <div className="absolute bottom-[-30%] right-[-10%] opacity-10">
              <svg
                className="w-56 h-56 text-indigo-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                10-4.48 10-10S17.52 2 12 2z" />
              </svg>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="md:col-span-3 bg-pink-50 rounded-4xl p-10 flex flex-col justify-between
            border border-pink-100/60 relative overflow-hidden
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-xl">

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-pink-900 mb-3">
                Free or Affordable Learning
              </h3>
              <p className="text-pink-700/80 font-medium max-w-sm">
                Learn for free by exchanging knowledge, or choose low-cost paid
                sessions when you want focused help.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1600195077077-7c815f540a3d?auto=format&fit=crop&q=80&w=400"
              alt="Affordable learning"
              className="absolute bottom-[-12%] right-[-12%] w-40 h-40
                rounded-full object-cover rotate-12 opacity-40 grayscale
                transition-transform duration-300
                hover:scale-105"
            />
          </div>

          {/* CARD 3 — STAT */}
          <div className="md:col-span-2 bg-gray-900 rounded-4xl p-10
  flex flex-col justify-center items-center text-center
  transition-all duration-300 ease-out
  hover:-translate-y-1
  hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]">

            <h3 className="text-4xl font-extrabold text-indigo-400 mb-2">
              98%+
            </h3>
            <p className="text-gray-400 font-semibold uppercase tracking-widest text-[11px]">
              Student Satisfaction
            </p>
          </div>

          {/* CARD 4 */}
          <div className="md:col-span-4 bg-blue-50 rounded-4xl p-10
            flex flex-col md:flex-row items-center gap-8
            border border-blue-100/60
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-xl">

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                Learn & Earn
              </h3>
              <p className="text-blue-700/80 font-medium max-w-md">
                Teach what you already know, strengthen your understanding,
                and earn money by helping other students.
              </p>
            </div>

            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?u=student${i}`}
                  alt="Student avatar"
                  className="h-16 w-16 rounded-full border-4 border-white
                    shadow-xl transition-transform duration-300
                    hover:scale-105"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesBento;
