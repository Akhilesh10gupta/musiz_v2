'use client'
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  return (
    <div ref={ref} className="relative bg-gray-900 py-12 text-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-14 tracking-wider">
          <span className="">Our </span>
          <span className="text-yellow-400">Achievements</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <h3 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white">
              {inView ? <CountUp start={0} end={5} duration={2.5} /> : '0'}+
            </h3>
            <p className="text-base text-white mt-2">Years of Experience</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white">
              {inView ? <CountUp start={0} end={150} duration={2.5} /> : '0'}+
            </h3>
            <p className="text-base text-white mt-2">Projects Completed</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white">
              {inView ? <CountUp start={0} end={50} duration={2.5} /> : '0'}+
            </h3>
            <p className="text-base text-white mt-2">Worldwide Clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;