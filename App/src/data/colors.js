export let colors = [
    {
        label: "Start",
        color: "rgb(57, 218, 230)",
    },
    {
        label: "Wall",
        color: "rgb(30, 30, 30)",
    },
    {
        label: "Seen",
        color: "rgb(255, 238, 110)",
    },
    {
        label: "Finish",
        color: "rgb(17, 207, 32)"
    },
]

export const change_colors = (new_colors) => {
    colors = new_colors
}