
import img1 from '../assets/images/team1.png';
import img2 from '../assets/images/team2.png';
import img3 from '../assets/images/team3.png';
import img4 from '../assets/images/team4.png';
import img5 from '../assets/images/team5.png';
import img6 from '../assets/images/team6.png';
import img7 from '../assets/images/team7.png';
import img8 from '../assets/images/team8.png';
import img9 from '../assets/images/team9.png';

import {useEffect} from 'react';
import { gsap } from "gsap";

const data = [
  {key: 1, title: "Fast Delivery with High Quality", role: "On-time execution with clean architecture", img: img1},
  {key: 2, title: "AI-Powered Solutions", role: "Chatbots, voice AI, and smart automation", img: img2},
  {key: 3, title: "Business-Focused Approach", role: "Built for conversions and growth", img: img3},
  {key: 4, title: "Affordable Pricing", role: "Flexible plans for startups and scaling teams", img: img4},
  {key: 5, title: "Dedicated Support", role: "Reliable communication and long-term partnership", img: img5},
  {key: 6, title: "Growth-Oriented Development", role: "Scalable products designed for expansion", img: img6},
  {key: 7, title: "UI/UX Excellence", role: "Modern interfaces that improve engagement", img: img7},
  {key: 8, title: "SEO & Performance First", role: "Technical SEO and speed optimization built-in", img: img8},
  {key: 9, title: "Reliable Full-Stack Team", role: "React, Node.js, MongoDB, and cloud-ready delivery", img: img9},
]


function List() {

  const getAssetSrc = (asset: { src: string }) => asset.src;

  
  useEffect(() => {
    let rotate = 0;
    let diffrot = 0;
    const list = document.querySelectorAll<HTMLElement>('.listelem')

    list.forEach((el) => {  
      el.addEventListener('mousemove', function(dets) {
        const event = dets as MouseEvent;
        const diff = event.clientY - el.getBoundingClientRect().top;
        diffrot = event.clientX - rotate;
        rotate = event.clientX;
        gsap.to(this.querySelector(".picture"), {
          opacity: 1,
          ease: 'power4.out',
          top: diff,
          left: event.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.2),
        })
      })
      el.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector(".picture"), {opacity: 0, ease: 'power4.out', duration: .5})
      })
      el.addEventListener('mousemove', function() {
        gsap.to(this.querySelector(".bluelayer"), {
          height: '100%', 
          ease: 'power4.out',
          duration: .1
        })
      })
      el.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector(".bluelayer"), {
          height: '0%',  
          ease: 'power4.out', 
          duration: .1})
      })
    })
  }, [])

  return (
    <div className="list-container">
      {data.map((item, index) => {
        return (
          <div 
            key={index} 
            className="listelem w-full py-[3vh] sm:px-[4vh] sm:py-[6vh] 
            flex justify-between items-center
            border-b-2 border-black sm:relative"
          >
            <div 
              className="relative w-full sm:flex 
              sm:items-center justify-between z-[3]"
            >
              <div className="left sm:flex items-center gap-14 sm:text-5xl">
                <h3 className="hidden sm:inline-block opacity-25">0{item.key}</h3>
                <h1 className="text-blue-600 text-3xl sm:text-black sm:text-[6vh]">{item.title}</h1>
              </div>
              <h3 className="font-[Sansita] text-[3vh] sm:text-[2.4vh] font-medium tracking-tight">
                {item.role}
              </h3>   
            </div>
            <div 
              className='picture w-[14vh] h-[14vh] opacity-100 right-0 
              sm:opacity-0 sm:absolute z-[4] sm:top-1/2 
              sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[15rem] sm:h-[15rem] 
              overflow-hidden rounded-full'
            >
              <img src={getAssetSrc(item.img)} className='w-[100%] h-[100%] object-contain' />
            </div>
            <div className="hidden sm:inline-block bluelayer sm:absolute top-0 left-0 z-[2] w-full h-0 bg-[#f5f19c]"></div>
          </div>
        )
      })}
    </div>
  )
}

export default List
