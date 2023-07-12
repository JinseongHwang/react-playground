export {};

// keyof
// key 값들을 유니온으로 뽑아준다.

interface User {
    id: number,
    name: string,
    age: number,
    gender?: 'm' | 'f'
}

type UserKey = keyof User // 'id' | 'name' | 'age' | 'gender'

const uk1: UserKey = "name" // Good!
const uk2: UserKey = "gender" // Good!
// const uk3: UserKey = "abc"; // Error!

// Partial<T>
// 일부를 optional 로 만들어준다.
let admin1: Partial<User> = {
    id: 1,
    name: "bob"
    // age와 gender가 없어도 에러가 발생하지 않는다.
}

// Required<T>
// ? 로 선언된 optional 프로퍼티까지 모두 필수로 작성해야 한다.
let admin2: Required<User> = {
    id: 0,
    name: "",
    age: 0,
    gender: 'm',
}

// Readonly<T>
// 읽기 전용으로 바꾼다.
let admin3: Readonly<User> = {
    id: 1,
    name: 'bob',
    age: 10
}
// admin3.age = 100 // Error!

// Record<K, T>
// 인터페이스가 굳이 필요없을 때 사용할 수 있음
interface OldScore {
    '1': 'A' | 'B' | 'C' | 'F',
    '2': 'A' | 'B' | 'C' | 'F',
    '3': 'A' | 'B' | 'C' | 'F',
    '4': 'A' | 'B' | 'C' | 'F',
}

const oldScore: OldScore = {
    "1": 'A',
    "2": 'B',
    "3": 'C',
    "4": 'F',
}

type Grade = '1' | '2' | '3' | '4'
type Score = 'A' | 'B' | 'C' | 'F'
const newScore: Record<Grade, Score> = {
    "1": 'A',
    "2": 'B',
    "3": 'C',
    "4": 'F',
}

// Record 활용
const isValid = (user: User) => {
    const result: Partial<Record<keyof User, boolean>> = {
        id: user.id > 0,
        name: user.name !== '',
        age: user.age > 0
    }
    return result
}

// Pick<T, K>
// T에서 특징 key만 골라서 사용할 수 있다.
const admin4: Pick<User, 'id' | 'name'> = {
    id: 0,
    name: ""
}

// Omit<T, K>
// 특정 프로퍼트를 생략하고 사용할 수 있다.
const admin5: Omit<User, 'age' | 'gender'> = {
    id: 0,
    name: ""
}

// Exclude<T1, T2>
// 특정 타입을 생략하고 사용할 수 있다.
type T1 = string | number | boolean
type T2 = Exclude<T1, number | string>
// const foo1: T2 = 'abc' // Error!
// const foo2: T2 = 123 // Error!
const foo3: T2 = true // Good

// NonNullable<T>
// null과 undefined를 걸러준다.
type T3 = string | null | undefined | void
type T4 = NonNullable<T3>
const foo4: T4 = 'abc'


