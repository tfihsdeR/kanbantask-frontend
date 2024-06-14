'use client'
import React, { useEffect } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { readKanbanBoardById } from '@/app/globalRedux/features/kanbanBoardSlice'
import toast from 'react-hot-toast'
import Loader from '@/components/Loader'
import Board from '@/components/Board'

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

    if (loading) { <Loader /> }

    return (
        <Board board={board} />
    )
}

export default Tasks
