function StatsSection() {
  return (
    <section className="w-full bg-[#0b1c3d] py-14">
      <div className="max-w-6xl mx-auto px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* STAT 1 */}
          <div className="group text-center">
            <p className="text-3xl font-extrabold text-white">
              1,000+
            </p>
            <p className="mt-2 text-xs tracking-widest text-indigo-400 uppercase">
              Learners
            </p>
            <span className="mt-3 block mx-auto h-px w-6 bg-indigo-500 transition-all duration-300 group-hover:w-12"></span>
          </div>

          {/* STAT 2 */}
          <div className="group text-center">
            <p className="text-3xl font-extrabold text-white">
              150+
            </p>
            <p className="mt-2 text-xs tracking-widest text-indigo-400 uppercase">
              Skills & Topics
            </p>
            <span className="mt-3 block mx-auto h-px w-6 bg-indigo-500 transition-all duration-300 group-hover:w-12"></span>
          </div>

          {/* STAT 3 */}
          <div className="group text-center">
            <p className="text-3xl font-extrabold text-white">
              2,500+
            </p>
            <p className="mt-2 text-xs tracking-widest text-indigo-400 uppercase">
              Learning Sessions
            </p>
            <span className="mt-3 block mx-auto h-px w-6 bg-indigo-500 transition-all duration-300 group-hover:w-12"></span>
          </div>

          {/* STAT 4 */}
          <div className="group text-center">
            <p className="text-3xl font-extrabold text-white">
              98%
            </p>
            <p className="mt-2 text-xs tracking-widest text-indigo-400 uppercase">
              Positive Feedback
            </p>
            <span className="mt-3 block mx-auto h-px w-6 bg-indigo-500 transition-all duration-300 group-hover:w-12"></span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default StatsSection;
