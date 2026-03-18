"use client";

import React, { useState, useEffect } from 'react';
import { 
  Upload, FileText, Database, ShieldCheck, CheckCircle2, 
  AlertCircle, ChevronRight, Search, Activity, Cpu, 
  Layers, ExternalLink, Code2, Copy, Zap, Info, Sun, Moon
} from 'lucide-react';

// --- MOCK DATA ---
const CLINICAL_NOTE = `CHIEF COMPLAINT: Chronic right knee pain.
HISTORY OF PRESENT ILLNESS: The patient is a 68-year-old male with long-standing Grade 4 Osteoarthritis of the right knee. Pain is refractory to conservative management including NSAIDs and intra-articular steroid injections.

ASSESSMENT/PLAN:
1. Primary Osteoarthritis of the right knee (ICD-10 M19.9).
2. Scheduled for Total Knee Arthroplasty (CPT 27447).
3. Patient cleared for surgery by cardiology regarding hypertension.`;

const FHIR_BUNDLE = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    {
      resource: {
        resourceType: "Patient",
        id: "pat-001",
        name: [{ family: "Hendrix", given: ["James"] }]
      }
    },
    {
      resource: {
        resourceType: "Condition",
        code: {
          coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: "M19.9", display: "Osteoarthritis" }]
        }
      }
    },
    {
      resource: {
        resourceType: "Procedure",
        code: {
          coding: [{ system: "http://www.ama-assn.org/go/cpt", code: "27447", display: "Total Knee Arthroplasty" }]
        }
      }
    }
  ]
};

// --- COMPONENTS ---

