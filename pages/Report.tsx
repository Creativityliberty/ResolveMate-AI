import React from 'react';
import { AnalysisReport } from '../types';

interface ReportProps {
  report: AnalysisReport;
  onClose: () => void;
}

const Report: React.FC<ReportProps> = ({ report, onClose }) => {
  // Helpers for CSAT stars
  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push(<span key={i} className="material-symbols-outlined text-yellow-400 text-3xl filled">star</span>);
      } else if (score >= i - 0.5) {
         stars.push(<span key={i} className="material-symbols-outlined text-yellow-400 text-3xl">star_half</span>);
      } else {
        stars.push(<span key={i} className="material-symbols-outlined text-slate-200 dark:text-slate-700 text-3xl">star</span>);
      }
    }
    return stars;
  };

  const metrics = [
    { name: 'Empathie', value: report.empathyScore, icon: 'favorite', color: 'text-rose-500', bg: 'bg-rose-500' },
    { name: 'Patience', value: report.patienceScore, icon: 'hourglass_bottom', color: 'text-blue-500', bg: 'bg-blue-500' },
    { name: 'Désamorçage', value: report.deEscalationScore, icon: 'soap', color: 'text-emerald-500', bg: 'bg-emerald-500' },
    { name: 'Pertinence', value: report.solutionRelevance, icon: 'check_circle', color: 'text-purple-500', bg: 'bg-purple-500' },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto bg-slate-50 dark:bg-background-dark">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 mb-4 text-slate-500 hover:text-primary transition-colors text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Retour au Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Rapport Qualité</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">Analyse détaillée de l'interaction #492</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white dark:bg-surface-card border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-white font-bold text-sm shadow-sm">
                Partager
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20">
                Exporter PDF
            </button>
        </div>
      </div>

      {/* Hero Score Card - CSAT */}
      <div className="bg-white dark:bg-surface-card rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[180px] text-slate-900 dark:text-white">reviews</span>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Score CSAT</span>
                <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">{report.csatScore}</div>
                <div className="flex gap-1 mb-2">
                    {renderStars(report.csatScore)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${report.csatScore >= 4 ? 'bg-green-100 text-green-700' : report.csatScore >= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {report.csatScore >= 4 ? 'Excellent' : report.csatScore >= 3 ? 'Moyen' : 'Critique'}
                </span>
            </div>
            <div className="h-px w-full md:w-px md:h-24 bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">L'avis du Superviseur IA</h3>
                <div className="bg-slate-50 dark:bg-black/20 p-5 rounded-2xl border border-slate-100 dark:border-white/5 relative">
                    <span className="absolute -top-3 left-6 px-2 bg-white dark:bg-surface-card text-2xl">❝</span>
                    <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed font-medium">
                        {report.coachTip}
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((item) => (
           <div key={item.name} className="bg-white dark:bg-surface-card rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-opacity-10 ${item.bg.replace('bg-', 'bg-opacity-10 ')} ${item.color}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">{item.name}</span>
             </div>
             <div className="flex items-baseline gap-2 mb-2">
               <span className="text-3xl font-black text-slate-900 dark:text-white">{item.value}%</span>
             </div>
             <div className="h-2 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden">
               <div className={`h-full rounded-full ${item.bg}`} style={{ width: `${item.value}%` }}></div>
             </div>
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Key Moments Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-card rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm p-6">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">history_edu</span>
               Moments Clés de l'Appel
             </h3>
             <div className="space-y-8 relative pl-4">
               {/* Vertical Line */}
               <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
               
               {report.keyMoments.map((moment, idx) => (
                 <div key={idx} className="relative pl-12 group">
                   <div className={`absolute left-0 top-0 size-8 rounded-full border-4 border-white dark:border-surface-card flex items-center justify-center z-10 shadow-sm
                     ${moment.type === 'positive' ? 'bg-green-500 text-white' :
                       moment.type === 'negative' ? 'bg-red-500 text-white' :
                       'bg-slate-400 text-white'}`}>
                     <span className="material-symbols-outlined text-[16px] font-bold">
                        {moment.type === 'positive' ? 'thumb_up' : moment.type === 'negative' ? 'priority_high' : 'remove'}
                     </span>
                   </div>
                   <div className="bg-slate-50 dark:bg-surface-highlight/10 p-4 rounded-xl border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-colors">
                     <div className="flex justify-between items-start mb-1">
                       <h4 className="font-bold text-slate-900 dark:text-white text-base">{moment.title}</h4>
                       <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">{moment.time}</span>
                     </div>
                     <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{moment.description}</p>
                   </div>
                 </div>
               ))}
             </div>
        </div>

        {/* Feedback & Tone Analysis */}
        <div className="flex flex-col gap-6">
          {/* Tone Analysis */}
          <div className="bg-white dark:bg-surface-card rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">graphic_eq</span>
                Analyse du Ton
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-surface-highlight/10 p-3 rounded-lg border border-slate-100 dark:border-white/5">
                {report.feedback.toneAnalysis}
            </p>
          </div>

          {/* Forbidden Words */}
          {report.feedback.forbiddenWordsUsed.length > 0 && (
             <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm p-6">
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined">block</span>
                    Mots Interdits Détectés
                </h3>
                <div className="flex flex-wrap gap-2">
                    {report.feedback.forbiddenWordsUsed.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-white dark:bg-black/20 border border-red-200 dark:border-red-900/30 rounded-full text-xs font-bold text-red-600 dark:text-red-400 line-through">
                            {word}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-3">Ces termes peuvent aggraver la frustration du client.</p>
             </div>
          )}

          {/* Strengths & Improvements */}
          <div className="bg-white dark:bg-surface-card rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm p-6 flex-1">
            <div className="mb-6">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                <span className="material-symbols-outlined text-lg">add_circle</span> Points Forts
              </h4>
              <ul className="space-y-2">
                {report.feedback.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                <span className="material-symbols-outlined text-lg">arrow_circle_up</span> Axes de Progrès
              </h4>
               <ul className="space-y-2">
                {report.feedback.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="w-1 h-1 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;