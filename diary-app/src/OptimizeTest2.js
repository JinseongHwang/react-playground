import React, {memo, useEffect, useState} from 'react';

// 전달받은 props의 타입이 number 타입이다. 들어온 props가 변경되지 않았기 때문에 리렌더링을 트리거하지 않는다.
const CounterA = memo(({count}) => {
    useEffect(() => {
        console.log(`CounterA Update - count : ${count}`)
    });
    return <div>{count}</div>
});

// 잔딜받은 props의 타입이 Obj 타입이고, 얕은 비교를 해봤을 때 객체의 주소가 다르기 때문에 리렌더링을 트리거한다.
// areEqual 메서드를 전달해서 깊은 비교를 강제할 수 있다.
const areEqual = (prevProps, nextProps) => {
    return prevProps.obj.count === nextProps.obj.count;
}
const CounterB = memo(({obj}) => {
    useEffect(() => {
        console.log(`CounterB Update - count : ${obj.count}`)
    });
    return <div>{obj.count}</div>
}, areEqual);

const OptimizeTest2 = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    });

    return (
        <div style={{padding: 50}}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count}/>
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <CounterB obj={obj}/>
                <button onClick={() => setObj({
                    count: obj.count
                })}>B button
                </button>
            </div>
        </div>
    );
};

export default OptimizeTest2;