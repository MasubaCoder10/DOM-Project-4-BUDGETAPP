let arrayLabels = [];
let arrayData = [];
let arrColor = [];
let totalBudget = 0;
let totalBalance = 0;
let totalExpense = 0; 
let arrayExpense = [];
let id = 0;

//local storage pour obtenir les element du Budget
if(JSON.parse(localStorage.getItem('addBudget'))){
    totalBudget = JSON.parse(localStorage.getItem('addBudget'));
}

//local storage pour obtenir les element du Budget
if(JSON.parse(localStorage.getItem('balance'))){
    totalBalance = JSON.parse(localStorage.getItem('balance'));
}

//local storage pour obtenir les element du Budget
if(JSON.parse(localStorage.getItem('expense'))){
    totalBalance = JSON.parse(localStorage.getItem('expense'));
}

//local storage pour obtenir les element du Budget
if(JSON.parse(localStorage.getItem('arrayExpense'))){
    arrayExpense = JSON.parse(localStorage.getItem('arrayExpense'));
}
class BudgetApp{
    constructor(add_budgetBtn, expense_addBtn, table){
        add_budgetBtn.addEventListener('click', this.add_budget.bind(this));
        expense_addBtn.addEventListener('click', this.expense_add.bind(this));
        table.addEventListener('click', this.deleteExpense.bind(this));
        table.addEventListener('click', this.editExpense.bind(this));
        this.budget_amount = document.querySelector('#budget-amount');
        this.input = document.querySelector('input');
        this.errors = document.querySelectorAll('.error');
        this.alerts = document.querySelectorAll('.alert');
        this.showBudget = document.querySelector('.feedback-item_budget_show');
        this.showExpense = document.querySelector('.feedback-item_expense_show');
        this.showBlance = document.querySelector('.feedback-item_balance_show');
        this.expense_name = document.querySelector('#expense-name');
        this.expense_amount = document.querySelector('#expense-amount')
        this.expense_row = document.querySelector('#expense-row')
        this.tbody = document.querySelector('tbody');
        this.clone = this.expense_row.content.cloneNode(true)
        
    }

    add_budget(){
        if(isNaN(this.budget_amount.value) || this.budget_amount.value <= 0 ){

            this.errors[0].classList.add('error-show');
            this.budget_amount.value = '';
            setTimeout(() =>{
                this.errors[0].classList.remove('error-show');
            },3000)
        }else{
            // local Storage setItem budget
            totalBudget += parseInt(this.budget_amount.value);
            localStorage.setItem('addBudget', JSON.stringify(totalBudget))

            // local Storage setItem balance
            totalBalance = totalBudget
            localStorage.setItem('balance', JSON.stringify(totalBalance));


            this.alerts[0].classList.add('alert-show')

            setTimeout(()=>{
                this.alerts[0].classList.remove('alert-show')
            }, 3000)
            this.showBudget.innerHTML = totalBudget;
            this.showBlance.innerText = totalBalance;
            this.budget_amount.value = '';
            this.errors[3].classList.add('error-show');
            setTimeout(() =>{
                this.errors[3].classList.remove('error-show'); 
            },3000)
        }
    }

