import React from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { FUSION_BLOGS } from '../data/fusionCarsData';

export default function BlogsSection() {
  return (
    <section id="blogs" className="relative z-30 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-black text-[#1F2937]">
      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="font-medium text-xs tracking-[0.15em] text-[#cca57e] uppercase block mb-3">
            AUTOMOTIVE JOURNAL & GUIDES
          </span>

          <h2 className="font-extrabold text-3xl sm:text-5xl text-gray-300 leading-[1.2] tracking-tight">
            Latest insights from our experts
          </h2>

          <div className="w-12 h-0.5 bg-[#CCA57E] mx-auto mt-3 rounded-full" />

          <p className="font-normal text-base text-gray-300 leading-[1.6] mt-4 max-w-2xl mx-auto">
            Stay informed with expert insights on exotic car valuation, maintenance in Indian conditions, and pre-owned luxury market forecasts.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {FUSION_BLOGS.map((blog) => (
            <div
              key={blog.id}
              className="rounded-2xl bg-gray-200 border border-gray-200/90 shadow-sm hover:shadow-md overflow-hidden transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#CCA57E] font-semibold text-[11px] uppercase shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#CCA57E]" />
                    <span>{blog.readTime}</span>
                  </div>

                  <h4 className="font-bold text-base text-[#1F2937] group-hover:text-[#CCA57E] transition-colors mb-2 leading-snug">
                    {blog.title}
                  </h4>

                  <p className="font-normal text-sm text-[#4B5563] leading-[1.6]">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs font-semibold text-[#1F2937] group-hover:text-[#CCA57E] inline-flex items-center gap-1.5 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CCA57E]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
