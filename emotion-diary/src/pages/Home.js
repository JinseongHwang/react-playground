import React, {useContext, useEffect, useState} from 'react';
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import {DiaryStateContext} from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [currDate, setCurrDate] = useState(new Date());

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                currDate.getFullYear(), currDate.getMonth(), 1
            ).getTime();
            const lastDay = new Date(
                currDate.getFullYear(), currDate.getMonth() + 1, 0,23,59,59
            ).getTime();
            setData(diaryList.filter(it => firstDay <= it.date && it.date <= lastDay));
        }
    }, [diaryList, currDate]);

    const headDate = `${currDate.getFullYear()}년 ${currDate.getMonth() + 1}월`;

    const increaseMonth = () => {
        setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate()));
    }
    const decreaseMonth = () => {
        setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() - 1, currDate.getDate()));
    }

    return (
        <div>
            <MyHeader
                headText={headDate}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
                rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;