import React from 'react';

const History: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-8 flex flex-col gap-8 overflow-y-auto">
      {/* Page Heading & Intro */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Historique des Négociations</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
            Retrouvez toutes vos sessions passées, analysez vos scores et accédez aux rapports détaillés pour progresser.
          </p>
        </div>
        <button 
          onClick={() => setPage('scenarios')}
          className="hidden sm:flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold leading-normal shadow-lg shadow-blue-500/20"
        >
          <span className="truncate">Nouvelle Session</span>
        </button>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white dark:bg-surface-card border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Total Sessions</p>
            <span className="material-symbols-outlined text-primary">folder_open</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">42</p>
            <span className="inline-flex items-center text-emerald-600 text-xs font-bold bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +5%
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white dark:bg-surface-card border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Score Moyen</p>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">78<span className="text-lg text-slate-500 font-medium">/100</span></p>
            <span className="inline-flex items-center text-emerald-600 text-xs font-bold bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +2 pts
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white dark:bg-surface-card border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Temps de Pratique</p>
            <span className="material-symbols-outlined text-primary">timer</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">12h 30m</p>
            <span className="inline-flex items-center text-emerald-600 text-xs font-bold bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +15%
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white dark:bg-surface-card p-2 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="flex flex-1 w-full lg:w-auto gap-2">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full pl-10 pr-4 h-12 rounded-xl bg-background-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/20 text-sm text-slate-900 dark:text-white placeholder-slate-400" placeholder="Rechercher par scénario, persona..." type="text"/>
          </div>
          <div className="relative hidden sm:block w-48">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">calendar_month</span>
            <input className="w-full pl-10 pr-4 h-12 rounded-xl bg-background-light dark:bg-surface-dark border-none focus:ring-2 focus:ring-primary/20 text-sm text-slate-900 dark:text-white placeholder-slate-400" placeholder="Filtrer par date" type="text"/>
          </div>
        </div>
        <div className="flex gap-2 px-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 whitespace-nowrap transition-transform active:scale-95">
            Tout voir
          </button>
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-background-light dark:bg-surface-dark hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 text-sm font-medium whitespace-nowrap transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Terminé
          </button>
          <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-background-light dark:bg-surface-dark hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 text-sm font-medium whitespace-nowrap transition-colors">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> En cours
          </button>
        </div>
      </div>

      {/* Timeline / List Content */}
      <div className="flex flex-col gap-8 pb-8">
        {/* Group: Cette semaine */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 pl-2">
            <span className="h-px w-8 bg-slate-200 dark:bg-white/10"></span>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Cette semaine</h3>
            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10"></span>
          </div>

          {/* Card 1 */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-white dark:bg-surface-card border border-slate-200 dark:border-white/5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">handshake</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-surface-card p-1 rounded-full">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center" title="Terminé">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">check</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wide">Difficile</span>
                <span className="text-slate-400 text-xs">Aujourd'hui, 14:30</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold truncate">Négociation Salariale - Profil Senior</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1">
                <span className="font-medium text-primary">Persona:</span> Michel (Directeur RH, Profil Agressif) • Durée: 45m
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
              <div className="text-right flex flex-col items-end">
                <span className="text-slate-400 text-xs font-medium uppercase">Score Global</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">92</span>
                  <span className="text-sm text-slate-500 font-medium">/100</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-primary text-sm font-bold hover:underline decoration-2 underline-offset-4">
                Voir le rapport <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-white dark:bg-surface-card border border-slate-200 dark:border-white/5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center text-orange-500">
                <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-surface-card p-1 rounded-full">
                <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center" title="En cours">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-sm">hourglass_top</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wide">Intermédiaire</span>
                <span className="text-slate-400 text-xs">Mardi, 09:15</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold truncate">Achat Immobilier - T3 Centre Ville</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1">
                <span className="font-medium text-primary">Persona:</span> Sophie (Vendeuse, Profil Émotif) • Durée: 15m (En cours)
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
              <div className="text-right flex flex-col items-end opacity-50">
                <span className="text-slate-400 text-xs font-medium uppercase">Score Actuel</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">--</span>
                  <span className="text-sm text-slate-500 font-medium">/100</span>
                </div>
              </div>
              <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors w-full md:w-auto">
                Reprendre
              </button>
            </div>
          </div>
        </div>

        {/* Group: Mois dernier */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 pl-2">
            <span className="h-px w-8 bg-slate-200 dark:bg-white/10"></span>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Octobre 2023</h3>
            <span className="h-px flex-1 bg-slate-200 dark:bg-white/10"></span>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-white dark:bg-surface-card border border-slate-200 dark:border-white/5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-center justify-center text-emerald-600">
                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-surface-card p-1 rounded-full">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center" title="Terminé">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">check</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-xs font-bold uppercase tracking-wide">Facile</span>
                <span className="text-slate-400 text-xs">28 Oct, 11:00</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold truncate">Renégociation Contrat Fournisseur</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1">
                <span className="font-medium text-primary">Persona:</span> Jean-Paul (Commercial, Profil Coopératif) • Durée: 25m
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
              <div className="text-right flex flex-col items-end">
                <span className="text-slate-400 text-xs font-medium uppercase">Score Global</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">88</span>
                  <span className="text-sm text-slate-500 font-medium">/100</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-primary text-sm font-bold hover:underline decoration-2 underline-offset-4">
                Voir le rapport <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center py-8">
        <button className="flex items-center justify-center h-12 px-8 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-card text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
          Charger plus de sessions
        </button>
      </div>
    </div>
  );
};

export default History;
