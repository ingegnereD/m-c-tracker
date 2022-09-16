const ui = new UI;
const db = new DB;

// UI elements
const collection = document.querySelector('.collection')
const collectionItem = document.querySelectorAll('.collection-item')
const addBtn = document.getElementById('add');
const backBtn = document.getElementById('back');
const food = document.getElementById('item');
const calorie = document.getElementById('calorie');
const editBtn = document.getElementById('edit')
const clearBtn = document.getElementById('clear');
const clearAll = document.getElementById('clear-all')

let listIndex;
let currentID;

// Event listeners
addBtn.addEventListener('click', send)
backBtn.addEventListener('click', clearField)
collection.addEventListener('click', actionPencil)
editBtn.addEventListener('click', updateList);
clearBtn.addEventListener('click', removeList)
clearAll.addEventListener('click', clealAllList)

// Clearing Field using BACK BTN
function clearField(e) {
    ui.clearFields()
    e.preventDefault()
}

// ADDITION TO THE LIST
function send(e) {
    if (food.value === '' | calorie.value === '') {
        console.log('No')
        ui.showEmptyFieldAlert()
    } else {
        let prevID;
        if (localStorage.getItem('mealData') !== null) {
            const a = JSON.parse(localStorage.getItem('mealData'));
            let b = a.at(-1);
            let id = Number(b.id)
            console.log('Prev ID ', id)
            prevID = id += 1;
        } else {
            prevID = 1000;
        }
        console.log(prevID)
        ui.showMealAndCalInfo({ id: prevID, name: food.value, cal: calorie.value });
        db.store({ id: prevID, name: food.value, cal: calorie.value })
        db.addCal();
        ui.clearFields();
    }
    e.preventDefault()
}
// collecting data form local Storage
db.listFoodData();

// to get the index of the clicked pencil list
let container = document.querySelectorAll('.collection-item')
let cont = [...container]
cont.forEach((a, i) => {
    a.addEventListener('click', () => {
        // console.log(a, 'Index of ', i);
        listIndex = i;
    })
})

// console.log(cont)

// ACTION PENCIL
function actionPencil(e) {

    if (e.target.parentElement.parentElement.classList.contains('collection-item')) {
        let container = document.querySelectorAll('.collection-item')
        let conta = [...container]
        conta.forEach((a, i) => {
                a.addEventListener('click', () => {
                    // console.log(a, 'Index of ', i);
                    listIndex = i;
                })
            })
            // console.log('Action Pencil with index of ', listIndex)
        ui.updateField(listIndex)
        ui.updateBtn()

    }

    e.preventDefault()
}

// UPDATING LIST
function updateList(e) {
    console.log("Index to be updated ", listIndex)
    const mealData = JSON.parse(localStorage.getItem('mealData'))
    let mdValue = mealData[listIndex]
    mdValue.name = food.value
    mdValue.cal = calorie.value
        // updating LS
    localStorage.setItem('mealData', JSON.stringify(mealData))

    // updating 
    console.log('updating =>', cont[listIndex])
    ui.updateList(listIndex)
    collection.innerHTML = ''
    db.listFoodData()
        // resetting buttons
    ui.resetBtns()
        //Add cal
    db.addCal()
        // clear fields
    ui.clearFields()

    console.log('Updated successfully');
    e.preventDefault()
}

//  DELETING LIST
function removeList(e) {
    ui.removeList(cont[listIndex]);
    // from LS
    db.removeListfromLS(listIndex)

    // resetting btns
    ui.resetBtns()
        // CLEAR fields
    ui.clearFields();
    //Add cal
    db.addCal()

    e.preventDefault()
}

function clealAllList(e) {
    if (confirm('Are you sure')) {
        // CLEARING UI
        ui.clearAllList(cont)

        // Clearing LS
        db.clearAllList()
            // total CAl
        db.addCal()

    }
    e.preventDefault()
}