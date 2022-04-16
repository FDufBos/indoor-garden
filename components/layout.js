export default function Layout({ children }) {
  return (
    <div className="bg-monstera-800 text-white">
      <header className="pt-[50px] mx-[24px]">
        <nav id="explore" className="bg-sun-400 flex flex-row justify-between items-center h-[40px] w-full">
          <div id="profile-pic" className="bg-monstera-100 w-[36px] h-[36px]"></div>
        </nav>
        <div id="title-area"></div>
      </header>
    </div>
  )
}