'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { ExportModal } from './ExportModal';
import { Dataset } from '@/lib/types';
import { getDataset } from '@/lib/store';

interface AppShellProps {
  children: (props: { 
    dataset: Dataset; 
    setDataset: React.Dispatch<React.SetStateAction<Dataset>>;
    onOpenExportModal: () => void;
  }) => React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [dataset, setDataset] = useState<Dataset>(() => getDataset());
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    setDataset(getDataset());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0B1B2F]">
      <Navbar
        onExportCsv={() => setIsExportModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {children({ 
          dataset, 
          setDataset,
          onOpenExportModal: () => setIsExportModalOpen(true)
        })}
      </main>

      <footer className="border-t border-[#E6EAF0] py-6 text-xs text-[#0B1B2F]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#0B1B2F]">Jawabdari</span>
            <span>•</span>
            <span>Official eSAKSHI & Municipal Corporation Data</span>
          </div>
          <div className="flex items-center space-x-4 text-[#0B1B2F]/60">
            <span>{dataset.metadata.totalProjects} Projects</span>
            <span>•</span>
            <span>{dataset.metadata.totalContractors} Contractors</span>
            <span>•</span>
            <span>14 Constituencies</span>
          </div>
        </div>
      </footer>

      <ExportModal
        dataset={dataset}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
