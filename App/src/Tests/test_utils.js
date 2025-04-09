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

    console.log("Errors: " + error_counter + " in test_color_element()");
    for(let i = 0;i < error_counter;i++)
        console.log("Failed because: " + resulted_output)
}

export const test_build_matrix = () => {
    let input = []
    let output = []
    let resulted_output = []
    let error_counter = 0
    let error_case_list = []

    // Function specific variables
    let start_color = null;
    let end_color = null;
    let seen_color = null;
    let in_stack_color = null
    let current_color = null

    for(let i = 0;i < input.length;i++) {
        let test_case = input[i]
        let expected_output = output[i]

        //resulted_output = buildMatrix()
    }
}