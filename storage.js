class DB {
    constructor() {
            this.cal = []

        }
        // Adding to LS
    store(value) {
        let mealData;
        if (localStorage.getItem('mealData') === null) {
            mealData = []
        } else {
            mealData = JSON.parse(localStorage.getItem('mealData'))
        }
        mealData.push(value)
        localStorage.setItem('mealData', JSON.stringify(mealData))

        // console.log('Stored successful')
    }

    // Display value
    listFoodData() {
        let Data;
        if (localStorage.getItem('mealData') === null) {
            console.log("No such file")
            Data = []
        } else {
            Data = JSON.parse(localStorage.getItem('mealData'));
            Data.forEach(a => {
                ui.showMealAndCalInfo(a)
                this.cal.push(Number(a.cal))
            })
            let totCal = this.cal.reduce((a, b) => a + b);
            if (this.cal.length === 0) {
                ui.showTotalCal(0)
            } else {
                ui.showTotalCal(totCal);
            }
        }
        // console.log(Data)


    }

    //Calculating Calories
    addCal() {
            let Data;
            let calBucket = []
            if (localStorage.getItem('mealData') !== null) {
                Data = JSON.parse(localStorage.getItem('mealData'))
                Data.forEach(a => {
                    calBucket.push(Number(a.cal))
                })
                if (calBucket.length === 0) {
                    ui.showTotalCal(0)
                } else {
                    let sumOfCal = calBucket.reduce((a, b) => a + b);
                    ui.showTotalCal(sumOfCal)
                }

            } else {
                console.log("No cal")
            }
        }
        // remove list from ls
    removeListfromLS(a) {
        let mealData = JSON.parse(localStorage.getItem('mealData'))
        mealData.splice(a, 1)
        localStorage.setItem('mealData', JSON.stringify(mealData));
        if (mealData.length === 0) {
            localStorage.removeItem('mealData')
        }
    }

    clearAllList() {

        localStorage.removeItem('mealData')

    }

}