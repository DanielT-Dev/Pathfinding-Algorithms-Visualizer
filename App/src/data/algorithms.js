import { DFS } from "../../../Visualizer-Algorithms/DFS"

import { colorMatrix, get_telemetry } from "../utils"

import Queue from "../structures/Queue"

export const DFS_DTO = (colors, speeds_params, set_telemetry) => {return {
    name: "DFS",
    colors: colors,
    speeds: speeds_params.speed_values,
    controls: {
        start: async (matrix) => {

            console.log("[back-end] Starting task DFS")

            let changes = DFS(matrix)

            let changes_queue = new Queue(changes);

            await colorMatrix(changes_queue, speeds_params.speed_values[speeds_params.selected_speed])

            set_telemetry(get_telemetry())

            console.log("[back-end] Task DFS finished with 0 errors")
        }
    },
    code: DFS,
}}

import { Lee } from "../../../Visualizer-Algorithms/lee"
import { color_element } from "../utils"

export const BFS_DTO = (colors, speeds_params, set_telemetry) => { return {
    name: "BFS",
    colors: colors,
    speeds: speeds_params.speed_values,
    controls: {
        start: async (matrix) => {

            console.log("[back-end] Starting task BFS")

            let changes = Lee(matrix)

            let changes_queue = new Queue(changes);
            
            await colorMatrix(changes_queue, speeds_params.speed_values[speeds_params.selected_speed])

            set_telemetry(get_telemetry())

            console.log("[back-end] Task BFS finished with 0 errors")
        }
    },
    code: Lee,
}}