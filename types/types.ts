export interface IKanbanBoard {
    _id?: string;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: string;
    createdBy: string;
}

export interface ITask {
    _id?: string;
    title: string;
    status?: Status;
    boardId: string;
    references?: string[];
    createdAt?: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    description?: string;
}

export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DESIGNED = "DESIGNED",
    BACKLOG = "BACKLOG"
}

export interface IColumnProps {
    title: string;
    tasks: ITask[];
    droppableId: string;
}