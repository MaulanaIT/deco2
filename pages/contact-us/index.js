// Import Library
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

// Import Custom Library
import { CheckInputValid, cx } from '../../components/Helper';
import { HideLoading, ShowLoading, ShowPopupResponse } from '../../components/store/reducer';

// Import Assets
import IconFilePDF from '/public/assets/ic-file-pdf.svg';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/contact_us.module.css';

const containerVariant = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemVariant = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

const container = {
    initial: "hidden",
    whileInView: "visible",
    viewport: {
        once: true
    }
}

export default function Index() {

    const [getDisabledButton, setDisabledButton] = useState(false);

    const [getValueFullName, setValueFullName] = useState('');
    const [getValueOrganization, setValueOrganization] = useState('');
    const [getValueEmail, setValueEmail] = useState('');
    const [getValuePhone, setValuePhone] = useState('');
    const [getValueSubject, setValueSubject] = useState('');
    const [getValueMessage, setValueMessage] = useState('');

    const [getErrorFullName, setErrorFullName] = useState('');
    const [getErrorOrganization, setErrorOrganization] = useState('');
    const [getErrorEmail, setErrorEmail] = useState('');
    const [getErrorPhone, setErrorPhone] = useState('');
    const [getErrorSubject, setErrorSubject] = useState('');
    const [getErrorMessage, setErrorMessage] = useState('');

    const [getFileName, setFileName] = useState('');
    const [getErrorFileName, setErrorFileName] = useState('');

    const [getActiveValidation, setActiveValidation] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        let dropArea = document.getElementById('drop-area');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, PreventDefaults, false);
        });

        dropArea.addEventListener('drop', HandleDrop, false);
    }, []);

    useEffect(() => {
        ValidationEmail();
    }, [getValueEmail]);

    useEffect(() => {
        ValidationOrganization();
    }, [getValueOrganization]);

    useEffect(() => {
        ValidationSubject();
    }, [getValueSubject]);

    useEffect(() => {
        ValidationMessage();
    }, [getValueMessage]);

    useEffect(() => {
        ValidationFullName();
    }, [getValueFullName]);

    useEffect(() => {
        ValidationPhone();
    }, [getValuePhone]);

    useEffect(() => {
        setActiveValidation(true);
    }, []);

    const HandleDrop = (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;

        setFileName(files[0].name);
    }

    const InputFile = (e) => {
        let files = e.target.files;

        setFileName(files[0].name);
    }

    const PreventDefaults = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const SendEmail = async (e) => {
        await ValidationFullName();
        await ValidationEmail();
        await ValidationPhone();
        await ValidationOrganization();
        await ValidationSubject();
        await ValidationMessage();

        if (CheckInputValid()) {
            dispatch(ShowLoading());
            setDisabledButton(true);
            e.preventDefault();

            const formData = new FormData();

            const file = document.getElementById('input-file').files[0];

            formData.append('contact_fullname', getValueFullName);
            formData.append('contact_organization', getValueOrganization);
            formData.append('contact_email', getValueEmail);
            formData.append('contact_phone', getValuePhone.replace(/\s/g, ''));
            formData.append('contact_subject', getValueSubject);
            formData.append('contact_message', getValueMessage);
            formData.append('contact_attachment', file);

            axios.post(`${process.env.baseURL}/api/microsite/submit_contact`, formData, process.env.config).then(response => {
                dispatch(ShowPopupResponse({ text: response.data.message }));

                setDisabledButton(false);
                dispatch(HideLoading());
            }).catch(error => {
                console.log(error);

                setDisabledButton(false);
                dispatch(HideLoading());
            });
        }
    }

    const ValidationFullName = async () => {
        if (getActiveValidation && getValueFullName === '') setErrorFullName('Full Name can not be empty')
        else setErrorFullName('');
    }

    const ValidationOrganization = async () => {
        if (getActiveValidation && getValueOrganization === '') setErrorOrganization('Organization can not be empty')
        else setErrorOrganization('');
    }

    const ValidationSubject = async () => {
        if (getActiveValidation && getValueSubject === '') setErrorSubject('Subject can not be empty')
        else setErrorSubject('');
    }

    const ValidationMessage = async () => {
        if (getActiveValidation && getValueMessage === '') setErrorMessage('Message can not be empty')
        else setErrorMessage('');
    }

    const ValidationEmail = async () => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (getActiveValidation && getValueEmail === '') setErrorEmail('Email can not be empty')
        else if (getActiveValidation && !getValueEmail.match(regex)) setErrorEmail('Email is invalid')
        else setErrorEmail('');
    }

    const ValidationPhone = async () => {
        if (getActiveValidation && getValuePhone === '') setErrorPhone('Phone number can not be empty')
        else setErrorPhone('');
    }

    return (
        <div className={style.container}>
            <motion.div variants={containerVariant} {...container} className={cx(global.container_width, style.content)}>
                <motion.p variants={itemVariant} className={style.title}>Contact Us</motion.p>
                <div className={style.description}>
                    <motion.p variants={itemVariant}>To save the world, we need as many people to sign up as possible!</motion.p>
                    <motion.p variants={itemVariant}>Because any chance at saving the world counts</motion.p>
                    <motion.div variants={itemVariant} className={style.form}>
                        <div className={global.input_group}>
                            <p className={global.title}>Full Name</p>
                            <p>:</p>
                            <input type="text" name='full_name' value={getValueFullName} onChange={e => setValueFullName(e.target.value)} required={true} />
                            <div className={global.error}>{getErrorFullName}</div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}>Organization</p>
                            <p>:</p>
                            <input type="text" name='organization' value={getValueOrganization} onChange={e => setValueOrganization(e.target.value)} required={true} />
                            <div className={global.error}>{getErrorOrganization}</div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}>Email Address</p>
                            <p>:</p>
                            <input type="text" name='email' value={getValueEmail} onChange={e => setValueEmail(e.target.value)} required={true} />
                            <div className={global.error}>{getErrorEmail}</div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}>Phone</p>
                            <p>:</p>
                            <div className={global.input_phone}>
                                <PhoneInput country={`id`} value={getValuePhone} inputProps={{ required: true }} onChange={(phone, country, e, data) => setValuePhone(data)} />
                            </div>
                            <div className={global.error}>{getErrorPhone}</div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}>Subject</p>
                            <p>:</p>
                            <input type="text" name='subject' value={getValueSubject} onChange={e => setValueSubject(e.target.value)} required={true} />
                            <div className={global.error}>{getErrorSubject}</div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}>Message</p>
                            <p>:</p>
                            <textarea cols="30" rows="10" name='message' value={getValueMessage} onChange={e => setValueMessage(e.target.value)} required={true}></textarea>
                            <div className={global.error}>{getErrorMessage}</div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}></p>
                            <p></p>
                            <div className={global.drop_file} id={'drop-area'}>
                                {getFileName === '' ?
                                    <React.Fragment>
                                        <Image src={IconFilePDF} width={24} height={24} alt="Icon File PDF" />
                                        <p>Drop a file here</p>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Image src={IconFilePDF} width={24} height={24} alt="Icon File PDF" />
                                        <p>{getFileName}</p>
                                    </React.Fragment>
                                }
                                <input type="file" id='input-file' onChange={e => InputFile(e)} required={true} />
                                <div className={global.error}>{getErrorFileName}</div>
                            </div>
                        </div>
                        <div className={global.input_group}>
                            <p className={global.title}></p>
                            <p></p>
                            <button type='submit' className={style.button} onClick={SendEmail} disabled={getDisabledButton}>Submit</button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
