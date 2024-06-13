'use client'

import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { IKanbanBoard } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/globalRedux/store';
import { deleteKanbanBoard } from '@/app/globalRedux/features/kanbanBoardSlice';
import toast from 'react-hot-toast';
import Input from './Input';
import ButtonSm from './ButtonSm';

const BoardCard = ({
    board,
    navigate
}: {
    board: IKanbanBoard,
    navigate: string
}) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { message } = useSelector((state: RootState) => state.kanbanBoard);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [boardTitle, setBoardTitle] = useState<string>(board!.title!);


    const handleEdit = () => {
        // setIsEditing(true);
    }

    const handleDelete = async () => {
        await deleteBoard();

        toast.success(message);
    }

    const deleteBoard = async () => {
        await dispatch(deleteKanbanBoard({ id: board!._id! }));
    }

    const handleNavigate = () => {
        router.replace(navigate);
    }

    const handleUpdateBoard = () => {
        // Handle update board
    }

    return (
        <div className="flex flex-col justify-center p-4 rounded-md shadow-md w-96 h-48 bg-purple-400 text-black text-2xl font-bold">
            <form
                className="flex flex-col gap-5 justify-center items-center w-full"
                onSubmit={handleUpdateBoard}
            >
                <Input
                    name='title'
                    type="text"
                    placeholder="Title"
                    value={boardTitle}
                    smallGap={true}
                    fontSize='xl'
                    removeUnderline={!isEditing}
                    textCenter={true}
                />

                <ButtonSm
                    text="Update"
                    type="submit"
                    disabled={isEditing}
                />
            </form>


            {!isEditing && (
                <>
                    <span className="text-sm">Created By: {board.createdBy}</span>
                    <span className="text-xs">{board?.createdAt?.toString().substring(0, 10)}</span>
                    <div>
                        <button
                            className="rounded-lg border-2 border-black px-1 font-normal text-sm active:scale-90 transition-all duration-200 cursor-pointer hover:bg-purple-600"
                            onClick={handleNavigate}
                        >
                            Tasks &#8594;
                        </button>
                    </div>
                </>

            )}
            <div className="flex justify-center gap-3 mt-2 items-center">
                <MdDeleteForever onClick={handleDelete} className="text-red-700 cursor-pointer transition-all duration-300 hover:scale-150 active:scale-110" />
                <CiEdit onClick={() => setIsEditing(!isEditing)} className="transition-all duration-300 hover:scale-150 cursor-pointer active:scale-110" />
            </div>
        </div>
    )
}

export default BoardCard