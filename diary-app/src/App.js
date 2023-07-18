import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList"
import {useRef, useState} from "react";
import LifeCycle1 from "./LifeCycle1";
import LifeCycle2 from "./LifeCycle2";

const App = () => {
    const [data, setData] = useState([])

    const dataId = useRef(0)

    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime()
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    };

    const onRemove = (targetId) => {
        const newDiaryList = data.filter(it => it.id !== targetId)
        setData(newDiaryList)
    }

    const onEdit = (targetId, newContent) => {
        setData(
            data.map(it => it.id === targetId ? {...it, content: newContent} : it)
        )
    }

    return (
        <div className="App">
            <LifeCycle1/>
            <LifeCycle2/>
            <DiaryEditor onCreate={onCreate}/>
            <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
        </div>
    );
}

export default App;
