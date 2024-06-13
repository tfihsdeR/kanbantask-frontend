import { Droppable, Draggable } from "@hello-pangea/dnd"
import { LuDot } from "react-icons/lu"
import { useEffect, useState } from "react"
import { ITask, IColumnProps } from "@/types/types"

const Column: React.FC<IColumnProps> = ({
    title,
    tasks,
    droppableId
}) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [taskId, setTaskId] = useState<string | null>(null)

    useEffect(() => {
        if (tasks) {
            console.log("Task:", tasks[0])
        }
    }, [tasks]);

    return (
        <div className="flex-1">
            <div className="flex gap-1 dark:text-white ">
                <h2 className="text-sm font-semibold mb-4 uppercase">{title}</h2>
                <LuDot />
            </div>

            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4"
                    >
                        {tasks?.map((task: ITask, index: number) => (
                            <Draggable
                                key={task._id}
                                draggableId={task!._id!}
                                index={index}
                            >
                                {provided => (
                                    <div
                                        className="bg-gray-700 rounded p-2 mb-2 text-white flex justify-between"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onMouseEnter={() => { () => setHoverIndex(index) }}
                                        onMouseLeave={() => { () => setHoverIndex(null) }}
                                    >
                                        <LuDot />
                                        {task.title}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column
