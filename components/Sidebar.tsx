import React from 'react';

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Tableau de Bord' },
    { id: 'scenarios', icon: 'confirmation_number', label: 'Tickets' },
    { id: 'history', icon: 'history', label: 'Historique' },
    { id: 'profile', icon: 'settings', label: 'Paramètres' },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-surface-dark border-r border-white/5 transition-transform duration-300 transform 
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
    lg:translate-x-0 lg:static lg:flex lg:flex-col lg:justify-between lg:shrink-0
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col gap-8 p-6 h-full">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-2 rounded-xl">
            <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold leading-tight">ResolveMate</h1>
            <p className="text-slate-400 text-xs font-medium">Customer Support Dojo</p>
          </div>
          <button 
            className="lg:hidden ml-auto text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setIsMobileOpen(false);
              }}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group w-full text-left
                ${currentPage === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className={`material-symbols-outlined ${currentPage !== item.id && 'group-hover:scale-110'} transition-transform`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-primary" 
              style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=11')" }}
            ></div>
            <div>
              <p className="text-sm font-bold text-white">Sophie Durand</p>
              <p className="text-xs text-primary">Team Lead Support</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;