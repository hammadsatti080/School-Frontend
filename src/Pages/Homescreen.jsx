import React from 'react'
import Homepage from '../Component/Homescreen/Homepage'
import AboutSection from '../Component/Homescreen/About/AboutSection'
import TestimonialsSection from '../Component/Homescreen/Testimonial/TestimonialsSection'
import FAQS from '../Component/Homescreen/FAQ/FAQS'


export default function Homescreen() {
  return (
    <div>
      <Homepage/>
       <AboutSection/>
    <TestimonialsSection/>
     <FAQS/>

    </div>
  )
}
