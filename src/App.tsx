import React, { useState, useEffect } from 'react';
import { Smartphone, Nfc, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, History, ClipboardList, Map, Users, ArrowRight, LogOut, Lock, Clock, User, MapPin, Info, Play, Pause, CheckCircle2, HelpCircle, Mic, ArrowRightCircle } from 'lucide-react';

const Logo = () => (
  <div style={{
    width: '64px',
    height: '64px',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      width: '38px',
      height: '38px',
      border: '2px solid white',
      borderRadius: '50%'
    }} />
  </div>
);


const Header = ({ showLogo = true, showProfile = false, title, icon, sticky = false }: { showLogo?: boolean, showProfile?: boolean, title?: string, icon?: React.ReactNode, sticky?: boolean }) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number, code: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.2184&longitude=-1.5536&current=temperature_2m,weather_code');
        const data = await response.json();
        if (data && data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 1800000);
    return () => clearInterval(weatherTimer);
  }, []);

  const formattedDate = time.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const formattedTime = time.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun size={32} />;
    if (code >= 1 && code <= 3) return <Cloud size={32} />;
    if (code >= 51 && code <= 67) return <CloudRain size={32} />;
    if (code >= 80 && code <= 82) return <CloudRain size={32} />;
    if (code >= 71 && code <= 77) return <CloudSnow size={32} />;
    if (code >= 95) return <CloudLightning size={32} />;
    return <Cloud size={32} />;
  };

  return (
    <header className="responsive-container" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 'var(--space-md)',
      paddingBottom: 'var(--space-md)',
      width: '100%',
      position: sticky ? 'sticky' : 'absolute',
      top: 0,
      left: !sticky ? '50%' : 'auto',
      transform: !sticky ? 'translateX(-50%)' : 'none',
      zIndex: 20,
      backgroundColor: sticky ? 'var(--bg-color)' : 'transparent',
      borderBottom: sticky ? 'var(--border-width) solid var(--border-color)' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {showLogo && <Logo />}
        {showProfile && !title && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div style={{
              width: 'clamp(48px, 6vw, 80px)',
              height: 'clamp(48px, 6vw, 80px)',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              flexShrink: 0,
              border: '2px solid #000',
              filter: 'grayscale(100%) contrast(1.2)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop" 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h1 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: 0 }}>Léa</h1>
          </div>
        )}
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
             {icon ? React.cloneElement(icon as React.ReactElement, { size: 32 }) : <ClipboardList size={32} strokeWidth={2.5} />}
             <h1 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: 0 }}>{title}</h1>
          </div>
        )}
      </div>
      
      <div style={{
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'center',
        fontSize: 'var(--fs-sm)',
        fontWeight: 700
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
          {weather ? React.cloneElement(getWeatherIcon(weather.code) as React.ReactElement, { size: 24 }) : <Sun size={24} />}
          <span>{weather ? `${weather.temp}°` : '...'}</span>
        </div>
        <span style={{ textTransform: 'capitalize' }}>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>
    </header>
  );
};

const Onboarding = ({ onUnlock }: { onUnlock: () => void }) => {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-color)'
    }}>
      <Header />
      
      <div className="responsive-container" style={{ 
        textAlign: 'center', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 5,
        gap: 'var(--space-xl)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <p style={{
            fontSize: 'var(--fs-lg)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Salut ! Prêt à jardiner ?
          </p>
          <h1 style={{
            fontSize: 'var(--fs-3xl)',
            fontWeight: 800,
            margin: 0
          }}>
            Identifie-toi pour commencer
          </h1>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', width: '100%' }}>
            <div className="premium-card" onClick={onUnlock} style={{ width: '100%', padding: 'var(--space-md) var(--space-lg)' }}>
              <Nfc size={40} strokeWidth={2} />
              <span style={{ fontSize: 'var(--fs-xl)', fontWeight: 600 }}>
                Passer mon Badge
              </span>
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 500, margin: 0, textAlign: 'left' }}>
              Pose ton badge contre le capteur noir sur le flanc droit de la borne.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', width: '100%' }}>
            <div className="premium-card" onClick={onUnlock} style={{ width: '100%', padding: 'var(--space-md) var(--space-lg)' }}>
              <Smartphone size={40} strokeWidth={2} />
              <span style={{ fontSize: 'var(--fs-xl)', fontWeight: 600 }}>
                Détection mobile
              </span>
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 500, margin: 0, textAlign: 'left' }}>
              Appuie sur « Je suis au jardin » dans ton application pour déverrouiller la borne.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

const Transition = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-color)'
    }}>
      <Header />
      
      <div className="responsive-container" style={{ 
        textAlign: 'center', 
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-sm)'
      }}>
        <h1 style={{ fontSize: 'var(--fs-2xl)', margin: 0 }}>Connexion réussie !</h1>
        <p style={{ fontSize: 'var(--fs-lg)', fontWeight: 600, margin: 0 }}>Ravi de te revoir, Léa</p>
      </div>
    </main>
  );
};

