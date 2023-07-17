import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList"

const dummyList = [
    {
        id: 1,
        author: "jinseong1",
        content: "hello world1",
        emotion: 1,
        created_date: new Date().getTime()
    },
    {
        id: 2,
        author: "jinseong2",
        content: "hello world2",
        emotion: 1,
        created_date: new Date().getTime()
    },
    {
        id: 3,
        author: "jinseong3",
        content: "hello world3",
        emotion: 1,
        created_date: new Date().getTime()
    },
]

function App() {
    return (
        <div className="App">
            <DiaryEditor/>
            <DiaryList diaryList={dummyList}/>
        </div>
    );
}

export default App;
