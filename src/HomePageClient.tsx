"use client";

import Capsule from './components/Capsule/Index'
import Craft from './components/Craft/Index'
import { useEffect, useRef } from 'react';
import Home from './components/Home/Index'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Para from './components/Paragraph/Index'
import Para2 from './components/Paragraph2/Index'
import Real from './components/Real/Index'
import Team from './components/Team/Index'
import Footer from './components/Footer/Index';

function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = document.querySelectorAll<HTMLElement>('[data-color]')
    const triggers = []
    list.forEach(function(e) {
      const trigger = ScrollTrigger.create({
        trigger: e,
        start: "top 90%",
        end: "bottom 90%",
        onEnter: function(){
          if (e.dataset.color) {
            document.body.setAttribute("data-theme", e.dataset.color);
          }
        },
        onEnterBack: function() {
          if (e.dataset.color) {
            document.body.setAttribute("data-theme", e.dataset.color);
          }
        }
      })
      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])
      


  return (
    
    <div ref={scrollRef} className='main w-full overflow-x-hidden'>
      <Home  />
      <Craft />
      <Real />
      <Team  />
      <Para  />
      <Para2 />
      <Capsule />
      <Footer />
    </div>    
  )
}

export default App
