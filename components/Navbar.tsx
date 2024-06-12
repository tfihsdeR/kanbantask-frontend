'use client'

import { RootState } from '@/app/globalRedux/store'
import Link from 'next/link'
import React from 'react'
import { PiKanban } from 'react-icons/pi'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { boards, board } = useSelector((state: RootState) => state.kanbanBoard)

    return (
        <div className="py-5 bg-transparent relative z-10 w-full">
            <div className="flex justify-between w-[90%] max-w-[1450px] mx-auto">
                <Link href={!boards[0]?._id ? "/" : '/boards'} className="flex gap-1 items-center text-2xl font-bold uppercase">
                    <h1>Rast Kanban</h1>
                    <PiKanban />
                </Link>
                {!boards[0]?._id && (
                    <Link href={"/boards"}>Use without login &#8594;</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
