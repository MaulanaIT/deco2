// Import Library
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Custom Library
import { HidePopupResponse } from './store/reducer';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/response.module.css';

export default function Response() {

    const StorePopupResponse = useSelector((state) => state.store.PopupResponse);
    
    const dispatch = useDispatch();

    return (
        <div className={style.container}>
            <div className={style.box}>
                <p className={style.response} dangerouslySetInnerHTML={{__html: StorePopupResponse.response}}></p>
                <button type='button' className={global.button} style={{padding: '4px 16px'}} onClick={() => dispatch(HidePopupResponse())}>Close</button>
            </div>
        </div>
    )
}
