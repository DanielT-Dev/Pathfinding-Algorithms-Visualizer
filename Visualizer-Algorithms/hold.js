let isHolding = false;

const ignoredTags = ["BUTTON", "INPUT", "TEXT", "RANGE"];
const allowedClass = ["cell"];

function isValidHold(e, ignoredTags)
{
    if (e.target.classList.contains(allowedClass[0]))
        return true;

    for (let i = 0; i < ignoredTags.length; i++)
    {
        if (e.target.tagName == ignoredTags[i])
        {
            return false;
        }
    }

    return true;
}

export const get_events = (set_is_holding) => {
    document.addEventListener("mousedown", (e) => 
    {
        if (isValidHold(e, ignoredTags))
        {
            set_is_holding(true);
        }
    });
        
    document.addEventListener("mouseup", () => 
    {
        set_is_holding(false);
    });
}   

