// "use client"
// import { useState } from "react";

// function fmt(n) {
//   if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
//   if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
//   return `₹${Math.round(n).toLocaleString("en-IN")}`;
// }

// function CurrencyInput({ label, value, onChange, placeholder }) {
//   return (
//     <div>
//       <label className="block text-[13px] text-[#555] mb-2 tracking-[-0.01em]">{label}</label>
//       <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E0E0E0] bg-white focus-within:border-[#0F0F0F] focus-within:shadow-[0_0_0_3px_rgba(15,15,15,0.06)] transition-all duration-200">
//         <span className="text-[15px] font-semibold text-[#BBB]">₹</span>
//         <input
//           type="number"
//           value={value}
//           onChange={e => onChange(Math.max(0, Number(e.target.value)))}
//           placeholder={placeholder}
//           className="flex-1 text-[15px] font-semibold text-[#0F0F0F] outline-none tracking-[-0.02em] bg-transparent placeholder-[#DDD]"
//         />
//       </div>
//     </div>
//   );
// }

// const PRESETS = [
//   { label: "Emergency Fund", target: 300000, saved: 80000 },
//   { label: "Vacation", target: 150000, saved: 42000 },
//   { label: "New Car", target: 800000, saved: 120000 },
//   { label: "Home Down Payment", target: 2000000, saved: 350000 },
// ];

// export default function GoalTracker() {
//   const [target, setTarget] = useState(1000000);
//   const [saved, setSaved] = useState(100000);
//   const [goalName, setGoalName] = useState("Dream Home");

//   const pct = Math.min(100, target > 0 ? Math.round((saved / target) * 100) : 0);
//   const remaining = Math.max(0, target - saved);
//   const monthlySuggested = remaining > 0 ? Math.ceil(remaining / 36) : 0;

//   const milestones = [25, 50, 75, 100];

//   return (
//     <section id="goal-tracker" className="py-20 px-6 bg-[#FAFAF8]">
//       <div className="max-w-6xl mx-auto">
//         <SectionLabel number="04" label="Financial Goal Tracker" />
//         <div className="flex flex-col lg:flex-row gap-8 mt-8">
//           {/* Left: inputs */}
//           <div className="flex-1 max-w-lg flex flex-col gap-5">
//             <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
//               <div className="mb-5">
//                 <label className="block text-[13px] text-[#555] mb-2">Goal Name</label>
//                 <input
//                   value={goalName}
//                   onChange={e => setGoalName(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[15px] font-semibold text-[#0F0F0F] outline-none focus:border-[#0F0F0F] focus:shadow-[0_0_0_3px_rgba(15,15,15,0.06)] transition-all duration-200 bg-white tracking-[-0.01em]"
//                   placeholder="e.g. Dream Home"
//                 />
//               </div>
//               <div className="grid grid-cols-1 gap-4">
//                 <CurrencyInput label="Target Goal Amount" value={target} onChange={setTarget} placeholder="10,00,000"/>
//                 <CurrencyInput label="Current Savings" value={saved} onChange={setSaved} placeholder="1,00,000"/>
//               </div>
//             </div>

//             {/* Presets */}
//             <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5">
//               <div className="text-[12px] text-[#888] font-medium uppercase tracking-wider mb-4">Quick Presets</div>
//               <div className="grid grid-cols-2 gap-2">
//                 {PRESETS.map(p => (
//                   <button key={p.label}
//                     onClick={() => { setTarget(p.target); setSaved(p.saved); setGoalName(p.label); }}
//                     className="text-left p-3 rounded-xl border border-[#F0F0F0] hover:border-[#0F0F0F] hover:bg-[#FAFAF8] transition-all duration-150 group">
//                     <div className="text-[12.5px] font-semibold text-[#0F0F0F] group-hover:text-[#0F0F0F]">{p.label}</div>
//                     <div className="text-[11px] text-[#888] mt-0.5">{fmt(p.target)}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right: progress display */}
//           <div className="flex-1 max-w-md flex flex-col gap-4">
//             {/* Main progress card */}
//             <div className="bg-white border border-[#E8E8E8] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <div className="text-[12px] text-[#888] uppercase tracking-wider mb-1">Goal Progress</div>
//                   <div className="text-[18px] font-semibold text-[#0F0F0F] tracking-[-0.02em]">{goalName || "Your Goal"}</div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-[44px] font-bold text-[#0F0F0F] tracking-[-0.05em] leading-none">{pct}<span className="text-[22px] text-[#888]">%</span></div>
//                   <div className="text-[12px] text-[#888] mt-1">complete</div>
//                 </div>
//               </div>

