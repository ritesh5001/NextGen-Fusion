
import Card from "../Card";
import Button from "../Button";
import {useRef, useEffect} from 'react';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

function Craft() {

    const container = useRef(null);

    useEffect(() => {
        let clutter = "";
        const para = document.querySelector(".texthead")
        if (!para) return;
        const characters = para.textContent.split("")
        characters.forEach(function(e) {
            if(e === " ") clutter += `<span>&nbsp;</span>`
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;
        gsap.set('.texthead span', {display: 'inline-block'});
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".ltext",
            start: "top 100%",
            end: "bottom 50%",
            scrub: .5,
            
            }
        });
        tl.from('.texthead span', {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: .1, 

        }) 
    },[]);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: ".cards",
                start: "top 10%",
                scrub: 1,   
                }
            });
            tl.fromTo('.card', {
                y: 600,
                scale: .9,
            }, {
                y: 0,
                scale: 1.1,
                duration: .5,
                ease: 'power4.out',
                transformOrigin: "bottom 50% -50",
            });
        })                           
    }, { scope: container });

   
  return (
    <div 
        id='services'
        data-color="cyan" 
        className="craft section w-full sm:flex gap-x-40 justify-between 
          items-center px-8 py-8 sm:px-10 relative "
    >
        <div className="ltext sm:sticky sm:top-[10%] left-0 sm:w-1/2 ">
            <p 
                className="ptag font-[Sansita] text-[2.6vh] sm:text-[2.9vh] 
                font-medium leading-[4.4vh] sm:leading-[4.2vh] "
            >
                At NextGen Fusion, we don&apos;t just build websites, we build digital systems that help your business grow, convert, and scale. 
                From startups to growing brands, we deliver website development, e-commerce solutions, custom web applications, AI solutions, 
                UI/UX design, and SEO performance optimization tailored to your goals.
            </p>
            <h1 className="texthead font-[SansitaReg] text-[5vh] leading-[6vh] sm:text-[9.8vh] sm:leading-[12vh] mt-10 mb-10">Our Services</h1>
            {/* button */}
            <Button  bgColor="bg-none" text="GET STARTED" href="#contact" />
        </div>
        <div
            ref={container} 
            className="right cards sm:w-1/2  flex items-center justify-center">                
            <Card />
        </div>
    </div>
  )
}

export default Craft



