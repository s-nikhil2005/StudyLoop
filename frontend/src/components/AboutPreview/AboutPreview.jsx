import { Globe, Zap, Users } from "lucide-react";
import AboutSectionImg from "../../assets/AboutSection.png";

function AboutPreview() {
  return (
    <section id="about" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — IMAGE */}
          <div className="relative">
            <div className="rounded-[28px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)]">
              <img
                src={AboutSectionImg}
                alt="People learning together at StudyLoop"
                className="w-full h-130 object-cover"
              />
            </div>

            {/* FLOATING QUOTE */}
            <div className="absolute hidden md:block -bottom-8 left-8 max-w-sm bg-white rounded-2xl p-6 shadow-[0_25px_60px_-20px_rgba(79,70,229,0.35)] border border-indigo-100">
              <p className="text-indigo-700 font-medium leading-relaxed">
                “StudyLoop isn’t just a platform — it’s a shift toward learning
                from people who’ve just been there.”
              </p>
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="space-y-10">

            <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase">
              Our Vision
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Learning works better <br />
              when it’s shared.
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              StudyLoop is built on a simple idea:
              the best person to help you is often someone who just learned it themselves.
            </p>

            {/* VALUES */}
            <div className="space-y-6">

              <div className="flex gap-4 p-5 rounded-xl bg-indigo-50 border border-indigo-100">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
          <Globe size={20} />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">
            Accessibility at Core
          </h4>
          <p className="mt-1 text-gray-600 leading-relaxed">
            Breaking the financial barriers of traditional tutoring by enabling
            micro-learning sessions that anyone can afford.
          </p>
        </div>
      </div>

               {/* ITEM 2 */}
      <div className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition">
        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-indigo-600 shrink-0">
          <Zap size={20} />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">
            Skill-First Economy
          </h4>
          <p className="mt-1 text-gray-600 leading-relaxed">
            Shifting the focus from degrees to demonstrable mastery. Our
            community validates skills through real-world problem solving.
          </p>
        </div>
      </div>

             {/* ITEM 3 */}
      <div className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition">
        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-indigo-600 shrink-0">
          <Users size={20} />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">
            Empowering Educators
          </h4>
          <p className="mt-1 text-gray-600 leading-relaxed">
            Every student is a potential teacher. We provide the infrastructure
            for experts to monetize their niche knowledge instantly.
          </p>
        </div>
      </div>

            </div>

            <div className="pt-6">
              <button className="h-11 px-7 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                Learn how StudyLoop works
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
