export {};

// hello와 hello2 는 동일하게 동작한다
function hello(name?: string) {
    return `Hello, ${name || "World"}`
}
console.log(hello())
console.log(hello('jinseong'))

function hello2(name = 'World') {
    return `Hello, ${name}`
}
console.log(hello2())
console.log(hello2('jinseong'))

function addAll(...nums: number[]) {
    return nums.reduce((result, num) => result + num, 0)
}
console.log(addAll(1, 2, 3))
console.log(addAll(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))

// ================================================================

interface User {
    name: string,
    age?: number,
}
const Eddy: User = {
    name: 'eddy'
}
function showName(this: User) {
    console.log(this.name)
}
const boundEddy = showName.bind(Eddy)
boundEddy()

// ================================================================

// 타입이 여러개라면 오버로딩 해준다.
function join(name: string, age: number): User
function join(name: string, age: string): string
function join(name: string, age: number | string): User | string {
    if (typeof age === 'number') {
        return {
            name, age
        };
    } else {
        return '나이는 숫자로 입력해주세요.';
    }
}
const sam: User = join('Sam', 20);
const jane: string = join('Jane', '25');
console.log(sam)
console.log(jane)