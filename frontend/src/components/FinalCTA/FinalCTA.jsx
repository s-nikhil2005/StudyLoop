function CTASection() {
  return (
    <section className="w-full bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {/* DARK CTA */}
        <div className="relative overflow-hidden rounded-[3rem] bg-linear-to-br from-[#0b1220] via-[#0f172a] to-[#111827] px-10 py-24 text-center shadow-xl">

          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Stop struggling.
              <br />
              Get{" "}
              <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                un-stuck
              </span>{" "}
              now.
            </h2>

            <div className="mt-10">
              <button className="h-12 px-10 rounded-xl bg-white text-gray-900 font-semibold text-base hover:bg-gray-100 transition">
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>

       

      </div>
    </section>
  );
}

export default CTASection;
