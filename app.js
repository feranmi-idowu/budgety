// BUDGET CONTROLLER MODULE
var budgetController = (function () {
    
    // some code

})();




//UI CONTROLLER MODULE
var UIController = (function() {
    var DOMstring = {
        inputType: '.add__type',
        inputDiscription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value, // will either be inc or exp
                discription: document.querySelector(DOMstring.inputDiscription).value,
                values: document.querySelector(DOMstring.inputValue).value
            };
        },
        getDOMstrings: function () {
            return DOMstring;
        }
    };

})();




//GLOBAL CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem(); 
            }

        });
    };
    
     
    var ctrlAddItem = function() {
        
        // 1. get the field input data
        var input = UICtrl.getInput();
        


        // 2. Add the item to the budget controller

        // 3. Add tht item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    return {
        init: function() {
            console.log('Application has stated');
            setupEventListeners();
        }
    };
    
    
})(budgetController, UIController);

controller.init();