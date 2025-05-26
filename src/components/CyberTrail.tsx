
import React, { useEffect, useState, useRef } from 'react';

interface CyberTrailProps {
  containerClassName?: string;
}

const CyberTrail: React.FC<CyberTrailProps> = ({ containerClassName = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Grid configuration - reduced size to fit in header
  const cellSize = 30; // Smaller cell size for header
  const interactionRadius = 100; // Smaller interaction radius for header
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Convert global mouse coordinates to local coordinates within the container
        setMousePos({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
        
        // Only set isHovering true if mouse is within the container's bounds
        const isInBounds = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        setIsHovering(isInBounds);
      }
    };
    
    // Initial dimensions update
    updateDimensions();
    
    // Attach event listeners
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate grid points
  const generateGridPoints = () => {
    const points = [];
    const cols = Math.ceil(dimensions.width / cellSize) + 1;
    const rows = Math.ceil(dimensions.height / cellSize) + 1;
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          id: `${x}-${y}`,
          x: x * cellSize,
          y: y * cellSize,
          originX: x * cellSize,
          originY: y * cellSize,
        });
      }
    }
    
    return points;
  };
  
  const gridPoints = dimensions.width ? generateGridPoints() : [];
  
  // Generate lines between adjacent points (only horizontal and vertical to create a true grid)
  const generateLines = () => {
    const lines = [];
    const cols = Math.ceil(dimensions.width / cellSize) + 1;
    const rows = Math.ceil(dimensions.height / cellSize) + 1;
    
    // Horizontal lines
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols - 1; x++) {
        lines.push({
          id: `h-${x}-${y}`,
          x1: x * cellSize,
          y1: y * cellSize,
          x2: (x + 1) * cellSize,
          y2: y * cellSize,
        });
      }
    }
    
    // Vertical lines
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows - 1; y++) {
        lines.push({
          id: `v-${x}-${y}`,
          x1: x * cellSize,
          y1: y * cellSize,
          x2: x * cellSize,
          y2: (y + 1) * cellSize,
        });
      }
    }
    
    return lines;
  };
  
  const lines = dimensions.width ? generateLines() : [];
  
  // Calculate distance-based effects
  const calculateEffects = (x: number, y: number) => {
    if (!isHovering) return { opacity: 0.1, size: 1, color: '#1A1F2C' };
    
    const dx = mousePos.x - x;
    const dy = mousePos.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < interactionRadius) {
      // Point is within influence radius
      const influence = 1 - distance / interactionRadius;
      const size = 1 + influence * 1.5;
      
      // Color gradient based on distance
      const colors = ['#00FF00', '#7CFC00', '#32CD32'];
      const colorIndex = Math.floor(influence * colors.length);
      const color = colors[Math.min(colorIndex, colors.length - 1)];
      
      return {
        opacity: 0.1 + influence * 0.9,
        size,
        color
      };
    }
    
    return { opacity: 0.1, size: 1, color: '#1A1F2C' };
  };
  
  // Calculate line effects
  const calculateLineEffects = (x1: number, y1: number, x2: number, y2: number) => {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    
    if (!isHovering) return { opacity: 0.05, width: 0.3, color: '#1A1F2C' };
    
    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < interactionRadius) {
      // Line is within influence radius
      const influence = 1 - distance / interactionRadius;
      const width = 0.3 + influence * 1;
      
      // Color gradient based on distance
      const colors = ['#00FF00', '#7CFC00', '#32CD32'];
      const colorIndex = Math.floor(influence * colors.length);
      const color = colors[Math.min(colorIndex, colors.length - 1)];
      
      return {
        opacity: 0.05 + influence * 0.7,
        width,
        color
      };
    }
    
    return { opacity: 0.05, width: 0.3, color: '#1A1F2C' };
  };
  
  return (
    <div ref={containerRef} className={`header-digital-mesh ${containerClassName}`}>
      <svg width="100%" height="100%" className="digital-mesh-svg">
        {/* Subtle background gradient */}
        <defs>
          <radialGradient id="header-grid-bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#131720" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A0C11" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#header-grid-bg)" />
        
        {/* Render the lines */}
        {lines.map(line => {
          const { opacity, width, color } = calculateLineEffects(line.x1, line.y1, line.x2, line.y2);
          return (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={color}
              strokeWidth={width}
              opacity={opacity}
              className="digital-mesh-line"
            />
          );
        })}
        
        {/* Render the points */}
        {gridPoints.map(point => {
          const { opacity, size, color } = calculateEffects(point.x, point.y);
          return (
            <circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r={size}
              fill={color}
              opacity={opacity}
              className="digital-mesh-point"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CyberTrail;
