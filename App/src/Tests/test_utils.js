function deepEqual(a, b) {
    if (a === b) return true;
  
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
      return false;
    }
  
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
  
    if (keysA.length !== keysB.length) return false;
  
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }
  
    return true;
  }

import { cellRefs } from "../components/Grid.jsx";
import { buildMatrix, color_element } from "../utils.js"

/*
This function takes 3 arguments:
    index   =>  for targeting the element in the UI matrix
    color   =>  for assigning the new color to the targeted element
    animation_duration  =>  for assigning the duration of the animation
*/
export const test_color_element = async () => {
    let input = [
        {
            index: 1,
            color: "rgb(0, 0, 0)",
            animation_duration: "0.1s",
        },
    ]
    let output = [
        {
            color: "rgb(0, 0, 0)",
        },
    ]
    let resulted_output = []
    let error_counter = 0
    let error_case_list = []

    for(let i = 0;i < input.length;i++) {
        let test_case = input[i]
        let expected_output = output[i]

        resulted_output = await color_element(test_case.index, test_case.color, test_case.animation_duration)

        if (deepEqual(resulted_output, expected_output) == false) {
            error_counter++;
            error_case_list.push(resulted_output);
        }
    }

    return error_case_list;
}

/*
This function takes 1 arguments:
    cellRefs    =>  for targeting the HTML elements of the UI grid
*/
export const test_build_matrix = () => {
    let input = []
    let output = []
    let resulted_output = []
    let error_counter = 0
    let error_case_list = []

    // Function specific variables
    let start_color =  { label: "Start", color: "rgb(57, 218, 230)" };
    let end_color = { label: "Finish", color: "rgb(17, 207, 32)" }
    let seen_color = { label: "Seen", color: "rgb(255, 238, 110)" };
    let in_stack_color = {label: "In Stack", color:"rgb(255, 150, 50)"};
    let current_color = {label: "Current", color:"rgb(100, 200, 100)"};
    let wall_color = { label: "Wall", color: "rgb(30, 30, 30)" };

    for(let i = 0;i < input.length;i++) {
        let test_case = input[i]
        let expected_output = output[i]

        resulted_output = buildMatrix(cellRefs);

        if (deepEqual(resulted_output, expected_output) == false) {
            error_counter++;
            error_case_list.push(resulted_output);
        }
    }

    return error_case_list;
}