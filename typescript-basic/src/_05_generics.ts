export {};

const getSize = <T>(arr: T[]): number => {
    return arr.length
}

const arr1 = [1, 2, 3]
console.log(getSize(arr1))

const arr2 = ['a', 'b', 'c']
console.log(getSize(arr2))

const arr3 = [false, true]
console.log(getSize(arr3))

const arr4 = [{}, [], {name: 'jinseong'}]
console.log(getSize(arr4))

// =============================================

interface Mobile<T> {
    name: string,
    price: number,
    option: T
}

type AppleOption = {
    color: string,
    coupon: boolean,
}

const m1: Mobile<AppleOption> = {
    name: 'apple iphone14',
    price: 100,
    option: {
        color: 'red',
        coupon: false
    }
}
const m2: Mobile<string> = {
    name: 'galaxy s22',
    price: 100,
    option: 'good'
}

// ===========================================

interface User {
    name: string,
    age: number,
}

interface Car {
    name: string,
    color: string,
}

interface Book {
    price: number,
}

// T는 name: string 프로퍼티를 가지고 있다.
// name: string 프로퍼티가 없는 객체가 T로 들어오면 컴파일 에러!
const showName = <T extends { name: string }>(data: T): string => {
    return data.name
}
const user: User = {name: 'js', age: 10}
const car: Car = {name: 'audi', color: 'black'}
const book: Book = {price: 1000}
showName(user)
showName(car)
// showName(book) // Error!