import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Cog, 
  Layers, 
  Ruler, 
  Send, 
  Check, 
  ShieldCheck,
  Flame,
  Phone
} from 'lucide-react';
import { VEHICLE_DATA } from '../data/carData';
import { soundManager } from '../utils/audio';

export default function TechnicalDossier({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('powertrain');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'New Delhi',
    inquiryType: 'Allocation Reservation',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    setIsSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Automobili Lamborghini Concierge,\n\nI am requesting allocation information for the Lamborghini Huracán LP 580-2.\n\nName: ${formData.fullName || 'Client'}\nContact: ${formData.phone || 'Direct'}\nCity: ${formData.city}\n\nPlease share official dossier & VIP preview schedule.`
    );
    window.open(`https://api.whatsapp.com/send?phone=+919999999681&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full sm:w-[520px] lg:w-[600px] h-full bg-[#0a1117] border-l border-white/10 shadow-2xl flex flex-col text-left overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e171f]/80 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F70E1E] animate-pulse" />
              <span className="text-[10px] font-orbitron tracking-widest text-[#CCA57E] uppercase">
                CONFIDENTIAL SPECIFICATION
              </span>
            </div>
            <h2 className="font-orbitron text-xl sm:text-2xl font-black text-white mt-0.5">
              TECHNICAL DOSSIER
            </h2>
            <p className="text-xs font-rajdhani text-slate-400">
              {VEHICLE_DATA.brand} • {VEHICLE_DATA.model}
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#070c10] px-6 gap-2 overflow-x-auto py-2">
          {[
            { id: 'powertrain', label: 'V10 POWERTRAIN', icon: Cpu },
            { id: 'drivetrain', label: 'DRIVETRAIN & LDF', icon: Cog },
            { id: 'chassis', label: 'CHASSIS & AERO', icon: Layers },
            { id: 'dimensions', label: 'BLUEPRINT', icon: Ruler },
            { id: 'inquiry', label: 'ALLOCATION', icon: Send },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-orbitron font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F70E1E] text-white glow-crimson'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Powertrain Tab */}
          {activeTab === 'powertrain' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-[#CCA57E]">
                  <Flame className="w-4 h-4 text-[#F70E1E]" />
                  <span className="font-orbitron text-xs font-bold tracking-wider">
                    NATURALLY ASPIRATED 90° V10
                  </span>
                </div>
                <p className="text-xs font-inter text-slate-300 leading-relaxed">
                  The beating heart of the LP 580-2 is engineered for unadulterated acoustic drama. Displacing 5.2 liters, it revs cleanly to an 8,500 RPM limiter without turbo lag or acoustic dampening.
                </p>
              </div>

              <div className="divide-y divide-white/5 border-t border-b border-white/5">
                {VEHICLE_DATA.dossier.powertrain.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-rajdhani text-slate-400 tracking-wider uppercase">{item.key}</span>
                    <span className="font-orbitron font-semibold text-white text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Drivetrain Tab */}
          {activeTab === 'drivetrain' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="font-orbitron text-xs font-bold text-[#CCA57E] block mb-2">
                  LDF 7-SPEED DUAL CLUTCH & REAR-WHEEL DRIVE
                </span>
                <p className="text-xs font-inter text-slate-300 leading-relaxed">
                  Tailored exclusively for RWD behavior. The electronic stability program and traction control are recalibrated to allow calculated oversteer angles in SPORT and maximum razor-sharp lap times in CORSA.
                </p>
              </div>

              <div className="divide-y divide-white/5 border-t border-b border-white/5">
                {VEHICLE_DATA.dossier.drivetrain.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-rajdhani text-slate-400 tracking-wider uppercase">{item.key}</span>
                    <span className="font-orbitron font-semibold text-white text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Chassis Tab */}
          {activeTab === 'chassis' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="font-orbitron text-xs font-bold text-[#CCA57E] block mb-2">
                  HYBRID ALUMINUM & CARBON FIBER SPACEFRAME
                </span>
                <p className="text-xs font-inter text-slate-300 leading-relaxed">
                  Weighing only 1,389 kg dry, the hybrid chassis delivers a benchmark 40:60 weight distribution, ensuring instantaneous turn-in precision and neutral mid-corner balance.
                </p>
              </div>

              <div className="divide-y divide-white/5 border-t border-b border-white/5">
                {VEHICLE_DATA.dossier.chassis.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-rajdhani text-slate-400 tracking-wider uppercase">{item.key}</span>
                    <span className="font-orbitron font-semibold text-white text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Dimensions Tab */}
          {activeTab === 'dimensions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="font-orbitron text-xs font-bold text-[#CCA57E] block mb-2">
                  AERODYNAMIC BLUEPRINT & PROPORTIONS
                </span>
                <p className="text-xs font-inter text-slate-300 leading-relaxed">
                  Low-slung wedge architecture designed to slice through air while generating high-speed downforce across both axles without drag penalty.
                </p>
              </div>

              <div className="divide-y divide-white/5 border-t border-b border-white/5">
                {VEHICLE_DATA.dossier.dimensions.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-rajdhani text-slate-400 tracking-wider uppercase">{item.key}</span>
                    <span className="font-orbitron font-semibold text-white text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Bespoke Allocation Inquiry Form */}
          {activeTab === 'inquiry' && (
            <div>
              {isSubmitted ? (
                <div className="p-8 rounded-2xl glass-panel-crimson text-center space-y-4 border border-[#F70E1E]/40">
                  <div className="w-12 h-12 rounded-full bg-[#F70E1E]/20 text-[#F70E1E] border border-[#F70E1E]/40 mx-auto flex items-center justify-center glow-crimson">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-white">
                    ALLOCATION DOSSIER RESERVED
                  </h3>
                  <p className="text-xs font-inter text-slate-300 leading-relaxed">
                    Thank you, {formData.fullName || 'Valued Client'}. Your private preview dossier and build commission sheet for the Huracán LP 580-2 has been prioritized.
                  </p>
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>CONNECT WITH CLIENT CONCIERGE (WHATSAPP)</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-rajdhani text-slate-400 uppercase">SELECTED SPECIFICATION</div>
                      <div className="font-orbitron text-xs font-bold text-[#CCA57E]">
                        {VEHICLE_DATA.model} (Rosso Mars / Kari Wheels)
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border border-white/30 bg-[#F70E1E]" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-rajdhani uppercase tracking-wider text-slate-400 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#F70E1E] text-white text-xs outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-rajdhani uppercase tracking-wider text-slate-400 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#F70E1E] text-white text-xs outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-rajdhani uppercase tracking-wider text-slate-400 mb-1">
                        Region / City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="New Delhi / Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#F70E1E] text-white text-xs outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-rajdhani uppercase tracking-wider text-slate-400 mb-1">
                      Private Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@executive.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-[#F70E1E] text-white text-xs outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F70E1E] to-[#b30814] text-white font-orbitron text-xs font-bold tracking-widest hover:brightness-110 transition-all glow-crimson flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>SUBMIT VIP ALLOCATION REQUEST</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-slate-400 text-[10px] font-rajdhani">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#CCA57E]" />
                    <span>Discreet VIP Concierge Privacy Guaranteed</span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