//               {/* Progress bar */}
//               <div className="relative h-3 bg-[#F0F0F0] rounded-full overflow-hidden mb-2">
//                 <div
//                   className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
//                   style={{
//                     width: `${pct}%`,
//                     background: pct >= 75 ? "#16a34a" : pct >= 50 ? "#C9A84C" : "#0F0F0F"
//                   }}
//                 />
//               </div>

//               {/* Milestone markers */}
//               <div className="relative flex justify-between mt-1 mb-5">
//                 {milestones.map(m => (
//                   <div key={m} className="flex flex-col items-center">
//                     <div className={`w-1 h-1 rounded-full ${pct >= m ? "bg-[#C9A84C]" : "bg-[#E0E0E0]"}`}/>
//                     <span className="text-[10px] text-[#BBB] mt-0.5">{m}%</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-[#F8F8F6] rounded-xl p-4">
//                   <div className="text-[11.5px] text-[#888] mb-1">Saved So Far</div>
//                   <div className="text-[17px] font-bold text-[#0F0F0F] tracking-[-0.03em]">{fmt(saved)}</div>
//                 </div>
//                 <div className="bg-[#F8F8F6] rounded-xl p-4">
//                   <div className="text-[11.5px] text-[#888] mb-1">Target Amount</div>
//                   <div className="text-[17px] font-bold text-[#0F0F0F] tracking-[-0.03em]">{fmt(target)}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Remaining + suggestion */}
//             <div className={`rounded-2xl p-6 border ${pct >= 100 ? "bg-green-50 border-green-200" : "bg-[#0F0F0F] border-[#0F0F0F]"}`}>
//               {pct >= 100 ? (
//                 <div className="text-center">
//                   <div className="text-[28px] mb-1">🎉</div>
//                   <div className="text-[17px] font-bold text-green-800">Goal Achieved!</div>
//                   <div className="text-[13px] text-green-700 mt-1">You've reached your target. Time to celebrate!</div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="text-[12px] text-white/50 uppercase tracking-wider mb-2">Remaining</div>
//                   <div className="text-[32px] font-bold text-white tracking-[-0.04em] leading-none mb-4">{fmt(remaining)}</div>
//                   <div className="h-px bg-white/10 mb-4"/>
//                   <div className="text-[12px] text-white/60 mb-1">Suggested monthly saving (3 yr plan)</div>
//                   <div className="text-[18px] font-bold text-[#C9A84C]">{fmt(monthlySuggested)} / month</div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SectionLabel({ number, label }) {
//   return (
//     <div className="flex items-center gap-4">
//       <span className="text-[11px] font-semibold text-[#C9A84C] tracking-[0.14em] uppercase">{number}</span>
//       <div className="h-px bg-[#E8E8E8] max-w-[40px] w-10"/>
//       <span className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">{label}</span>
//     </div>
//   );
// }


"use client"
import { useState } from "react";

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function CurrencyInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-[13px] text-[#555] dark:text-[#A0A0A0] mb-2">
        {label}
      </label>

      <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#0F0F0F] focus-within:border-[#0F0F0F] dark:focus-within:border-white transition-all duration-200">
        <span className="text-[15px] font-semibold text-[#BBB] dark:text-[#666]">₹</span>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          placeholder={placeholder}
          className="flex-1 text-[15px] font-semibold text-[#0F0F0F] dark:text-white outline-none bg-transparent placeholder-[#DDD] dark:placeholder-[#555]"
        />
      </div>
    </div>
  );
}

const PRESETS = [
  { label: "Emergency Fund", target: 300000, saved: 80000 },
  { label: "Vacation", target: 150000, saved: 42000 },
  { label: "New Car", target: 800000, saved: 120000 },
  { label: "Home Down Payment", target: 2000000, saved: 350000 },
];

