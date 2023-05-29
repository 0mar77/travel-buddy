// Creates vendor post and styles
export default function ImageCard({ children, imgSrc, ...props }) {
    return (
        <div {...props} className="relative max-w-max rounded-2xl shadow-lg group group-hover:scale-110 duration-200">  
            <img 
                src={imgSrc} 
                alt='' 
                className="transition-transform group-hover:scale-110 duration-200"/>
            <div className="absolute insert-0 flex items-end group-hover:scale-110 duration-200">
                <div className='p-4 text-black'>{children}</div>
            </div>
        </div>
    )
}