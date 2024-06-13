'use client'
import Board from '@/components/ui/Board'
import React, { useEffect } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { readKanbanBoardById } from '@/app/globalRedux/features/kanbanBoardSlice'
import toast from 'react-hot-toast'
import { SyncLoader } from 'react-spinners'

const Tasks = ({ params }: { params: { boardId: string } }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { board, error, loading } = useSelector((state: RootState) => state.kanbanBoard);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        dispatch(readKanbanBoardById({ id: params.boardId }))
    }, [dispatch]);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <SyncLoader color='#fff' />
            </div>
        )
    }

    return (
        <Board board={board} />
    )
}

export default Tasks
