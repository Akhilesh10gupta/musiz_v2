// components/SlickNoSSR.tsx
'use client'
import dynamic from 'next/dynamic'

export default dynamic(() => import('react-slick'), { ssr: false })
