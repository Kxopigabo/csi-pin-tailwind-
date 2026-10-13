"use client";

import { Badge } from "@/components/tailgrids/core/badge";

export default function Home() {
  return (
    <div className="min-h bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Instructor Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <img
                src="/animetions/assets/img/std_img.jpg"
                alt="Instructor"
                className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-black"
              />
              <h2 className="text-2xl font-bold text-center mb-2">
                Pukao Pongpensri(Kao)
              </h2>
              <div className="space-y-2 text-center">
                <Badge color="gray" className="block">
                  Computer Science and Software Development
                </Badge>
                <Badge color="gray" className="block">
                  Innovation Dept. (CSI)
                </Badge>
                <Badge color="gray" className="block">
                  School of Information Technology (SIT)
                </Badge>
                <Badge color="gray" className="block">
                  Sripatum University (SPU)
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Section - Course Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">
              CSI205 Front-End Software Development covers:
            </h1>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    UX/UI Fundamentals
                  </h3>
                  <p className="text-gray-600">
                    Proficient in user-friendly web interface design with UX research
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Traditional HTML/CSS/JS
                  </h3>
                  <p className="text-gray-600">
                    Skilled in building web pages from basic HTML tags, styling with CSS,
                    and writing JavaScript for user interactions and DOM manipulation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    React Web Applications
                  </h3>
                  <p className="text-gray-600">
                    Familiar with basic React concepts including Virtual DOM, components,
                    props, state, and hooks. Still learning to become more proficient
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Back-End Interface Preparation
                  </h3>
                  <p className="text-gray-600 italic">
                    Coming soon - Not yet studied
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
