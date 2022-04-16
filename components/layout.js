import Image from 'next/image'
import profilePic from '../public/images/memoji/male-1.png'

export default function Layout({ children }) {
  return (
    <div className=" text-white">
      <header className="flex flex-col gap-4 mt-4 mx-6">
        <nav id="explore" className=" flex flex-row justify-between items-center h-[40px] w-full">
          <div id="profile-pic" className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full">
            <Image src={profilePic} width="35" height="35" className='drop-shadow'/>
          </div>
          <div id="codex-button" className='bg-white drop-shadow-sm rounded-full text-grey-600 px-[16px] py-[8px] text-center hover:scale-110 transition-all'>🌱 Exchange</div>
        </nav>
        <div id="title-area flex flex-row justify-between items-center h-[40px] w-full">
          <h1 className='font-alpina'>Indoor Garden</h1>
        </div>
      </header>
    </div>
  )
}