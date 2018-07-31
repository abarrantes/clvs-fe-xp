
//The following two functions are used to inactivate an customer through axios
$(document).on("click", ".deactivateCustomer", function () {
    deactivateCustomer($(this));
})

function deactivateCustomer($selectNode) {
    console.log("button deactivate working")
    let cardCode = $selectNode.parent().parent().find($("div.cardCode")).html();
    axios.patch('/api/deactivateCustomer', {
            params: {
                cardCode
            }
        })
        .then((response) => {
            console.log('updated!'); //why does not go in here? This section is skipped
        })
        .catch((err) => {
            console.log("error en deactivateCustomer", err);
        })

    console.log("deactivate customer completed completed")
    location.reload();
}

//The following two functions are used to activate an customer through axios
$(document).on("click", ".activateCustomer", function () {
    activateCustomer($(this));
})

function activateCustomer($selectNode) {
    console.log("button activate working")
    let cardCode = $selectNode.parent().parent().find($("div.cardCode")).html();
    axios.patch('/api/activateCustomer', {
            params: {
                cardCode
            }
        })
        .then((response) => {
            console.log('updated!'); //why does not go in here? This section is skipped
        })
        .catch((err) => {
            console.log("error en activateCustomer", err);
        })

    console.log("activate customer completed")
    location.reload();
}