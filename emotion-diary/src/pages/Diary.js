import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {DiaryStateContext} from "../App";
import MyHeader from "../components/MyHeader";
import {getStringDate} from "../utils/DateUtil";
import MyButton from "../components/MyButton";
import {emotionList} from "../utils/EmotionUtil";

const Diary = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // get path variable
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(it => parseInt(it.id) === parseInt(id))
            console.log(targetDiary)

            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("없는 일기입니다.");
                navigator("/", {replace: true});
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return (
            <div className='DiaryPage'>
                로딩중입니다...
            </div>
        )
    } else {

        const curreEmotionData = emotionList.find(it => (
            parseInt(it.emotion_id) === parseInt(data.emotion)
        ));
        console.log(curreEmotionData)

        return (
            <div className='DiaryPage'>
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)}/>}
                    rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)}/>}
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={[
                            'diary_img_wrapper',
                            `diary_img_wrapper_${curreEmotionData.emotion_id}`
                        ].join(' ')}>
                            <img src={curreEmotionData.emotion_img} alt="emot-img"/>
                            <div className='emotion_descript'>
                                {curreEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className='diary_content_wrapper'>
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;