import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import '../index.css'

const fullText = `
Dear Naela,

Selamat ulang tahun yang ke 18! 🎉
semoga semua yang kamu ingin capai bisa tercapai di tahun ini.
menjadi pribadi yang lebih baik, lebih dewasa, dan lebih bisa mengontrol emosi.
panjang umur, sehat selalu, dan bahagia selalu.
jangan lupa ibadah.

-Farrel :)
`

const Letter = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    // Membuat efek animasi bintang di latar belakang
    const starfield = document.getElementById("starfield");

    // Fungsi untuk membuat partikel bintang
    const createStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");

      // Posisi acak di layar
      const size = Math.random() * 3 + 1; // Ukuran bintang (random antara 1px sampai 4px)
      const xPos = Math.random() * window.innerWidth; // Posisi acak horizontal
      const yPos = Math.random() * window.innerHeight; // Posisi acak vertikal

      // Menetapkan posisi dan ukuran bintang
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${xPos}px`;
      star.style.top = `${yPos}px`;

      // Animasi gerak acak
      const animationDuration = Math.random() * 5 + 5; // Waktu animasi acak untuk gerak bintang
      star.style.animation = `twinkle ${animationDuration}s infinite alternate`;

      // Menambahkan bintang ke dalam starfield
      starfield?.appendChild(star);

      // Menghapus bintang setelah beberapa waktu (untuk efisiensi)
      setTimeout(() => {
        star.remove();
      }, animationDuration * 1000); // Hapus bintang setelah animasi selesai
    };

    // Membuat bintang setiap 50ms
    const intervalId = setInterval(createStar, 50);

    // Membersihkan interval setelah komponen unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Flip animasi saat surat muncul
    gsap.fromTo(
      boxRef.current,
      { rotateY: -90, opacity: 0 },
      {
        rotateY: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        transformOrigin: 'left center',
      }
    )
  
    // Efek ketik dimulai dengan delay sedikit
    const typeDelay = setTimeout(() => {
      let i = 0
      const typing = setInterval(() => {
        setDisplayedText(fullText.slice(0, i))
        i++
        if (i > fullText.length) clearInterval(typing)
      }, 40)
    }, 500)
  
    return () => {
        clearTimeout(typeDelay)
    }
  }, [])
  

  return (
    <div className="letter-wrapper">
        {/* Container untuk bintang */}
      <div id="starfield"></div>
      <div className="letter-box" ref={boxRef}>
        <pre className="typed-text">{displayedText}</pre>

        {/* Emoji Kue Ulang Tahun */}
        <div className="birthday-emoji">
          🎂
        </div>
      </div>
    </div>
  )
}

export default Letter
