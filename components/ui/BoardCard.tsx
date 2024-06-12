'use client'

import React from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { IKanbanBoard } from '@/types/Types';

const BoardCard = ({
    board,
    navigate
}: {
    board: IKanbanBoard,
    navigate: string
}) => {
    const router = useRouter();

    const handleEdit = () => {
        // edit the board
    }

    const handleDelete = () => {
        // delete the board
    }

    const handleNavigate = () => {
        router.replace(navigate);
    }

    return (
        <div className="flex flex-col justify-center p-4 rounded-md shadow-md w-96 h-48 bg-purple-400 text-black text-2xl font-bold">
            <h1 className="hover:scale-110 cursor-pointer" onClick={handleNavigate}>{board.title}</h1>
            <h1>{board.createdBy}</h1>
            <h1>{board?.createdAt?.toString().substring(0, 10)}</h1>
            <div className="flex justify-center gap-3 mt-2 items-center">
                <MdDeleteForever onClick={handleDelete} className="text-red-700 cursor-pointer transition-all duration-300 hover:scale-150 active:scale-110" />
                <CiEdit onClick={handleEdit} className="transition-all duration-300 hover:scale-150 cursor-pointer active:scale-110" />
            </div>
        </div>
    )
}

export default BoardCard