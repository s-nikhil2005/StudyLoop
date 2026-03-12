import { UserPlus, Search, Video } from "lucide-react";

function HowItWorks() {
  return (
    <section className="w-full py-24 bg-white">

      {/* TITLE */}
    <div className="text-center">
  <h2 className="text-3xl md:text-[30px] font-bold tracking-tight text-gray-900">
    How Peer Learning Works
  </h2>
  <p className="mt-2 text-sm font-medium text-gray-600">
    Learn in three simple steps
  </p>
</div>


      {/* PROGRESS LINE */}
      <div className="mt-10 flex justify-center">
        <div className="relative w-130 h-0.5 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-cyan-400">

          <span className="absolute -top-1.25 left-0 w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="absolute -top-1.25 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="absolute -top-1.25 right-0 w-3 h-3 rounded-full bg-cyan-400"></span>
        </div>
      </div>

      {/* CARDS */}
     <div className="mt-12 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

{/* STEP 1 */}
<div className="group bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
    <UserPlus size={22} />
  </div>

  <h3 className="mt-5 font-semibold text-gray-900 text-base">
    Create Profile
  </h3>

  <div className="mt-3 text-sm text-gray-600 leading-relaxed">
    Add what you know and what you want to learn so we can match you with the right peer.
  </div>
</div>


 {/* STEP 2 */}
<div className="group bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 text-purple-600">
    <Search size={22} />
  </div>

  <h3 className="mt-5 font-semibold text-gray-900 text-base">
    Find a Peer
  </h3>

  <div className="mt-3 text-sm text-gray-600 leading-relaxed">
    Search by topic, skill, or interest and connect when both of you are available.
  </div>
</div>


{/* STEP 3 */}
<div className="group bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
    <Video size={22} />
  </div>

  <h3 className="mt-5 font-semibold text-gray-900 text-base">
    Learn Together
  </h3>

  <div className="mt-3 text-sm text-gray-600 leading-relaxed">
    Join live sessions to ask questions, clear doubts, and exchange knowledge in real time.
  </div>
</div>


</div>

    </section>
  );
}

export default HowItWorks;
