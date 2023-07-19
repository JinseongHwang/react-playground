import React, {useReducer} from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 1:
            return state + 1;
        case 10:
            return state + 10;
        case 100:
            return state + 100;
        case 1_000:
            return state + 1_000;
        case 10_000:
            return state + 10_000;
        default:
            return state;
    }
};

const Counter = () => {
    /**
     * useReducer 함수를 구조분해할당 반환 값은 다음과 같다.
     * [1] state이다.
     * [2] state를 변화하는 action 함수를 트리거(raise)해주는 함수이다. Dispatch 함수라고 불린다.
     *
     * useReducer 함수의 인자는 다음과 같다.
     * [1] Dispatch 함수가 트리거 됐을때 실행되는 함수가 들어간다. 이 함수의 반환 값이 state로 할당된다.
     * [2] state의 초기값이다.
     */
    const [count, dispatch] = useReducer(reducer, 1);

    return (
        <div>
            {count}
            <br/>
            <button onClick={() => dispatch({type: 1})}>add 1</button>
            <button onClick={() => dispatch({type: 10})}>add 10</button>
            <button onClick={() => dispatch({type: 100})}>add 100</button>
            <button onClick={() => dispatch({type: 1_000})}>add 1000</button>
            <button onClick={() => dispatch({type: 10_000})}>add 10000</button>
        </div>
    );
};

const UseReducerExample = () => {
    return (
        <div style={{padding: 30}}>
            <Counter/>
        </div>
    );
};

export default UseReducerExample;
