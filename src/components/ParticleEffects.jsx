import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Canvas = styled('canvas')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 9999
});

class Particle {
  constructor(x, y, type = 'star') {
    this.x = x;
    this.y = y;
    this.type = type;
    
    // Initialize based on type
    switch (type) {
      case 'star':
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = Math.random() * -3 - 2;
        this.gravity = 0.1;
        this.opacity = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.color = `hsl(${Math.random() * 60 + 40}, 100%, 50%)`;
        break;
        
      case 'sparkle':
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.gravity = 0;
        this.opacity = 1;
        this.lifespan = 30;
        this.color = '#ffffff';
        this.sparklePhase = Math.random() * Math.PI * 2;
        break;
        
      case 'heart':
        this.size = Math.random() * 15 + 10;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = Math.random() * -2 - 1;
        this.gravity = -0.05;
        this.opacity = 1;
        this.rotation = (Math.random() - 0.5) * 0.4;
        this.swayAmount = Math.random() * 2 + 1;
        this.swaySpeed = Math.random() * 0.05 + 0.05;
        this.lifespan = 100;
        this.color = `hsl(${Math.random() * 30 + 340}, 100%, 50%)`;
        break;
        
      case 'bubble':
        this.size = Math.random() * 20 + 10;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = Math.random() * -1 - 0.5;
        this.gravity = -0.02;
        this.opacity = 0.6;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.05 + 0.05;
        this.color = `hsla(200, 70%, 60%, 0.3)`;
        break;
        
      case 'firework':
        this.size = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.gravity = 0.1;
        this.opacity = 1;
        this.trail = [];
        this.maxTrailLength = 10;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        break;
    }
  }
  
  update() {
    // Store previous position for trails
    if (this.trail) {
      this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
      if (this.trail.length > this.maxTrailLength) {
        this.trail.shift();
      }
    }
    
    // Update position
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    
    // Type-specific updates
    switch (this.type) {
      case 'star':
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.02;
        break;
        
      case 'sparkle':
        this.sparklePhase += 0.3;
        this.opacity = Math.sin(this.sparklePhase) * 0.5 + 0.5;
        this.lifespan--;
        if (this.lifespan <= 0) this.opacity = 0;
        break;
        
      case 'heart':
        this.x += Math.sin(this.y * this.swaySpeed) * this.swayAmount;
        this.opacity -= 0.01;
        this.lifespan--;
        break;
        
      case 'bubble':
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;
        this.size += 0.1;
        this.opacity -= 0.005;
        break;
        
      case 'firework':
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        this.opacity -= 0.02;
        break;
        
      default:
        this.opacity -= 0.02;
    }
    
    return this.opacity > 0;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    switch (this.type) {
      case 'star':
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        this.drawStar(ctx, 0, 0, 5, this.size, this.size * 0.5);
        break;
        
      case 'sparkle':
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw cross
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - this.size * 2, this.y);
        ctx.lineTo(this.x + this.size * 2, this.y);
        ctx.moveTo(this.x, this.y - this.size * 2);
        ctx.lineTo(this.x, this.y + this.size * 2);
        ctx.stroke();
        break;
        
      case 'heart':
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        this.drawHeart(ctx, 0, 0, this.size);
        break;
        
      case 'bubble':
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        
        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
        break;
        
      case 'firework':
        // Draw trail
        if (this.trail.length > 0) {
          ctx.strokeStyle = this.color;
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          
          for (let i = 1; i < this.trail.length; i++) {
            const point = this.trail[i];
            ctx.globalAlpha = point.opacity * (i / this.trail.length);
            ctx.lineTo(point.x, point.y);
          }
          ctx.stroke();
        }
        
        // Draw particle
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
    
    ctx.restore();
  }
  
  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
  
  drawHeart(ctx, cx, cy, size) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.3);
    ctx.bezierCurveTo(
      cx - size * 0.5, cy - size * 0.3,
      cx - size, cy + size * 0.1,
      cx, cy + size * 0.6
    );
    ctx.bezierCurveTo(
      cx + size, cy + size * 0.1,
      cx + size * 0.5, cy - size * 0.3,
      cx, cy + size * 0.3
    );
    ctx.closePath();
    ctx.fill();
  }
}

export const ParticleEffects = ({ 
  active, 
  type = 'star', 
  origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  count = 50,
  duration = 3000
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  
  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles
    particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (particlesRef.current) {
          const offsetX = (Math.random() - 0.5) * 50;
          const offsetY = (Math.random() - 0.5) * 50;
          particlesRef.current.push(
            new Particle(origin.x + offsetX, origin.y + offsetY, type)
          );
        }
      }, i * (duration / count));
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        const alive = particle.update();
        if (alive) {
          particle.draw(ctx);
        }
        return alive;
      });
      
      // Continue animation if particles exist
      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
    };
  }, [active, type, origin, count, duration]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!active) return null;
  
  return <Canvas ref={canvasRef} />;
};