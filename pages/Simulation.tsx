import React, { useState, useEffect, useRef } from 'react';
import { Scenario, Message, AnalysisReport } from '../types';
import { startNegotiationChat, analyzeNegotiation, transcribeAudio, generateSpeech, playAudioBuffer } from '../services/geminiService';
import { Chat } from "@google/genai";

interface SimulationProps {
  scenario: Scenario;
  onFinish: (report: AnalysisReport, messages: Message[]) => void;
  onExit: () => void;
}

const Simulation: React.FC<SimulationProps> = ({ scenario, onFinish, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSession = useRef<Chat | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize Chat
  useEffect(() => {
    const initChat = async () => {
      try {
        chatSession.current = startNegotiationChat(scenario.systemInstruction);
        // Add initial message from scenario
        const initialMsg: Message = {
          id: 'init',
          role: 'model',
          text: scenario.initialMessage,
          timestamp: new Date()
        };
        setMessages([initialMsg]);
      } catch (error) {
        console.error("Failed to start chat", error);
      }
    };
    initChat();
  }, [scenario]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- AUDIO RECORDING HANDLERS ---
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleTranscribe(audioBlob);
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Impossible d'accéder au microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscribe = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        const text = await transcribeAudio(base64Audio, 'audio/webm');
        setInputValue(prev => prev + (prev ? ' ' : '') + text);
      };
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

  // --- TTS HANDLER ---

  const handlePlayMessage = async (text: string, messageId: string) => {
    if (isPlayingAudio) return; // Prevent overlapping playback
    setIsPlayingAudio(messageId);
    try {
      // Determine voice based on persona name/role (Simple heuristic)
      const voiceName = scenario.personaName.includes('Mme') || scenario.personaName.includes('Sophie') ? 'Kore' : 'Puck';
      const audioBuffer = await generateSpeech(text, voiceName);
      await playAudioBuffer(audioBuffer);
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setIsPlayingAudio(null);
    }
  };

  // --- CHAT LOGIC ---

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession.current) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await chatSession.current.sendMessage({ message: userMsg.text });
      const responseText = result.text;
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
      
      // Auto-play TTS for model messages could be enabled here
      // handlePlayMessage(responseText, modelMsg.id);

    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFinish = async () => {
    setIsAnalyzing(true);
    try {
      const report = await analyzeNegotiation(messages);
      onFinish(report, messages);
    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback for demo if API fails
      const mockReport: AnalysisReport = {
        csatScore: 2.5,
        empathyScore: 60,
        patienceScore: 70,
        solutionRelevance: 80,
        deEscalationScore: 50,
        keyMoments: [],
        feedback: { strengths: [], improvements: [], toneAnalysis: "N/A", forbiddenWordsUsed: [] },
        coachTip: "Erreur d'analyse. Veuillez réessayer."
      };
      onFinish(mockReport, messages);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background-light dark:bg-background-dark">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Évaluation Qualité en cours...</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Le superviseur IA analyse votre appel.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-[#0f1115] relative overflow-hidden font-sans">
      {/* Top Bar - Ticketing Style */}
      <header className="flex-none flex items-center justify-between border-b border-slate-200 dark:border-[#282839] px-6 py-3 bg-white dark:bg-[#1a1a2e] z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded">
                <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
                TICKET #492
             </div>
             <span className="h-5 w-px bg-slate-200 dark:bg-slate-700"></span>
             <h1 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-md">{scenario.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Live Chat</span>
             <span className="text-xs text-slate-400 ml-1">04:12</span>
          </div>
          <button 
            onClick={handleFinish}
            className="px-4 py-2 bg-primary hover:bg-teal-600 text-white font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Marquer comme Résolu
          </button>
          <button 
            onClick={onExit}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Quitter"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Customer Context (CRM Style) */}
        <aside className="hidden lg:flex flex-col w-80 border-r border-slate-200 dark:border-[#282839] bg-white dark:bg-[#1a1a2e] overflow-y-auto z-10">
          {/* Customer Profile Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
             <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-cover bg-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" style={{backgroundImage: `url(${scenario.personaAvatar})`}}></div>
                <div>
                   <h3 className="font-bold text-slate-900 dark:text-white text-lg">{scenario.personaName}</h3>
                   <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                      <span className="material-symbols-outlined text-[14px]">work</span>
                      {scenario.personaRole}
                   </div>
                   <div className="flex gap-1 mt-2">
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wide">
                        {scenario.customerInfo?.plan || 'Standard'}
                      </span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="p-6 flex flex-col gap-8">
             {/* Key Metrics */}
             {scenario.customerInfo && (
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Risque Churn</span>
                     <div className={`flex items-center gap-1 font-bold text-sm ${scenario.customerInfo.churnRisk === 'Critique' || scenario.customerInfo.churnRisk === 'Élevé' ? 'text-red-500' : 'text-yellow-500'}`}>
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        {scenario.customerInfo.churnRisk}
                     </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">LTV</span>
                     <div className="flex items-center gap-1 font-bold text-sm text-slate-700 dark:text-slate-200">
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        {scenario.customerInfo.ltv}
                     </div>
                  </div>
               </div>
             )}

             {/* Ticket Context */}
             <div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                   <span className="material-symbols-outlined text-primary text-[16px]">info</span>
                   Contexte Ticket
                </h4>
                <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                   {scenario.description}
                </div>
             </div>

             {/* Recent History */}
             <div>
                <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                   <span className="material-symbols-outlined text-slate-400 text-[16px]">history</span>
                   Dernières Interactions
                </h4>
                <div className="space-y-3 relative">
                   {/* Timeline line */}
                   <div className="absolute left-2.5 top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700"></div>
                   
                   <div className="relative pl-7">
                      <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-red-400 border-2 border-white dark:border-[#1a1a2e]"></div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Ticket #492 (Actuel)</p>
                      <p className="text-[10px] text-slate-400">Ouvert il y a 15 min</p>
                   </div>
                   <div className="relative pl-7 opacity-70">
                      <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-[#1a1a2e]"></div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{scenario.customerInfo?.lastTicket || 'Support général'}</p>
                      <p className="text-[10px] text-slate-400">Il y a 3 mois • Résolu</p>
                   </div>
                </div>
             </div>
             
             {/* Suggested Actions / Script */}
             <div className="mt-auto">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                      <span className="text-xs font-bold text-primary uppercase">Conseil IA</span>
                   </div>
                   <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      "Utilisez l'écoute active. Ne coupez pas la parole. Proposez une solution seulement après avoir validé l'émotion du client."
                   </p>
                </div>
             </div>
          </div>
        </aside>

        {/* Chat Area - Center */}
        <section className="flex-1 flex flex-col relative bg-slate-50 dark:bg-[#111318]">
          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-12 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div 
                  className={`size-10 rounded-full bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm mt-1`}
                  style={{ backgroundImage: msg.role === 'user' ? "url('https://i.pravatar.cc/150?img=11')" : `url(${scenario.personaAvatar})` }}
                ></div>
                
                <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 px-1">
                     <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{msg.role === 'user' ? 'Sophie (Vous)' : scenario.personaName}</span>
                     <span className="text-[10px] text-slate-400">{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                     
                     {/* Play Button for AI Messages */}
                     {msg.role === 'model' && (
                        <button 
                          onClick={() => handlePlayMessage(msg.text, msg.id)}
                          disabled={isPlayingAudio !== null}
                          className={`ml-2 p-1 rounded-full transition-colors ${isPlayingAudio === msg.id ? 'text-primary animate-pulse' : 'text-slate-400 hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                          title="Écouter le message"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isPlayingAudio === msg.id ? 'volume_up' : 'volume_mute'}
                          </span>
                        </button>
                     )}
                  </div>
                  <div 
                    className={`p-4 rounded-xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap
                      ${msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-[#1f2937] text-slate-800 dark:text-gray-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading / Typing Indicators */}
            {(isLoading || isTranscribing) && (
               <div className="flex gap-4 max-w-[80%] mr-auto">
                 <div 
                    className="size-10 rounded-full bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm mt-1"
                    style={{ backgroundImage: `url(${scenario.personaAvatar})` }}
                 ></div>
                 <div className="bg-white dark:bg-[#1f2937] p-4 rounded-xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 h-[52px]">
                    {isTranscribing ? (
                      <span className="text-xs text-slate-500 animate-pulse">Transcription audio...</span>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                      </>
                    )}
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white dark:bg-[#1a1a2e] border-t border-slate-200 dark:border-[#282839] relative z-20">
            <div className="max-w-4xl mx-auto relative">
               <div className="flex items-end gap-2 bg-slate-50 dark:bg-[#111318] p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all shadow-inner">
                  {/* Microphone Button */}
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 transition-colors rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                    title={isRecording ? "Arrêter l'enregistrement" : "Dicter une réponse"}
                  >
                     <span className="material-symbols-outlined">{isRecording ? 'mic_off' : 'mic'}</span>
                  </button>

                  <textarea
                    rows={1}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 resize-none py-2.5 max-h-32"
                    placeholder={isRecording ? "Écoute en cours..." : "Tapez ou dictez votre réponse..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading || isTranscribing}
                  />
                  <div className="flex items-center gap-1">
                     <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Réponse rapide (Macro)">
                        <span className="material-symbols-outlined">bolt</span>
                     </button>
                     <button 
                        onClick={handleSendMessage}
                        disabled={isLoading || isTranscribing || !inputValue.trim()}
                        className="p-2 bg-primary hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm"
                     >
                        <span className="material-symbols-outlined">send</span>
                     </button>
                  </div>
               </div>
               <div className="absolute -top-10 left-0 flex gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Suggestions :</span>
                  <button onClick={() => setInputValue("Je suis sincèrement désolé pour ce désagrément.")} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                     "Je suis sincèrement désolé..."
                  </button>
                  <button onClick={() => setInputValue("Je vérifie votre dossier immédiatement.")} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                     "Je vérifie votre dossier..."
                  </button>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Simulation;