import { DFS } from "../../../Visualizer-Algorithms/DFS"

import { colorMatrix } from "../utils"

import Queue from "../structures/Queue"

const { colors, setColors } = useColors();

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
        start: (matrix) => {
            console.log("[back-end] Starting task DFS")

            let changes = DFS(matrix)

            let changes_queue = new Queue(changes);

            colorMatrix(changes_queue)

            console.log("[back-end] Task DFS finished with 0 errors")
        }
    },
    code: DFS,
}

import { Lee } from "../../../Visualizer-Algorithms/lee"
import { color_element } from "../utils"
import { useColors } from "../hooks/colorsState";

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
        start: (matrix) => {
            console.log("[back-end] Starting task Lee")
            const changes = Lee(matrix)

            colorMatrix(changes)
            console.log("[back-end] Task Lee finished with 0 errors")
        }
    },
    code: Lee,
}