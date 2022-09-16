class UI {
    constructor() {
        this.itemContainer = document.querySelector('.item-container')
        this.food = document.getElementById('item')
        this.calorie = document.getElementById('calorie')
        this.heading = document.querySelector('.main-heading')
        this.food = document.getElementById('item');
        this.calorie = document.getElementById('calorie');
        this.editBtn = document.getElementById('edit')
        this.clearBtn = document.getElementById('clear')
        this.addBtn = document.getElementById('add')
        this.backBtn = document.getElementById('back')

    }

    showEmptyFieldAlert() {
            console.log('Field cannot be Empty');
        }
        // clearing Fields
    clearFields() {
        this.food.value = ''
        this.calorie.value = ''
            // console.log("Fields cleared...")
    }

    showMealAndCalInfo(meal) {
        this.itemContainer.innerHTML += `
        <li class="collection-item">
            <strong>${meal.name} : </strong><i>${meal.cal} Calories</i> <a href="#!" class="secondary-content"><i id="pencil" class="material-icons pencil">create</i></a>
        </li>`
    }
    showTotalCal(totCal) {
            this.heading.innerHTML = ` <h4>Total Calories: ${totCal}</h4>`
        }
        // Update Field
    updateField(i) {
        console.log('checking ', i)
        const mealData = JSON.parse(localStorage.getItem('mealData'))
        console.log(mealData)
        this.food.value = mealData[i].name;
        this.calorie.value = mealData[i].cal;
    }

    updateBtn() {
        this.addBtn.style = 'display:none'
        this.editBtn.style = 'display:inline-block'
        this.clearBtn.style = 'display:inline-block'
        this.backBtn.style = 'display:none'
    }
    resetBtns() {
        this.addBtn.style = 'display:inline-block'
        this.editBtn.style = 'display:none'
        this.clearBtn.style = 'display:none'
        this.backBtn.style = 'display:inline-block'
    }

    updateList(lIndex) {
        console.log(lIndex)
        let mealData = JSON.parse(localStorage.getItem('mealData'))
        let md = mealData[lIndex];

        console.log('old name ', md.name, 'New name ', this.food.value)

        // document.querySelectorAll(`li:nth-child(${lIndex})`).innerHTML = `
        //                 <strong>${this.food.value} : </strong><i>${this.calorie.value} Calories</i> <a href="#!" class="secondary-content"><i id="pencil" class="material-icons pencil">create</i></a>
        //     `
    }

    removeList(md) {
        console.log('to be removed is ', md)
        md.remove()

    }

    clearAllList(md) {
        // console.log('Removing all list', md);
        // removing from ui
        md.forEach(a => {
            a.remove()
        })
    }





}