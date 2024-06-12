'use client'

import BoardCard from '@/components/ui/BoardCard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../globalRedux/store';
import { useRouter } from 'next/navigation';
import { readAllKanbanBoards } from '../globalRedux/features/kanbanBoardSlice';
import Button from '@/components/ui/Button';

const Boards = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { boards, error, loading } = useSelector((state: RootState) => state.kanbanBoard);

    const [state, setState] = React.useState(false);

    useEffect(() => {
        const fetchBoards = async () => {
            await dispatch(readAllKanbanBoards());
            setState(true);
        }

        fetchBoards();
    }, [dispatch]);

    useEffect(() => {
        if (!boards[0]?._id && !loading && state) {
            router.push('/onboarding');
        }
    }, [boards, state]);

    const handleCreateBoard = () => {
        router.push('/onboarding');
    }

    // const board = {
    //     _id: '65',
    //     title: 'My First Board',
    //     createdBy: 'John Doe',
    //     createdAt: new Date()
    // }

    return (
        <div className="bg-gradient-to-b from-black to-purple-900 h-full min-h-[100vh] relative w-full bg-cover mt-[-75px]">
            <div className="flex flex-col h-full items-center pt-[82px] w-full mx-auto max-w-[1450px] text-white">
                <h1 className="mb-10 font-bold text-4xl mt-5">Your Boards</h1>
                <div className="justify-start w-full mb-10 ml-28">
                    <Button text='Create New Board' type='button' onClick={handleCreateBoard} />
                </div>
                <div className="flex flex-wrap gap-4 justify-center mb-5">
                    {boards && boards.map(board => {
                        return (
                            <BoardCard navigate={`/tasks/${board._id}`} key={board._id} board={board} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Boards
