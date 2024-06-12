'use client'
import React from 'react'

const Tasks = ({ params }: { params: { boardId: string } }) => {
    // const router = useRouter();

    return (
        <div>
            <h1>Hello World</h1>
            <h1>Parameter: {params.boardId}</h1>
        </div>
    )
}

export default Tasks
