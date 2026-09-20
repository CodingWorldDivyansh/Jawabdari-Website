'use client';

import React, { useState } from 'react';
import { X, Star, Download } from 'lucide-react';
import { Contractor, Project } from '@/lib/types';
import { formatRupee, formatDate } from '@/lib/formatters';
import { exportProjectsToCSV } from '@/lib/store';

interface ContractorModalProps {
  contractor: Contractor | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  onSelectMlaName?: (name: string) => void;
}

export const ContractorModal: React.FC<ContractorModalProps> = ({
  contractor,
  projects,
  onClose,
  onSelectProject,
  onSelectMlaName
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'Planned' | 'In Progress' | 'Completed'>('all');

  if (!contractor) return null;

  const contractorProjects = projects.filter(p => 
    p.primaryContractor === contractor.name || p.contractors.includes(contractor.name)
  );
  
  const filteredProjects = activeTab === 'all' 
    ? contractorProjects 
    : contractorProjects.filter(p => p.status === activeTab);

  const handleExportContractorWorks = () => {
    const slug = contractor.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    exportProjectsToCSV(contractorProjects, `jawabdari_contractor_${slug}_works_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl border border-[#E6EAF0] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 px-4 sm:px-5 py-4 border-b border-[#E6EAF0]">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-[#0B1B2F] leading-snug">{contractor.name}</h3>
              <span className="flex items-center space-x-0.5 text-xs text-[#0B1B2F] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#FFC21A] text-[#FFC21A]" />
                <span>{contractor.rating}</span>
              </span>
            </div>
            <p className="text-xs text-[#0B1B2F]/60 mt-0.5">{contractor.specialty} • {contractor.district}, {contractor.state}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportContractorWorks}
              className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-[#0B1B2F] bg-[#FF7A00] rounded hover:bg-[#e66e00] transition-colors cursor-pointer shadow-xs"
              title="Download all works for this contractor as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Works ({contractorProjects.length})</span>
              <span className="sm:hidden">Export ({contractorProjects.length})</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#0B1B2F]/50 hover:text-[#0B1B2F] rounded transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs">
          {/* Key Metrics */}
          <div className="border border-[#E6EAF0] rounded p-3 grid grid-cols-2 lg:grid-cols-4 gap-2 text-left bg-[#FAF7F2]/40">
            <div>
              <span className="block text-[10px] text-[#0B1B2F]/60 uppercase">Total Works</span>
              <span className="text-base font-bold text-[#0B1B2F]">{contractor.totalProjects}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#0B1B2F]/60 uppercase">10-Yr Done</span>
              <span className="text-base font-bold text-[#1E9E6A]">{contractor.completedProjects}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#0B1B2F]/60 uppercase">Active / Plan</span>
              <span className="text-base font-bold text-[#0B1B2F]">{contractor.ongoingProjects + contractor.plannedProjects}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#0B1B2F]/60 uppercase">Total Value</span>
              <span className="text-base font-bold text-[#0B1B2F]">{formatRupee(contractor.totalValue, { compact: true })}</span>
            </div>
          </div>

          {/* Constituencies & MLAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#0B1B2F]/60 tracking-wider mb-1.5">
                Constituencies
              </span>
              <div className="text-[#0B1B2F]/80 leading-relaxed">
                {contractor.constituencies.join(', ')}
              </div>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#0B1B2F]/60 tracking-wider mb-1.5">
                Associated MLAs
              </span>
              <div className="flex flex-wrap gap-1">
                {contractor.mlas.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectMlaName && onSelectMlaName(m)}
                    className="text-[#0B1B2F] hover:text-[#FF7A00] hover:underline font-medium cursor-pointer"
                  >
                    {m}{i < contractor.mlas.length - 1 ? ',' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Portfolio */}
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#E6EAF0]">
              <span className="text-[10px] uppercase font-bold text-[#0B1B2F]/60 tracking-wider">
                Works Portfolio ({filteredProjects.length})
              </span>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
                {(['all', 'Planned', 'In Progress', 'Completed'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-medium transition-colors cursor-pointer ${
                      activeTab === tab ? 'text-[#FF7A00] font-bold underline' : 'text-[#0B1B2F]/50 hover:text-[#0B1B2F]'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'Completed' ? '10-Yr Done' : tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#E6EAF0] rounded divide-y divide-[#E6EAF0] max-h-64 overflow-y-auto">
              {filteredProjects.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject && onSelectProject(p)}
                  className="p-3 hover:bg-[#FAF7F2] cursor-pointer flex flex-wrap items-start justify-between gap-3 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[#0B1B2F] line-clamp-1">{p.title}</p>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      <span>{p.category}</span> • <span>{p.assemblyConstituency}</span> • <span>Awarded: {formatDate(p.dateAwarded)}</span>
                      {p.status === 'Planned' && p.tenderStage && <span> • <strong className="text-indigo-600">{p.tenderStage}</strong></span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-slate-900">{formatRupee(p.sanctionedCost)}</span>
                    <span className={`block text-[10px] font-medium ${
                      p.status === 'Completed' ? 'text-emerald-700' : p.status === 'Planned' ? 'text-indigo-700' : 'text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 rounded hover:bg-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