    // add expense in localStorage
    locaStorageExpense(arrayExpense){
        this.showBudget.innerHTML = "";
        this.showBlance.innerText = "";
        this.tbody.innerHTML ="";
        let total = 0
        arrayExpense.forEach((item) =>{
            total += parseInt(item.prix)
            // add item in tbody
            this.clone = this.expense_row.content.cloneNode(true)
            let td = this.clone.querySelectorAll('td')
            td[0].innerHTML = item.id;
            td[1].innerText = item.name;
            td[2].innerText = item.price;
            this.tbody.appendChild(this.clone);
        })
        // add item in my page
        this.showExpense.innerHTML = total
        this.showBudget.innerHTML = totalBudget;
        this.showBlance.innerText = totalBudget - total;
        /* this.clone = this.expense_row.content.cloneNode(true)
        let td = this.clone.querySelectorAll('td')
        td[0].innerText = this.expense_name.value;
        td[1].innerText = this.expense_amount.value;
        this.tbody.appendChild(this.clone);
        let expense = {
            name : this.expense_name.value,
            prix: this.expense_amount.value,
        } */

    }
    expense_add(){
        if(+this.showBlance.innerHTML <= 0){
            this.errors[1].classList.add('error-show')
            setTimeout(() =>{
                this.errors[1].classList.remove('error-show');
            },3000)
            this.expense_name.value = '';
            this.expense_amount.value = '';
        } else{

            if(this.expense_name.value == "" || /\d/.test(this.expense_name.value)){
                this.errors[1].classList.add('error-show')
                this.expense_name.value = ''
    
                setTimeout(() =>{
                    this.errors[1].classList.remove('error-show');
                },3000)
            } else if(isNaN(this.expense_amount.value) || this.expense_amount.value <= 0){
                this.errors[2].classList.add('error-show')
                this.expense_amount.value = '';
    
                setTimeout(()=>{
                    this.errors[2].classList.remove('error-show');
                },3000)
            }else{
                 // push item in chartjs
                 arrayLabels.push(this.expense_name.value)
                 arrayData.push(+this.expense_amount.value)
                 arrColor.push(color())

                // local Storage setItem expense
                totalExpense += parseInt(this.expense_amount.value);
                localStorage.setItem('expense', JSON.stringify(totalExpense));
                
                // object to add in my arrayExpense
                const depense = {id: id++, name:this.expense_name.value, price:this.expense_amount.value}
                //add item in global arrayExpense
                arrayExpense.push(depense);
                localStorage.setItem('arrayExpense', JSON.stringify(arrayExpense));
                this.locaStorageExpense(arrayExpense)
                
                
               
                /* tr = this.clone.querySelectorAll('tr');  */
                
               /*  for(let i = 0; i < tr.length; i++){
                    console.log(this.expense_name.value);
                    if(tr[i].children[0].innerHTML.includes(this.expense_name.value)){
                        tr[i].children[1].innerHTML = +this.expense_amount.value + +tr[i].children[1].innerHTML;
                    }else{
                        td[0].innerText = this.expense_name.value;
                        td[1].innerText = this.expense_amount.value;
                        this.tbody.appendChild(this.clone);
                    }
                } */
                /* console.log(+e.target.closest('tr').children[0].innerText);
                console.log(this.tbody.appendChild(this.clone)); */

                this.alerts[1].classList.add('alert-show');
                this.showExpense.innerHTML = totalExpense;
                this.showBlance.innerHTML = totalBalance - parseInt(this.expense_amount.value);
                totalBalance = parseInt(this.showBlance.innerHTML);
                this.expense_name.value = '';
                this.expense_amount.value = ''; 
                
                setTimeout(() =>{
                    this.alerts[1].classList.remove('alert-show');
                },3000)
                
                
            }
        }

        

        
    }
    deleteExpense(e){
        if(e.target.classList.contains('fa-trash')){
            this.showBlance.innerText = +this.showBlance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpense.innerText = +this.showExpense.innerText - + e.target.closest('tr').children[1].innerText;
            e.target.closest('tr').remove();
            console.log(e.target.closest('tr'));
        }
    }
    editExpense(e){
        if(e.target.classList.contains('fa-edit')){
            this.showBlance.innerText = +this.showBlance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpense.innerText = +this.showExpense.innerText - + e.target.closest('tr').children[1].innerText;

            this.expense_name.value = e.target.closest('tr').children[0].innerText;
            this.expense_amount.value = +e.target.closest('tr').children[1].innerText

            e.target.closest('tr').remove();
        }
    } 
    /* update(e){
        if(e.target.closest('tr').children[0].innerText === this.expense_name.value){
            this.showBlance.innerText = +this.showBlance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpense.innerText = +this.showExpense.innerText - + e.target.closest('tr').children[1].innerText;

            this.expense_name.value = e.target.closest('tr').children[0].innerText;
            this.expense_amount.value = +e.target.closest('tr').children[1].innerText
            e.target.closest('tr').remove();
        }
    } */

    
}

/* var budget;
const object_data = {
  budget_amount: 0,
  total_expenses: 0,
  balance: 0,
  expenses: []
};
 */
/* INITIALIZE LOCAL-STORAGE */
/* if (localStorage.getItem("budget")) {
  budget = JSON.parse(localStorage.getItem("budget"));
  setValues();
} else {
  localStorage.setItem("budget", JSON.stringify(object_data));
  budget = object_data;
} */


const ctx = document.getElementById('myChart');

 const chartVar =  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: arrayLabels,
      datasets: [{
        data: arrayData,
        backgroundColor: arrColor,
        borderWidth: 0
      }]
    },

  });
function color(){
    let colore = "0123456789ABCDEF"
    let Htag = "#";
    for (let i = 0; i < 6; i++) {
        Htag += colore[Math.floor(Math.random() * 16)]
        
    }
    return Htag;
}


document.addEventListener('DOMContentLoaded', init);

function init(){
    const add_budgetBtn = document.querySelector('.add-budget');
    const expense_addBtn = document.querySelector('#expense-add')
    const table = document.querySelector('table');
    const begin = new BudgetApp(add_budgetBtn, expense_addBtn, table)
    begin.locaStorageExpense(arrayExpense)
}

