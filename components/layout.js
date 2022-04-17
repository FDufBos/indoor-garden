import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
const downArrow = <FontAwesomeIcon icon={faAngleDown} />


export default function Layout({ children }) {
  return (
    <div className=" text-white">
      <header className="flex flex-col gap-4 mt-4 mx-6">
        <nav id="explore" className=" flex flex-row justify-between items-center h-[40px] w-full">
          <div id="profile-pic" className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full">
            <Image src="/images/memoji/male-1.png" width="30" height="30" className='drop-shadow'/>
          </div>
          <div id="codex-button" className='bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center hover:scale-110 transition-all'>🌱 Exchange</div>
        </nav>
        <div id="title-area" className="flex flex-row justify-between items-end w-full">
          <div className="flex flex-row items-baseline gap-2">
            <h1 className='font-alpina'>Indoor Garden</h1>
            <div>{downArrow}</div>
          </div>
          <Image src="/images/sun.svg" width="40" height="40"/>
        </div>
        <div id="line" className='w-full h-[1px] bg-white opacity-75 -translate-y-1'></div>
      </header>
      {children}
      <footer className="flex justify-center items-center">
        👀
      </footer>
    </div>
  )
}