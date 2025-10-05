import { Zap, Target, Users, Code, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-8">
      <div className="bg-white">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About HN Scout</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, intelligent Hacker News reader designed to help you discover the most 
            engaging stories with smart quality scoring and a distraction-free interface.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-12">
          <div className="flex items-start space-x-4">
            <Target className="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                HN Scout was created to solve a simple problem: finding quality content on Hacker News 
                can be overwhelming. With thousands of stories posted daily, it's easy to miss the 
                most valuable discussions and insights.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that great content deserves to be discovered, and our intelligent quality 
                scoring algorithm helps surface the most engaging stories based on community 
                interaction, recency, and discussion quality.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Quality Scoring</h3>
              </div>
              <p className="text-gray-700">
                Our algorithm balances points (40%), comments (30%), and recency (30%) to identify 
                the most engaging and relevant stories.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Author Profiles</h3>
              </div>
              <p className="text-gray-700">
                Explore author details, bios, and past contributions to understand the community 
                better.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Reading List</h3>
              </div>
              <p className="text-gray-700">
                Save interesting stories to read later with our browser-based reading list feature.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Modern Design</h3>
              </div>
              <p className="text-gray-700">
                Clean, responsive interface that works beautifully on desktop and mobile devices.
              </p>
            </div>
          </div>
        </section>


        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Simplicity First</h3>
                <p className="text-gray-700">
                  We believe in clean, intuitive design that gets out of the way and lets the content shine.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Focused</h3>
                <p className="text-gray-700">
                  Everything we build is designed to enhance the Hacker News community experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source</h3>
                <p className="text-gray-700">
                  HN Scout is open source, transparent, and built by the community for the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-gray-700 mb-6">
            HN Scout is an open-source project. We welcome contributions, feedback, and suggestions 
            from the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/hnscout/hnscout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Code className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
            <a 
              href="/" 
              className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Start Reading</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
