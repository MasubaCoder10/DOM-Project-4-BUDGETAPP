let arrayLabels = [];
let arrayData = [];
let arrColor = [];

let totalBudget = 0;
let totalBalance = 0;
let totalExpense = 0;
let arrayExpense = [];

const expenseListLabel = "arrayExpense";
let id = 0;
let checked = null;
// arrayLabels
if (!localStorage.getItem("arrayLabels")) {
  localStorage.setItem("arrayLabels", JSON.stringify(arrayLabels));
}
if (!localStorage.getItem("arrayData")) {
  localStorage.setItem("arrayData", JSON.stringify(arrayData));
}
function updateDataChart() {
  localStorage.setItem("arrayLabels", JSON.stringify(arrayLabels));
  localStorage.setItem("arrayData", JSON.stringify(arrayData));
}
arrayLabels = JSON.parse(localStorage.getItem("arrayLabels"));
arrayData = JSON.parse(localStorage.getItem("arrayData"));
console.log(arrayLabels, arrayData);
//local storage pour obtenir les element du Budget
if (JSON.parse(localStorage.getItem("addBudget"))) {
  totalBudget = JSON.parse(localStorage.getItem("addBudget"));
}

//local storage pour obtenir les element du Budget
if (JSON.parse(localStorage.getItem("balance"))) {
  totalBalance = JSON.parse(localStorage.getItem("balance"));
}

//local storage pour obtenir les element du Budget
if (JSON.parse(localStorage.getItem("expense"))) {
  totalBalance = JSON.parse(localStorage.getItem("expense"));
}

//local storage pour obtenir les element du Budget
if (JSON.parse(localStorage.getItem("arrayExpense"))) {
  arrayExpense = JSON.parse(localStorage.getItem(expenseListLabel));
}
class BudgetApp {
  constructor(add_budgetBtn, expense_addBtn, table, btnClear, btnHistory) {
    add_budgetBtn.addEventListener("click", this.add_budget.bind(this));
    expense_addBtn.addEventListener("click", this.expense_add.bind(this));
    /* table.addEventListener('click', this.deleteExpense.bind(this)); */
    table.addEventListener("click", this.editExpense.bind(this));
    btnClear.addEventListener("click", this.clear_locaStorage.bind(this));
    btnHistory.addEventListener("click", this.history.bind(this));

    this.budget_amount = document.querySelector("#budget-amount");
    this.input = document.querySelector("input");
    this.errors = document.querySelectorAll(".error");
    this.alerts = document.querySelectorAll(".alert");
    this.showBudget = document.querySelector(".feedback-item_budget_show");
    this.showExpense = document.querySelector(".feedback-item_expense_show");
    this.showBlance = document.querySelector(".feedback-item_balance_show");
    this.expense_name = document.querySelector("#expense-name");
    this.expense_amount = document.querySelector("#expense-amount");
    this.expense_row = document.querySelector("#expense-row");
    this.tbody = document.querySelector("tbody");
    this.expense_update = document.querySelector("#expense-update");
    this.history_table = document.querySelector(".history-items");
    this.tbodyHistory = document.querySelector("#tbodyHistory");
  }

  clear_locaStorage() {
    localStorage.clear();
    location.reload();
  }

  add_budget() {
    if (isNaN(this.budget_amount.value) || this.budget_amount.value <= 0) {
      this.errors[0].classList.add("error-show");
      this.budget_amount.value = "";
      setTimeout(() => {
        this.errors[0].classList.remove("error-show");
      }, 3000);
    } else {
      // local Storage setItem budget
      totalBudget += parseInt(this.budget_amount.value);

      localStorage.setItem("addBudget", JSON.stringify(totalBudget));

      // local Storage setItem balance
      totalBalance = totalBudget;
      localStorage.setItem("balance", JSON.stringify(totalBalance));

      this.alerts[0].classList.add("alert-show");

      setTimeout(() => {
        this.alerts[0].classList.remove("alert-show");
      }, 3000);
      this.showBudget.innerHTML = totalBudget;
      this.showBlance.innerText = totalBalance;
      this.budget_amount.value = "";
      this.errors[3].classList.add("error-show");
      setTimeout(() => {
        this.errors[3].classList.remove("error-show");
      }, 3000);
    }
  }

