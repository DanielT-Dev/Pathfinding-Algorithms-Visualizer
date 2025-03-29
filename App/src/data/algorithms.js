import { DFS } from "../../../Visualizer-Algorithms/DFS"

import { colorMatrix } from "../utils"

import Queue from "../structures/Queue"

export const DFS_DTO = (colors) => {return {
    name: "DFS",
    colors: colors,
    speeds: [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 8, 9, 10],
    controls: {
        start: (matrix) => {
            console.log("[back-end] Starting task DFS")

            let changes = DFS(matrix)

            let changes_queue = new Queue(changes);

            colorMatrix(changes_queue)

            console.log("[back-end] Task DFS finished with 0 errors")
        }
    },
    code: DFS,
}}

import { Lee } from "../../../Visualizer-Algorithms/lee"
import { color_element } from "../utils"


export const Lee_DTO = (colors) => { return {
    name: "Lee",
    colors: colors,
    speeds: [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 8, 9, 10],
    controls: {
        start: (matrix) => {
            console.log("[back-end] Starting task Lee")
            const changes = Lee(matrix)

            colorMatrix(changes)
            console.log("[back-end] Task Lee finished with 0 errors")
        }
    },
    code: Lee,
}}