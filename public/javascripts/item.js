
//The following two functions are used to inactivate an item through axios
$(document).on("click", ".deactivateItem", function () {
    inactivateItem($(this));
})

function inactivateItem($selectNode) {
    console.log("button inactivate working")
    let itemCode = $selectNode.parent().parent().find($("div.itemCode")).html();
    axios.patch('/api/deactivateItem', {
            params: {
                itemCode
            }
        })
        .then((response) => {
            console.log('updated!'); //why does not go in here? This section is skipped
        })
        .catch((err) => {
            console.log("error en deactivateItem", err);
        })

    console.log("inactivate item completed")
    location.reload();
}

//The following two functions are used to activate an item through axios
$(document).on("click", ".activateItem", function () {
    activateItem($(this));
})

function activateItem($selectNode) {
    console.log("button activate working")
    let itemCode = $selectNode.parent().parent().find($("div.itemCode")).html();
    axios.patch('/api/activateItem', {
            params: {
                itemCode
            }
        })
        .then((response) => {
            console.log('updated!'); //why does not go in here? This section is skipped
        })
        .catch((err) => {
            console.log("error en activateItem", err);
        })

    console.log("activate item completed")
    location.reload();
}