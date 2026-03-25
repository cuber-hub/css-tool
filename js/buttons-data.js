/**
 * Pre-built buttons data
 * Each button has:
 * - name: Title of the button
 * - html: HTML snippet
 * - css: CSS snippet (standard)
 * - tailwind: Tailwind CSS classes (alternative)
 */
const PREBUILT_BUTTONS = [
  {
    name: "Modern Gradient",
    html: `<button class="btn-gradient">Shine Bright</button>`,
    css: `.btn-gradient {
  padding: 12px 28px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(110, 142, 251, 0.4);
}`,
    tailwind: `px-7 py-3 bg-gradient-to-r from-[#6e8efb] to-[#a777e3] border-none rounded-full text-white font-semibold text-lg cursor-pointer shadow-lg hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all duration-300`
  },
  {
    name: "Glassmorphism",
    html: `<button class="btn-glass">Glassy Effect</button>`,
    css: `.btn-glass {
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.2);
}`,
    tailwind: `px-7 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium cursor-pointer hover:bg-white/20 transition-colors duration-300`
  },
  {
    name: "Outline Glow",
    html: `<button class="btn-outline-glow">Glowing Border</button>`,
    css: `.btn-outline-glow {
  padding: 12px 28px;
  background: transparent;
  border: 2px solid #6c63ff;
  border-radius: 8px;
  color: #6c63ff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline-glow:hover {
  background: #6c63ff;
  color: white;
  box-shadow: 0 0 20px rgba(108, 99, 255, 0.6);
}`,
    tailwind: `px-7 py-3 bg-transparent border-2 border-[#6c63ff] rounded-lg text-[#6c63ff] font-bold uppercase tracking-widest cursor-pointer hover:bg-[#6c63ff] hover:text-white hover:shadow-[0_0_20px_rgba(108,99,255,0.6)] transition-all duration-300`
  },
  {
    name: "Retro 3D",
    html: `<button class="btn-3d">Push Me</button>`,
    css: `.btn-3d {
  padding: 12px 28px;
  background: #f39c12;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 6px #d35400;
  transition: all 0.1s ease;
}

.btn-3d:active {
  box-shadow: 0 2px #d35400;
  transform: translateY(4px);
}`,
    tailwind: `px-7 py-3 bg-[#f39c12] border-none rounded-lg text-white font-extrabold text-xl cursor-pointer shadow-[0_6px_#d35400] active:shadow-[0_2px_#d35400] active:translate-y-1 transition-all duration-100`
  },
  {
    name: "Soft Neumorphic",
    html: `<button class="btn-neu">Soft Click</button>`,
    css: `.btn-neu {
  padding: 12px 28px;
  background: #e0e0e0;
  border: none;
  border-radius: 12px;
  color: #444;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 9px 9px 16px #bebebe, -9px -9px 16px #ffffff;
  transition: all 0.2s ease;
}

.btn-neu:active {
  box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
}`,
    tailwind: `px-7 py-3 bg-[#e0e0e0] border-none rounded-xl text-[#444] font-semibold cursor-pointer shadow-[9px_9px_16px_#bebebe,-9px_-9px_16px_#ffffff] active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-200`
  },
  {
    name: "Cyber Neon",
    html: `<button class="btn-cyber">DETECTED</button>`,
    css: `.btn-cyber {
  padding: 12px 28px;
  background: #000;
  border: 1px solid #0ff;
  color: #0ff;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}

.btn-cyber:hover {
  background: #0ff;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  text-shadow: none;
}`,
    tailwind: `px-7 py-3 bg-black border border-[#0ff] text-[#0ff] font-mono font-medium uppercase cursor-pointer shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:bg-[#0ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300`
  },
  {
    name: "Liquid Fill",
    html: `<button class="btn-fill"><span>Hover Me</span></button>`,
    css: `.btn-fill {
  padding: 12px 28px;
  background: transparent;
  border: 2px solid #ff4757;
  border-radius: 4px;
  color: #ff4757;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.4s;
}

.btn-fill::before {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: #ff4757;
  transition: all 0.4s;
  z-index: -1;
}

.btn-fill:hover {
  color: white;
}

.btn-fill:hover::before {
  left: 0;
}

.btn-fill span {
  position: relative;
  z-index: 1;
}`,
    tailwind: `relative px-7 py-3 bg-transparent border-2 border-[#ff4757] rounded text-[#ff4757] font-semibold cursor-pointer overflow-hidden transition-colors duration-400 hover:text-white before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-[#ff4757] before:transition-all before:duration-400 before:z-0 hover:before:left-0 [&>span]:relative [&>span]:z-10`
  },
  {
    name: "Floating Action",
    html: `<button class="btn-fab">+</button>`,
    css: `.btn-fab {
  width: 56px;
  height: 56px;
  background: #2ed573;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(46, 213, 115, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-fab:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 15px 30px rgba(46, 213, 115, 0.4);
}`,
    tailwind: `w-14 h-14 bg-[#2ed573] border-none rounded-full text-white text-2xl font-bold cursor-pointer shadow-[0_10px_20px_rgba(46,213,115,0.3)] hover:scale-110 hover:rotate-90 hover:shadow-[0_15px_30px_rgba(46, 213, 115, 0.4)] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]`
  },
  {
    name: "Shiny Border",
    html: `<button class="btn-shiny">Shiny Border</button>`,
    css: `.btn-shiny {
  position: relative;
  padding: 12px 28px;
  background: #111;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.btn-shiny::before {
  content: "";
  position: absolute;
  top: -2px; left: -2px;
  right: -2px; bottom: -2px;
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-anim 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.btn-shiny:hover::before {
  opacity: 1;
}

@keyframes glowing-anim {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}`,
    tailwind: `relative px-7 py-3 bg-[#111] border-none rounded-lg text-white font-semibold cursor-pointer before:content-[''] before:absolute before:-top-[2px] before:-left-[2px] before:-right-[2px] before:-bottom-[2px] before:bg-[linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] before:bg-[length:400%] before:z-[-1] before:blur-[5px] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:animate-[glowing_20s_linear_infinite] before:rounded-[10px]`
  },
  {
    name: "Pulse Glow",
    html: `<button class="btn-pulse">Pulse Glow</button>`,
    css: `.btn-pulse {
  padding: 12px 28px;
  background: #10b981;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse-anim 1.5s infinite linear;
}

@keyframes pulse-anim {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}`,
    tailwind: `px-7 py-3 bg-[#10b981] border-none rounded-full text-white font-semibold cursor-pointer shadow-[0_0_0_0_rgba(16,185,129,0.7)] animate-[pulse_1.5s_infinite_linear]`
  },
  {
    name: "Slide Shadow",
    html: `<button class="btn-slide">Explore Now</button>`,
    css: `.btn-slide {
  padding: 12px 28px;
  background: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px #2980b9;
  transition: all 0.2s;
}

.btn-slide:hover {
  box-shadow: 0 6px #2980b9;
  transform: translateY(-2px);
}

.btn-slide:active {
  box-shadow: 0 0 #2980b9;
  transform: translateY(4px);
}`,
    tailwind: `px-7 py-3 bg-[#3498db] border-none rounded text-white font-semibold cursor-pointer shadow-[0_4px_#2980b9] hover:shadow-[0_6px_#2980b9] hover:-translate-y-0.5 active:shadow-[0_0_#2980b9] active:translate-y-1 transition-all duration-200`
  },
  {
    name: "Dark Minimal",
    html: `<button class="btn-dark">Join Waitlist</button>`,
    css: `.btn-dark {
  padding: 12px 28px;
  background: #000;
  border: 1px solid #333;
  border-radius: 8px;
  color: #888;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-dark:hover {
  color: #fff;
  border-color: #555;
  background: #0a0a0a;
}`,
    tailwind: `px-7 py-3 bg-black border border-[#333] rounded-lg text-[#888] font-medium cursor-pointer hover:text-white hover:border-[#555] hover:bg-[#0a0a0a] transition-all duration-300`
  },
  /* --- NEW 20 BUTTONS --- */
  {
    name: "Pill Glow",
    html: `<button class="btn-pill-glow">Get Started</button>`,
    css: `.btn-pill-glow {
  padding: 12px 32px;
  background: #000;
  color: #fff;
  border: 1px solid #333;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.btn-pill-glow:hover {
  box-shadow: 0 0 25px rgba(108, 99, 255, 0.4);
  border-color: #6c63ff;
  transform: scale(1.02);
}`,
    tailwind: `px-8 py-3 bg-black text-white border border-[#333] rounded-full font-semibold cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:border-[#6c63ff] hover:scale-105 transition-all duration-300`
  },
  {
    name: "Skewed Edge",
    html: `<button class="btn-skew">Learn More</button>`,
    css: `.btn-skew {
  padding: 12px 28px;
  background: #ff4757;
  color: #fff;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transform: skew(-15deg);
  transition: all 0.3s;
}

.btn-skew:hover {
  transform: skew(0deg) scale(1.1);
  background: #2f3542;
}`,
    tailwind: `px-7 py-3 bg-[#ff4757] text-white border-none font-bold uppercase cursor-pointer -skew-x-12 hover:skew-x-0 hover:scale-110 hover:bg-[#2f3542] transition-all duration-300`
  },
  {
    name: "Border Draw",
    html: `<button class="btn-border-draw">Hover Details</button>`,
    css: `.btn-border-draw {
  padding: 12px 28px;
  background: transparent;
  color: var(--text-primary, #fff);
  border: 2px solid #555;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.btn-border-draw:hover {
  border-color: #6c63ff;
  color: #6c63ff;
  box-shadow: inset 0 0 10px rgba(108, 99, 255, 0.2);
}`,
    tailwind: `px-7 py-3 bg-transparent text-white border-2 border-[#555] font-semibold cursor-pointer relative hover:border-[#6c63ff] hover:text-[#6c63ff] hover:shadow-[inset_0_0_10px_rgba(108,99,255,0.2)] transition-all duration-300`
  },
  {
    name: "Bubble Burst",
    html: `<button class="btn-bubble">Pop Me</button>`,
    css: `.btn-bubble {
  padding: 12px 28px;
  background: #70a1ff;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-bubble:hover {
  transform: scale(1.1);
}

.btn-bubble:active {
  transform: scale(0.9);
}`,
    tailwind: `px-7 py-3 bg-[#70a1ff] rounded-lg border-none text-white font-semibold cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]`
  },
  {
    name: "Layered Shadow",
    html: `<button class="btn-layered">Download</button>`,
    css: `.btn-layered {
  padding: 12px 28px;
  background: #2ed573;
  color: white;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 4px 4px 0px #20bf6b;
  transition: all 0.2s;
}

.btn-layered:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #20bf6b;
}

.btn-layered:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px #20bf6b;
}`,
    tailwind: `px-7 py-3 bg-[#2ed573] text-white rounded border-none font-semibold cursor-pointer shadow-[4px_4px_0px_#20bf6b] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#20bf6b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200`
  },
  {
    name: "Icon Slide",
    html: `<button class="btn-icon-slide"><span>Next Step</span> <i class="icon">→</i></button>`,
    css: `.btn-icon-slide {
  padding: 12px 28px;
  background: #374151;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  transition: all 0.3s;
}

.btn-icon-slide .icon {
  transition: transform 0.3s;
}

.btn-icon-slide:hover {
  background: #1f2937;
}

.btn-icon-slide:hover .icon {
  transform: translateX(5px);
}`,
    tailwind: `px-7 py-3 bg-[#374151] text-white border-none rounded-lg font-medium cursor-pointer flex items-center gap-2.5 overflow-hidden hover:bg-[#1f2937] [&_i]:transition-transform [&_i]:duration-300 hover:[&_i]:translate-x-1.5 transition-all duration-300`
  },
  {
    name: "Reveal Fill",
    html: `<button class="btn-reveal">Hover Reveal</button>`,
    css: `.btn-reveal {
  padding: 12px 28px;
  background: #f1f2f6;
  color: #2f3542;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.btn-reveal::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #6c63ff;
  border-radius: 6px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
  z-index: -1;
}

.btn-reveal:hover {
  color: white;
}

.btn-reveal:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}`,
    tailwind: `relative px-7 py-3 bg-[#f1f2f6] text-[#2f3542] border-none rounded-lg font-semibold cursor-pointer z-10 hover:text-white before:content-[''] before:absolute before:inset-0 before:bg-[#6c63ff] before:rounded-lg before:scale-x-0 before:origin-right before:transition-transform before:duration-400 before:z-[-1] hover:before:scale-x-100 hover:before:origin-left`
  },
  {
    name: "Stripe Hover",
    html: `<button class="btn-stripe">Stripey</button>`,
    css: `.btn-stripe {
  padding: 12px 28px;
  background: #ffa502;
  color: white;
  border: none;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-stripe:hover {
  background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px);
  padding: 12px 34px;
}`,
    tailwind: `px-7 py-3 bg-[#ffa502] text-white border-none font-extrabold uppercase cursor-pointer hover:px-8 hover:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_10px,transparent_10px,transparent_20px)] transition-all duration-300`
  },
  {
    name: "Float Shadow",
    html: `<button class="btn-float">I am Floating</button>`,
    css: `.btn-float {
  padding: 14px 30px;
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.btn-float:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.15);
}`,
    tailwind: `px-7.5 py-3.5 bg-white text-[#333] border border-[#ddd] rounded-xl font-medium cursor-pointer shadow-md hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300`
  },
  {
    name: "Neon Line",
    html: `<button class="btn-neoline">Sign Up</button>`,
    css: `.btn-neoline {
  padding: 12px 28px;
  background: transparent;
  color: #00d2ff;
  border: 1px solid #00d2ff;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 5px #00d2ff;
  transition: all 0.3s;
}

.btn-neoline:hover {
  background: #00d2ff;
  color: #000;
  box-shadow: 0 0 20px #00d2ff, 0 0 40px #00d2ff;
}`,
    tailwind: `px-7 py-3 bg-transparent text-[#00d2ff] border border-[#00d2ff] rounded font-bold cursor-pointer shadow-[0_0_5px_#00d2ff] hover:bg-[#00d2ff] hover:text-black hover:shadow-[0_0_20px_#00d2ff,0_0_40px_#00d2ff] transition-all duration-300`
  },
  {
    name: "Dot Reveal",
    html: `<button class="btn-dots">Hover for Dots</button>`,
    css: `.btn-dots {
  padding: 12px 28px;
  background: #2f3542;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-dots::after {
  content: "•••";
  position: absolute;
  top: 100%; left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
  opacity: 0;
}

.btn-dots:hover {
  padding-bottom: 20px;
}

.btn-dots:hover::after {
  top: 60%;
  opacity: 1;
}`,
    tailwind: `relative px-7 py-3 bg-[#2f3542] text-white border-none font-semibold cursor-pointer overflow-hidden hover:pb-5 after:content-['•••'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:opacity-0 hover:after:top-[60%] hover:after:opacity-100 after:transition-all after:duration-300 transition-all duration-300`
  },
  {
    name: "Static Ripple",
    html: `<button class="btn-ripple-static">Ripple Look</button>`,
    css: `.btn-ripple-static {
  padding: 12px 28px;
  background: #1e90ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.btn-ripple-static::before {
  content: "";
  position: absolute;
  top: 50%; left: 50%;
  width: 150%; height: 250%;
  background: rgba(255,255,255,0.1);
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  transition: transform 0.6s ease;
  z-index: -1;
}

.btn-ripple-static:hover::before {
  transform: translate(-50%, -50%) scale(1);
}`,
    tailwind: `relative px-7 py-3 bg-[#1e90ff] text-white border-none rounded-lg font-semibold cursor-pointer z-10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-[150%] before:h-[250%] before:bg-white/10 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:rounded-full before:transition-transform before:duration-700 before:z-[-1] hover:before:scale-100`
  },
  {
    name: "Gradient Border",
    html: `<button class="btn-gradient-border"><span>Read More</span></button>`,
    css: `.btn-gradient-border {
  padding: 2px;
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
}

.btn-gradient-border span {
  display: block;
  padding: 11px 26px;
  background: #13131f; /* Match site bg */
  border-radius: 8px;
  color: white;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-gradient-border:hover span {
  background: transparent;
}`,
    tailwind: `p-[2px] bg-gradient-to-r from-[#f093fb] to-[#f5576c] border-none rounded-[10px] cursor-pointer inline-block [&_span]:block [&_span]:px-6.5 [&_span]:py-2.5 [&_span]:bg-[#13131f] [&_span]:rounded-[8px] [&_span]:text-white [&_span]:font-semibold [&_span]:transition-all hover:[&_span]:bg-transparent`
  },
  {
    name: "Dual Tone",
    html: `<button class="btn-dual-tone"><span class="left">Add</span><span class="right">Item</span></button>`,
    css: `.btn-dual-tone {
  display: flex;
  background: #333;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  color: white;
  font-weight: 600;
}

.btn-dual-tone span {
  padding: 12px 20px;
}

.btn-dual-tone .left { background: #6c63ff; }
.btn-dual-tone .right { background: #4b4b4b; }

.btn-dual-tone:hover .left { background: #5a52ee; }
.btn-dual-tone:hover .right { background: #555; }`,
    tailwind: `flex bg-[#333] border-none rounded-lg overflow-hidden cursor-pointer text-white font-semibold [&_span]:px-5 [&_span]:py-3 [&_.left]:bg-[#6c63ff] [&_.right]:bg-[#4b4b4b] hover:[&_.left]:bg-[#5a52ee] hover:[&_.right]:bg-[#555]`
  },
  {
    name: "Glitch Effect",
    html: `<button class="btn-glitch" data-text="DANGER">DANGER</button>`,
    css: `.btn-glitch {
  padding: 12px 28px;
  background: #ff003c;
  border: none;
  color: #fff;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
}

.btn-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #ff003c;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  opacity: 0;
}

.btn-glitch:hover::after {
  opacity: 1;
  animation: glitch-anim 0.3s infinite;
}

@keyframes glitch-anim {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}`,
    tailwind: `relative px-7 py-3 bg-[#ff003c] border-none text-white font-black tracking-widest cursor-pointer after:content-[attr(data-text)] after:absolute after:inset-0 after:bg-[#ff003c] after:flex after:items-center after:justify-center after:opacity-0 hover:after:opacity-100 hover:after:animate-[glitch-anim_0.3s_infinite]`
  },
  {
    name: "Pixel Retro",
    html: `<button class="btn-pixel">START GAME</button>`,
    css: `.btn-pixel {
  padding: 12px 28px;
  background: #8e44ad;
  color: #fff;
  border: 4px solid #000;
  box-shadow: 4px 4px 0px #000;
  font-family: 'monospace';
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s;
}

.btn-pixel:active {
  box-shadow: 0px 0px 0px #000;
  transform: translate(4px, 4px);
}`,
    tailwind: `px-7 py-3 bg-[#8e44ad] text-white border-4 border-black shadow-[4px_4px_0_0_black] font-mono font-bold cursor-pointer active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-100`
  },
  {
    name: "Shadow Shift",
    html: `<button class="btn-shadow-shift">Shift Me</button>`,
    css: `.btn-shadow-shift {
  padding: 12px 28px;
  background: #fff;
  color: #333;
  border: 2px solid #333;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 6px 6px 0 -2px #fff, 6px 6px 0 0 #333;
  transition: all 0.2s;
}

.btn-shadow-shift:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 -2px #fff, 2px 2px 0 0 #333;
}`,
    tailwind: `px-7 py-3 bg-white text-[#333] border-2 border-[#333] font-bold cursor-pointer shadow-[6px_6px_0_-2px_white,6px_6px_0_0_#333] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_-2px_white,2px_2px_0_0_#333] transition-all duration-200`
  },
  {
    name: "Bounce Hover",
    html: `<button class="btn-bounce-hover">Boing!</button>`,
    css: `.btn-bounce-hover {
  padding: 12px 28px;
  background: #f9ca24;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn-bounce-hover:hover {
  animation: boing-anim 0.5s ease-in-out;
}

@keyframes boing-anim {
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(0.9); }
  75% { transform: scale(1.05); }
  100% { transform: scale(1); }
}`,
    tailwind: `px-7 py-3 bg-[#f9ca24] text-black border-none rounded-lg font-bold cursor-pointer hover:animate-[boing-anim_0.5s_ease-in-out]`
  },
  {
    name: "Shimmer Effect",
    html: `<button class="btn-shimmer">Shiny Card</button>`,
    css: `.btn-shimmer {
  padding: 12px 28px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-shimmer::after {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: all 0.3s;
}

.btn-shimmer:hover::after {
  left: 100%;
  transition: all 0.7s;
}`,
    tailwind: `relative px-7 py-3 bg-[#333] text-white border-none rounded font-medium cursor-pointer overflow-hidden after:content-[''] after:absolute after:top-0 after:-left-full after:w-1/2 after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent hover:after:left-full after:transition-all after:duration-700`
  },
  {
    name: "Wave Bottom",
    html: `<button class="btn-wave">Wave Now</button>`,
    css: `.btn-wave {
  padding: 12px 28px;
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-wave::before {
  content: "";
  position: absolute;
  bottom: -50%; left: -50%;
  width: 200%; height: 100%;
  background: rgba(255,255,255,0.15);
  border-radius: 40%;
  transition: transform 0.3s;
  animation: wave-anim 5s linear infinite;
  display: none;
}

.btn-wave:hover::before {
  display: block;
}

@keyframes wave-anim {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
    tailwind: `relative px-7 py-3 bg-[#0984e3] text-white border-none rounded-lg font-semibold cursor-pointer overflow-hidden before:content-[''] before:absolute before:-bottom-1/2 before:-left-1/2 before:w-[200%] before:h-full before:bg-white/15 before:rounded-[40%] before:hidden hover:before:block before:animate-[wave-anim_5s_linear_infinite]`
  }
];
