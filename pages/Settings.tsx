import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8 lg:px-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">Paramètres du compte</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Gérez vos informations personnelles et vos préférences d'application.</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white dark:bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-full w-24 h-24 ring-4 ring-slate-50 dark:ring-surface-highlight" 
                  style={{ backgroundImage: "url('https://picsum.photos/id/64/100/100')" }}
                ></div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alex Martin</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">alex.martin@example.com</p>
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Compte Actif
                </span>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                Supprimer
              </button>
              <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:bg-blue-600 transition-all hover:scale-[1.02]">
                Changer la photo
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="bg-white dark:bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2 rounded-lg bg-primary/10 text-primary material-symbols-outlined">badge</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Informations personnelles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prénom</label>
              <input className="w-full bg-slate-50 dark:bg-surface-highlight border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 transition-all" placeholder="Votre prénom" type="text" defaultValue="Alex"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nom</label>
              <input className="w-full bg-slate-50 dark:bg-surface-highlight border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 transition-all" placeholder="Votre nom" type="text" defaultValue="Martin"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <input className="w-full bg-slate-50 dark:bg-surface-highlight border-none rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 transition-all" placeholder="email@exemple.com" type="email" defaultValue="alex.martin@example.com"/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Poste</label>
              <input className="w-full bg-slate-50 dark:bg-surface-highlight border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 transition-all" placeholder="Votre poste actuel" type="text" defaultValue="Directeur Commercial"/>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Langue de l'interface</label>
              <div className="relative">
                <select className="w-full bg-slate-50 dark:bg-surface-highlight border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white appearance-none cursor-pointer">
                  <option value="fr">Français (France)</option>
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Preferences Section */}
        <div className="bg-white dark:bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 material-symbols-outlined">psychology</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Préférences IA</h3>
            </div>
            <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">Beta</span>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="font-medium text-sm text-slate-900 dark:text-white">Difficulté de Négociation</label>
                <span className="text-sm font-bold text-primary">Intermédiaire</span>
              </div>
              <input className="w-full h-2 bg-slate-200 dark:bg-surface-highlight rounded-lg appearance-none cursor-pointer accent-primary" max="100" min="1" type="range" defaultValue="65"/>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Débutant</span>
                <span>Expert</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-medium text-sm text-slate-900 dark:text-white">Personnalité par défaut de l'IA</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input defaultChecked className="peer sr-only" name="personality" type="radio"/>
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-surface-highlight peer-checked:border-primary peer-checked:bg-primary/5 transition-all text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary">handshake</span>
                    <span className="font-semibold text-sm">Collaborative</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input className="peer sr-only" name="personality" type="radio"/>
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-surface-highlight peer-checked:border-primary peer-checked:bg-primary/5 transition-all text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-orange-400">trending_up</span>
                    <span className="font-semibold text-sm">Compétitive</span>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input className="peer sr-only" name="personality" type="radio"/>
                  <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-surface-highlight peer-checked:border-primary peer-checked:bg-primary/5 transition-all text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-green-400">balance</span>
                    <span className="font-semibold text-sm">Analytique</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="bg-white dark:bg-surface-card rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2 rounded-lg bg-pink-500/10 text-pink-400 material-symbols-outlined">hub</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Intégrations CRM</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-surface-highlight border border-slate-200 dark:border-transparent gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                   <span className="text-blue-500 font-bold text-xl">S</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-900 dark:text-white">Salesforce</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Synchronisation des contacts et opportunités.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Connecté
                </div>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-lg transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-surface-highlight border border-slate-200 dark:border-transparent gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ff7a59] rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-900 dark:text-white">HubSpot</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Importation automatique des deals.</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-sm font-medium transition-all text-slate-900 dark:text-white">
                Connecter
              </button>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="sticky bottom-4 z-10 mt-4 flex justify-end gap-3 rounded-2xl bg-white/90 dark:bg-surface-highlight/90 p-4 shadow-lg backdrop-blur-md border border-slate-200 dark:border-white/5">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 font-semibold text-sm transition-colors">
            Annuler
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]">
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
