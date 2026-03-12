function ContactSection() {
  return (
    <section className="w-full bg-white py-28">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm">
            Need Help?
          </p>

          <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Get in Touch with <br /> Our Team
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            Have questions about StudyLoop? Whether you're a learner or a
            knowledge sharer, our community support team is here for you.
          </p>

          {/* INFO CARDS */}
          <div className="mt-12 space-y-6">

            {/* EMAIL */}
            <div className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                📧
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Email Us
                </p>
                <p className="text-gray-900 font-medium">
                  support@studyloop.io
                </p>
              </div>
            </div>

            {/* HOURS */}
            <div className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                ⏰
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Support Hours
                </p>
                <p className="text-gray-900 font-medium">
                  Mon – Fri, 9am – 6pm IST
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                📍
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Global HQ
                </p>
                <p className="text-gray-900 font-medium">
                  Remote • Built for learners worldwide
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-[3rem] p-14 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.15)] border border-gray-100">

          <form className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="mt-2 w-full h-14 px-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-2 w-full h-14 px-5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
                rows="6"
                placeholder="How can we help you?"
                className="mt-2 w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
