// BUDGET CONTROLLER MODULE
var budgetController = (function () {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calcPercentage = function(totalIncome) {
        
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
        
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },
        
        budget: 0,
        percentage: -1

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

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },
 
        calculateBudget: function() {

            // calculate tootal income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            
            // calculate the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },

        calculatePercentages: function() {

            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            });
            
            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data);
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    var  formatNumber = function(num, type) {
        var numSplit, int, dec;
        /*
        + or - before number
        exactly 2 decimal point
        comma separating the thousands

        */
       num = Math.abs(num);
       num = num.toFixed(2);
       
       numSplit = num.split('.');

       int = numSplit[0];
       if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
       }

       dec = numSplit[1];

       ;

       return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach = function(list, callback) {
        for (var i =0; i < list.length; i++) {
            callback(list[i], i);
        }
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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstring.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber (obj.value, type));

            // insert the html into the DOM
             document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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

        displayBudget: function(obj) {
            var type
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstring.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstring.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
        
            if (obj.percentage > 0) {
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstring.percentageLabel).textContent = '---';
            }

        },

        displayPercentages: function(percentages) {
 
            var fields = document.querySelectorAll(DOMstring.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }

            });
        },

        displayMonth: function() {``
           
            var now, year, month, months;
            now = new Date();
            //var christmas = new Date(2016, 11, 25);

            months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstring.dateLabel).textContent = months[month] + ', ' + year;
        },

        changedType: function() {

            var fields = document.querySelectorAll(
                DOMstring.inputType + ',' +
                DOMstring.inputDescription, + ',' +
                DOMstring.inputValue
            );

            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMstring.inputBtn).classList.toggle('red')
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
            if (event.keyCode === 13  || event.which === 13) {
            ctrlAddItem(); 
            };
        }); 
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType)
    };
    


    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. retuns the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
     

    var updatePercentages = function() {

        // 1. cal the percentages
        budgetCtrl.calculatePercentages();

        // 2. read them from the budget controller
        var percentages = budgetCtrl.getPercentages();
        // 3. uodate the user interface with the new percentages
        UICtrl.displayPercentages(percentages);
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
            
            // 6. calculate and update the percentages
            updatePercentages();
        }        

    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

         itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

         if (itemID) {

            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the user interface.
            UICtrl.deleteListItem(itemID);
            //3. Update and show the new budgegt
            updateBudget();

            // 4. calculate and update the percentages
            updatePercentages();
         }
    }; 
    
    return {
        init: function() {
            console.log('Application has stated');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
        });
            setupEventListeners();
            
        }
    };
    
    
})(budgetController, UIController);

Controller.init();