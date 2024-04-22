// BUDGET CONTROLLER MODULE
var budgetController = (function () {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
     return {
        addItem: function(type, des, val) {
            var newItem, ID;

            ID = 0;
            
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            data.allItems[type].push
        }
    }; 

})();






//UI CONTROLLER MODULE
var UIController = (function() {
    
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value, // will either be inc or exp
                discription: document.querySelector(DOMstring.inputDescription).value,
                values: document.querySelector(DOMstring.inputValue).value
            };
        },
        getDOMstrings: function () {
            return DOMstring;
        }
    };

})();





//GLOBAL CONTROLLER
var Controller = (function (budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem(); 
            };
        }); 
    };
    
     
    
    var ctrlAddItem = function() {
        var input = UICtrl.getInput();
        console.log(input)
        // 1. get the field input data
        
        


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

Controller.init();