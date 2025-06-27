import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({maxWidth: 767});
  useGSAP(()=>{
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paraSplit = new SplitText(".subtitle", { type: "lines" });
    heroSplit.chars.forEach((char)=> char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
    });
    gsap.from(paraSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    }).to('.right-leaf', { y:200 },0).to('.left-leaf', { y:-200 },0);
    // Video Animation 
    // start if video top reach either 50% of viewport for mobiles or center reach 60% of viewport
    const startValue = isMobile? 'top 50%':'center 60%';
    // end if video bottom reach either 120% of viewport for mobile or bottom of viewport
    const endValue = isMobile? '120% top':'bottom top';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      }
    });
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      })
    }

  },[]);
  return (
    <>
      <section id='hero' className="noisy">
        <h1 className="title">MOJITO</h1>
        <img 
          src="/images/hero-left-leaf.png" 
          alt="left-leaf" 
          className="left-leaf" 
        />
        <img 
          src="/images/hero-right-leaf.png" 
          alt="right-leaf" 
          className="right-leaf" 
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitile">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <div className="subtitle">
                Every Cocktail on our menu is blend of premium ingredients, creative fair and timeless recipes — crafted to delight your senses.
              </div>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video 
          src="/videos/output.mp4" 
          ref={videoRef}
          playsInline
          preload="auto"
          muted
        />
      </div>
    </>
  )
}

export default Hero