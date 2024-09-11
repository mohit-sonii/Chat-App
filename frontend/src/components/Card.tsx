

interface CardProps {
   avatar: string,
   fullname: string
}

function Card({ avatar, fullname }: CardProps) {
   return (
      <div className='rounded-lg bg-transparent shadow-lg flex gap-3  items-center border-2 w-full h-max p-2 border-gray-200'>
         <img src={avatar} alt="Avatar" width={30} />
         <p className="font-bold">{fullname}</p>
      </div>
   )
}

export default Card