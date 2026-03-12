import Logo from "../../assets/Logo.png";
import LandingPage from "../../pages/LandingPage";

function LandingPageFooter() {
  return (
    <footer className="w-full bg-[#0b0f2a] text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* LEFT: LOGO + TEXT */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="StudyLoop"
                className="h-10 w-auto object-contain"
              />
              <span className="text-white font-semibold text-lg">
                STUDYLOOP
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-xs">
              tudyLoop connects people who are learning with people who’ve just learned — through live, peer-to-peer sessions. Learn faster. Teach smarte
            </p>

            {/* SOCIAL ICONS (OPTIONAL) */}
            <div className="mt-6 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                🌐
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                🐦
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                💼
              </span>
            </div>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              About
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Our Story</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Learning
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Get App</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              More
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Use</li>
              <li className="hover:text-white cursor-pointer">Support</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StudyLoop. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default LandingPageFooter;
