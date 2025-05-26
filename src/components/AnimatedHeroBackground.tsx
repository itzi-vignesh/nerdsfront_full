
import React, { useEffect, useRef } from 'react';
import { Shield, Zap, Target, Server, Lock, Code, Database, Wifi, Globe, Network } from 'lucide-react';

const AnimatedHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add our animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(-10px, 15px) rotate(5deg); }
        50% { transform: translate(10px, -10px) rotate(-5deg); }
        75% { transform: translate(15px, 15px) rotate(3deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }
      
      @keyframes glow {
        0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 255, 0, 0.3)); }
        50% { filter: drop-shadow(0 0 15px rgba(0, 255, 0, 0.7)); }
      }
      
      @keyframes rotate3d {
        0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
        50% { transform: perspective(1000px) rotateX(10deg) rotateY(15deg); }
        100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
      }
      
      @keyframes data-flow {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }
      
      @keyframes node-pulse {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.1); filter: brightness(1.2); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* 3D Perspective Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-full h-full" 
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          {/* 3D Cyber Grid */}
          <div 
            className="absolute inset-0"
            style={{
              animation: "rotate3d 20s ease-in-out infinite",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Horizontal Grid Lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="absolute left-0 right-0 h-px bg-nerds-green/20"
                style={{ 
                  top: `${(i + 1) * 10}%`,
                  transform: `translateZ(${(i % 2 === 0) ? 20 : -20}px)`,
                  animation: `pulse 3s ease-in-out ${i * 0.2}s infinite` 
                }}
              />
            ))}

            {/* Vertical Grid Lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={`v-${i}`} 
                className="absolute top-0 bottom-0 w-px bg-nerds-green/20"
                style={{ 
                  left: `${(i + 1) * 10}%`,
                  transform: `translateZ(${(i % 2 === 0) ? 20 : -20}px)`,
                  animation: `pulse 3s ease-in-out ${i * 0.2}s infinite` 
                }}
              />
            ))}
            
            {/* Network Nodes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const x = 15 + Math.random() * 70;
              const y = 15 + Math.random() * 70;
              const size = 30 + Math.random() * 20;
              const icons = [Shield, Lock, Server, Database, Globe, Code, Wifi, Target];
              const IconComponent = icons[i % icons.length];
              
              return (
                <div 
                  key={`node-${i}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: `translateZ(${30 + i * 10}px)`,
                    animation: `node-pulse 4s ease-in-out ${i * 0.5}s infinite`
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-nerds-green/10 backdrop-blur-sm border border-nerds-green/30"></div>
                  <IconComponent className="text-nerds-green/90" size={size * 0.6} />
                </div>
              );
            })}
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(10px)" }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const x1 = 10 + Math.random() * 80;
                const y1 = 10 + Math.random() * 80;
                const x2 = 10 + Math.random() * 80;
                const y2 = 10 + Math.random() * 80;
                
                return (
                  <line 
                    key={`line-${i}`}
                    x1={`${x1}%`} 
                    y1={`${y1}%`} 
                    x2={`${x2}%`} 
                    y2={`${y2}%`} 
                    stroke="rgba(0, 255, 0, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    style={{
                      animation: `data-flow 10s linear ${i * 0.3}s infinite`
                    }}
                  />
                );
              })}
            </svg>
            
            {/* Data Packets */}
            {Array.from({ length: 15 }).map((_, i) => {
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              const size = 4 + Math.random() * 4;
              const duration = 4 + Math.random() * 6;
              const delay = Math.random() * 10;
              
              return (
                <div 
                  key={`packet-${i}`}
                  className="absolute rounded-full bg-nerds-green"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${startX}%`,
                    top: `${startY}%`,
                    filter: "blur(1px)",
                    boxShadow: "0 0 10px rgba(0, 255, 0, 0.8)",
                    animation: `float ${duration}s ease-in-out ${delay}s infinite, glow 2s ease-in-out ${delay * 0.5}s infinite`,
                    opacity: 0.8
                  }}
                />
              );
            })}
          </div>
          
          {/* Binary Code Overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`binary-${i}`}
                className="absolute text-nerds-green font-mono text-xs whitespace-nowrap"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translateZ(${Math.random() * 50}px)`,
                  opacity: 0.3 + Math.random() * 0.7
                }}
              >
                {Array.from({ length: 20 }).map((_, j) => (
                  Math.random() > 0.5 ? '1' : '0'
                )).join('')}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Glowing Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nerds-darkblue opacity-80"></div>
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-nerds-darkblue/80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-nerds-darkblue/80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-nerds-darkblue/80 pointer-events-none"></div>
    </div>
  );
};

export default AnimatedHeroBackground;
