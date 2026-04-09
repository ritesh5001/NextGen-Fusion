import List from "../List"
import Button from "../Button"



function Team() {

  return (
    <div id='why-us' data-color="white" className='team section font-[SansitaReg] py-20'>
      <div className="head1">
        <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
          Why Choose NextGen Fusion
        </h1>
      </div>
      <div className="list mt-10 w-full px-8">
        {/* //single list */}
        <List />
        <div className='flex items-center justify-center py-20'>
          <Button bgColor="bg-[#f5f19c]" text="BOOK FREE CONSULTATION" href="#contact" />
        </div>
      </div>
    </div>
  )
}

export default Team