const TPADashboard = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">TPA Claims Adjudication</h1>
      <p className="text-slate-500 dark:text-slate-400 transition-colors">Real-time incoming FHIR claims queue and AI automated adjudication</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">Auto-Adjudication Rate</div>
        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">94.2%</div>
        <div className="text-sm text-emerald-500 dark:text-emerald-400 mt-2 flex items-center gap-1"><Zap size={14} /> +2.1% from last month</div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">Pending Manual Review</div>
        <div className="text-3xl font-black text-amber-500 dark:text-amber-400">12</div>
        <div className="text-sm text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">Average time in queue: 45m</div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">AI Cost Savings</div>
        <div className="text-3xl font-black text-blue-600 dark:text-blue-400">$1.4M</div>
        <div className="text-sm text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">YTD 2026</div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 transition-colors">
        Live Claims Queue
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 transition-colors">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
            <tr>
              <th className="px-6 py-3 font-medium">Claim ID</th>
              <th className="px-6 py-3 font-medium">Provider</th>
              <th className="px-6 py-3 font-medium">Diagnosis / Procedure</th>
              <th className="px-6 py-3 font-medium">Billed Amount</th>
              <th className="px-6 py-3 font-medium">AI Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            <tr className="bg-emerald-50/30 dark:bg-emerald-900/20 transition-colors">
              <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white">CLM-8892</td>
              <td className="px-6 py-4">Hendrixx Orthopedics</td>
              <td className="px-6 py-4">M19.9 / 27447</td>
              <td className="px-6 py-4">$42,500.00</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold text-xs transition-colors">
                  <CheckCircle2 size={12} /> Auto-Approved
                </span>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80">
              <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white">CLM-8891</td>
              <td className="px-6 py-4">City General Hospital</td>
              <td className="px-6 py-4">J45.9 / 99214</td>
              <td className="px-6 py-4">$250.00</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold text-xs transition-colors">
                  <CheckCircle2 size={12} /> Auto-Approved
                </span>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80">
              <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white">CLM-8890</td>
              <td className="px-6 py-4">Valley Cardiology</td>
              <td className="px-6 py-4">I50.9 / 93000</td>
              <td className="px-6 py-4">$1,200.00</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-semibold text-xs transition-colors">
                  <AlertCircle size={12} /> Pending Review
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const StepIndicator = ({ step }: { step: number }) => (
  <div className="flex items-center justify-center space-x-4 mb-12">
    {[1, 2, 3].map((s) => (
      <React.Fragment key={s}>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
          step >= s 
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
            : 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
        }`}>
          {step > s ? <CheckCircle2 size={20} /> : <span>{s}</span>}
        </div>
        {s < 3 && <div className={`w-20 h-0.5 transition-colors ${step > s ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`} />}
      </React.Fragment>
    ))}
  </div>
);

export default function NormalIceMVP() {
  const [role, setRole] = useState<'provider' | 'tpa'>('provider');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFhir, setShowFhir] = useState(false);
  const [isAdjudicating, setIsAdjudicating] = useState(false);
  const [fixApplied, setFixApplied] = useState(false);
  const [fileName, setFileName] = useState('Patient_Discharge_Summary_0326.pdf');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Simulation: Upload Flow
  const handleUpload = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
    setIsProcessing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setStep(2);
        }, 800);
      }
    }, 100);
  };

  // Simulation: TPA Adjudication
  const handleAdjudicate = () => {
    setIsAdjudicating(true);
    setTimeout(() => {
      setIsAdjudicating(false);
      setStep(4); // Success screen
    }, 3200);
  };

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
      {/* Navbar */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-4 flex justify-between items-center sticky top-0 z-50 transition-colors">
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
            <Activity className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Normal<span className="text-emerald-600 dark:text-emerald-400">Ice</span> AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl transition-colors">
            <button 
              onClick={() => setRole('provider')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${role === 'provider' ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Provider View
            </button>
            <button 
              onClick={() => setRole('tpa')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${role === 'tpa' ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              TPA Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-6">
        {role === 'provider' ? (
          <>
            <StepIndicator step={step} />

            {/* STEP 1: UPLOAD */}
            {step === 1 && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors">Ingest Clinical Data</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">Upload unstructured PDFs, EHR exports, or medical images for AI normalization.</p>
                </div>
                
                {!isProcessing ? (
                  <label 
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-20 flex flex-col items-center justify-center bg-white dark:bg-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all cursor-pointer group w-full"
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleUpload} 
                      accept=".pdf,.jpg,.jpeg,.png,.json,.txt"
                    />
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-6 rounded-full text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform mb-6">
                      <Upload size={48} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Drop Patient Discharge Summary</h3>
                    <p className="text-slate-400 dark:text-slate-500">Accepts PDF, JPG, FHIR, HL7 v2</p>
                    <div className="mt-8 px-6 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-full font-medium transition-colors hover:bg-slate-800 dark:hover:bg-slate-600">Select File</div>
                  </label>
                ) : (
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-slate-100 dark:border-slate-700 text-center transition-colors">
                    <Cpu className="mx-auto text-emerald-600 dark:text-emerald-400 animate-pulse mb-6" size={48} />
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">LayoutLMv3 Scanning...</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">OCR Context Extraction & Entity Linking in progress</p>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300 ease-out" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-4 text-sm font-mono text-slate-400 dark:text-slate-500">Processing: {fileName}</div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: EXTRACTION */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">AI Extraction & FHIR Mapping</h2>
                    <p className="text-slate-500 dark:text-slate-400 transition-colors">Multimodal normalization of unstructured text.</p>
                  </div>
                  <button 
                    onClick={() => setStep(3)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Proceed to Billing AI <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Source Document */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-colors">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center transition-colors">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <FileText size={18} className="text-slate-400 dark:text-slate-500" /> Source: Clinical Note
                      </span>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="p-8 font-serif leading-relaxed text-lg text-slate-800 dark:text-slate-200 whitespace-pre-wrap h-[400px] overflow-y-auto">
                      {CLINICAL_NOTE.split('\n').map((line, i) => (
                        <p key={i} className="mb-4">
                          {line.split(' ').map((word, j) => {
                            if (word.includes("Osteoarthritis")) return <span key={j} className="bg-yellow-100 dark:bg-yellow-900/30 border-b-2 border-yellow-400 dark:border-yellow-600 px-1 rounded-sm cursor-help" title="Extracted Entity: Condition">{word} </span>;
                            if (word.includes("Arthroplasty")) return <span key={j} className="bg-blue-100 dark:bg-blue-900/30 border-b-2 border-blue-400 dark:border-blue-600 px-1 rounded-sm cursor-help" title="Extracted Entity: Procedure">{word} </span>;
                            return word + " ";
                          })}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Right: AI Output (Now supports Light/Dark mode instead of hardcoded dark) */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
                    <div className="bg-slate-100 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center transition-colors">
                      <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <Database size={16} /> JSON_NORMALIZATION_ENGINE
                      </span>
                      <button onClick={() => setShowFhir(true)} className="text-xs bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-500/20 transition-all">
                        View FHIR Bundle
                      </button>
                    </div>
                    <div className="p-8 font-mono text-sm overflow-y-auto h-[400px]">
                      <div className="space-y-6">
                        <div className="border-l-2 border-emerald-400 dark:border-emerald-500/30 pl-4 py-1">
                          <div className="text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-2">
                            <ShieldCheck size={14} /> Entity Identified: M19.9
                            <Info size={12} className="text-slate-400 dark:text-slate-500 cursor-pointer" title="Linked to Page 1, Para 2" />
                          </div>
                          <div className="text-slate-900 dark:text-white text-lg font-bold">Primary Osteoarthritis</div>
                          <div className="text-slate-500 dark:text-slate-400">ICD-10-CM Mapping: [Verified 99.8%]</div>
                        </div>
                        
                        <div className="border-l-2 border-blue-400 dark:border-blue-500/30 pl-4 py-1">
                          <div className="text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-2">
                            <Layers size={14} /> Entity Identified: 27447
                            <Info size={12} className="text-slate-400 dark:text-slate-500 cursor-pointer" title="Linked to Page 1, Para 3" />
                          </div>
                          <div className="text-slate-900 dark:text-white text-lg font-bold">Total Knee Arthroplasty</div>
                          <div className="text-slate-500 dark:text-slate-400">CPT/HCPCS Mapping: [Verified 98.4%]</div>
                        </div>

                        <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-4 py-1 animate-pulse">
                          <div className="text-slate-400 dark:text-slate-500 mb-1">Scanning for secondary codes...</div>
                          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mt-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: RECONCILIATION */}
            {step === 3 && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">Revenue Reconciliation Scrubber</h2>
                  <p className="text-slate-500 dark:text-slate-400 transition-colors">AI-driven medical necessity & compliance check.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl transition-colors">
                  {!fixApplied ? (
                    <div className="space-y-6">
                      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 flex items-start gap-4 transition-colors">
                        <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0" size={24} />
                        <div>
                          <h4 className="text-amber-900 dark:text-amber-400 font-bold text-lg">CO-11 Denial Risk Detected</h4>
                          <p className="text-amber-800 dark:text-amber-200/80 mt-1">
                            Billed CPT procedure <span className="font-mono font-bold">27447</span> does not match the ICD-10 diagnosis 
                            <span className="font-mono font-bold"> I10</span> (Hypertension) for medical necessity in this claim context.
                          </p>
                          <div className="mt-4 flex gap-3">
                            <button 
                              onClick={() => setFixApplied(true)}
                              className="bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-700 dark:hover:bg-amber-400 transition-all shadow-sm"
                            >
                              <Zap size={16} /> AI Auto-Fix
                            </button>
                            <button className="text-amber-700 dark:text-amber-500 px-4 py-2 font-medium hover:underline">Ignore Warning</button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 opacity-50">
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 transition-colors">
                          <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">Billed Amount</div>
                          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">$42,500.00</div>
                        </div>
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 transition-colors">
                          <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">Payer ID</div>
                          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">TPA-GLOBAL-88</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-6 flex items-start gap-4 animate-in slide-in-from-top-4 transition-colors">
                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-500 shrink-0" size={24} />
                        <div>
                          <h4 className="text-emerald-900 dark:text-emerald-400 font-bold text-lg">AI Validation Success</h4>
                          <p className="text-emerald-800 dark:text-emerald-200/80 mt-1">
                            Claim updated: Mapped CPT <span className="font-mono font-bold">27447</span> to primary diagnosis 
                            <span className="font-mono font-bold"> M19.9</span> (Osteoarthritis). Medical necessity confirmed.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center py-6">
                        {!isAdjudicating ? (
                          <button 
                            onClick={handleAdjudicate}
                            className="bg-slate-900 dark:bg-emerald-600 text-white px-12 py-5 rounded-2xl font-extrabold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                          >
                            Submit to TPA & Auto-Adjudicate <Activity size={24} className="text-emerald-400 dark:text-white" />
                          </button>
                        ) : (
                          <div className="text-center">
                            <div className="inline-block relative">
                              <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 border-t-emerald-500 dark:border-t-emerald-500 rounded-full animate-spin" />
                              <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mt-6 text-slate-900 dark:text-white">Final Adjudication in Progress...</h3>
                            <p className="text-slate-500 dark:text-slate-400">Running TPA Rules Engine & Contract Terms</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-700">
                <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-16 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden transition-colors">
                  <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner transition-colors">
                    <ShieldCheck size={48} />
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 transition-colors">Claim Adjudicated</h1>
                  <div className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full font-bold text-sm mb-8 transition-colors">
                    GUARANTEE OF PAYMENT (GOP) ISSUED
                  </div>
                  
                  <div className="space-y-4 mb-10 text-left bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl transition-colors">
                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 transition-colors">
                      <span className="text-slate-500 dark:text-slate-400">Adjudication Result</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">Approved</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 transition-colors">
                      <span className="text-slate-500 dark:text-slate-400">Turnaround Time</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">3.2 Seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Approval Hash</span>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500 truncate w-32">0x7f3e...a21b</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.location.reload()}
                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg"
                  >
                    Start New Session
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <TPADashboard />
        )}
      </main>

      {/* FHIR MODAL */}
      {showFhir && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 transition-all">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in scale-in-95 border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center transition-colors">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Code2 className="text-emerald-600 dark:text-emerald-400" /> FHIR R4 Resource Bundle
              </h3>
              <button onClick={() => setShowFhir(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                ✕
              </button>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-950 max-h-[500px] overflow-y-auto transition-colors">
              <pre className="text-sm font-mono text-slate-800 dark:text-slate-300 leading-relaxed">
                {JSON.stringify(FHIR_BUNDLE, null, 2)}
              </pre>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 transition-colors">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Copy size={16} /> Copy JSON
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all">
                <ExternalLink size={16} /> Export to EHR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}