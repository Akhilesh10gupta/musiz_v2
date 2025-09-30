'use client'


const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <svg width="90%" height="100" viewBox="0 0 400 100">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-draw">
          SiR Musiz studios
        </text>
      </svg>
    </div>
  )
}

export default LoadingScreen
