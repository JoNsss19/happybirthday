import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../index.css'
import image1 from '../assets/img/img-1.png'
import image2 from '../assets/img/img-2.png'

interface HeroProps {
    onOpenLetter: () => void
  }

const Hero = ({ onOpenLetter }: HeroProps) => {

    const emojiContainerRef = useRef<HTMLDivElement>(null)
    const heroContentRef = useRef<HTMLDivElement>(null)
    const emojiList = ['🎂', '🎉', '❤️']

  useEffect(() => {
    const emojis = emojiContainerRef.current?.children

    if (emojis) {
      Array.from(emojis).forEach((el: Element) => {
        const delay = Math.random() * 2
        const x = Math.random() * window.innerWidth
        const duration = 5 + Math.random() * 5

        gsap.fromTo(
          el,
          {
            y: window.innerHeight + 50,
            x,
            opacity: 2,
            scale: gsap.utils.random(0.8, 1.2),
          },
          {
            y: -100,
            duration,
            ease: 'power3.out',
            opacity: 0,
            repeat: -1,
            delay,
            x: x + gsap.utils.random(-30, 30),
          }
        )
      })
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      heroContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    )
  }, [])


  return (
    <>
    <section className='hero'>
        {/* 🎂 Flying Emojis */}
      <div className="emoji-container" ref={emojiContainerRef}>
        {Array.from({ length: 30 }).map((_, i) => (
          <span className="emoji" key={i}>
            {emojiList[Math.floor(Math.random() * emojiList.length)]}
          </span>
          
        ))}
      </div>

        <div className='hero-content' ref={heroContentRef}>
            {/* Gambar di kiri */}
            <img src={image1} alt="img1" />

            <div className='hero-text'>
                <h1>HAPPY BIRTH DAY</h1>
                <p>Naela Maya Sampoerna</p>
                <button onClick={onOpenLetter}>
                <   svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
            </div>

            {/* Gambar di kanan */}
            <img src={image2} alt="img2" />
        </div>
    </section>
    </>
  )
}

export default Hero