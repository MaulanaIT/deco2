// Import Library
import axios from 'axios';
import GoogleMap from 'google-map-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

// Import Custom Library
import { HideLoading, ShowLoading, ShowPopupResponse } from '../../../components/store/reducer';
import { CheckInputValid, cx, InputFormatAlphabet, InputFormatNumber } from '../../../components/Helper';

// Import Assets
import IconFilePDF from '/public/assets/ic-file-pdf.svg';
import IconMapMarker from '/public/assets/ic-map-marker.svg';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/project/register.module.css';

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

export async function getServerSideProps(context) {
    const index = context.params.index;

    const project_id = index[0];

    return { props: { project_id } };
}

const Marker = () => {
    return (
        <React.Fragment>
            <div className={style.marker}>
                <Image src={IconMapMarker} width={24} height={32} alt="Map Marker" />
            </div>
        </React.Fragment>
    )
}

export default function Index({ project_id }) {

    const [getDataAnswer, setDataAnswer] = useState([]);
    const [getDataForm, setDataForm] = useState([]);
    const [getMarker, setMarker] = useState([]);

    const [getLifetimeMonth, setLifetimeMonth] = useState([]);
    const [getLifetimeYear, setLifetimeYear] = useState([]);

    const [getInsertFile, setInsertFile] = useState(false);

    const [getDisabledButton, setDisabledButton] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const config = {
            headers: {
                ...process.env.config.headers,
                token: JSON.parse(localStorage.getItem(process.env.storageName)).token
            }
        }

        dispatch(ShowLoading());

        const formData = new FormData();

        formData.append('project_id', project_id)

        axios.post(`${process.env.baseURL}/api/project/get_pre_registration_form`, formData, config).then(response => {
            let data = response.data.data;

            console.log(data);

            setDataForm(data);
            dispatch(HideLoading());
        }).catch(error => {
            console.log(error);

            dispatch(HideLoading());
        });

        let dataMonth = []
        let dataYear = []

        for (let i = 0; i < 12; i++) {
            dataMonth.push(i);
        }

        for (let i = 1; i < 51; i++) {
            dataYear.push(i);
        }

        setLifetimeMonth(dataMonth);
        setLifetimeYear(dataYear);
    }, []);

    useEffect(() => {
        setInsertFile(false);
    }, [getInsertFile]);

    const AddMarker = (survey_id, answer_type, e) => {
        let marker = [];

        marker.push(
            <Marker key={0} lat={e.lat} lng={e.lng} text={`${e.lat}, ${e.lng}`} />
        );
        InsertAnswer(survey_id, answer_type, `${e.lat},${e.lng}`);
        setMarker(marker);
    }

    const InputFile = (e) => {
        setInsertFile(true);
    }

    const InsertAnswer = (survey_id, answer_type, value) => {
        let dataAnswer = [...getDataAnswer];
        let currentAnswer = {
            id: survey_id,
            answer: []
        };

        let checkData = dataAnswer.findIndex(item => item.id === survey_id);

        if (checkData < 0) {
            if (+answer_type === 1) {
                currentAnswer.answer = value;
            } else if (+answer_type === 2) {
                currentAnswer.answer = value;
            } else if (+answer_type === 3) {
                currentAnswer.answer.push(value);
            } else if (+answer_type === 5) {
                currentAnswer.answer = value;
            } else if (+answer_type === 9) {
                currentAnswer.answer = value;
            }

            dataAnswer.push(currentAnswer);
        } else {
            if (+answer_type === 1) {
                dataAnswer[checkData].answer = value;
            } else if (+answer_type === 2) {
                dataAnswer[checkData].answer = value;
            } else if (+answer_type === 3) {
                let checkValue = dataAnswer[checkData].answer.findIndex(item => item === value);

                if (checkValue < 0) dataAnswer[checkData].answer.push(value);
                else dataAnswer[checkData].answer.splice(checkValue, 1);
            } else if (+answer_type === 5) {
                dataAnswer[checkData].answer = value;
            } else if (+answer_type === 9) {
                dataAnswer[checkData].answer = value;
            }
        }

        console.log(dataAnswer);
        setDataAnswer(dataAnswer.sort());
    }

    const SubmitSurvey = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(ShowLoading());
        setDisabledButton(true);

        const config = {
            headers: {
                ...process.env.config.headers,
                token: JSON.parse(localStorage.getItem(process.env.storageName)).token
            }
        }

        const formData = new FormData();

        formData.append('project_id', project_id);
        for (const item of getDataAnswer) {
            formData.append(`answer[${item.id}][]`, item.answer);
        }

        let elementFiles = document.querySelectorAll("input[type=file]");

        for (const item of elementFiles) {
            if (item?.files || item?.files?.length > 0) {
                formData.append(`${item.id}`, item.files[0]);
            }
        }

        axios.post(`${process.env.baseURL}/api/project/submit_pre_registration_form`, formData, config).then(response => {
            console.log(response);

            setDisabledButton(false);
            dispatch(HideLoading());
            if (response.data.ok) dispatch(ShowPopupResponse({ text: response.data.message, callback: 'Redirect', url: '/project' }));
            else dispatch(ShowPopupResponse({ text: 'There is something wrong, please try again.' }));
        }).catch(error => {
            console.log(error);

            setDisabledButton(false);
            dispatch(HideLoading());
            dispatch(ShowPopupResponse({ text: response.data.message }));
        });
    }

    return (
        <div className={style.container}>
            <motion.div variants={containerVariant} {...container} className={cx(global.container_width, style.content)}>
                <motion.p variants={itemVariant} className={style.title}>REGISTRATION FORM</motion.p>
                <div className={style.description}>
                    {/* <motion.p variants={itemVariant}>To save the world, we need as many people to sign up as possible!</motion.p>
                    <motion.p variants={itemVariant}>Because any chance at saving the world counts</motion.p> */}
                    <motion.form variants={itemVariant} className={style.form} onSubmit={SubmitSurvey}>
                        {(getDataForm && getDataForm.length > 0) && getDataForm.map((data, index) =>
                            <div key={index} className={cx(global.input_group, global.column, global.mb_12, global.w_100)}>
                                <p className={cx(global.title, global.w_100)}>{data.survey_question}</p>
                                <div className={cx(global.error, global.w_100)}>{data.survey_notes}</div>
                                {/* Answer type radio */}
                                {+data.survey_answer_type === 1 &&
                                    data.options.map((item, index) =>
                                        <div key={index} className={global.radio} onChange={() => InsertAnswer(data.survey_id, data.survey_answer_type, item.value)}>
                                            <input type="radio" value={item.value} checked={getDataAnswer?.some(value => value?.id === data?.survey_id && value?.answer === item?.value)} readOnly={true} required={true} />
                                            <span>{item.label}</span>
                                        </div>
                                    )
                                }
                                {/* Answer type textbox */}
                                {(+data.survey_answer_type === 2 && +data.survey_textbox_validation === 0) &&
                                    <input key={index} type="text" className={global.w_100} value={getDataAnswer?.find(value => value?.survey_id === data?.survey_id)?.answer} onChange={e => InsertAnswer(data.survey_id, data.survey_answer_type, e.target.value)} required={false} />
                                }
                                {(+data.survey_answer_type === 2 && +data.survey_textbox_validation === 1) &&
                                    <input key={index} type="text" className={global.w_100} value={getDataAnswer?.find(value => value?.survey_id === data?.survey_id)?.answer} onChange={e => InsertAnswer(data.survey_id, data.survey_answer_type, e.target.value)} onInput={InputFormatNumber} required={true} />
                                }
                                {(+data.survey_answer_type === 2 && +data.survey_textbox_validation === 2) &&
                                    <input key={index} type="text" className={global.w_100} value={getDataAnswer?.find(value => value?.survey_id === data?.survey_id)?.answer} onChange={e => InsertAnswer(data.survey_id, data.survey_answer_type, e.target.value)} onInput={InputFormatAlphabet} required={true} />
                                }
                                {(+data.survey_answer_type === 2 && +data.survey_textbox_validation === 3) &&
                                    <div className={global.checkbox}>
                                        <select id={`lifetime-month-${data.survey_id}`} onChange={e => InsertAnswer(data.survey_id, data.survey_answer_type, (+e.target.value + +document.getElementById(`lifetime-year-${data.survey_id}`).value * 12))} required={true}>
                                            <option key={-1} value={''}>Select Month</option>
                                            {getLifetimeMonth.length > 0 && getLifetimeMonth.map(item =>
                                                <option key={item} value={item}>{item}</option>
                                            )}
                                        </select>
                                        <span>&nbsp; Months &nbsp;</span>
                                        <select id={`lifetime-year-${data.survey_id}`} onChange={e => InsertAnswer(data.survey_id, data.survey_answer_type, (+e.target.value * 12 + +document.getElementById(`lifetime-month-${data.survey_id}`).value))} required={true}>
                                            <option key={-1} value={''}>Select Year</option>
                                            {getLifetimeYear.length > 0 && getLifetimeYear.map(item =>
                                                <option key={item} value={item}>{item}</option>
                                            )}
                                        </select>
                                        <span>&nbsp; Years</span>
                                    </div>
                                }
                                {(+data.survey_answer_type === 2 && +data.survey_textbox_validation === 4) &&
                                    <input key={index} type="date" className={global.w_100} value={getDataAnswer?.find(value => value?.survey_id === data?.survey_id)?.answer} onChange={e => InsertAnswer(data.survey_id, data.survey_answer_type, e.target.value)} required={true} />
                                }
                                {/* Answer type lifetime */}
                                {+data.survey_answer_type === 3 &&
                                    data.options.map((item, index) =>
                                        <div key={index} className={global.checkbox} onChange={() => InsertAnswer(data.survey_id, data.survey_answer_type, item.value)}>
                                            <input type="checkbox" value={getDataAnswer?.some(value => value?.id === data?.survey_id && value?.answer?.includes(item?.value))} readOnly={true} required={true} />
                                            <span>{item.label}</span>
                                            {+item.custom_value === 1 &&
                                                <div className={global.input_group}>
                                                    <input type="text" name='answer-custom' />
                                                </div>
                                            }
                                        </div>
                                    )
                                }
                                {/* Answer type map */}
                                {+data.survey_answer_type === 5 &&
                                    <div style={{ width: '100%', height: 400 }}>
                                        <GoogleMap
                                            bootstrapURLKeys={'AIzaSyBxcjztAZ9aDjO4JcCGxr8fAwF1l6YXssk'}
                                            defaultZoom={10}
                                            defaultCenter={{ lat: -6.200000, lng: 106.816666 }}
                                            yesIWantToUseGoogleMapApiInternals
                                            onClick={e => AddMarker(data.survey_id, data.survey_answer_type, e)}>
                                            {getMarker}
                                        </GoogleMap>
                                    </div>
                                }
                                {/* Answer type dropdown */}
                                {+data.survey_answer_type === 9 &&
                                    <div key={index} className={cx(global.input_group, global.w_100)}>
                                        <select className={global.w_100} onChange={(e) => InsertAnswer(data.survey_id, data.survey_answer_type, e.target.value)} required={true}>
                                            <option value="">Select your answer</option>
                                            {data.options.map((item, index) =>
                                                <option key={`option-${index}`} value={item.value}>{item.label}</option>
                                            )}
                                        </select>
                                    </div>
                                }
                                {/* Answer type file */}
                                {+data.survey_answer_type === 10 &&
                                    <div key={index} className={cx(global.input_group, global.w_100)}>
                                        <div className={cx(global.drop_file, global.w_100)}>
                                            {!document.getElementById(`file_${data.survey_id}`)?.files || document.getElementById(`file_${data.survey_id}`)?.files.length === 0 ?
                                                <React.Fragment>
                                                    <Image src={IconFilePDF} width={24} height={24} alt="Icon File PDF" />
                                                    <p>Select file</p>
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <Image src={IconFilePDF} width={24} height={24} alt="Icon File PDF" />
                                                    <p>{document.getElementById(`file_${data.survey_id}`)?.files[0]?.name}</p>
                                                </React.Fragment>
                                            }
                                            <input type="file" id={`file_${data.survey_id}`} accept={process.env.fileFormatProjectRegister} onChange={e => InputFile(e)} />
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                        <button type='submit' className={global.button} disabled={getDisabledButton}>Submit</button>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    )
}
