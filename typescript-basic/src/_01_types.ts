export {};

// 변수
const myname: string = "jinseong"
console.log(myname)

// 배열
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
console.log(arr1)
console.log(arr2)

// 튜플
let tuple: [string, number, boolean] = ['Hello', 123, true]
console.log(tuple)

// object
const user: { name: string, age: number } = {
    name: "John",
    age: 25
}
console.log(user)

// 함수
function add1(a: number, b: number): number {
    return a + b
}
console.log(add1(1, 2))

const add2 = (a: number, b: number): number => {
    return a + b
}
console.log(add2(3, 4))

// void : 아무것도 반환하지 않을 때
function print(text: string): void {
    console.log(text)
}

// never : 절대 반환하지 않는 경우
function showError(): never {
    throw new Error()
}

function infLoop(): never{
    while (true) {
        // do something...
    }
}

// enum
enum Fruit {
    Apple,
    Banana,
    Carrot,
    Daangn
}
const favFruit: Fruit = Fruit.Carrot
console.log(favFruit) // 2
console.log(favFruit == 2) // true
console.log(favFruit === 2) // true

// null, undefined
let v1: null = null
let v2: undefined = undefined

// type alias
type User = {
    id: string,
    name: string,
    age: number,
}
const userStruct: User = {
    id: "123",
    name: "jinseong",
    age: 25,
}
console.log(userStruct)

// union type (|)
type Job = "police" | "developer" | "teacher"
const myjob: Job = "developer"

type Grade = 1 | 2 | 3 | 4
const mygrade: Grade = 4

interface Car {
    name: 'car',
    color: string,
    start(): void,
}

interface Mobile {
    name: 'mobile',
    color: string,
    call(): void,
}

function getGift(gift: Car | Mobile) {
    console.log(gift.color)
    if (gift.name === 'car') {
        gift.start();
    } else {
        gift.call()
    }
}

// intersection types (교차 타입)
interface A {
    name: string,
    start(): void,
}
interface B {
    name: string,
    color: string,
    price: number,
}
const ab: A & B = {
    name: "에이비",
    start() {
        console.log('...start')
    },
    color: 'blue',
    price: 10_000
}
console.log(ab)
