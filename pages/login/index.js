// Import Library
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// Import Custom Library
import { CheckInputValid, cx } from '../../components/Helper';
import { HideLoading, ShowLoading, ShowPopupResponse } from '../../components/store/reducer';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/login.module.css';
import axios from 'axios';

export default function Index() {

    const [getDisabledButton, setDisabledButton] = useState(false);

    const [getValueEmail, setValueEmail] = useState('');
    const [getValuePassword, setValuePassword] = useState('');

    const [getErrorEmail, setErrorEmail] = useState('');
    const [getErrorPassword, setErrorPassword] = useState('');

    const [getActiveValidation, setActiveValidation] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        ValidationEmail();
    }, [getValueEmail]);

    useEffect(() => {
        ValidationPassword();
    }, [getValuePassword]);

    useEffect(() => {
        setActiveValidation(true);
    }, []);

    const Login = async () => {
        await ValidationEmail();
        await ValidationPassword();

        if (CheckInputValid()) {
            dispatch(ShowLoading());
            setDisabledButton(true);

            const formData = new FormData();

            formData.append('member_email', getValueEmail);
            formData.append('member_password', getValuePassword);

            axios.post(`${process.env.baseURL}/api/microsite/login`, formData, process.env.config).then(response => {
                if (+response.data.ok < 1) dispatch(ShowPopupResponse({ text: response.data.message }));

                const config = {
                    headers: {
                        ...process.env.config.headers,
                        token: response.data.data.token
                    }
                }

                axios.get(`${process.env.baseURL}/api/profile/get_profile`, config).then(responseProfile => {
                    let dataProfile = responseProfile.data.data;

                    let login = {
                        email: dataProfile.member_email,
                        full_name: dataProfile.member_fullname,
                        token: response.data.data.token
                    }

                    setDisabledButton(false);
                    localStorage.setItem(process.env.storageName, JSON.stringify(login));

                    router.push('/');
                }).catch(error => {
                    console.log(error);

                    setDisabledButton(false);
                    dispatch(HideLoading());
                });
            }).catch(error => {
                console.log(error);

                setDisabledButton(false);
                dispatch(HideLoading());
            });
        }
    }

    const ValidationEmail = async () => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (getActiveValidation && getValueEmail === '') setErrorEmail('Email can not be empty')
        else if (getActiveValidation && !getValueEmail.match(regex)) setErrorEmail('Email is invalid')
        else setErrorEmail('');
    }

    const ValidationPassword = async () => {
        if (getActiveValidation && getValuePassword === '') setErrorPassword('Password can not be empty')
        else if (getActiveValidation && getValuePassword.length < 6) setErrorPassword('Password must have minimum 6 character')
        else setErrorPassword('');
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <p className={cx(style.title, global.mb_12)}>Sign In</p>
                <div className={cx(global.input_group, global.column, global.mb_12)}>
                    <p className={global.label}>Email</p>
                    <input type="email" value={getValueEmail} placeholder={`Email . . .`} onChange={e => setValueEmail(e.target.value)} required={true} />
                    <div className={global.error}>{getErrorEmail}</div>
                </div>
                <div className={cx(global.input_group, global.column, global.mb_24)}>
                    <p className={global.label}>Password</p>
                    <input type="password" value={getValuePassword} placeholder={`Password . . .`} min={6} onChange={e => setValuePassword(e.target.value)} required={true} />
                    <div className={global.error}>{getErrorPassword}</div>
                </div>
                <button type='button' className={cx(style.login, global.mb_6)} onClick={Login} disabled={getDisabledButton}>Sign In</button>
                <Link href={'/register'}>
                    <button type='button' className={style.register} disabled={getDisabledButton}>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}
