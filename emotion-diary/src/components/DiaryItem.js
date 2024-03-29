import React from 'react';
import MyButton from "./MyButton";
import {useNavigate} from "react-router-dom";

const DiaryItem = ({id, emotion, content, date}) => {
    const navigate = useNavigate();
    const strDate = new Date(parseInt(date));

    const goDetail = () => {
        navigate(`/diary/${id}`)
    }
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className='DiaryItem'>
            <div className={['emotion_img_wrapper', `emotion_img_wrapper_${emotion}`].join(' ')}
                 onClick={goDetail}
            >
                <img src={`${process.env.PUBLIC_URL}assets/emotion${emotion}.png`} alt='emotion-image'/>
            </div>
            <div className='info_wrapper' onClick={goDetail}>
                <div className='diary_date'>
                    {`${strDate.getFullYear()}. ${strDate.getMonth() + 1}. ${strDate.getDate()}`}
                </div>
                <div className='diary_content_preview'>
                    {content.slice(0, 25)}
                </div>
            </div>
            <div className='btn_wrapper'>
                <MyButton text={'수정하기'} onClick={goEdit}/>
            </div>
        </div>
    );
};

export default DiaryItem;