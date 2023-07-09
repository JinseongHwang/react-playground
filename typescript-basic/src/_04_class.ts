export {};

class Car1 {
    color: string; // 미리 선언해줘야 함
    constructor(color: string) {
        this.color = color
    }
}

class Car2 {
    // es6에서 기본적으로 접근제한자를 제공하지 않는다.
    // 하지만 ts에서는 제공해준다 : public, private, protected
    // 따로 명시해주지 않으면 기본적으로 public이다.
    // private으로 작성해주면 클래스 내에서면 사용 가능하고, #변수명 으로 축약 표기할 수 있다.
    // protected는 자식 클래스 내부에서는 참조할 수 있으나 클래스 인스턴스로는 접근이 불가능하다.
    constructor(public color: string) {
        this.color = color
    }
}

class Car3 {
    // readonly를 붙여주면 수정 불가능하다.
    // 생성자 내에서만 값 할당이 가능하다.
    constructor(readonly color: string) {
        this.color = color
    }
}

class Car4 {
    // static 변수는 클래스명.변수명 으로 접근 가능하다.
    // 인스턴스 변수로는 접근이 불가능하다.
    static foo: string = 'bar'
}

// 추상 클래스 (java와 유사)
abstract class Car5 {
    abstract doSomething(): void
}
class Car5Impl extends Car5 {
    doSomething(): void {
        console.log('Hello world')
    }
}
const car5: Car5 = new Car5Impl()
car5.doSomething()