  // get items from localStorage
  getExpenseTolocaStorage(arrayExpense) {
    this.showBudget.innerHTML = "";
    this.showBlance.innerText = "";
    this.tbody.innerHTML = "";
    let total = 0;
    arrayExpense.forEach((item, index) => {
      total += parseInt(item.price);

      this.tbody.innerHTML += `
                <tr id="tr">
        
                    <td class="expense-title">${item.name}</td>
                    <td class="expense-value">${item.price}</td>
                    <td class="delete-edit">
                        <span><i class="fa-solid fa-edit" id="edit-row" onclick="editExpense()"></i></span>
                        <span><i class="fa-solid fa-trash" id="delete-row" onclick="deleteExpense(${index})"></i></span>
                    </td>
                </tr>
            `;
      
    });
    // add item in my page
    this.showExpense.innerHTML = total;
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
  getExpenseTolocaStorageHistory(arrayExpense){
    arrayExpense.forEach((item, index) => {
      this.tbodyHistory.innerHTML += `
                <tr id="tr">
                <td >00</td>
                    <td class="expense-title">${item.name}</td>
                    <td class="expense-value">${item.price}</td>
                    
                </tr>
            `;
      
    });
  }

  expense_add() {
    if (+this.showBlance.innerHTML <= 0) {
      this.errors[1].classList.add("error-show");
      setTimeout(() => {
        this.errors[1].classList.remove("error-show");
      }, 3000);
      this.expense_name.value = "";
      this.expense_amount.value = "";
    } else {
      if (this.expense_name.value == "" || /\d/.test(this.expense_name.value)) {
        this.errors[1].classList.add("error-show");
        this.expense_name.value = "";

        setTimeout(() => {
          this.errors[1].classList.remove("error-show");
        }, 3000);
      } else if (
        isNaN(this.expense_amount.value) ||
        this.expense_amount.value <= 0
      ) {
        this.errors[2].classList.add("error-show");
        this.expense_amount.value = "";

        setTimeout(() => {
          this.errors[2].classList.remove("error-show");
        }, 3000);
      } else {
        let isFirstFind = false;
        if (checked != null  ) { 
           arrayExpense = arrayExpense.map((el, i) => {
            if (i === checked ) { 
            checked = null;
            return {
             ...el,
             name: this.expense_name.value,
             price: this.expense_amount.value,
           } ;
          }
       
       return el;
       });
     }
    

            /* if(i === checked && el.name === this.expense_name.value){
              console.log("yo");
              checked = null;
              arrayExpense = arrayExpense.map((el, index) => {
              if (el.name === this.expense_name.value && !isFirstFind) {
                  el.price = +el.price + parseInt(this.expense_amount.value);
                  isFirstFind = true;
                  //call  the deleting function
                  deleteExpense(index);
                  //call  the deleting function
                  localStorage.setItem("arrayData", JSON.stringify(arrayData));
            }
            return el;
          });
           } */
            
          
            /* else if (i === checked && el.name !== this.expense_name.value) {                                                
              checked = null;
               return {
                ...el,
                name: this.expense_name.value,
                price: this.expense_amount.value,
              } ;
              

             
            }
            return el;
          });  
        }*/ else {
          //pour eviter les doublons dans le tableau
          arrayExpense = arrayExpense.map((el) => {
            if (el.name === this.expense_name.value && !isFirstFind) {
              el.price = +el.price + parseInt(this.expense_amount.value);
              isFirstFind = true;
              localStorage.setItem("arrayData", JSON.stringify(arrayData));
            }
            return el;
          });
          // push item in chartjs
          /* arrayLabels.push(this.expense_name.value);
          arrayData.push(parseInt(this.expense_amount.value));
          console.log(arrayData); */
          arrColor.push(color());
          //

          // local Storage setItem expense
          totalExpense += parseInt(this.expense_amount.value);
          localStorage.setItem("expense", JSON.stringify(totalExpense));
          // local Storage setItem balance
          totalBalance -= parseInt(this.expense_amount.value);
          localStorage.setItem("balance", JSON.stringify(totalBalance));

          if (!isFirstFind) {
            // object to add in my arrayExpense
            const depense = {
              id: id++,
              name: this.expense_name.value,
              price: this.expense_amount.value,
            };
            //add item in global arrayExpense
            arrayExpense.push(depense);
            arrayLabels.push(depense.name);
            arrayData.push(parseInt(depense.price));
            updateDataChart();
          }
        }

        localStorage.setItem(expenseListLabel, JSON.stringify(arrayExpense));
        this.getExpenseTolocaStorage(arrayExpense);

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

        /* totalBalance = totalBalance - totalExpense;
                localStorage.setItem('balance', JSON.stringify(totalBalance));
                this.showExpense.innerHTML = totalExpense;
                this.showBlance.innerHTML = totalBalance; */

        this.expense_name.value = "";
        this.expense_amount.value = "";

        this.alerts[1].classList.add("alert-show");
        setTimeout(() => {
          this.alerts[1].classList.remove("alert-show");
        }, 3000);
      }
    }
  }
  /* deleteExpense(e){
        if(e.target.classList.contains('fa-trash')){
            this.showBlance.innerText = +this.showBlance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpense.innerText = +this.showExpense.innerText - + e.target.closest('tr').children[1].innerText;
            e.target.closest('tr').remove();
            console.log(e.target.closest('tr'));

             arrayExpense = arrayExpense.map() 
        }
    }
     */
  editExpense(e) {
    console.log(e.target);
    if (e.target.classList.contains("fa-edit")) {
      /* this.tr = document.querySelectorAll("#tr");
            const index = this.tr.parentE */
      /* this.expense_update.style.display = "block";
            this.expense_add.style.display = "none"; */
      this.showBlance.innerText =
        +this.showBlance.innerText +
        +e.target.closest("tr").children[1].innerText;
      this.showExpense.innerText =
        +this.showExpense.innerText -
        +e.target.closest("tr").children[1].innerText;

      this.expense_name.value = e.target.closest("tr").children[0].innerText;
      this.expense_amount.value = +e.target.closest("tr").children[1].innerText;

      checked = arrayExpense.findIndex(
        (el) => el.name === e.target.closest("tr").children[0].innerText
      );
      /* e.target.closest('tr').remove(); */
    }
  }
  history() {
    this.history_table.style.display = "block";
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
function deleteExpense(index) {
  arrayExpense.splice(index, 1);
  localStorage.setItem(expenseListLabel, JSON.stringify(arrayExpense));
  location.reload();
}

/* function editExpense(index){
   
    
    

    localStorage.setItem(expenseListLabel, JSON.stringify(arrayExpense));
    
} */

function color() {
  let colore = "0123456789ABCDEF";
  let Htag = "#";
  for (let i = 0; i < 6; i++) {
    Htag += colore[Math.floor(Math.random() * 16)];
  }
  return Htag;
}

/* let i = 0; */
/* let chartVar; */

const ctx = document.getElementById("myChart");

/* if (chartVar) {
    chartVar.destroy();
  }
 */
/* const  chartVar = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: arrayLabels,
      datasets: [
        {
          data: arrayData,
          backgroundColor: arrColor,
          borderWidth: 0,
        },
      ],
    },
    option: {
      circumference: 360,
      rotation: 360,
      cutout: 0,
    },
  }); */
/*  i++; */

document.addEventListener("DOMContentLoaded", init);

function init() {
  const add_budgetBtn = document.querySelector(".add-budget");
  const expense_addBtn = document.querySelector("#expense-add");
  const btnClear = document.querySelector("#btn-clear");
  const table = document.querySelector("table");
  const btnHistory = document.querySelector(".btn-history");
  const begin = new BudgetApp(
    add_budgetBtn,
    expense_addBtn,
    table,
    btnClear,
    btnHistory
  );
  begin.getExpenseTolocaStorage(arrayExpense);


  const history = new BudgetApp(
    add_budgetBtn,
    expense_addBtn,
    table,
    btnClear,
    btnHistory
  );
  history.getExpenseTolocaStorageHistory(arrayExpense);
}

