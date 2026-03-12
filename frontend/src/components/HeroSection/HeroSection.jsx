import HeroSectionImg from "../../assets/HeroSection.png";
import AuthButton from "../Ui/AuthButton";



function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex">

      {/* LEFT CONTENT */}
      <div className="w-1/2 bg-white flex items-center px-20">
        <div className="max-w-140">

          {/* LIVE STATUS */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <p className="text-sm font-medium text-indigo-700">
              <span className="font-semibold">2,410</span> students solving doubts right now
            </p>
          </div>

          <h1 className="text-[56px] leading-[1.1] font-extrabold text-gray-900">
            Stuck learning alone?
            <br />
            <span className="text-indigo-600">Learn together.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Find students who match your learning goals.
            Learn faster through real conversations, shared practice,
            and live video sessions.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <AuthButton
              to="/register"
              label="Get Started"
              className="h-12 px-8 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition"
            />

            <AuthButton
              to="/login"
              label="Sign in"
              className="h-12 px-8 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
            />
          </div>

        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden bg-indigo-500">
        <div className="absolute w-105 h-105 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute text-white/10 text-[26rem] font-extrabold select-none">
          S
        </div>

        <img
          src={HeroSectionImg}
          alt="Student learning together"
          className="relative z-10 h-130 drop-shadow-2xl"
        />
      </div>

    </section>
  );
}

export default HeroSection;
