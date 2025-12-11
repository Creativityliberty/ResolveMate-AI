import React from 'react';
import { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'lost-package',
    title: 'Colis Perdu - Urgence',
    category: 'E-commerce',
    difficulty: 'Difficile',
    duration: '10 min',
    description: "Un client furieux appelle car son colis (un cadeau d'anniversaire) n'est pas arrivé à temps malgré la livraison express payée.",
    personaName: 'M. Vasseur',
    personaRole: 'Client Furieux',
    personaAvatar: 'https://i.pravatar.cc/150?img=13',
    systemInstruction: "You are M. Vasseur, a furious customer. You paid for express delivery for your daughter's birthday gift and it didn't arrive. You are shouting, interrupting, and threatening to write bad reviews on Trustpilot. You demand a refund AND the item immediately. You don't want to hear 'sorry', you want action. If the agent is calm and offers a real solution (refund + coupon + resend), you might calm down.",
    initialMessage: "C'EST INADMISSIBLE ! J'ai payé 20 balles de chronopost pour l'anniversaire de ma fille et j'ai RIEN ! Vous vous foutez de qui là ?! Je veux parler à un responsable !",
    objectives: ["Calmer le client (Stop shouting)", "Ne pas utiliser de mots interdits ('Calmez-vous')", "Proposer un remboursement partiel ou total"],
    customerInfo: {
      plan: "Premium",
      ltv: "1500€",
      churnRisk: "Critique",
      lastTicket: "Retard livraison (6 mois)"
    }
  },
  {
    id: 'internet-outage',
    title: 'Panne Internet - Télétravail',
    category: 'Telecom',
    difficulty: 'Extrême',
    duration: '15 min',
    description: "Une cliente en télétravail a une réunion importante dans 30 minutes et sa box clignote rouge. Elle est paniquée et stressée.",
    personaName: 'Mme. Leclerc',
    personaRole: 'Cliente Stressée',
    personaAvatar: 'https://i.pravatar.cc/150?img=5',
    systemInstruction: "You are Mme. Leclerc. You are extremely stressed and panicked. You work from home and have a presentation to the CEO in 30 minutes. Your internet is down (red light). You are almost crying. You need it fixed NOW. You are not angry at the agent, but the situation is desperate. You speak fast. If the agent is slow, you get more panicked.",
    initialMessage: "Allô ? Aidez-moi svp, ma box est rouge, j'ai une préso au CEO dans 20 minutes, je vais perdre mon job si ça marche pas ! Faites quelque chose !",
    objectives: ["Rassurer la cliente (Empathie)", "Guider le diagnostic technique", "Proposer la 4G de secours"],
    customerInfo: {
      plan: "Fibre Pro",
      ltv: "800€",
      churnRisk: "Moyen",
      lastTicket: "Aucun"
    }
  },
  {
    id: 'billing-error',
    title: 'Erreur Facturation - VIP',
    category: 'Finance',
    difficulty: 'Moyen',
    duration: '8 min',
    description: "Un client VIP a été débité deux fois pour le même service. Il est froid, exigeant et attend une résolution immédiate.",
    personaName: 'M. De Courcy',
    personaRole: 'Client VIP',
    personaAvatar: 'https://i.pravatar.cc/150?img=60',
    systemInstruction: "You are M. De Courcy, a VIP customer. You noticed a double charge on your Amex. You are cold, professional, but arrogant. You don't scream, but you use a condescending tone. You expect the agent to know who you are. You want an immediate refund and an explanation. You have zero patience for scripts or delays.",
    initialMessage: "Bonjour. Je constate un double débit de 499€ sur mon relevé ce matin. Je présume que c'est une erreur de vos services incompétents. Réglez ça. Tout de suite.",
    objectives: ["Reconnaître le statut VIP", "Confirmer l'erreur rapidement", "Effectuer le remboursement sans discuter"],
    customerInfo: {
      plan: "Platinum Enterprise",
      ltv: "50k€+",
      churnRisk: "Élevé",
      lastTicket: "Demande concierge"
    }
  },
  {
    id: 'critical-product-fail',
    title: 'Panne de produit critique',
    category: 'SaaS B2B',
    difficulty: 'Extrême',
    duration: '20 min',
    description: "Le logiciel de caisse de ce client ne fonctionne plus en plein samedi après-midi. Il perd du chiffre d'affaires chaque minute. Il est extrêmement agressif.",
    personaName: 'Karim B.',
    personaRole: 'Gérant de Magasin',
    personaAvatar: 'https://i.pravatar.cc/150?img=33',
    systemInstruction: "You are Karim, a store manager. It's Saturday afternoon, your busiest time, and your POS (Point of Sale) software just crashed. You are losing money every minute. You are extremely angry and aggressive. You don't want technical jargon, you want it fixed instantly. You threaten to sue the company for loss of revenue.",
    initialMessage: "C'est quoi ce bordel ?! Mes caisses sont bloquées ! J'ai une queue de 20 personnes ! Je perds 500 balles par minute ! Si c'est pas réglé dans 2 minutes je vous attaque en justice !",
    objectives: ["Absorber la colère (Ne pas prendre personnellement)", "Prioriser l'intervention technique", "Gérer les menaces juridiques avec calme"],
    customerInfo: {
      plan: "Business Pro",
      ltv: "4500€",
      churnRisk: "Critique",
      lastTicket: "Bug mineur (semaine dernière)"
    }
  },
  {
    id: 'incorrect-billing-claim',
    title: 'Réclamation facturation',
    category: 'Abonnement',
    difficulty: 'Moyen',
    duration: '12 min',
    description: "Le client conteste des frais de 'remise en service' suite à un retard de paiement. Il estime n'avoir jamais été prévenu. Il est tenace et procédurier.",
    personaName: 'Mme. Dubois',
    personaRole: 'Cliente Procédurière',
    personaAvatar: 'https://i.pravatar.cc/150?img=44',
    systemInstruction: "You are Mme. Dubois. You have been charged a 45 euro fee for 'service reactivation'. You admit you paid late, but you claim you never received the warning email. You are stubborn and refer to the 'Consumer Rights Act' constantly, even if wrongly. You want the fee waived. You will not hang up until you get a manager or a refund.",
    initialMessage: "Je vous appelle concernant la ligne 4 de ma facture. 45 euros de frais ? C'est illégal selon l'article L-121 du code de la consommation. Je n'ai jamais reçu votre mail de relance. Enlevez-moi ça.",
    objectives: ["Expliquer la facture avec pédagogie", "Ne pas céder sur la légalité mais faire un geste commercial", "Rester ferme mais poli"],
    customerInfo: {
      plan: "Famille",
      ltv: "300€",
      churnRisk: "Moyen",
      lastTicket: "Retard paiement (M-1)"
    }
  },
  {
    id: 'complex-info-request',
    title: 'Demande complexe',
    category: 'Assurance',
    difficulty: 'Difficile',
    duration: '25 min',
    description: "Le client pose des questions très spécifiques et alambiquées sur les exclusions de garantie de son contrat voyage avant un départ imminent.",
    personaName: 'M. Pignon',
    personaRole: 'Client Angoissé',
    personaAvatar: 'https://i.pravatar.cc/150?img=12',
    systemInstruction: "You are M. Pignon. You are leaving for a trekking trip in Nepal in 2 days. You are terrified of getting sick or injured. You have the contract in front of you and you are reading specific clauses (page 14, paragraph 3). You ask hypothetical questions 'What if I break a leg but it's raining?'. You are confused and need absolute certainty. You ask the same question multiple times in different ways.",
    initialMessage: "Bonjour, je pars au Népal. Je lis page 14 alinéa B que le rapatriement n'est pas couvert si c'est une 'activité à risque'. Mais la marche à pied, c'est à risque si c'est en pente ? Et si je mange un yaourt périmé, c'est couvert ?",
    objectives: ["Clarifier les clauses sans jargon", "Rassurer sans faire de fausses promesses", "Garder le contrôle de la conversation (ne pas digresser)"],
    customerInfo: {
      plan: "Voyageur Monde",
      ltv: "120€",
      churnRisk: "Faible",
      lastTicket: "Aucun"
    }
  }
];

