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




            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            
            // create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // push it into data structure
            data.allItems[type].push(newItem);

            // return the new element 
            return newItem;
        },
        testing: function() {
            console.log(data)
        }
    }; 

})();






//UI CONTROLLER MODULE
var UIController = (function() {
    
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value, // will either be inc or exp
                description: document.querySelector(DOMstring.inputDescription).value,
                values: parseFloat(document.querySelector(DOMstring.inputValue).value)
            };
        },

        addListItem: function(obj, type) 
        {
            var html, newHtml;
            
            // create html string with placeholder text
            if (type === 'inc') {
                element = DOMstring.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstring.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert the html into the DOM
             document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();
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
    

    var updateBudget = function() {
        // 1. Calculate the budget

        // 2. retuns the budget

        // 3. Display the budget on the UI

    };
     
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. get the field input data
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.values) && input.values > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.values);
        
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
        
            // 4. clear the fields
            UICtrl.clearFields();

            // 5. calculate and update budget
            updateBudget();
        }        

    };

    return {
        init: function() {
            console.log('Application has stated');
            setupEventListeners();
        }
    };
    
    
})(budgetController, UIController);

Controller.init();