'use client';

import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, Users, HardHat, Filter } from 'lucide-react';
import { Dataset, Project } from '@/lib/types';
import { exportProjectsToCSV, exportMlasToCSV, exportContractorsToCSV } from '@/lib/store';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: Dataset;
  filteredProjects?: Project[];
  currentFiltersDesc?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  dataset,
  filteredProjects,
  currentFiltersDesc,
}) => {
  const [selectedMla, setSelectedMla] = useState<string>(dataset.mlas[0]?.name || '');

  if (!isOpen) return null;

  const activeProjects = filteredProjects || dataset.projects;
  const isFiltered = activeProjects.length !== dataset.projects.length;

  const handleExportFiltered = () => {
    const slug = currentFiltersDesc ? currentFiltersDesc.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'filtered';
    exportProjectsToCSV(activeProjects, `jawabdari_${slug}_${new Date().toISOString().split('T')[0]}.csv`);
    onClose();
  };

  const handleExportAll = () => {
    exportProjectsToCSV(dataset.projects, `jawabdari_all_projects_ludhiana_${new Date().toISOString().split('T')[0]}.csv`);
    onClose();
  };

  const handleExportSpecificMla = () => {
    if (!selectedMla) return;
    const mlaProjects = dataset.projects.filter(p => p.mla.toLowerCase() === selectedMla.toLowerCase());
    const mlaSlug = selectedMla.toLowerCase().replace(/[^a-z0-9]/g, '_');
    exportProjectsToCSV(mlaProjects, `jawabdari_mla_${mlaSlug}_works_${new Date().toISOString().split('T')[0]}.csv`);
    onClose();
  };

  const handleExportMlas = () => {
    exportMlasToCSV(dataset.mlas, `jawabdari_mlas_directory_${new Date().toISOString().split('T')[0]}.csv`);
    onClose();
  };

  const handleExportContractors = () => {
    exportContractorsToCSV(dataset.contractors, `jawabdari_contractors_directory_${new Date().toISOString().split('T')[0]}.csv`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-lg shadow-xl border border-[#E6EAF0] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6EAF0]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1B2F]">Export Public Data</h3>
              <p className="text-xs text-[#0B1B2F]/60">Download official MLALADS data in CSV / Excel format</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#0B1B2F]/50 hover:text-[#0B1B2F] rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Option 1: Current Filtered View (if applicable) */}
          {isFiltered && (
            <div className="p-3.5 rounded-lg border border-[#FF7A00]/30 bg-[#FF7A00]/5 flex items-center justify-between max-sm:flex-col max-sm:items-stretch gap-3">
              <div>
                <div className="flex items-center space-x-1.5 text-[#0B1B2F] font-semibold text-xs">
                  <Filter className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>Current Filtered View</span>
                </div>
                <p className="text-[11px] text-[#0B1B2F]/70 mt-0.5">
                  {currentFiltersDesc ? `${currentFiltersDesc} • ` : ''}{activeProjects.length} matching works
                </p>
              </div>
              <button
                onClick={handleExportFiltered}
                className="px-3 py-1.5 bg-[#FF7A00] hover:bg-[#e66e00] text-[#0B1B2F] font-semibold rounded text-xs transition-colors shadow-xs cursor-pointer shrink-0 flex items-center space-x-1 max-sm:w-full max-sm:justify-center"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export ({activeProjects.length})</span>
              </button>
            </div>
          )}

          {/* Option 2: Specific MLA's Works */}
          <div className="p-3.5 rounded-lg border border-[#E6EAF0] hover:border-[#0B1B2F]/30 transition-colors">
            <div className="flex items-center space-x-1.5 text-[#0B1B2F] font-semibold text-xs mb-1.5">
              <Users className="w-3.5 h-3.5 text-[#0B1B2F]/70" />
              <span>Export Works for a Specific MLA</span>
            </div>
            <p className="text-[11px] text-[#0B1B2F]/60 mb-2.5">
              Select an MLA to download their complete project allocations, tender stages, and payment history.
            </p>
            <div className="flex items-center max-sm:flex-col max-sm:items-stretch gap-2">
              <select
                value={selectedMla}
                onChange={(e) => setSelectedMla(e.target.value)}
                className="flex-1 text-xs p-2 border border-[#E6EAF0] rounded bg-white text-[#0B1B2F]"
              >
                {dataset.mlas.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.constituency}) — {m.totalProjects} works
                  </option>
                ))}
              </select>
              <button
                onClick={handleExportSpecificMla}
                className="px-3 py-2 bg-white hover:bg-[#FAF7F2] border border-[#E6EAF0] text-[#0B1B2F] font-semibold rounded text-xs transition-colors cursor-pointer shrink-0 flex items-center space-x-1 max-sm:w-full max-sm:justify-center"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Option 3: All Public Works */}
          <div className="p-3.5 rounded-lg border border-[#E6EAF0] hover:border-[#0B1B2F]/30 transition-colors flex items-center justify-between max-sm:flex-col max-sm:items-stretch gap-3">
            <div>
              <div className="flex items-center space-x-1.5 text-[#0B1B2F] font-semibold text-xs">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#0B1B2F]/70" />
                <span>All Ludhiana Public Works</span>
              </div>
              <p className="text-[11px] text-[#0B1B2F]/60 mt-0.5">
                Complete database of {dataset.projects.length} works (Past 10 Yrs, Ongoing, Planned)
              </p>
            </div>
            <button
              onClick={handleExportAll}
              className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#E6EAF0] text-[#0B1B2F] font-semibold rounded text-xs transition-colors cursor-pointer shrink-0 flex items-center space-x-1 max-sm:w-full max-sm:justify-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All</span>
            </button>
          </div>

          {/* Option 4: MLAs Directory */}
          <div className="p-3.5 rounded-lg border border-[#E6EAF0] hover:border-[#0B1B2F]/30 transition-colors flex items-center justify-between max-sm:flex-col max-sm:items-stretch gap-3">
            <div>
              <div className="flex items-center space-x-1.5 text-[#0B1B2F] font-semibold text-xs">
                <Users className="w-3.5 h-3.5 text-[#0B1B2F]/70" />
                <span>MLAs Directory Summary</span>
              </div>
              <p className="text-[11px] text-[#0B1B2F]/60 mt-0.5">
                All {dataset.mlas.length} MLAs with sanctioned funds, utilization %, and contacts
              </p>
            </div>
            <button
              onClick={handleExportMlas}
              className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#E6EAF0] text-[#0B1B2F] font-semibold rounded text-xs transition-colors cursor-pointer shrink-0 flex items-center space-x-1 max-sm:w-full max-sm:justify-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Option 5: Contractors Directory */}
          <div className="p-3.5 rounded-lg border border-[#E6EAF0] hover:border-[#0B1B2F]/30 transition-colors flex items-center justify-between max-sm:flex-col max-sm:items-stretch gap-3">
            <div>
              <div className="flex items-center space-x-1.5 text-[#0B1B2F] font-semibold text-xs">
                <HardHat className="w-3.5 h-3.5 text-[#0B1B2F]/70" />
                <span>Contractors Directory Summary</span>
              </div>
              <p className="text-[11px] text-[#0B1B2F]/60 mt-0.5">
                All {dataset.contractors.length} firms with specialties, ratings, and awarded contract values
              </p>
            </div>
            <button
              onClick={handleExportContractors}
              className="px-3 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#E6EAF0] text-[#0B1B2F] font-semibold rounded text-xs transition-colors cursor-pointer shrink-0 flex items-center space-x-1 max-sm:w-full max-sm:justify-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#E6EAF0] bg-[#FAF7F2]/60 flex items-center justify-between text-[11px] text-[#0B1B2F]/60">
          <span>Format: UTF-8 CSV (Excel / Google Sheets compatible)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-[#0B1B2F] hover:underline font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
