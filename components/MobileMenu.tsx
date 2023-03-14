import { FC } from "react"

interface MobileMenuProps {
  visible?: boolean
}

const MobileMenu: FC<MobileMenuProps> = ({ visible }) => {
  if(!visible) return null
  
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white">
          <span className="link link-underline link-underline-black">Home</span>
        </div>
        <div className="px-3 text-center text-white">
          <span className="link link-underline link-underline-black">Series</span>
        </div>
        <div className="px-3 text-center text-white">
          <span className="link link-underline link-underline-black">Movies</span>
        </div>
        <div className="px-3 text-center text-white">
          <span className="link link-underline link-underline-black">New & Popular</span>
        </div>
        <div className="px-3 text-center text-white">
          <span className="link link-underline link-underline-black">My list</span>
        </div>
        <div className="px-3 text-center text-white">
          <span className="link link-underline link-underline-black">Browse by languages</span>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu