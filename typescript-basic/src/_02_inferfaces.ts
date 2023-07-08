export {};

enum Gender {
    MALE, FEMALE,
}

type Score = 'A' | 'B' | 'C' | 'F'

interface User {
    name: string,
    age: number,
    gender?: Gender, // optional
    readonly birthYear: number, // immutable
    [grade: number]: Score,
}

const user1: User = {
    name: 'jinseong',
    age: 30,
    birthYear: 2000
}
const user2: User = {
    name: 'jinseong',
    age: 30,
    gender: Gender.MALE,
    birthYear: 2001,
    1: 'A',
    // 2: 'b', // Error! : Score에 포함된 값이 아님
}
user2.gender = Gender.FEMALE
// user2.birthYear = 123 // Error! : readonly라서 수정 불가능
console.log(user1)
console.log(Gender[user2.gender]) // FEMALE

// ====================================

interface Add {
    (a: number, b: number): number;
}
const add: Add = (a, b) => {
    return a + b
}
console.log(add(1, 2))

interface IsAdult {
    (age: number): boolean
}
const isAdult: IsAdult = (age) => {
    return age > 19
}
console.log(isAdult(3))

// ====================================

interface Car {
    color: string,
    wheels: number,
    start(): void
}

class Bmw implements Car {
    color
    wheels = 4

    constructor(color: string) {
        this.color = color
    }
    start(): void {
        console.log('go...')
    }
}
const bmwCar = new Bmw('red')
console.log(bmwCar)
bmwCar.start()

// ====================================

interface Benz extends Car {
    door: number,
    stop(): void,
}
class BenzCar implements Benz {
    color = 'green';
    door = 2;
    wheels = 4;

    start(): void {
        console.log('start!!!')
    }

    stop(): void {
        console.log('stop!!!')
    }
}
const benzCar = new BenzCar()
console.log(benzCar)
benzCar.start()
benzCar.stop()

