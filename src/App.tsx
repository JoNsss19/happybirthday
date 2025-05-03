import { useState, useRef, useEffect } from 'react'
import Hero from './component/Hero'
import Letter from './component/Letter'
import gsap from 'gsap'
import music from './assets/bgmusic.mp3';

const App = () => {
  const [showLetter, setShowLetter] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playMusic = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    };

    playMusic();
  }, []);

  const handleOpenLetter = () => {
    // Hero keluar dulu
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => {
          setShowLetter(true)

          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
          )
        }
      })
    }
  }

  return (
    <div ref={containerRef}>
        <audio ref={audioRef} src={music} loop />
      {!showLetter ? (
        <Hero onOpenLetter={handleOpenLetter} />
      ) : (
        <Letter />
      )}
    </div>
  )
}

export default App
