const itemsArray = [];
const customersArray = [];
var nextID = 0;

//All the functions are inside this function
$(document).ready(() => {

    function calculateNextID() {
        nextID += 1;
        return nextID;
    }

    //This is where functions are called
    $(document).on("click", "button.btnAddLIne", function () {
        addLineHtml(calculateNextID(), $(this));
    });

    $(document).on("click", "button.btnDeleteLine", function () {
        deleteLineHtml($(this));
        calculateLineTotal();
        calculateDocTotal();
    });

    $(document).on("blur", ".calcTriger", function () {
        calculateLineTotal();
        calculateDocTotal();
    })

    //this function calculates the total of each line and updates this value
    function calculateLineTotal() {
        $.each($(".orderLines"), function (index, line) {
            let quantity = $(this).find($("input[name='itemQuantity']")).val();
            let price = $(this).find($("input[name='itemPrice']")).val();
            $(this).find($("input[name='lineTotal']")).val(
                quantity * price
            )
        });
    }

    //this function adds the totals of all the lines
    //it is also updating the number of lines in the document, this is needed in the post route of the order
    function calculateDocTotal() {
        let docTotal = 0;
        $.each($(".orderLines"), function (index, line) {
            docTotal += Number($(this).find($("input[name='lineTotal']")).val());
        });
        $("#total").val(docTotal);
        $("#numberOfLines").val($('.orderLines').length);
    }

    //The next two formulas fill the customerCode dropdown with all the available customer codes
    //toto: filter if item is not active status
    $(document).on("mouseenter", ".customerDropdown", function () {
        fillCustomers($(this));
    })

    function fillCustomers($selectNode) {
        axios.get('/api/customers')
            .then((response) => {
                customersArray.splice(0)
                response.data.forEach(element => {
                    customersArray.push(element);
                });
                $selectNode.children().remove();
                customersArray.forEach(element => {
                    $selectNode.append(`<option>${element.cardCode}</option>`);
                });
            })
            .catch((err) => {
                console.log("error en fillCustomers", err);
            })
    }

    //TEMPLATE FOR CUSTOMER The next two formulas fill the item name based on the itemcode selected
    $(document).on("mouseleave", ".customerDropdown", function () {
        getCustomerName($(this));
    })

    function getCustomerName($card) {
        let cardCode = $card.val();
        axios.get('/api/cardName', {
                params: {
                    cardCode
                }
            })
            .then((response) => {
                $("#cardName").val(response.data[0].cardName);
            })
            .catch((err) => {
                console.log("error en getCustomerName", err);
            })
    }

    //The next two formulas fill the itemcode dropdown with all the available item codes
    //toto: filter if item is not active status
    $(document).on("mouseenter", ".itemDropdown", function () {
        fillItems($(this));
    })

    function fillItems($selectNode) {
        axios.get('/api/items')
            .then((response) => {
                itemsArray.splice(0)
                response.data.forEach(element => {
                    itemsArray.push(element);
                });
                $selectNode.children().remove();
                itemsArray.forEach(element => {
                    $selectNode.append(`<option>${element.itemCode}</option>`);
                });
            })
            .catch((err) => {
                console.log("error in fillItems", err);
            })
    }

    //The next two formulas fill the item name based on the itemcode selected
    $(document).on("mouseleave", ".itemDropdown", function () {
        getItemName($(this));
    })

    function getItemName($item) {
        let itemCode = $item.val();
        axios.get('/api/itemName', {
                params: {
                    itemCode
                }
            })
            .then((response) => {
                $item.parent().parent().find("input[name='itemName']").val(response.data[0].itemName);
            })
            .catch((err) => {
                console.log("error en getItemName", err);
            })
    }

    //this function deletes de rows but prevents deletion if only one row left
    function deleteLineHtml(clickedBtn) {
        if ($('.orderLines').length === 1) {
            alert("the order needs at least one line");
            return;
        }
        clickedBtn.parent().parent().prev().remove();
        clickedBtn.parent().parent().remove();
    }

    //this function adds a row and assigns the correct id to the different elements
    function addLineHtml(id, clickedBtn) {
        let line =
            `<hr>
        <div id="${id}" class="d-flex justify-content-between orderLines">
        
        <div>
        <select class="form-control itemDropdown" id="itemCode${id}" name="itemCode">
        <option></option>
        </select>
        </div>
        <div>
        <input type="text" class="form-control" id="itemName${id}" name="itemName" readonly="readonly">
        </div>
        <div>
        <input type="number" class="form-control calcTriger" id="itemQuantity${id}" name="itemQuantity" value=1>
        </div>
        <div>
        <input type="number" class="form-control calcTriger" id="itemPrice${id}" name="itemPrice" value=0>
        </div>
        <div>
        <input type="number" class="form-control" id="lineTotal${id}" name="lineTotal" readonly="readonly" value=0>
        </div>
        <div>
        <button type="button" class="btn btn-success btn-sm btnAddLIne">+${id}</button>
        <button type="button" class="btn btn-danger btn-sm btnDeleteLine">-${id}</button>
        </div>
        
        </div>
        `
        clickedBtn.parent().parent().after(line);
    };

});