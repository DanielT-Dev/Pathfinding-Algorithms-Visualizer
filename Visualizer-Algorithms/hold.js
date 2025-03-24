let isHolding = false;

const ignoredTags = ["BUTTON", "INPUT", "TEXT", "RANGE"];
const allowedClass = ["ButtonsClass"];

function isValidHold(e, ignoredTags)
{
    for (let i = 0; i < ignoredTags.length; i++)
    {
        if (e.target.tagName == ignoredTags[i])
        {
            return false;
        }
    }

    return true;
}

document.addEventListener("mousedown", (e) => 
{
    if (isValidHold(e, ignoredTags))
    {
        console.log("Holding\n");
        isHolding = true;
    }
});

document.addEventListener("mouseup", () => 
{
    console.log("Not holding\n");
    isHolding = false;
});