const journalData = [
  {
    date: "Aujourd'hui",
    items: [
      { time: "15:32", title: "Soin des rosiers", author: "Moi", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: true }
    ]
  },
  {
    date: "Hier",
    items: [
      { time: "18:45", title: "Arrosage potager", author: "Léa", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: false },
      { time: "09:12", title: "Réparation clôture", author: "Marc.A", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: true }
    ]
  },
  {
    date: "Lundi 23 Février",
    items: [
      { time: "16:05", title: "Désherbage bac n°4", author: "Marie.T", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: false },
      { time: "10:21", title: "Semer Carottes", author: "Daniel.P", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: false }
    ]
  },
  {
    date: "Vendredi 20 Février",
    items: [
      { time: "14:30", title: "Taille des haies", author: "Sophie.L", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: true },
      { time: "11:15", title: "Nettoyage outils", author: "Thomas.V", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: false }
    ]
  },
  {
    date: "Jeudi 19 Février",
    items: [
      { time: "10:21", title: "Semer Carottes", author: "Daniel.P", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop", hasVoice: true }
    ]
  }
];

const planData = [
  { 
    id: "p1", 
    number: "1", 
    content: "Rosier", 
    lastActivityUser: "Mari.T", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop", 
    status: "Public" 
  },
  { 
    id: "p2", 
    number: "2", 
    content: "Actuellement vide", 
    lastActivityUser: "Daniel.P", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop", 
    status: "Public" 
  },
  { 
    id: "p3", 
    number: "3", 
    content: "Carottes", 
    lastActivityUser: "Marc.L", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop", 
    status: "Privé", 
    owner: "Marc.L" 
  },
  { 
    id: "p4", 
    number: "4", 
    content: "Tomates", 
    lastActivityUser: "Sophie.L", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop", 
    status: "Public" 
  },
  { 
    id: "p5", 
    number: "5", 
    content: "Désherbage requis", 
    lastActivityUser: "Thomas.V", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop", 
    status: "Privé", 
    owner: "Thomas.V" 
  }
];

const navItems = [
  {
    title: "Le Journal",
    description: "Ce qui a été fait et les conseils laissés par les autres jardiniers.",
    icon: <History size={32} />,
    id: "journal"
  },
  {
    title: "Les Missions",
    description: "Choisis ton activité du jour : semis, arrosage ou entretien.",
    icon: <ClipboardList size={32} />,
    id: "missions"
  },
  {
    title: "Le Plan",
    description: "Pour se repérer dans le jardin et localiser les outils ou les graines.",
    icon: <Map size={32} />,
    id: "plan"
  },
  {
    title: "La Communauté",
    description: "Écoute les conseils vocaux et suis les échanges des jardiniers sur l'appli.",
    icon: <Users size={32} />,
    id: "communaute"
  }
];

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'menu' | 'missions' | 'mission_detail' | 'mission_success' | 'voice_recording' | 'voice_review' | 'voice_success' | 'journal' | 'plan' | 'communaute'>('menu');
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedJournalIndex, setSelectedJournalIndex] = useState(0);
  const [playingJournalId, setPlayingJournalId] = useState<string | null>(null);
  const [successViewSelectedIndex, setSuccessViewSelectedIndex] = useState(0);
  const [reviewViewSelectedIndex, setReviewViewSelectedIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const myMissions = [
    { title: "Soin des rosiers", category: "Entretien", duration: "10min", id: "m1" }
  ];

  const allMissions = [
    { title: "Désherbage parcelle n°2", category: "Entretien", duration: "15min", user: "Non réservé", id: "m2" },
    { title: "Récolte fraises", category: "Entretien", duration: "15min", user: "Marie.T", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop", id: "m3" },
    { title: "Retourner le compost", category: "Entretien", duration: "30min", user: "Daniel.P", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop", id: "m4" }
  ];

  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(34);

  useEffect(() => {
    let timer: any;
    if (isPlayingVoice) {
      timer = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev <= 0) {
            setIsPlayingVoice(false);
            return 34;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setPlaybackTime(34);
    }
    return () => clearInterval(timer);
  }, [isPlayingVoice]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      // Don't reset duration here, we need it for review
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const handleBack = (e: Event) => {
      // Ensure we don't go back to login if we are in any dashboard view
      if (currentView === 'voice_success') {
        setCurrentView('missions');
      } else if (currentView === 'journal' || currentView === 'plan' || currentView === 'communaute') {
        setCurrentView('menu');
      } else if (currentView === 'voice_review') {
        setCurrentView('voice_recording');
      } else if (currentView === 'voice_recording') {
        setCurrentView('mission_success');
      } else if (currentView === 'mission_success') {
        setCurrentView('missions');
      } else if (currentView === 'mission_detail') {
        setCurrentView('missions');
      } else if (currentView === 'missions') {
        setCurrentView('menu');
      } else if (currentView === 'menu') {
        // Stay in menu, don't logout — but still prevent propagation
      }
      // Always prevent the event from bubbling up to App level
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('vibe-back', { cancelable: true }));
      }
    };

    window.addEventListener('vibe-back', handleBack, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('vibe-back', handleBack, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [currentView]);

  if (currentView === 'journal') {
    const focusableItems = journalData.flatMap(section => 
      section.items.map(item => ({ ...item, sectionDate: section.date }))
    );

    return (
      <main style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'var(--bg-color)', 
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <Header showLogo={false} title="Le Journal" icon={<History size={60} />} sticky={true} />
        
        <div className="responsive-container" style={{ 
          marginTop: 'var(--space-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
          width: '100%',
          zIndex: 5,
          paddingBottom: 'var(--space-xl)'
        }}>
          {journalData.map((section, sIdx) => (
              <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <h2 style={{ margin: 0 }}>{section.date}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {section.items.map((item, iIdx) => {
                    const globalIdx = focusableItems.findIndex(fi => fi.title === item.title && fi.time === item.time && fi.sectionDate === section.date);
                    const itemId = `${section.date}-${item.title}-${item.time}`;
                    const isFocused = globalIdx === selectedJournalIndex;
                    const isPlaying = playingJournalId === itemId;

                    return (
                      <div 
                        key={iIdx}
                        className="vibe-nav-item"
                        tabIndex={0}
                        onFocus={() => setSelectedJournalIndex(globalIdx)}
                        onClick={() => {
                          if (item.hasVoice) {
                            if (isPlaying) setPlayingJournalId(null);
                            else setPlayingJournalId(itemId);
                          }
                        }}
                        style={{ 
                          backgroundColor: isFocused ? 'var(--accent-bg)' : 'var(--bg-color)', 
                          border: 'var(--border-width) solid', 
                          borderColor: isFocused ? 'var(--border-color)' : '#ccc',
                          borderRadius: '8px', 
                          overflow: 'hidden',
                          display: 'flex',
                          boxShadow: isFocused ? '0 0 0 4px var(--border-color)' : 'none'
                        }}
                      >
                        <div style={{ padding: 'var(--space-md)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                            <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.time}</span>
                            <span style={{ fontSize: 'var(--fs-lg)', fontWeight: 700 }}>{item.title}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'center' }}>
                            <img src={item.avatar} alt="" style={{ width: 'clamp(32px, 4vw, 48px)', height: 'clamp(32px, 4vw, 48px)', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: 'var(--fs-base)', fontWeight: 600 }}>{item.author}</span>
                          </div>
                          {item.hasVoice && (
                            <div style={{ 
                              alignSelf: 'flex-start',
                              border: '1px solid #ccc', 
                              borderRadius: '4px', 
                              padding: '4px 8px', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              backgroundColor: '#fff'
                            }}>
                              <Mic size={14} />
                              <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>Note vocale ajoutée</span>
                            </div>
                          )}
                        </div>

                        {isFocused && item.hasVoice && (
                          <div style={{ 
                            width: 'clamp(200px, 25vw, 320px)', 
                            backgroundColor: 'var(--border-color)', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            padding: 'var(--space-md)',
                            gap: 'var(--space-sm)'
                          }}>
                            {!isPlaying ? (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xs)' }}>
                                <Play size={40} color="white" fill="white" />
                                <span style={{ color: 'white', fontSize: 'var(--fs-base)', fontWeight: 700 }}>Écouter</span>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', width: '100%' }}>
                                <Pause size={24} color="white" fill="white" />
                                <div style={{ flex: 1, display: 'flex', gap: '2px', alignItems: 'center', height: '24px' }}>
                                  {[10, 20, 15, 25, 32, 28, 32, 25, 15, 10, 6, 20, 30, 18, 12].map((h, i) => (
                                    <div key={i} className="voice-bar-animating" style={{ height: `${h * 0.75}px`, width: '3px', backgroundColor: '#fff', borderRadius: '2px' }} />
                                  ))}
                                </div>
                                <span style={{ color: 'white', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>0:34</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </main>
    );
  }

  if (currentView === 'plan') {
    return (
      <main style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'var(--bg-color)', 
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <Header showLogo={false} title="Le Plan" icon={<Map size={60} />} sticky={true} />
        
        <div className="responsive-container" style={{ 
          marginTop: 'var(--space-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
          width: '100%',
          zIndex: 5,
          paddingBottom: 'var(--space-xl)'
        }}>
          {planData.map((parcel, idx) => {
            const isFocused = idx === selectedPlanIndex;
            return (
              <div key={parcel.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <h2 style={{ margin: 0 }}>Parcelle n°{parcel.number}</h2>
                <div 
                  className="vibe-nav-item"
                  tabIndex={0}
                  onFocus={() => setSelectedPlanIndex(idx)}
                  style={{ 
                    backgroundColor: isFocused ? 'var(--accent-bg)' : 'var(--bg-color)', 
                    border: 'var(--border-width) solid', 
                    borderColor: isFocused ? 'var(--border-color)' : '#ccc',
                    borderRadius: '8px', 
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 'var(--space-md)',
                    gap: 'var(--space-sm)',
                    boxShadow: isFocused ? '0 0 0 4px var(--border-color)' : 'none'
                  }}
                >
                  <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 700 }}>{parcel.content}</div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ fontSize: 'var(--fs-base)', fontWeight: 500, color: 'var(--text-secondary)' }}>Dernière activité</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <img src={parcel.avatar} alt="" style={{ width: 'clamp(32px, 4vw, 40px)', height: 'clamp(32px, 4vw, 40px)', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: 'var(--fs-base)', fontWeight: 700 }}>{parcel.lastActivityUser}</span>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-xs)', 
                    padding: '8px 16px', 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    alignSelf: 'flex-start'
                  }}>
                    {parcel.status === 'Privé' ? <Lock size={16} style={{ color: '#666' }} /> : <Users size={16} />}
                    <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>{parcel.status}{parcel.owner ? ` : ${parcel.owner}` : ''}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  if (currentView === 'mission_detail') {
    return (
      <main style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Header showLogo={false} title="Les Missions" sticky={true} />
        
        <div className="responsive-container" style={{
          marginTop: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
          width: '100%',
          zIndex: 5,
          paddingBottom: 'var(--space-md)',
          flex: 1,
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', gap: 'var(--space-md)', width: '100%', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: '1 1 600px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  <h1 style={{ margin: 0 }}>Soin des rosiers</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                    <MapPin size={24} />
                    <span style={{ fontSize: 'var(--fs-lg)', fontWeight: 500 }}>Parcelle n°1</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #e6e6e6', borderRadius: '4px' }}>
                    <ClipboardList size={18} />
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>Entretien</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #e6e6e6', borderRadius: '4px' }}>
                    <Clock size={18} />
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>10min</span>
                  </div>
                </div>
              </div>

              <div style={{ 
                backgroundColor: 'var(--accent-bg)', 
                padding: 'var(--space-md)', 
                borderRadius: '8px', 
                display: 'flex', 
                gap: 'var(--space-sm)', 
                alignItems: 'flex-start' 
              }}>
                <div style={{ 
                  backgroundColor: '#808080', 
                  padding: '6px', 
                  borderRadius: '4px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Info size={18} color="white" />
                </div>
                <p style={{ fontSize: 'var(--fs-md)', fontWeight: 500, margin: 0, color: 'var(--text-primary)' }}>
                  Utiliser le spray au savon noir sur les feuilles de la parcelle n°4
                </p>
              </div>
            </div>

            <div style={{ flex: '1 1 300px', borderRadius: '8px', overflow: 'hidden', height: 'clamp(200px, 30vh, 280px)', border: '2px solid #e6e6e6' }}>
              <img 
                src="/rosier.png" 
                alt="Rose Garden" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
              />
            </div>
          </div>

          {/* Voice Note Section */}
          <div 
            className="vibe-nav-item"
            tabIndex={0}
            onClick={() => setIsPlayingVoice(!isPlayingVoice)}
            style={{ 
              backgroundColor: '#fff', 
              border: 'var(--border-width) solid #ccc', 
              borderRadius: '8px', 
              padding: 'var(--space-md)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'var(--space-sm)', 
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <div style={{ width: 'clamp(32px, 4vw, 48px)', height: 'clamp(32px, 4vw, 48px)', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f0f0f0', filter: 'grayscale(100%)' }}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop" alt="Daniel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 'var(--fs-lg)', fontWeight: 600 }}>Daniel.P</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-xs)', fontSize: 'var(--fs-xs)', fontWeight: 500 }}>
                <span>12/01/26</span>
                <span>16:03</span>
              </div>
            </div>
            <div style={{ 
              backgroundColor: isPlayingVoice ? 'var(--text-primary)' : '#808080', 
              height: '50px', 
              borderRadius: '4px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 'var(--space-md)'
            }}>
              {isPlayingVoice ? <Pause size={24} color="white" fill="white" /> : <Play size={24} color="white" fill="white" />}
              
              {isPlayingVoice && (
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '20px' }}>
                  {[10, 14, 22, 25, 32, 42, 29, 32, 29, 48, 32, 21, 28, 32, 32, 15, 6, 25, 35, 48, 20, 17, 12, 8].map((height, i, arr) => {
                    const progress = (34 - playbackTime) / 34;
                    const barProgress = i / arr.length;
                    const isFilled = barProgress <= progress;
                    
                    return (
                      <div 
                        key={i} 
                        style={{ 
                          width: '2px',
                          height: `${height * 0.4}px`,
                          backgroundColor: isFilled ? '#fff' : '#999',
                          borderRadius: '1px'
                        }} 
                      />
                    );
                  })}
                </div>
              )}

              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: '#fff', minWidth: '50px' }}>
                {isPlayingVoice ? `0:${playbackTime.toString().padStart(2, '0')}` : "0:34"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-sm)', width: '100%', justifyContent: 'flex-end', marginTop: 'auto' }}>
            <div className="vibe-nav-item vibe-dark-btn" tabIndex={0} onClick={() => setCurrentView('mission_success')} style={{ 
              backgroundColor: 'var(--text-primary)', 
              color: 'var(--bg-color)', 
              padding: '12px 20px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 'var(--space-xs)',
              border: '2px solid transparent'
            }}>
              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>Mission réussie</span>
              <CheckCircle2 size={16} />
            </div>
            <div className="vibe-nav-item" tabIndex={0} style={{ 
              backgroundColor: 'var(--bg-color)', 
              color: 'var(--text-primary)', 
              padding: '12px 20px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 'var(--space-xs)',
              border: '2px solid #ccc'
            }}>
              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>Besoin d'aide</span>
              <HelpCircle size={16} />
            </div>
          </div>
        </div>
      </main>
    );
  }


    if (currentView === 'mission_success') {
      return (
        <main style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Header showLogo={false} showProfile={false} title="Les Missions" sticky={true} />
          
          <div className="responsive-container" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-80px',
            zIndex: 5
          }}>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px 0' }}>La communauté te remercie !</p>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Mission terminé</h1>
            
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px', width: '360px' }}>
              <div 
                className="vibe-nav-item vibe-dark-btn" 
                tabIndex={0} 
                onFocus={() => setSuccessViewSelectedIndex(0)}
                onClick={() => setCurrentView('missions')} 
                style={{ 
                  backgroundColor: '#1a1a1a', 
                  color: 'white', 
                  padding: '16px 24px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '12px',
                  border: '2px solid transparent',
                  boxShadow: successViewSelectedIndex === 0 ? '0 0 0 4px #1a1a1a' : 'none'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Continuer</span>
                <ArrowRight size={20} />
              </div>
              <div 
                className="vibe-nav-item" 
                tabIndex={0} 
                onFocus={() => setSuccessViewSelectedIndex(1)}
                onClick={() => {
                  setRecordingDuration(0);
                  setIsRecording(false);
                  setCurrentView('voice_recording');
                }} 
                style={{ 
                  backgroundColor: successViewSelectedIndex === 1 ? '#e6e6e6' : '#fff', 
                  color: '#1a1a1a', 
                  padding: '16px 24px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '12px',
                  border: '2px solid #ccc',
                  boxShadow: successViewSelectedIndex === 1 ? '0 0 0 4px #1a1a1a' : 'none'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Enregistrer une note vocal</span>
                <Mic size={20} />
              </div>
            </div>
          </div>

            </main>
      );
    }


    if (currentView === 'voice_recording') {
      return (
        <main style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
          <Header showLogo={false} showProfile={false} title="Les Missions" sticky={true} />
          <div className="responsive-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-80px', zIndex: 5 }}>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px 0' }}>La communauté t'écoute</p>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
              {isRecording ? 'Enregistrement en cours...' : 'Prêt à enregistrer'}
            </h1>
            
            <div 
              className="vibe-nav-item"
              tabIndex={0}
              onClick={() => {
                if (!isRecording) {
                  setIsRecording(true);
                } else {
                  setIsRecording(false);
                  setCurrentView('voice_review');
                }
              }}
              style={{ 
                marginTop: '48px',
                backgroundColor: '#fff', 
                border: '2px solid #1a1a1a', 
                borderRadius: '8px', 
                padding: '24px 32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '32px',
                width: '600px',
                boxShadow: '0 0 0 4px #1a1a1a'
              }}
            >
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '32px' }}>
                {[10, 14, 22, 25, 32, 29, 32, 29, 20, 15, 6, 25, 35, 20, 17, 12, 8].map((height, i) => (
                  <div key={i} className={`voice-bar ${isRecording ? 'voice-bar-animating' : ''}`} style={{ height: `${height}px`, backgroundColor: '#1a1a1a', animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                {Math.floor(recordingDuration / 60)}:{String(recordingDuration % 60).padStart(2, '0')}
              </span>
            </div>
            
            <p style={{ marginTop: '24px', fontSize: '16px', color: '#666', maxWidth: '400px', textAlign: 'center' }}>
              {isRecording ? "Réappuie pour l'arrêter." : "Appuie pour enregistrer ton message."}
            </p>
          </div>

            </main>
      );
    }

    if (currentView === 'voice_review') {
      return (
        <main style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
          <Header showLogo={false} showProfile={false} title="Les Missions" sticky={true} />
          <div className="responsive-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-80px', zIndex: 5 }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Enregistrement terminé</h1>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: '4px 0 0 0' }}>Écouter votre note vocal avant de publié</p>
            
            <div 
              className="vibe-nav-item"
              tabIndex={0}
              onFocus={() => setReviewViewSelectedIndex(0)}
              style={{ 
                marginTop: '48px',
                backgroundColor: reviewViewSelectedIndex === 0 ? '#e6e6e6' : '#fff', 
                border: '2px solid #ccc', 
                borderRadius: '8px', 
                padding: '24px 32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '32px',
                width: '600px',
                boxShadow: reviewViewSelectedIndex === 0 ? '0 0 0 4px #1a1a1a' : 'none'
              }}
            >
              <Pause size={24} fill="#1a1a1a" />
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '32px' }}>
                {[10, 14, 22, 25, 32, 29, 32, 29, 20, 15, 6, 25, 35, 20, 17, 12, 8].map((height, i) => (
                  <div key={i} className="voice-bar" style={{ height: `${height}px`, backgroundColor: '#1a1a1a' }} />
                ))}
              </div>
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>
                {Math.floor(recordingDuration / 60)}:{String(recordingDuration % 60).padStart(2, '0')}
              </span>
            </div>

            <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '12px', width: '360px' }}>
              <div 
                className="vibe-nav-item vibe-dark-btn" 
                tabIndex={0} 
                onFocus={() => setReviewViewSelectedIndex(1)}
                onClick={() => setCurrentView('voice_success')} 
                style={{ 
                  backgroundColor: '#1a1a1a', 
                  color: 'white', 
                  padding: '16px 24px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '12px',
                  border: '2px solid transparent',
                  boxShadow: reviewViewSelectedIndex === 1 ? '0 0 0 4px #1a1a1a' : 'none'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Publié la note vocal</span>
                <ArrowRightCircle size={20} />
              </div>
              <div 
                className="vibe-nav-item" 
                tabIndex={0} 
                onFocus={() => setReviewViewSelectedIndex(2)}
                onClick={() => setCurrentView('mission_success')} 
                style={{ 
                  backgroundColor: reviewViewSelectedIndex === 2 ? '#e6e6e6' : '#fff', 
                  color: '#1a1a1a', 
                  padding: '16px 24px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '12px',
                  border: '2px solid #ccc',
                  boxShadow: reviewViewSelectedIndex === 2 ? '0 0 0 4px #1a1a1a' : 'none'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Annuler</span>
              </div>
            </div>
          </div>

            </main>
      );
    }

    if (currentView === 'voice_success') {
      return (
        <main style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
          <Header showLogo={false} showProfile={false} title="Les Missions" sticky={true} />
          <div className="responsive-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-80px', zIndex: 5 }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Ta note vocale à été publié</h1>
            <p style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: '8px 0 0 0' }}>Merci pour ton implication Léa</p>
            
            <div style={{ marginTop: '64px' }}>
              <div className="vibe-nav-item vibe-dark-btn" tabIndex={0} onClick={() => setCurrentView('missions')} style={{ 
                backgroundColor: '#1a1a1a', 
                color: 'white', 
                padding: '16px 32px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Retour aux missions</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

            </main>
      );
    }

  if (currentView === 'missions') {
    return (
      <main style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'var(--bg-color)', 
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <Header showLogo={false} title="Les Missions" icon={<ClipboardList size={60} />} sticky={true} />
        
        <div className="responsive-container" style={{ 
          marginTop: 'var(--space-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xl)',
          width: '100%',
          zIndex: 5,
          paddingBottom: 'var(--space-xl)'
        }}>
          {/* Mes missions section */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h2 style={{ margin: 0 }}>Mes missions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {myMissions.map((mission, idx) => {
                const isFocused = idx === selectedMissionIndex;
                return (
                  <div 
                    key={mission.id}
                    className="vibe-nav-item"
                    tabIndex={0}
                    onFocus={() => setSelectedMissionIndex(idx)}
                    onClick={() => {
                      if (mission.title === "Soin des rosiers") {
                        setCurrentView('mission_detail');
                      }
                    }}
                    style={{ 
                      backgroundColor: isFocused ? 'var(--accent-bg)' : 'var(--bg-color)', 
                      border: 'var(--border-width) solid', 
                      borderColor: isFocused ? 'var(--border-color)' : '#ccc',
                      borderRadius: '8px', 
                      padding: 'var(--space-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-sm)',
                      boxShadow: isFocused ? '0 0 0 4px var(--border-color)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 700 }}>{mission.title}</div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '4px 12px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', fontSize: 'var(--fs-xs)', fontWeight: 500 }}>
                        <ClipboardList size={14} /> {mission.category}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '4px 12px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', fontSize: 'var(--fs-xs)', fontWeight: 500 }}>
                        <Clock size={14} /> {mission.duration}
                      </div>
                    </div>
                    {isFocused && (
                      <div className="ouvrir-panel" style={{ width: 'clamp(80px, 15vw, 120px)' }}>
                        <ArrowRight size={24} />
                        <span className="ouvrir-text" style={{ fontSize: 'var(--fs-xs)' }}>Ouvrir</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Toutes les missions section */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h2 style={{ margin: 0 }}>Toutes les missions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {allMissions.map((mission, idx) => {
                const globalIdx = myMissions.length + idx;
                const isFocused = globalIdx === selectedMissionIndex;
                return (
                  <div 
                    key={mission.id}
                    className="vibe-nav-item"
                    tabIndex={0}
                    onFocus={() => setSelectedMissionIndex(globalIdx)}
                    style={{ 
                      backgroundColor: isFocused ? 'var(--accent-bg)' : 'var(--bg-color)', 
                      border: 'var(--border-width) solid', 
                      borderColor: isFocused ? 'var(--border-color)' : '#ccc',
                      borderRadius: '8px', 
                      padding: 'var(--space-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-sm)',
                      boxShadow: isFocused ? '0 0 0 4px var(--border-color)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                      <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 700 }}>{mission.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f0f0f0', overflow: 'hidden', border: '1px solid #ccc' }}>
                          {mission.avatar ? <img src={mission.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={16} style={{ margin: '4px' }} />}
                        </div>
                        <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>{mission.user}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '4px 12px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', fontSize: 'var(--fs-xs)', fontWeight: 500 }}>
                        <ClipboardList size={14} /> {mission.category}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '4px 12px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', fontSize: 'var(--fs-xs)', fontWeight: 500 }}>
                        <Clock size={14} /> {mission.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (currentView === 'communaute') {
    const allMessages = [
      { id: 1, section: 'today', sender: 'Moi', content: "Salut tout le monde ! J'ai désherbé la parcelle B ce matin. Attention, les limaces ont commencé à attaquer les salades, j'ai mis un peu de marc de café.", fromMe: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop' },
      { id: 2, section: 'today', sender: 'Marie.T', content: "Est-ce qu'on a encore du terreau de semis dans le casier 4 ? Je compte passer samedi pour les courgettes.", fromMe: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop' },
      { id: 3, section: 'today', sender: 'Nathan.L', content: "Regardez les premières fleurs sur les fraisiers ! 🍓 J'ai fait une photo, je la mets sur le groupe !", fromMe: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop', hasImage: true },
      { id: 4, section: 'today', sender: 'Moi', content: "Nathan, elles sont magnifiques ! Tu as utilisé quel engrais ?", fromMe: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop' },
      { id: 5, section: 'today', sender: 'Daniel.P', content: "Du beau soleil arrive ! passez une bonne journée", fromMe: false, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop' },
      { id: 6, section: 'today', sender: 'Sophie.L', content: "Je passe arroser en fin d'après-midi, quelqu'un a besoin d'un coup de main pour sa parcelle ?", fromMe: false, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop' },
      { id: 7, section: 'yesterday', sender: 'Daniel.P', content: '', fromMe: false, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop', isVoice: true },
      { id: 8, section: 'yesterday', sender: 'Thomas.V', content: "J'ai laissé les outils propres dans le cabanon. Bonne soirée !", fromMe: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop' },
    ];
    const todayMessages = allMessages.filter(m => m.section === 'today');
    const yesterdayMessages = allMessages.filter(m => m.section === 'yesterday');

    const renderMessage = (msg: typeof allMessages[0]) => (
      <div
        key={msg.id}
        tabIndex={0}
        className="vibe-nav-item vibe-message-item"
        style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: 'var(--space-xs)', 
          flexDirection: msg.fromMe ? 'row-reverse' : 'row', 
          outline: 'none',
          padding: '4px',
          borderRadius: '12px'
        }}
      >
        <img src={msg.avatar} alt={msg.fromMe ? 'Moi' : msg.sender} style={{ width: 'clamp(32px, 5vw, 48px)', height: 'clamp(32px, 5vw, 48px)', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, filter: 'grayscale(100%)' }} />
        <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: msg.fromMe ? 'flex-end' : 'flex-start' }}>
          {!msg.fromMe && <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700 }}>{msg.sender}</span>}
          <div style={{ backgroundColor: msg.fromMe ? 'var(--accent-bg)' : '#f0f0f0', border: '1px solid #ccc', borderRadius: msg.fromMe ? '12px 4px 12px 12px' : '4px 12px 12px 12px', padding: 'var(--space-sm)' }}>
            {msg.hasImage && (
              <img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=500&auto=format&fit=crop" alt="fraisiers" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', filter: 'grayscale(100%)' }} />
            )}
            {msg.isVoice ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={16} color="#1a1a1a" fill="#1a1a1a" />
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                  {[10,18,12,24,30,22,28,18,10,8,16,24,14,10].map((h,i) => (
                    <div key={i} style={{ width: '2px', height: `${h * 0.5}px`, backgroundColor: '#1a1a1a', borderRadius: '1px' }} />
                  ))}
                </div>
                <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>0:34</span>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: 'var(--fs-base)', lineHeight: 1.4 }}>{msg.content}</p>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <main style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', position: 'relative', overflowY: 'auto', overflowX: 'hidden' }}>
        <Header showLogo={false} title="La Communauté" icon={<Users size={60} />} sticky={true} />
        <div className="responsive-container" style={{ marginTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', display: 'flex', flexDirection: 'column', width: '100%', zIndex: 5 }}>
          <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <h2 style={{ margin: 0 }}>Aujourd'hui</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {todayMessages.map((msg) => renderMessage(msg))}
              </div>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <h2 style={{ margin: 0 }}>Hier</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {yesterdayMessages.map((msg) => renderMessage(msg))}
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-color)',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingBottom: 'var(--space-xl)'
    }}>
      <Header showLogo={false} showProfile={true} sticky={true} />
      
      <div className="responsive-container" style={{
        marginTop: 'var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        zIndex: 5
      }}>

        {/* Navigation Cards List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
          width: '100%',
          maxWidth: '900px'
        }}>
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={item.id}
                className={`vibe-nav-item`}
                tabIndex={0}
                onFocus={() => setActiveIndex(index)}
                onClick={() => {
                  if (item.id === 'missions' || item.id === 'journal' || item.id === 'plan' || item.id === 'communaute') {
                    setCurrentView(item.id as any);
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-xs)',
                  padding: 'var(--space-md)',
                  borderRadius: '8px',
                  border: 'var(--border-width) solid',
                  borderColor: isActive ? 'var(--border-color)' : '#ccc',
                  backgroundColor: isActive ? 'var(--accent-bg)' : 'var(--bg-color)',
                  position: 'relative',
                  width: '100%',
                  boxShadow: isActive ? '0 0 0 4px var(--border-color)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div style={{ color: 'var(--text-primary)' }}>{React.cloneElement(item.icon as React.ReactElement, { size: 24 })}</div>
                  <h2 style={{ fontSize: 'var(--fs-xl)', margin: 0 }}>{item.title}</h2>
                </div>
                <p style={{ 
                  fontSize: 'var(--fs-base)', 
                  fontWeight: 500, 
                  margin: 0,
                  maxWidth: '550px',
                  lineHeight: 1.4
                }}>
                  {item.description}
                </p>

                {isActive && (
                  <div className="ouvrir-panel" style={{ width: 'clamp(80px, 15vw, 120px)' }}>
                    <ArrowRight size={24} />
                    <span className="ouvrir-text" style={{ fontSize: 'var(--fs-xs)' }}>Ouvrir</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Logout Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-sm)' }}>
            <div 
              className="vibe-nav-item" 
              tabIndex={0} 
              onClick={() => window.location.reload()}
              onFocus={() => setActiveIndex(-1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: '8px',
                border: '2px solid #ccc',
                backgroundColor: 'var(--bg-color)',
                fontSize: 'var(--fs-base)',
                fontWeight: 600
              }}
            >
              <span>Se déconnecter</span>
              <LogOut size={16} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

      {/* Decorative background curve */}
    </main>
  );
};


function App() {
  const [screen, setScreen] = useState<'onboarding' | 'transition' | 'dashboard'>('onboarding');

  // Handle 'm' key for transition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA' || (activeElement as HTMLElement)?.isContentEditable;
      if (!isInput && e.key.toLowerCase() === 'm' && screen === 'onboarding') {
        setScreen('transition');
      }
    };
    const handleBack = (e: Event)  => {
      // Only go to onboarding if Dashboard didn't handle it (i.e., we're already in menu)
      if (!e.defaultPrevented && screen === 'dashboard') {
        // Dashboard handles its own navigation via capture listener — do nothing here
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('vibe-back', handleBack);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('vibe-back', handleBack);
    };
  }, [screen]);


  // --- VIBE CODING NAVIGATION: Wheel to focus, Left click to confirm, Right click to go back ---
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        overflow-y: auto !important;
      }
      .responsive-container {
        width: 100%;
        max-width: 1600px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 24px;
        padding-right: 24px;
      }
      @media (min-width: 768px) {
        .responsive-container {
          padding-left: 64px;
          padding-right: 64px;
        }
      }
      @media (min-width: 1024px) {
        .responsive-container {
          padding-left: 120px;
          padding-right: 120px;
        }
      }
      @media (min-width: 1440px) {
        .responsive-container {
          padding-left: 200px;
          padding-right: 200px;
        }
      }
      
      .vibe-focused {
        outline: none !important;
        border-color: #000 !important;
        background-color: #f2f2f2 !important;
        box-shadow: 0 0 0 6px #000 !important;
        z-index: 50;
        position: relative !important;
      }

      .vibe-message-item.vibe-focused {
        border: none !important;
        background-color: transparent !important;
        box-shadow: none !important;
        transform: none !important;
        z-index: 5;
      }
      
      .vibe-focused.vibe-dark-btn {
        background-color: #333 !important;
        border-color: #fff !important;
        box-shadow: 0 0 0 4px #1a1a1a !important;
      }

      @keyframes voiceBar {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(1.5); }
      }

      .voice-bar {
        background-color: #999;
        width: 4px;
        border-radius: 20px;
        transition: height 0.2s;
      }

      .voice-bar-animating {
        /* Static highlight for E-Ink instead of animation */
        background-color: #000 !important;
      }

      .ouvrir-panel {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 134px;
        background-color: #1a1a1a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        gap: 8px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        padding: 20px;
      }

      .ouvrir-text {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-align: center;
        text-transform: uppercase;
      }

      /* Custom Scrollbar Styling */
      ::-webkit-scrollbar {
        width: 14px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 7px;
        border: 3px solid #f1f1f1;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #1a1a1a;
      }

      .premium-card {
        background-color: #fff;
        border: 2px solid #e6e6e6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        transition: all 0.2s;
      }
    `;
    document.head.appendChild(style);





    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        window.dispatchEvent(new CustomEvent('vibe-back', { cancelable: true }));
      }
    };



    return () => {
      document.head.removeChild(style);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      {screen === 'onboarding' && <Onboarding onUnlock={() => setScreen('transition')} />}
      {screen === 'transition' && <Transition onComplete={() => setScreen('dashboard')} />}
      {screen === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;
