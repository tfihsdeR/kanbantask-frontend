'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { readTasksByBoardId, updateTask } from '@/app/globalRedux/features/taskSlice'
import toast from 'react-hot-toast'
import { IKanbanBoard, ITask, Status } from '@/types/types'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import Column from './Column'
import { SyncLoader } from 'react-spinners'

const Board: React.FC<{ board: IKanbanBoard }> = ({ board }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { tasks, loading, error } = useSelector((state: RootState) => state.taskState);

    const [_tasks, setTasks] = useState<ITask[] | null>(null);

    useEffect(() => {
        if (board?._id) {
            dispatch(readTasksByBoardId({ boardId: board!._id! }))
        }
    }, [dispatch, board]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (tasks) {
            console.log(tasks)
        }
    }, [tasks]);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const draggedTask = tasks.find(task => task._id === draggableId);

        let updatedStatus: Status

        switch (destination.droppableId) {
            case Status.TODO:
                updatedStatus = Status.TODO
                break
            case Status.IN_PROGRESS:
                updatedStatus = Status.IN_PROGRESS
                break
            case Status.DESIGNED:
                updatedStatus = Status.DESIGNED
                break
            case Status.BACKLOG:
                updatedStatus = Status.BACKLOG
                break
            default:
                updatedStatus = draggedTask!.status!
        }

        const updatedTask = {
            ...draggedTask!,
            status: updatedStatus
        }

        await dispatch(updateTask({ task: updatedTask }))

        const updatedTasks = tasks.map(task => {
            if (task._id === draggableId) {
                return {
                    ...task,
                    status: updatedStatus
                }
            }

            return task
        })

        setTasks(updatedTasks)
    }

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <SyncLoader color='#fff' />
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-b from-black to-purple-900 py-10 relative h-screen mt-[-75px]">
            <h1 className="font-bold text-center mb-10 text-3xl">
                {board!.title}
            </h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-4 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
                    <Column
                        title={Status.BACKLOG}
                        tasks={tasks!.filter(task => task.status === Status.BACKLOG)}
                        droppableId={Status.BACKLOG}
                    />
                    <Column
                        title={Status.TODO}
                        tasks={tasks!.filter(task => task.status === Status.TODO)}
                        droppableId={Status.TODO}
                    />
                    <Column
                        title={Status.IN_PROGRESS}
                        tasks={tasks!.filter(task => task.status === Status.IN_PROGRESS)}
                        droppableId={Status.IN_PROGRESS}
                    />
                    <Column
                        title={Status.DESIGNED}
                        tasks={tasks!.filter(task => task.status === Status.DESIGNED)}
                        droppableId={Status.DESIGNED}
                    />
                </div>
            </DragDropContext>
        </div>
    )
}

export default Board
