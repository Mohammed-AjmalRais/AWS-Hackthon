"use client";

import React, { useState } from "react";
import {
  SAMPLE_OFFLINE_CENTERS,
  STATUTORY_FEE_RULES,
  OfflineCenter
} from "@/data/cscDirectory";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  AlertOctagon,
  Search,
  Building,
  HelpCircle,
  CheckCircle2
} from "lucide-react";

interface OfflineNavigatorTabProps {
  currentLanguage: "en" | "hi";
  userState: string;
}

export const OfflineNavigatorTab: React.FC<OfflineNavigatorTabProps> = ({
  currentLanguage,
  userState,
}) => {
  const [selectedState, setSelectedState] = useState<string>(userState || "Odisha");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCenters = SAMPLE_OFFLINE_CENTERS.filter((center) => {
    const matchesState =
      selectedState === "All India" ||
      center.state.toLowerCase() === selectedState.toLowerCase();
    const matchesQuery =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* PART 1: The Fee Transparency Guard Banner */}
      <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-6 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertOctagon className="size-6 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="rounded-full bg-amber-200/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-900">
              Anti-Extortion & Transparency Guard
            </span>
            <h3 className="mt-1 text-base font-bold text-amber-950">
              {currentLanguage === "hi"
                ? "आधिकारिक सरकारी फीस बनाम साइबर कैफ़े बिचौलिए"
                : "Statutory Government Fee vs Cyber Cafe Extortion Warning"}
            </h3>
            <p className="mt-1 text-xs text-amber-900 leading-relaxed max-w-4xl">
              {currentLanguage === "hi"
                ? "दूरदराज के क्षेत्रों में सामान्य सेवा केंद्र (CSC) और साइबर कैफे ऑपरेटर छात्रों से ₹200 से ₹400 तक वसूलते हैं। भारतीय कानून और आईटी अधिनियम के तहत सरकारी छात्रवृत्ति आवेदन 100% निःशुल्क है और प्रमाण पत्रों का आधिकारिक शुल्क केवल ₹25-30 है।"
                : "In rural and semi-urban hamlets, private internet cafes and rogue operators regularly exploit students by charging ₹200 to ₹500 for government forms. Under Central and State Citizen Charters, scholarship filing is 100% FREE, and certificate issuance is strictly capped at ₹25–₹30."}
            </p>
          </div>
        </div>

        {/* Statutory Fee Cards Grid */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {Object.entries(STATUTORY_FEE_RULES).map(([key, rule]) => (
            <div key={key} className="rounded-xl border border-amber-200 bg-white p-4 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">{rule.serviceName}</h4>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-emerald-600">
                  {rule.officialGovtFee}
                </span>
                <span className="text-[10px] text-slate-400">Govt Fee</span>
              </div>
              <div className="mt-1 text-[11px] font-medium text-slate-600">
                Max Authorized Fee: <strong className="text-slate-900">{rule.maximumLegalCharge}</strong>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                {rule.warningNotice}
              </p>
              <div className="mt-3 border-t border-slate-100 pt-2 text-[10px] font-mono text-slate-400">
                Helpline: {rule.grievanceHelpline}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PART 2: Offline Center Locator */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="size-4 text-orange-600" />
              {currentLanguage === "hi"
                ? "निकटतम नागरिक सेवा केंद्र एवं तहसील कार्यालय"
                : "Verified Offline Service Centers & Tehsildar Desks"}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Physical locations for biometric e-KYC, certificate sign-offs, and physical verification.
            </p>
          </div>

          {/* Search & State Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="size-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search district, center..."
                className="w-48 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:border-orange-500 focus:outline-hidden"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-orange-500 focus:outline-hidden"
            >
              <option value="All India">All States</option>
              <option value="Odisha">Odisha</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
        </div>

        {/* Center Cards List */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-orange-300 hover:bg-white hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded bg-indigo-100 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-800 uppercase">
                    {center.type}
                  </span>
                  <h5 className="mt-1.5 text-sm font-bold text-slate-900">{center.name}</h5>
                </div>
                <span className="rounded bg-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                  {center.district}, {center.state}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{center.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="size-3.5 text-slate-400 shrink-0" />
                  <span>{center.timing}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-3.5 text-slate-400 shrink-0" />
                  <span>{center.contactNumber}</span>
                </p>
              </div>

              <div className="mt-3 border-t border-slate-200/60 pt-2.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Services Provided at this Counter:
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {center.servicesOffered.map((s, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredCenters.length === 0 && (
          <div className="mt-8 text-center py-10">
            <Building className="size-8 text-slate-300 mx-auto" />
            <p className="mt-2 text-xs text-slate-500">
              No centers found matching your query. Try searching for another district or state.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
