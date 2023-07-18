import React, {useEffect, useState} from 'react';

const TextView = React.memo(({text}) => {
    useEffect(() => {
        console.log(`Update :: Text : ${text}`);
    });
    return <div>{text}</div>;
});

const CountView = React.memo(({count}) => {
    useEffect(() => {
        console.log(`Update :: Count : ${count}`);
    });
    return <div>{count}</div>;
});

// OptimizeTest 는 상위 컴포넌트이다.
// 하위 컴포넌트로 TextView 와 CountView를 가지고 있다.
// text가 변경되면, 변경된 text의 state를 저장하는 OptimizeTest와 props를 전달받는 TextView가 리렌더링된다.
// 하지만 상위 컴포넌트가 리렌더링 될 때 하위 컴포넌트도 모두 리렌더링 되어야 한다는 규칙 때문에 CountView도 함께 리렌더링된다.
//
// React.memo 라는 고차 컴포넌트를 사용해서 이 문제를 해결할 수 있다. (wrapping component를 받아서 enhanced component를 반환함)
// 래핑되는 컴포넌트에 전달되는 props가 동일하다는 조건 하에 리렌더링이 되지 않는다. 즉 최적화 가능한 포인트이다.
const OptimizeTest1 = () => {
    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return (
        <div style={{padding: 50}}>
            <div>
                <h2>count</h2>
                <CountView count={count}/>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <TextView text={text}/>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
        </div>
    );
};

export default OptimizeTest1;