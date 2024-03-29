import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [originData, setOriginData] = useState();

    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(it => parseInt(it.id) === parseInt(id))
            console.log(targetDiary)

            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigate("/", {replace: true})
            }
        }
    }, [id, diaryList]);

    return (
        <div>
            {/*originData가 있으면 뒤에 컴포넌트를 렌더링한다는 의미*/}
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
};

export default Edit;