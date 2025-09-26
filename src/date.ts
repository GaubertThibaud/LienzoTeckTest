// Inti for the skill assessment are down in the file

class DateCalculator {
    readonly inputDate: Date;
    readonly turnaroundTime: number;

    readonly workingTime: number = 8;
    readonly workingTimeStrat: number = 9;
    readonly workingTimeEnd: number = this.workingTimeStrat + this.workingTime;

    constructor(inputDate: Date, turnaroundTime: number) {
        this.inputDate = inputDate;
        this.turnaroundTime = turnaroundTime;
    }

    public runCalcul(): void {
        console.log("INPUT DATE: " + this.inputDate);
        console.log("TIME TO ADD: " + this.turnaroundTime);

        if(!this.checkPostingInWorkingDay()) {
            return;
        }
        
        if(!this.checkPostingInWorkingHours()) {
            return;
        }

        let dateResult = this.calculNewDate();
        console.log("DATE RESULT: " + dateResult.toString());
    }

    public calculNewDate(): Date {
        const hours = this.inputDate.getHours();
        let addDays = Math.floor(this.turnaroundTime / this.workingTime);
        let addHours = this.turnaroundTime % this.workingTime;
        let dateResult = this.inputDate;

        if (hours + addHours > this.workingTimeEnd) {
            addDays ++;
            let newAddHours = (hours + addHours) % this.workingTimeEnd;
            dateResult.setHours(this.workingTimeStrat + newAddHours);            
        } else {
            dateResult.setHours(hours + addHours);
        }

        if (dateResult.getDay() + addDays >= 6) {
            let newAddDays = addDays % 5;
            let addWeeks = Math.floor(addDays / 5);
            // In this case we have to add 1 week more (so we add 2 days to the newAddDays since we going from base5 to base7)
            if (dateResult.getDay() + newAddDays >= 6) {
                newAddDays = newAddDays + 2;
            }
            dateResult.setDate(dateResult.getDate() + newAddDays + (addWeeks * 7));
        } else {
            dateResult.setDate(dateResult.getDate() + addDays);
        }

        return dateResult;
    }


    public checkPostingInWorkingHours(): boolean {
        // Working hours are from 9h to 17h
        if (this.inputDate.getHours() < this.workingTimeStrat || this.inputDate.getHours() > this.workingTimeEnd) {
            console.log("Ticket posted outside of the working hours");
            return false;
        }
        return true;
    }

    public checkPostingInWorkingDay(): boolean {
        // 6 = Saturday / 0 = Sunday
        if (this.inputDate.getDay() == 6 || this.inputDate.getDay() == 0) {
            console.log("Ticket posted outside of the working days");
            return false;
        }
        return true;
    }


}

//INIT off the tests (only here for the skill assessment)

console.log("Skill assessment!");
console.log("");

console.log("----- TEST 1 -----");
const testOne = new DateCalculator(
    new Date("2025-09-24T03:24:00"),
    16
);
testOne.runCalcul();
console.log("");

console.log("----- TEST 2 -----");
const testTwo = new DateCalculator(
    new Date("2025-09-24T22:24:00"),
    16
);
testTwo.runCalcul();
console.log("");

console.log("----- TEST 3 -----");
const testThree = new DateCalculator(
    new Date("2025-09-27T13:24:00"),
    16
);
testThree.runCalcul();
console.log("");

console.log("----- TEST 4 -----");
const testFour = new DateCalculator(
    new Date("2025-09-28T13:24:00"),
    16
);
testFour.runCalcul();
console.log("");

console.log("----- TEST 5 -----");
const testFive = new DateCalculator(
    new Date("2025-09-24T13:24:00"),
    18
);
testFive.runCalcul();
console.log("");

console.log("----- TEST 6 -----");
const testSix = new DateCalculator(
    new Date("2025-09-24T16:24:00"),
    19
);
testSix.runCalcul();
console.log("");

console.log("----- TEST 7 -----");
const testSeven = new DateCalculator(
    new Date("2025-09-29T16:24:00"),
    19
);
testSeven.runCalcul();
console.log("");

console.log("----- TEST 8 -----");
const testEight = new DateCalculator(
    new Date("2025-09-26T16:24:00"),
    19
);
testEight.runCalcul();
console.log("");
