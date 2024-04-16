// BUDGET CONTROLLER MODULE
var budgetController = (function () {
    
    // some code

})();




//UI CONTROLLER MODULE
var UIController = (function() {
    
    return {
        getInput: function() {
            return {
                type: document.querySelector('.add__type').value, // will either be inc or exp
                discription: document.querySelector('.add__description').value,
                values: document.querySelector('.add__value').value
            };
        }
    };

})();




//GLOBAL CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
    
    var ctrlAddItem = function() {
        
        // 1. get the field input data
        var input = UICtrl.getInput();
        console.log(input);


        // 2. Add the item to the budget controller

        // 3. Add tht item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    }
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
         if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
         }

    });
})(budgetController, UIController);