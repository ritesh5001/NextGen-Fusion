import Row from '../Row'
import Button from '../Button'
import {useEffect, useState, useRef} from 'react';
import {motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { gsap } from "gsap";
import styles from './Style.module.css';
import { Power2, Power4 } from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { BiMenu } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

function Home() {

    const container = useRef(null);

    useEffect(() => {
        let clutter = "";
        const para = document.querySelector(".toptext")
        if (!para) return;

        const characters = para.textContent.split("")
        characters.forEach(function(e) {
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;
        gsap.set(".toptext span", {opacity: .1})
        gsap.to(".toptext span", {
            scrollTrigger: {
                trigger: ".home",
                start: "top 50%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1,
            stagger: .03,

        })
    },[]);


    useGSAP(() => {
        gsap.set(".slidesm", { scale: 5 });

        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom bottom",
            scrub: .5,
            }
         });
         tl.to(".vdodiv", {
            clipPath: 'circle(0% at 50% 50%)',
            ease: Power4,
          }, "start")
          tl.to(".slidesm", {
            scale: 1,
            ease: Power2,
         }, 'start');
         tl.to(".lft", {
            xPercent: -10,
            stagger: .03,
            ease: Power4,
            duration: 1,
         }, 'start');
         tl.to(".rgt", {
            xPercent: 10,
            stagger: .03,
            ease: Power4,
            duration: 1,
         }, 'start');
    }, container )

    const {scrollY} = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {

        const previous = scrollY.getPrevious() ?? 0;

        if(latest > previous) {
        setHidden(true);
        }
        else {
        setHidden(false);
        }
    });


    return (
    <div ref={container} data-color="black" className="home section w-full h-[200vh] relative  ">
        <div className='w-full sticky top-0 left-0 '>
            {/* navbar */}
            <motion.div
                variants={{
                visible: {y: 0},
                hidden: {y: "-100%"},
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{duration: 0.35, ease: "easeInOut"}}
                className="section w-[100vw] sm:w-full px-6 fixed top-0 left-0 z-[9]"
            >
                <div className="w-full flex sm:flex items-center justify-between  ">
                    <a href='#' className="logo w-[12vh] h-[12vh] sm:w-[16vh] sm:h-[10vh] cursor-pointer z-[9] flex items-center">
                        <h1 className='font-[SansitaBold] text-[2.4vh] sm:text-[2.8vh] leading-[2.4vh] sm:leading-[2.8vh] tracking-tight'>
                            NEXTGEN <br /> FUSION
                        </h1>
                    </a>
                    <div className="hidden md:flex gap-2 items-center z-[9] cursor-pointer ">
                        {[
                            { label: "Services", href: "#services" },
                            { label: "Work", href: "#work" },
                            { label: "Why Us", href: "#why-us" },
                            { label: "Insights", href: "#insights" },
                            { label: "Contact", href: "#contact" }
                        ].map((item, index) => (
                            <h4 key={index} className={`${styles.links} h-[3vh] relative py[2.4vh] px-[2.2vh] text-center  flex flex-col
                            font-[Sansita] text-[2.1vh] overflow-hidden font-medium leading-[2.5vh]`}>
                                <a href={item.href} className={`atag ${styles.atag} relative`}>{item.label} </a>
                                <a href={item.href} className={`atag ${styles.atag} relative`}>{item.label} </a>
                            </h4>
                        ))}
                    </div>

                    <BiMenu
                        style={{
                        fontSize: "5.5vw",
                        }}
                        className=' inline-block sm:hidden z-[9] cursor-pointer'
                    />


                </div>
            </motion.div>

            <div className='btmtext absolute z-[4] bottom-[4%] left-[14%] text-center sm:text-start sm:bottom-[7%] sm:left-8 w-72'>
                <h1 className='sm:text-[2.2vh] font-semibold'>
                    Build powerful websites, AI solutions, and digital products that grow your business.
                </h1>
                <p className='mt-3 text-[1.9vh] sm:text-[2vh] font-medium'>
                    We help startups and businesses transform ideas into scalable, high-performance digital solutions.
                </p>
                <div className='mt-5 flex flex-col sm:flex-row gap-3 items-center sm:items-start'>
                    <Button bgColor="bg-[#f5f19c]" text="GET STARTED" href="#contact" />
                    <Button bgColor="bg-[#e9bbff]" text="BOOK FREE CONSULTATION" href="#contact" />
                </div>
            </div>
            {/* video div */}
            <div
                className={` vdodiv w-full h-screen absolute z-[3]
                top-0 left-0 overflow-hidden sm:overflow-visible ${styles.vdodiv}`}
            >
                <video
                    className="absolute w-full h-screen object-cover top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2"
                    autoPlay
                    loop
                    muted
                    src="/video/1ENIoa5sjq.mp4"
                >
                </video>
            </div>

            {/* marquee div */}
            <div
                className="marqueecontainer w-full h-screen
                relative overflow-hidden "
            >
                {/* /* top Heading div */ }
                <div
                    className=' heading absolute  top-[12%] sm:top-[7%] left-1/2
                    -translate-x-1/2 w-72'
                >
                    <h2 className='toptext text-[2.2vh] font-[Sansita] tracking-wide font-medium text-center'>Your digital growth partner for modern web and AI solutions.</h2>
                </div>

                <div

                    className='slidesm absolute scale-[5]  top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2 w-[90%]'
                >
                    <div className='row'>
                        <Row
                            translateClass="-translate-x-1/2"
                            direction="lft"
                        />
                        <Row
                            translateClass="-translate-x-2/3"
                            direction="rgt"
                        />
                        <Row
                            translateClass="-translate-x-1/4"
                            direction="lft"
                        />
                        <Row
                            translateClass="-translate-x-1/3"
                            direction="rgt"
                        />
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
