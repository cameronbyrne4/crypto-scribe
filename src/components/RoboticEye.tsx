import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const RoboticEye = () => {
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate realistic eye movement
    const movePupil = () => {
      const randomX = (Math.random() - 0.5) * 8; // Allow full range of movement
      const randomY = (Math.random() - 0.5) * 8;
      
      setPupilPosition({ x: randomX, y: randomY });
    };

    // Move pupil every second
    const interval = setInterval(movePupil, 1000 + Math.random() * 1000);
    
    // Initial movement
    movePupil();

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-black/[0.96] relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)"
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl md:text-4xl font-bold mb-4 text-transparent">
            AI-Powered Intelligence
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Our advanced AI system watches over the blockchain, analyzing patterns and detecting anomalies in real-time.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Container with glass effect */}
          <motion.div
            className="relative bg-black/40 backdrop-blur-sm rounded-3xl p-8 overflow-hidden"
          >
            
            {/* Floating Robotic Eye */}
            <div className="relative z-10 flex items-center justify-center">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Outer ring glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-xl animate-pulse" />
                
                {/* Main eye container */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600/50 shadow-2xl">
                  
                  {/* Inner glow */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-sm" />
                  
                                     {/* Iris */}
                   <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 border-2 border-gray-300/30">
                     
                     {/* Pupil */}
                     <motion.div 
                       className="absolute inset-20 rounded-full bg-black border border-gray-400/50"
                       animate={{
                         x: pupilPosition.x * 12,
                         y: pupilPosition.y * 12,
                       }}
                       transition={{
                         x: { duration: 0.3, ease: "easeOut" },
                         y: { duration: 0.3, ease: "easeOut" }
                       }}
                     >
                       {/* Pupil highlight */}
                       <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white/60" />
                     </motion.div>
                    
                    {/* Iris pattern lines */}
                    <div className="absolute inset-0 rounded-full">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{
                            transform: `rotate(${i * 45}deg)`,
                            top: '50%',
                            left: '50%',
                            transformOrigin: '0 0',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Eyelid effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-black/20 to-transparent"
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Scanning lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                      animate={{
                        y: [0, 256, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                  
                  {/* Corner details */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/60 rounded-br-lg" />
                </div>
              </motion.div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom glow effect */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-16 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-xl" />
        </div>

        {/* Description text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Just as this AI eye observes and analyzes, our platform provides intelligent insights into blockchain activities, 
            helping you detect patterns and anomalies with unprecedented accuracy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RoboticEye; 