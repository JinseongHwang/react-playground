import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList"
import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import UseReducerExample from "./UseReducerExample";

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            const created_date = new Date().getTime();
            const new_item = {
                ...action.data,
                created_date
            };
            return [new_item, ...state];
        }
        case 'REMOVE': {
            return state.filter(it => it.id !== action.targetId);
        }
        case 'EDIT': {
            return state.map(it =>
                it.id === action.targetId ? {...it, content: action.newContent} : it
            );
        }
        default:
            return state;
    }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

const App = () => {
    const [data, dispatch] = useReducer(reducer, []);

    const dataId = useRef(0)

    const getData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/comments")
            .then(res => res.json())
        const initData = res.slice(0, 20)
            .map(it => {
                return {
                    author: it.email,
                    content: it.body,
                    emotion: Math.floor(Math.random() * 5) + 1,
                    created_date: new Date().getTime(),
                    id: dataId.current++
                };
            })
        dispatch({type: "INIT", data: initData});
    }
    useEffect(() => {
        getData();
    }, [])

    const onCreate = useCallback((author, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {author, content, emotion, id: dataId.current}
        })
        dataId.current += 1;
    }, []);

    const onRemove = useCallback((targetId) => {
        dispatch({type: "REMOVE", targetId});
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        dispatch({type: "EDIT", targetId, newContent});
    }, []);

    const memoizedDispatches = useMemo(() => {
        return {onCreate, onRemove, onEdit}
    }, []);

    // useMemo의 첫번째 인자인 callback 함수 내부의 반환값을 그대로 반환한다.
    // 두번째 인자에는 리스트가 들어가는데 아래의 의미는 data.length가 변경되지 않으면 다시 호출되지 않고 기억된 값을 불러온다는 특징이 있다.
    // 두번째 인자의 이름이 dependency array인 이유이다.
    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter(it => it.emotion >= 3).length;
        const bacCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return {goodCount, bacCount, goodRatio};
    }, [data.length]);
    const {goodCount, bacCount, goodRatio} = getDiaryAnalysis;

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={memoizedDispatches}>
                <div className="App">
                    {/*<LifeCycle1/>*/}
                    {/*<LifeCycle2/>*/}
                    {/*<OptimizeTest1/>*/}
                    {/*<OptimizeTest2/>*/}
                    {/*<UseReducerExample/>*/}
                    <DiaryEditor/>

                    <div>전체 일기 : {data.length}</div>
                    <div>기분 좋은 일기 개수 : {goodCount}</div>
                    <div>기분 나쁜 일기 개수 : {bacCount}</div>
                    <div>기분 좋은 일기 비율 : {goodRatio}%</div>

                    <DiaryList/>
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
};

export default App;
