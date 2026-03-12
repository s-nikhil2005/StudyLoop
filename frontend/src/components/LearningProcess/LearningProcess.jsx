import LearningProcessImg from "../../assets/LearningProcess.png";

function LearningProcess() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 space-y-10">

            {/* LABEL + TITLE */}
            <div className="space-y-3">
              <p className="text-indigo-600 font-semibold uppercase tracking-[0.25em] text-sm">
                The Process
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15]">
                From confusion to{" "}
                <span className="text-indigo-600">clarity</span>{" "}
                in 3 easy steps
              </h2>
            </div>

            {/* STEPS */}
            <div className="space-y-8">

              {/* STEP 01 */}
              <div className="flex gap-6 group">
                <div className="text-4xl font-bold text-indigo-200 group-hover:text-indigo-600 transition-colors">
                  01
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Find the Right Peer
                  </h3>
                  <p className="mt-1 text-gray-600 leading-relaxed max-w-md">
                    Search peers by topic or skill. Learn free by exchanging
                    knowledge or choose a low-cost paid session.
                  </p>
                </div>
              </div>

              {/* STEP 02 */}
              <div className="flex gap-6 group">
                <div className="text-4xl font-bold text-indigo-200 group-hover:text-indigo-600 transition-colors">
                  02
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Get Smart Matched
                  </h3>
                  <p className="mt-1 text-gray-600 leading-relaxed max-w-md">
                    Our system instantly connects you with someone who has
                    already mastered the topic.
                  </p>
                </div>
              </div>

              {/* STEP 03 */}
              <div className="flex gap-6 group">
                <div className="text-4xl font-bold text-indigo-200 group-hover:text-indigo-600 transition-colors">
                  03
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Connect & Resolve
                  </h3>
                  <p className="mt-1 text-gray-600 leading-relaxed max-w-md">
                    Chat, voice call, or share your screen. Pay only after you
                    fully understand.
                  </p>
                </div>
              </div>

            </div>

            {/* TRUST LINE */}
            <p className="text-sm text-gray-500">
              Start free. Pay only when you choose. Learning always comes first.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:w-1/2 relative flex justify-center">

            {/* BACKGROUND BLOBS (BEHIND IMAGE) */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-70 -z-10"></div>
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-70 -z-10"></div>

            {/* IMAGE CONTAINER */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(79,70,229,0.25)]">
              <img
                src={LearningProcessImg}
                alt="Peer learning collaboration"
                className="w-full h-140 object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default LearningProcess;
