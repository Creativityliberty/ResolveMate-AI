import React, { useState } from 'react';

const CreateScenario: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "Panne Serveur Critique",
    difficulty: "Extrême",
    priority: "P1 - Critique",
    context: "Le client subit une interruption de service totale sur son e-commerce en plein Black Friday.",
    tags: ["Panne", "B2B", "Crise"],
    ticketDetails: {
        id: "#T-9982",
        type: "Incident Technique",
        channel: "Téléphone",
        sla: "1h"
    },
    personaType: "Explosif",
    personaName: "Directeur IT",
    aggressiveness: 90,
    confusion: 20,
    triggers: "Ne supporte pas d'être mis en attente. Déteste le jargon 'on fait au mieux'.",
    history: "Client depuis 3 ans. A déjà eu 2 pannes majeures cette année. Menace de partir chez AWS."
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // --- Step 1: Context ---
  const renderStep1 = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-surface-card rounded-xl shadow-sm border border-slate-200 dark:border-white/5 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">info</span>
          </div>
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">Informations du Ticket</h3>
        </div>
        <div className="space-y-6">
          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-white text-sm font-bold mb-2">Titre du Scénario</p>
            <input 
              className="w-full h-14 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark px-4 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </label>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white text-sm font-bold mb-2">Difficulté Émotionnelle</p>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-surface-dark p-1 rounded-xl">
                {['Facile', 'Moyenne', 'Extrême'].map((level) => (
                  <button 
                    key={level}
                    onClick={() => setFormData({...formData, difficulty: level})}
                    className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                      formData.difficulty === level 
                      ? 'bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-black/5' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/5'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white text-sm font-bold mb-2">Priorité Ticket</p>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full h-[46px] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark pl-4 pr-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer"
              >
                <option>P3 - Basse</option>
                <option>P2 - Normale</option>
                <option>P1 - Critique</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Step 2: Ticket Details ---
  const renderStep2 = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-surface-card rounded-xl shadow-sm border border-slate-200 dark:border-white/5 p-6 md:p-8">
        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Détails Techniques</h3>
        <div className="grid grid-cols-2 gap-6">
            <label className="flex flex-col w-full">
                <span className="text-slate-900 dark:text-white text-sm font-bold mb-2">ID Ticket</span>
                <input className="w-full h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark px-4 text-slate-900 dark:text-white" value={formData.ticketDetails.id} onChange={(e) => setFormData({...formData, ticketDetails: {...formData.ticketDetails, id: e.target.value}})} />
            </label>
            <label className="flex flex-col w-full">
                <span className="text-slate-900 dark:text-white text-sm font-bold mb-2">Canal</span>
                <select className="w-full h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark px-4 text-slate-900 dark:text-white">
                    <option>Téléphone</option>
                    <option>Chat Live</option>
                    <option>Email</option>
                </select>
            </label>
        </div>
        <label className="flex flex-col w-full mt-6">
          <p className="text-slate-900 dark:text-white text-sm font-bold mb-2">Description du problème (Contexte pour l'Agent)</p>
          <textarea 
            className="w-full min-h-[120px] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark p-4 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            value={formData.context}
            onChange={(e) => setFormData({...formData, context: e.target.value})}
          ></textarea>
        </label>
      </div>
    </div>
  );

  // --- Step 3: Interlocutor ---
  const renderStep3 = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-surface-card rounded-xl shadow-sm border border-slate-200 dark:border-white/5 p-6 md:p-8">
        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Profil Client</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'Explosif', icon: '🤬', desc: 'Hurle, insulte, aucune écoute.' },
            { id: 'Bavard', icon: '🗣️', desc: 'Raconte sa vie, digresse tout le temps.' },
            { id: 'Menaçant', icon: '⚖️', desc: 'Menace de procès ou de partir à la concurrence.' },
            { id: 'Perdu', icon: '😵', desc: 'Ne comprend rien à la technique, confus.' }
          ].map((persona) => (
            <button 
              key={persona.id}
              onClick={() => setFormData({...formData, personaType: persona.id})}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all text-center gap-2 hover:shadow-md
                ${formData.personaType === persona.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:border-primary/50'}`}
            >
              <div className="text-3xl">{persona.icon}</div>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">Le {persona.id}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{persona.desc}</p>
            </button>
          ))}
        </div>

        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-bold">Niveau d'Agressivité</label>
                <input className="w-full h-2 bg-slate-200 dark:bg-surface-highlight rounded-lg appearance-none cursor-pointer accent-primary" type="range" value={formData.aggressiveness} onChange={(e) => setFormData({...formData, aggressiveness: parseInt(e.target.value)})} />
            </div>
            <label className="flex flex-col w-full">
              <p className="text-slate-900 dark:text-white text-sm font-bold mb-2">Déclencheurs (Ce qui l'énerve)</p>
              <textarea className="w-full h-24 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark p-3 text-sm text-slate-900 dark:text-white focus:border-primary outline-none" value={formData.triggers} onChange={(e) => setFormData({...formData, triggers: e.target.value})}></textarea>
            </label>
        </div>
      </div>
    </div>
  );

  // --- Step 4: Review ---
  const renderStep4 = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-surface-card rounded-xl shadow-sm border border-slate-200 dark:border-white/5 p-6 md:p-8">
        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Récapitulatif de la Simulation</h3>
        
        <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                <p className="text-red-600 dark:text-red-400 text-xs font-bold uppercase">Situation</p>
                <p className="text-slate-900 dark:text-white font-bold">{formData.title}</p>
                <p className="text-slate-500 dark:text-slate-300 text-sm">{formData.priority}</p>
            </div>
            <div className="flex-1 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                <p className="text-orange-600 dark:text-orange-400 text-xs font-bold uppercase">Client</p>
                <p className="text-slate-900 dark:text-white font-bold">{formData.personaName}</p>
                <p className="text-slate-500 dark:text-slate-300 text-sm">Profil: {formData.personaType}</p>
            </div>
        </div>

        <div className="bg-slate-50 dark:bg-surface-highlight/30 p-4 rounded-xl">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-2">Contexte pour l'IA</p>
            <p className="text-slate-900 dark:text-white text-sm italic">
                "Vous jouez le rôle d'un client {formData.personaType.toLowerCase()} avec un niveau d'agressivité de {formData.aggressiveness}%. Votre historique : {formData.history}. Vos déclencheurs : {formData.triggers}."
            </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight">
            {step === 4 ? "Prêt à lancer ?" : "Créer un Ticket"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-2">
            Configurez une situation de crise sur mesure.
          </p>
        </div>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl h-12 px-6 bg-slate-100 dark:bg-surface-highlight text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200">
            Annuler
        </button>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex border-b border-slate-200 dark:border-white/10">
          {['Général', 'Détails Ticket', 'Client', 'Validation'].map((label, index) => {
            const stepNum = index + 1;
            return (
              <button key={stepNum} onClick={() => setStep(stepNum)} className={`flex-1 pb-4 text-sm font-bold border-b-2 ${step === stepNum ? 'border-primary text-primary' : 'border-transparent text-slate-500'}`}>
                {label}
              </button>
            );
          })}
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex justify-end gap-4 mt-4">
            {step > 1 && <button onClick={prevStep} className="px-6 py-3 rounded-xl bg-white dark:bg-surface-card border border-slate-200 dark:border-white/10 font-bold text-slate-900 dark:text-white">Précédent</button>}
            <button onClick={step === 4 ? onBack : nextStep} className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-teal-600">
              {step === 4 ? "Publier le Ticket" : "Suivant"}
            </button>
          </div>
        </div>
        
        {/* Preview Sidebar */}
        <div className="lg:col-span-4 sticky top-24 h-fit space-y-4">
            <div className="bg-white dark:bg-surface-card rounded-2xl shadow-lg border border-slate-200 dark:border-white/5 p-6">
                <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-4">Aperçu du Ticket</h4>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl">🤬</div>
                    <div>
                        <p className="font-bold text-slate-900 dark:text-white">Ticket {formData.ticketDetails.id}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{formData.title}</p>
                    </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-surface-highlight/20 p-3 rounded-lg">
                    <p><strong>Client:</strong> {formData.personaType}</p>
                    <p><strong>Canal:</strong> {formData.ticketDetails.channel}</p>
                    <p><strong>Priorité:</strong> <span className="text-red-500 font-bold">{formData.priority}</span></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateScenario;