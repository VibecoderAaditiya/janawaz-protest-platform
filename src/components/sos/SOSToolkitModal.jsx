import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  PhoneCall, 
  BookOpen, 
  CheckSquare, 
  Copy, 
  Shield, 
  AlertTriangle, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SOSToolkitModal = () => {
  const { 
    isSOSOpen, 
    setIsSOSOpen, 
    sosData, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('emergency'); // 'emergency' | 'rights' | 'checklist'
  const [expandedCardId, setExpandedCardId] = useState(null);

  if (!isSOSOpen) return null;

  const handleCopyPhone = (number, name) => {
    navigator.clipboard?.writeText(number);
    showToast(`Copied ${name} contact number: ${number}`, 'success');
  };

  const toggleCard = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-red-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Activist SOS & Legal Rights Hub</h2>
              <p className="text-[11px] text-red-100 font-medium">India Legal Defense & Emergency Protocols</p>
            </div>
          </div>

          <button
            onClick={() => setIsSOSOpen(false)}
            className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'emergency'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency Legal Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('rights')}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'rights'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Know Your Rights (CrPC/BNSS)</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'checklist'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Ground Safety Checklist</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          
          {/* TAB 1: Emergency Contacts */}
          {activeTab === 'emergency' && (
            <div className="space-y-3">
              <div className="bg-red-950/30 border border-red-500/30 p-3 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>Tap any phone number to copy or dial instantly. These organizations provide emergency legal defense & medical aid.</span>
              </div>

              <div className="space-y-2">
                {sosData.emergencyContacts.map((contact, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-100 text-xs">{contact.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{contact.state}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">{contact.hours}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-xl font-bold transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{contact.phone}</span>
                      </a>
                      <button
                        onClick={() => handleCopyPhone(contact.phone, contact.name)}
                        className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
                        title="Copy Number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Legal Flashcards */}
          {activeTab === 'rights' && (
            <div className="space-y-3">
              <p className="text-slate-400 text-xs">
                Essential legal rights under Indian Constitutional and Criminal Law (Article 19, 20, 21, CrPC & BNSS).
              </p>

              <div className="space-y-2.5">
                {sosData.legalFlashcards.map(card => {
                  const isExpanded = expandedCardId === card.id;

                  return (
                    <div
                      key={card.id}
                      onClick={() => toggleCard(card.id)}
                      className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-100 text-xs flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-brand-400" />
                          <span>{card.title}</span>
                        </h4>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <p className="text-xs text-slate-300 font-medium">
                        {card.summary}
                      </p>

                      {isExpanded && (
                        <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5 animate-in fade-in">
                          <p className="leading-relaxed whitespace-pre-line text-slate-300">
                            {card.details}
                          </p>
                          <div className="inline-block bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">
                            Ref: {card.statute}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Safety Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                Ground Preparation & Digital Hygiene
              </h4>

              <div className="space-y-2.5">
                {sosData.safetyChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-slate-400 text-xs">
          <span>JanAwaz Legal Aid Support Desk</span>
          <button
            onClick={() => setIsSOSOpen(false)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-1.5 rounded-xl transition-colors"
          >
            Close Toolkit
          </button>
        </div>

      </div>
    </div>
  );
};