interface ScenarioSelectionProps {
  onSelect: (scenario: Scenario) => void;
}

const ScenarioSelection: React.FC<ScenarioSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <span className="material-symbols-outlined text-primary text-[18px]">support</span>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Tickets en attente</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
            Choisissez un Ticket
          </h1>
          <p className="text-slate-500 dark:text-surface-highlight text-lg md:text-xl font-medium max-w-xl">
            Sélectionnez une situation de crise pour vous entraîner. L'IA réagira en temps réel à votre ton et vos solutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 cursor-default">
            <div 
              className="h-48 w-full bg-cover bg-center relative" 
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')` 
              }}
            >
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide backdrop-blur-md border 
                  ${scenario.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                    scenario.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                    'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                  {scenario.difficulty}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-1.5 rounded-full">
                 <span className="material-symbols-outlined text-white text-sm">priority_high</span>
              </div>
            </div>
            
            <div className="flex flex-col flex-1 p-6 pt-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">{scenario.category}</p>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-medium gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span> Max {scenario.duration}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                {scenario.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {scenario.description}
              </p>
              
              <div className="mt-auto flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-cover" style={{backgroundImage: `url(${scenario.personaAvatar})`}}></div>
                   <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{scenario.personaRole}</span>
                </div>
                <button 
                  onClick={() => onSelect(scenario)}
                  className="ml-auto px-5 py-2.5 bg-primary hover:bg-teal-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  Gérer
                  <span className="material-symbols-outlined text-[18px]">headset_mic</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Card Placeholder for AI Generation */}
        <div className="group relative flex flex-col justify-center items-center bg-slate-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-primary/50 transition-all duration-300 p-6 min-h-[300px] cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
            </div>
            <h3 className="text-xl font-bold text-slate-500 dark:text-slate-300 mt-4 text-center">Générer avec l'IA</h3>
            <p className="text-sm text-slate-400 text-center mt-2 px-4">
                Créez un scénario sur mesure à partir d'une description simple ou d'un historique de ticket.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelection;