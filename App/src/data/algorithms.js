import { matrix } from "../../../Visualizer-Algorithms/utils"

import { DFS } from "../../../Visualizer-Algorithms/DFS"

export const DFS_DTO = {
    name: "DFS",
    colors: [
        {
            label: "Start",
            color: "rgb(57, 218, 230)"
        },
        /*
        {
            label: "Valid",
            color: "rgb(245, 245, 245)"
        },
        */
        {
            label: "Invalid",
            color: "rgb(30, 30, 30)"
        },
        {
            label: "Seen",
            color: "rgb(255, 238, 110)"
        },
        {
            label: "Finish",
            color: "rgb(17, 207, 32)"
        },
    ] ,
    speeds: [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 8, 9, 10],
    controls: {
        start: () => {
            console.log("[back-end] Starting task DFS")
            DFS(matrix)
            console.log("[back-end] Task DFS finished with 0 errors")
        }
    },
    input: matrix,
    code: DFS,
}

import { Lee } from "../../../Visualizer-Algorithms/lee"

export const Lee_DTO = {
    name: "Lee",
    colors: [
        {
            label: "Start",
            color: "rgb(57, 218, 230)"
        },
        /*
        {
            label: "Valid",
            color: "rgb(245, 245, 245)"
        },
        */
        {
            label: "Invalid",
            color: "rgb(30, 30, 30)"
        },
        {
            label: "Seen",
            color: "rgb(255, 238, 110)"
        },
        {
            label: "Finish",
            color: "rgb(17, 207, 32)"
        },
    ] ,
    speeds: [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 8, 9, 10],
    controls: {
        start: () => {
            console.log("[back-end] Starting task Lee")
            Lee(matrix)
            console.log("[back-end] Task Lee finished with 0 errors")
        }
    },
    input: matrix,
    code: Lee,
}