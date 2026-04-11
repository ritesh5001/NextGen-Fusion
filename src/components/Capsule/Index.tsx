import Button from "../Button";
import {useRef} from 'react';
import cap1 from '../../assets/images/cap1.png';
import cap2 from '../../assets/images/cap2.jpg'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

 function Capsule() {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".capsules",
            start: "top 60%",
            end: "bottom bottom",
            scrub: .5,
            }
        });
        tl.to(".capsule:nth-child(2)", {
            y: 0,
            marginTop:32,
            ease: 'power4.out'
        })
        tl.to(".capsule:nth-child(1)", {
            marginTop: 32,
            ease: 'power4.out'
        })
    }, { scope: container });


  return (
    <div id='insights' data-color="white" ref={container} className="capsules  section w-full sm:h-[115vh] 
        sm:overflow-hidden mb-32 sm:flex items-start sm:justify-between mt-32 sm:mt-60 px-8 gap-40  "
    >
        <div className="left sm:w-1/3 h-full flex flex-col sm:justify-between py-10 items-start " >
            <h1 className="w-2/3 font-[Sansita] text-[2.8vh] leading-[4vh] font-medium">
                Explore projects,
                case studies,
                and digital success
                stories.
            </h1>
            <div className="heading">
                <h1 className="font-[SansitaReg] text-[5vh] leading-[6.5vh] sm:text-[8vh] py-5 sm:leading-[9vh]">Our <br/> Work</h1>
                <Button bgColor="bg-[#f5f19c]" text="VIEW ALL PROJECTS" href="#contact" />
            </div>
        </div>
        <div className=" right font-[SansitaReg] mt-10 sm:w-2/3 space-y-10 h-full sm:flex items-start justify-start sm:gap-20  ">
            {/* 1st capsule */}
            <div   
                className="capsule flex flex-col items-center gap-4 p-6 sm:-rotate-[16deg] sm:translate-y-10
                rounded-full border-[1px] border-black">
                <div className="image w-[74vw] h-[74vw] sm:w-[40vh] sm:h-[40vh]  rounded-full overflow-hidden">
                    <img className="h-full w-full object-cover" src={cap1.src} />
                </div>
                <div className="text text-center text-[6vw] sm:text-[3.2vh] font-semibold mt-10 leading-[4.8vh]">
                    <h3>Multi-vendor ecommerce <br/>
                        platform with secure <br/> payments and scalable <br/> catalog 
                        management
                    </h3>
                </div>
                <button className="bg-[#e9bbff] text-black px-4 rounded-full text-medium py-3 mb-10 mt-10 font-semibold">E-commerce</button>

            </div>
            {/* 2nd capsule */}
            <div   
                className="capsule flex flex-col items-center gap-4 p-6 sm:-rotate-[16deg] sm:translate-y-40
                rounded-full border-[1px] border-black"
            >
                    <button className="bg-[#e9bbff] text-black px-4 rounded-full text-medium py-3 mb-6 mt-10 font-semibold">AI Solutions</button>
                
                <div className="text text-center text-[3.2vh] flex flex-col gap-6 mb-6 font-semibold leading-[4.8vh]">
                    <h3>AI telecaller and <br/>
                        automation system <br/> with workflow intelligence <br/> for operations
                    </h3>
                    <h4 className="font-[Sansita] text-[1.9vh] font-medium leading-[2.8vh] text-zinc-500">Portfolio websites and animation websites <br/> crafted for modern brands focused on <br/>
                        conversion and performance.
                    </h4>
                </div>
                <div className="image w-[74vw] h-[74vw] sm:w-[40vh] sm:h-[40vh]  rounded-full overflow-hidden">
                    <img className="h-full w-full object-cover" src={cap2.src} />
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default Capsule

