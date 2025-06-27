import gsap from 'gsap';
import { navLinks } from '../../constants/index.js'
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    useGSAP(()=>{
        // What is Tweening: it is the process of creating a smooth transition between two states. it process of generating images that are in between two keyframes.
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                // trigeer animation when bottom of the nav hits the top of the viewport
                start: 'bottom top',
            }
        });
        navTween.fromTo('nav',
            { backgroundColor: 'transparent'}, 
            {
                backgroundColor: '#00000050',
                backdropFilter: 'blur(10px)',
                duration: 1,
                ease: 'power1.inOut',
            }
        )
    })
  return (
    <nav>
        <div>
            <a href='#home' className='flex items-center gap-2'>
                <img src="/images/logo.png" alt="logo" />
                <p>Velvet Pour</p>
            </a>
            <ul>
                {navLinks.map((link)=>(
                    <li key={link.id}>
                        <a href={`#${link.id}`} >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar