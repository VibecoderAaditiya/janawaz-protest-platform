import React, { useState } from 'react';
import { 
  X, 
  Users, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Send, 
  Download, 
  Sparkles, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChannelDetailModal = () => {
  const { 
    selectedCommunity, 
    setSelectedCommunity, 
    toggleJoinCommunity, 
    sendChatMessage, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'resources' | 'rules'
  const [chatInput, setChatInput] = useState('');

  if (!selectedCommunity) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(selectedCommunity.id, chatInput);
    setChatInput('');
  };

  const handleDownloadResource = (title) => {
    showToast(`Accessing document: "${title}"`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Banner */}
        <div className="relative h-36 sm:h-44 w-full bg-slate-950 shrink-0">
          <img
            src={selectedCommunity.banner}
            alt={selectedCommunity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedCommunity(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Row */}
        <div className="px-6 relative -mt-8 flex items-end justify-between gap-4 pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-end gap-3.5">
            <img
              src={selectedCommunity.avatar}
              alt={selectedCommunity.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-900 bg-slate-800 shadow-xl"
            />
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                {selectedCommunity.name}
              </h2>
              <span className="text-xs font-semibold text-brand-400">
                {selectedCommunity.handle}
              </span>
            </div>
          </div>

          <button
            onClick={() => toggleJoinCommunity(selectedCommunity.id)}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md ${
              selectedCommunity.isJoined
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30'
            }`}
          >
            {selectedCommunity.isJoined ? 'Member ✓' : 'Join Channel'}
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800/80 shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'chat'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Channel Discussion ({selectedCommunity.chatMessages?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'resources'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Legal & Campaign Files ({selectedCommunity.resources?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'rules'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ground Rules</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
          
          {/* TAB 1: Chat Discussion */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full justify-between space-y-4">
              
              {/* Message History */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {selectedCommunity.chatMessages?.map(msg => (
                  <div key={msg.id} className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-slate-200">{msg.sender}</span>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Share a message or update in this channel..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-500 text-white p-2.5 rounded-xl transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

          {/* TAB 2: Resources & Documents */}
          {activeTab === 'resources' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Movement Guides & Legal Toolkits
              </h4>
              <div className="space-y-2.5">
                {selectedCommunity.resources?.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-200">{res.title}</h5>
                        <span className="text-[10px] text-slate-400">{res.type}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadResource(res.title)}
                      className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Access</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Rules & Ethics */}
          {activeTab === 'rules' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Non-Violent Direct Action Guidelines
              </h4>
              <div className="space-y-2">
                {selectedCommunity.rules?.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