export default function GoalTracker() {
  const [target, setTarget] = useState(1000000);
  const [saved, setSaved] = useState(100000);
  const [goalName, setGoalName] = useState("Dream Home");

  const pct = Math.min(100, target > 0 ? Math.round((saved / target) * 100) : 0);
  const remaining = Math.max(0, target - saved);
  const monthlySuggested = remaining > 0 ? Math.ceil(remaining / 36) : 0;

  const milestones = [25, 50, 75, 100];

  return (
    <section className="py-20 px-6 bg-[#FAFAF8] dark:bg-black">
      <div className="max-w-6xl mx-auto">

        <SectionLabel number="04" label="Financial Goal Tracker" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">

          {/* LEFT */}
          <div className="flex-1 max-w-lg flex flex-col gap-5">

            <div className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-2xl p-7">
              
              <div className="mb-5">
                <label className="block text-[13px] text-[#555] dark:text-[#A0A0A0] mb-2">
                  Goal Name
                </label>

                <input
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#2A2A2A] text-[15px] font-semibold text-[#0F0F0F] dark:text-white bg-white dark:bg-[#0F0F0F] outline-none"
                  placeholder="e.g. Dream Home"
                />
              </div>

              <div className="grid gap-4">
                <CurrencyInput label="Target Goal Amount" value={target} onChange={setTarget}/>
                <CurrencyInput label="Current Savings" value={saved} onChange={setSaved}/>
              </div>
            </div>

            {/* PRESETS */}
            <div className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-2xl p-5">
              <div className="text-[12px] text-[#888] dark:text-[#A0A0A0] mb-4">
                Quick Presets
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setTarget(p.target);
                      setSaved(p.saved);
                      setGoalName(p.label);
                    }}
                    className="text-left p-3 rounded-xl border border-[#F0F0F0] dark:border-[#2A2A2A] hover:border-[#0F0F0F] dark:hover:border-white hover:bg-[#FAFAF8] dark:hover:bg-[#1A1A1A]"
                  >
                    <div className="text-[12.5px] font-semibold text-[#0F0F0F] dark:text-white">
                      {p.label}
                    </div>
                    <div className="text-[11px] text-[#888] dark:text-[#A0A0A0]">
                      {fmt(p.target)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 max-w-md flex flex-col gap-4">

            {/* MAIN CARD */}
            <div className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-2xl p-7">

              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-[12px] text-[#888] dark:text-[#A0A0A0]">Goal Progress</div>
                  <div className="text-[18px] font-semibold text-[#0F0F0F] dark:text-white">
                    {goalName}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[44px] font-bold text-[#0F0F0F] dark:text-white">
                    {pct}%
                  </div>
                </div>
              </div>

              <div className="h-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full mb-3">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: pct >= 75 ? "#16a34a" : pct >= 50 ? "#C9A84C" : "#0F0F0F",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8F8F6] dark:bg-[#1A1A1A] rounded-xl p-4">
                  <div className="text-[#888] dark:text-[#A0A0A0] text-[12px]">
                    Saved
                  </div>
                  <div className="text-[#0F0F0F] dark:text-white font-bold">
                    {fmt(saved)}
                  </div>
                </div>

                <div className="bg-[#F8F8F6] dark:bg-[#1A1A1A] rounded-xl p-4">
                  <div className="text-[#888] dark:text-[#A0A0A0] text-[12px]">
                    Target
                  </div>
                  <div className="text-[#0F0F0F] dark:text-white font-bold">
                    {fmt(target)}
                  </div>
                </div>
              </div>
            </div>

            {/* REMAINING */}
            <div className="rounded-2xl p-6 border bg-[#0F0F0F] border-[#0F0F0F]">
              <div className="text-white/50 text-[12px] mb-2">Remaining</div>
              <div className="text-white text-[32px] font-bold mb-4">
                {fmt(remaining)}
              </div>
              <div className="text-[#C9A84C] font-bold">
                {fmt(monthlySuggested)} / month
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[#C9A84C] text-[11px] font-semibold">
        {number}
      </span>
      <div className="h-px bg-[#E8E8E8] dark:bg-[#2A2A2A] w-10" />
      <span className="text-[#0F0F0F] dark:text-white text-[13px] font-semibold">
        {label}
      </span>
    </div>
  );
}