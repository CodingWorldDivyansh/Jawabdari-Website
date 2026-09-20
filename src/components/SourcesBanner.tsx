'use client';

import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, ExternalLink, Database, Calendar, Award } from 'lucide-react';

interface SourcesBannerProps {
  totalProjects?: number;
  totalCostCr?: string;
  totalContractors?: number;
}

export const SourcesBanner: React.FC<SourcesBannerProps> = ({
  totalProjects = 621,
  totalCostCr = '₹170.74 Cr',
  totalContractors = 65,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sources = [
    {
      name: 'eSAKSHI Portal',
      dept: 'MoSPI & Govt of Punjab',
      url: 'https://esakshi.gov.in',
      desc: 'MLALADS fund allocations, work sanctions, installment disbursements, and digital payment vouchers.'
    },
    {
      name: 'Municipal Corporation Ludhiana (MCL)',
      dept: 'City Engineering & B&R',
      url: 'https://mcludhiana.gov.in',
      desc: 'Ward-level development works, interlocking paver streets, water/sewage tenders, and completion registers.'
    },
    {
      name: 'Punjab PWD (B&R)',
      dept: 'Public Works Department',
      url: 'https://pwdpunjab.gov.in',
      desc: 'State highway links, bridges, institutional infrastructure, and e-tendering award records.'
    },
    {
      name: 'Punjab Vidhan Sabha',
      dept: 'Legislative Assembly Disclosures',
      url: 'http://punjabassembly.nic.in',
      desc: 'Official MLA constituency portfolios, fund utilization certificates, and legislative questions.'
    },
    {
      name: 'mSeva Punjab',
      dept: 'Dept of Local Government',
      url: 'https://mseva.lgpunjab.gov.in',
      desc: 'Urban local bodies civic infrastructure and development monitoring.'
    }
  ];

  return (
    <div className="mb-6 rounded-lg border border-[#E6EAF0] bg-white shadow-xs overflow-hidden">
      {/* Top Banner Bar */}
      <div className="px-4 py-2.5 bg-[#FAF7F2]/80 border-b border-[#E6EAF0] flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center space-x-1.5 text-[#1E9E6A] font-semibold bg-[#1E9E6A]/10 px-2.5 py-1 rounded-full border border-[#1E9E6A]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Official Sources</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-[#0B1B2F]/70 text-[11px]">
            <span>Data scraped & cross-verified from:</span>
            <span className="font-semibold text-[#0B1B2F]">eSAKSHI</span>
            <span>•</span>
            <span className="font-semibold text-[#0B1B2F]">MC Ludhiana</span>
            <span>•</span>
            <span className="font-semibold text-[#0B1B2F]">Punjab PWD</span>
            <span>•</span>
            <span className="font-semibold text-[#0B1B2F]">Vidhan Sabha</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-1 text-[#0B1B2F] hover:text-[#FF7A00] font-medium transition-colors cursor-pointer text-xs"
        >
          <span className="hidden sm:inline">{isExpanded ? 'Hide Sources & Methodology' : 'View Official Sources & Audit'}</span>
          <span className="sm:hidden">{isExpanded ? 'Hide' : 'Sources'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Methodology & Sources Drawer */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-white space-y-4 text-xs">
          {/* Scope & Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-[#FAF7F2]/50 border border-[#E6EAF0]">
            <div className="flex items-start space-x-2.5">
              <Database className="w-4 h-4 text-[#0B1B2F] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0B1B2F] text-xs block">Full 10-Year & Future Scope</span>
                <span className="text-[11px] text-[#0B1B2F]/70">
                  348 historical (2014–2024), 187 ongoing (2024–2025), and 86 planned near-future works (2025–2026).
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <Award className="w-4 h-4 text-[#0B1B2F] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0B1B2F] text-xs block">{totalCostCr} Total Tracked</span>
                <span className="text-[11px] text-[#0B1B2F]/70">
                  {totalProjects} public infrastructure projects across all 14 assembly constituencies of Ludhiana.
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <Calendar className="w-4 h-4 text-[#0B1B2F] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0B1B2F] text-xs block">{totalContractors} Contractors & Agencies</span>
                <span className="text-[11px] text-[#0B1B2F]/70">
                  Full registry of executing firms, trade specialties, ratings, and awarded contract portfolios.
                </span>
              </div>
            </div>
          </div>

          {/* Sources List */}
          <div>
            <h4 className="font-bold text-[#0B1B2F] text-xs uppercase tracking-wider mb-2">
              Primary Public Portals Scraped & Cross-Referenced:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {sources.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded border border-[#E6EAF0] bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#0B1B2F]">{s.name}</span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#0B1B2F]/60 hover:text-[#FF7A00] inline-flex items-center space-x-0.5"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <span className="text-[10px] text-[#0B1B2F]/60 block font-medium mb-1">
                      {s.dept}
                    </span>
                    <p className="text-[11px] text-[#0B1B2F]/70 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[#0B1B2F]/60 border-t border-[#E6EAF0] pt-2.5 flex items-center justify-between">
            <span>Published under Right to Information (RTI) & Open Civic Data standards.</span>
            <span>Last Scraped & Synced: September 2026</span>
          </div>
        </div>
      )}
    </div>
  );
};
