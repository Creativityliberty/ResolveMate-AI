import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Lun', value: 4.2 },
  { name: 'Mar', value: 4.5 },
  { name: 'Mer', value: 3.8 },
  { name: 'Jeu', value: 4.8 },
  { name: 'Ven', value: 4.6 },
  { name: 'Sam', value: 4.9 },
];

const Dashboard: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background-light dark:bg-background-dark">
      <header className="w-full px-6 py-8 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Bonjour, Sophie 👋</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">Prête à désamorcer quelques crises ? Les clients attendent.</p>
          </div>
          <button 
            onClick={() => setPage('create-scenario')}
            className="bg-surface-card hover:bg-surface-dark border border-white/10 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all text-sm font-semibold shadow-sm"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
            <span>Simuler un Incident</span>
          </button>
        </div>
      </header>

      <div className="flex-1 w-full px-6 lg:px-10 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-surface-card rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-slate-900 dark:text-white">confirmation_number</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Tickets Résolus</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">128</span>
                <span className="text-emerald-500 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded-md mb-1">+12 cette semaine</span>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-card rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-slate-900 dark:text-white">stars</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">CSAT Moyen</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">4.7</span>
                <span className="text-slate-400 text-lg font-bold mb-1">/5</span>
                <span className="text-emerald-500 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded-md mb-1">+0.2</span>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-card rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-slate-900 dark:text-white">favorite</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Score d'Empathie</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">92%</span>
                <span className="text-primary text-sm font-bold bg-primary/10 px-2 py-1 rounded-md mb-1">Top 5%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart */}
            <div className="lg:col-span-8 bg-white dark:bg-surface-card rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Satisfaction Client (CSAT)</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Évolution sur les 7 derniers jours</p>
                </div>
              </div>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181829', borderColor: '#333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#14b8a6" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="lg:col-span-4 bg-white dark:bg-surface-card rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-sm flex flex-col">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Badges de Support</h3>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                    <span className="material-symbols-outlined text-[20px]">self_improvement</span>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">Maître Zen</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">A gardé son calme face à 5 clients furieux</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                    <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">Pompier de Service</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">A désamorcé une crise critique (Risque Churn)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">Solution Express</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Problème résolu en moins de 5 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Scenario */}
          <div className="bg-white dark:bg-surface-card rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg flex flex-col md:flex-row">
            <div 
              className="md:w-1/3 h-48 md:h-auto bg-cover bg-center relative"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2071&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 text-white">
                 <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase mb-2 inline-block">Urgence</span>
              </div>
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Colis Perdu - Client Furieux</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                Ticket #4829. Monsieur Martin n'a pas reçu le cadeau d'anniversaire de sa fille. La livraison était garantie hier. Il menace de nous démolir sur les réseaux sociaux. Objectif : Désamorcer et proposer une solution compensatoire.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[16px]">timer</span> Max 10 min
                </div>
                <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                  <span className="material-symbols-outlined text-[16px]">warning</span> Risque Churn
                </div>
                <button 
                  onClick={() => setPage('scenarios')}
                  className="ml-auto px-6 py-2 bg-primary hover:bg-teal-600 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/25 flex items-center gap-2"
                >
                  Prendre l'appel
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;