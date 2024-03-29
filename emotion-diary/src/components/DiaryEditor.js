import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "../App";
import {getStringDate} from "../utils/DateUtil";
import {emotionList} from "../utils/EmotionUtil";

const DiaryEditor = ({isEdit, originData}) => {
    const navigate = useNavigate();

    const contentRef = useRef();
    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate, onEdit} = useContext(DiaryDispatchContext)

    const handleClickEmotion = (emotionId) => {
        setEmotion(emotionId)
    };
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
            if (isEdit) {
                onEdit(originData.id, date, content, emotion);
            } else {
                onCreate(date, content, emotion);
            }
        }
        navigate("/", {replace: true})
    }

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className='DiaryEditor'>
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input
                            className='input_date'
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map(it => (
                            <EmotionItem
                                key={it.emotion_id}
                                onClick={handleClickEmotion}
                                isSelected={it.emotion_id === emotion}
                                {...it}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea
                            placeholder='오늘은 어땠나요?'
                            ref={contentRef}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <MyButton text='취소하기' onClick={() => navigate(-1)}/>
                        <MyButton text='작성완료' type='positive' onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;