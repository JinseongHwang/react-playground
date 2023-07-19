import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList"
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const App = () => {
    const [data, setData] = useState([])

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
        setData(initData)
    }
    useEffect(() => {
        getData();
    }, [])

    const onCreate = useCallback((author, content, emotion) => {
        const created_date = new Date().getTime()
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData((data) => [newItem, ...data]);
    }, []);

    const onRemove = useCallback((targetId) => {
        setData(data => data.filter(it => it.id !== targetId));
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        setData(data =>
            data.map(it => it.id === targetId ? {...it, content: newContent} : it)
        )
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
        <div className="App">
            {/*<LifeCycle1/>*/}
            {/*<LifeCycle2/>*/}
            {/*<OptimizeTest1/>*/}
            {/*<OptimizeTest2/>*/}
            <DiaryEditor onCreate={onCreate}/>

            <div>전체 일기 : {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {bacCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}%</div>

            <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
        </div>
    );
}

export default App;
