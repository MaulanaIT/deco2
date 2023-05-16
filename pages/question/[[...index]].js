// Import Library
import axios from 'axios';
import GoogleMap from 'google-map-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

// Import Custom Library
import { cx, InputFormatAlphabet, InputFormatNumber } from '../../components/Helper';
import { HideLoading, ShowLoading } from '../../components/store/reducer';

// Import Assets
import IconMapMarker from '/public/assets/ic-map-marker.svg';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/question.module.css';

export async function getServerSideProps(context) {
    const index = context.params.index;

    const { data } = await axios.get(`${process.env.baseURL}/api/survey/get_survey_question/${index.join('/')}`, process.env.config);

    const props = data.data;

    return { props: { props } };
}

const Marker = ({ text }) => {
    return (
        <React.Fragment>
            <div className={style.marker}>
                <Image src={IconMapMarker} width={24} height={32} alt="Map Marker" />
                {/* <p className={style.coordinate}>{text}</p> */}
            </div>
        </React.Fragment>
    )
}

export default function Index({ props }) {

    const [getAnswerData, setAnswerData] = useState([]);
    const [getDisabledButton, setDisabledButton] = useState(false);

    const [getDataMonth, setDataMonth] = useState([]);
    const [getDataYear, setDataYear] = useState([]);

    const [getMarker, setMarker] = useState([]);

    const [getQuestionData, setQuestionData] = useState({});
    const [getQuestionNumber, setQuestionNumber] = useState(0);

    const [getValueMonth, setValueMonth] = useState('');
    const [getValueYear, setValueYear] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();

    const ButtonNext = () =>
        <Link href={`/question/${props.survey_group_id}/${getAnswerData[getQuestionNumber]?.answer?.next_question}/${router?.query?.reference_number ? `?reference_number=${router?.query?.reference_number}` : ''}`}>
            <button type='button' className={style.next} onClick={NextQuestion} disabled={getDisabledButton}>Next</button>
        </Link>;

    const ButtonApply = () =>
        <button type='button' className={style.apply} onClick={SubmitSurvey} disabled={getDisabledButton}>Apply</button>

    useEffect(() => {
        let currentYear = moment().year();
        let startYear = +currentYear - 100;

        let dataMonth = [];
        let dataYear = [];

        for (let i = 1; i < 13; i++) {
            if (i < 10) dataMonth.push(`0${i}`);
            else dataMonth.push(i);
        }

        for (let i = startYear; i <= +currentYear; i++) {
            dataYear.push(i);
        }

        setDataMonth(dataMonth);
        setDataYear(dataYear);
        setValueYear(startYear);
    }, []);

    useEffect(() => {
        (+getQuestionData.question_type === 2 && +props.survey_textbox_validation === 3) && InsertAnswer();
    }, [getValueMonth, getValueYear]);

    useEffect(() => {
        if (router.query.index.length > 1 && getAnswerData.length === 0)
            window.location.href = `/question/${props.survey_group_id}/`;
    }, [router.query.index]);

    useEffect(() => {
        console.log(props);
        GetOption();
        setDisabledButton(false);
        dispatch(HideLoading());
    }, [props]);

    const AddMarker = (e) => {
        let marker = [];

        marker.push(
            <Marker key={0} lat={e.lat} lng={e.lng} text={`${e.lat}, ${e.lng}`} />
        );

        let answerData = [...getAnswerData];
        let answerCurrent = {
            id: props.survey_id,
            answer: []
        };

        answerData.splice(getQuestionNumber + 1, answerData.length);

        answerCurrent.answer = {
            next_question: props.survey_next_survey_id ?? props.options.find(data => +data.value === +item.value).next_question,
            value: `${e.lat},${e.lng}`
        };

        let checkIndexData = answerData.findIndex(item => +item.id === +props.survey_id);

        if (checkIndexData < 0) {
            answerData.push(answerCurrent);
        } else {
            answerData[checkIndexData] = answerCurrent;
        }

        console.log(answerData);
        setAnswerData(answerData);
        setMarker(marker);
    }

    const GetOption = () => {
        setQuestionData({
            question: props.survey_question,
            question_type: props.survey_answer_type,
            options: props.options,
            is_skip: props.survey_is_skip
        });
    }

    const InsertAnswer = () => {
        let answerData = [...getAnswerData];
        let answerCurrent = {
            id: props.survey_id,
            answer: []
        };

        let answer = document.getElementsByName('answer');

        answerData.splice(getQuestionNumber + 1, answerData.length);

        if (+getQuestionData.question_type === 3) {
            answerCurrent.answer.next_question = '';
            answerCurrent.answer.value = [];
            answerCurrent.answer.custom = [];

            answer.forEach(item => {
                if (item.checked) {
                    answerCurrent.answer.next_question = props.survey_next_survey_id ?? props.options.find(data => +data.value === +item.value).next_question;

                    let customValue = item.parentNode.querySelector('[name="answer-custom"]')

                    if (customValue) answerCurrent.answer.custom.push(customValue.value)
                    else answerCurrent.answer.custom.push(null)

                    answerCurrent.answer.value.push(item.value);
                }
            });
        } else if (+getQuestionData.question_type === 1 || +getQuestionData.question_type === 4) {
            answer.forEach(item => {
                if (item.checked) answerCurrent.answer = {
                    next_question: props.survey_next_survey_id ?? props.options.find(data => +data.value === +item.value).next_question,
                    value: item.value
                };
            });
        } else if (+getQuestionData.question_type === 2) {
            if (+props.survey_textbox_validation === 3) {
                if (getValueYear === '') return;

                answerCurrent.answer = {
                    next_question: props.survey_next_survey_id ?? props.options.find(data => +data.value === +item.value).next_question,
                    value: answer[0].value
                };
            } else {
                answerCurrent.answer = {
                    next_question: props.survey_next_survey_id ?? props.options.find(data => +data.value === +item.value).next_question,
                    value: answer[0].value
                };
            }
        }

        let checkIndexData = answerData.findIndex(item => +item.id === +props.survey_id);

        if (checkIndexData < 0) {
            answerData.push(answerCurrent);
        } else {
            answerData[checkIndexData] = answerCurrent;
        }

        console.log(answerData);
        setAnswerData(answerData);
    }

    const NextQuestion = () => {
        let questionNumber = getQuestionNumber + 1;

        setQuestionNumber(questionNumber);
        dispatch(ShowLoading());
        setDisabledButton(true);
    }

    const PrevQuestion = () => {
        let questionNumber = getQuestionNumber - 1;

        setQuestionNumber(questionNumber);
        dispatch(ShowLoading());
        setDisabledButton(true);
    }

    const SubmitSurvey = () => {
        dispatch(ShowLoading());
        setDisabledButton(true);

        const config = {};

        if (localStorage.getItem(process.env.storageName)) {
            config = {
                headers: {
                    ...process.env.config.headers,
                    token: JSON.parse(localStorage.getItem(process.env.storageName)).token
                }
            }
        } else {
            config = { ...process.env.config }
        }

        const formData = new FormData();

        if (router?.query?.reference_number) {
            formData.append('reference_number', router?.query?.reference_number);
        }

        formData.append('survey_group_id', props.survey_group_id);

        for (const item of getAnswerData) {
            if (typeof item.answer.custom === 'object') {
                item.answer.custom.forEach((value, index) => {
                    if (value) formData.append(`answer[${item.id}][]`, value);
                    else formData.append(`answer[${item.id}][]`, item.answer.value[index]);
                })
            } else {
                if (typeof item.answer.value === 'object') {
                    for (const value of item.answer.value) {
                        formData.append(`answer[${item.id}][]`, value);
                    }
                } else {
                    formData.append(`answer[${item.id}][]`, item.answer.value);
                }
            }
        }

        axios.post(`${process.env.baseURL}/api/survey/submit_survey`, formData, config).then(response => {
            let data = response.data.data;

            console.log(response);

            window.location.href = `/question_result/${props.survey_group_id}/${data.reference_number}`;
        }).catch(error => {
            console.log(error);

            setDisabledButton(false);
            dispatch(HideLoading());
        });
    }

    return (
        <div className={cx(global.container_width, style.container)}>
            <div className={style.card}>
                <p className={style.question}>{getQuestionData.question}</p>
                <p className={style.question_note}>{props.survey_notes}</p>
                <div className={style.box}>
                    {+getQuestionData.question_type === 3 &&
                        getQuestionData.options.map((item, index) =>
                            <div key={index} className={style.checkbox}>
                                <input type="checkbox" name='answer' value={item.value} checked={
                                    typeof getAnswerData[getQuestionNumber]?.answer?.value === 'object' &&
                                    getAnswerData[getQuestionNumber]?.answer?.value?.some(data => data === item.value)
                                } onChange={InsertAnswer} />
                                <span>{item.label}</span>
                                {(typeof getAnswerData[getQuestionNumber]?.answer?.value === 'object' &&
                                    getAnswerData[getQuestionNumber]?.answer?.value?.some(data => data === item.value && +item.custom_value === 1)) &&
                                    <div className={global.input_group}>
                                        <input type="text" name='answer-custom' onChange={InsertAnswer} />
                                    </div>
                                }
                            </div>
                        )
                    }
                    {(+getQuestionData.question_type === 2 && +props.survey_textbox_validation === 0) &&
                        <input type="text" name="answer" id="answer" className={style.text} placeholder={'Amount . . .'} defaultValue={getAnswerData[getQuestionNumber]?.answer?.value ?? ''} onChange={InsertAnswer} />
                    }
                    {(+getQuestionData.question_type === 2 && +props.survey_textbox_validation === 1) &&
                        <input type="text" name="answer" id="answer" className={style.text} placeholder={'Amount . . .'} defaultValue={getAnswerData[getQuestionNumber]?.answer?.value ?? ''} onInput={InputFormatNumber} onChange={InsertAnswer} />
                    }
                    {(+getQuestionData.question_type === 2 && +props.survey_textbox_validation === 2) &&
                        <input type="text" name="answer" id="answer" className={style.text} placeholder={'Amount . . .'} defaultValue={getAnswerData[getQuestionNumber]?.answer?.value ?? ''} onInput={InputFormatAlphabet} onChange={InsertAnswer} />
                    }
                    {(+getQuestionData.question_type === 2 && +props.survey_textbox_validation === 3) &&
                        <div className={global.input_group}>
                            <select name="select-month" id="select-month" value={getValueMonth} onChange={e => setValueMonth(e.target.value)}>
                                <option key={-2} value={''}>Select Month</option>
                                <option value={'Unknown'}>Unknown</option>
                                {(getDataMonth && getDataMonth.length > 0) && getDataMonth.map((item, index) =>
                                    <option key={index} value={item}>{item}</option>
                                )}
                            </select>
                            <select name="select-year" id="select-year" value={getValueYear} onChange={e => setValueYear(e.target.value)}>
                                {(getDataYear && getDataYear.length > 0) && getDataYear.map((item, index) =>
                                    <option key={index} value={item}>{item}</option>
                                )}
                            </select>
                            <input type="text" name='answer' value={`${getValueMonth !== 'Unknown' ? `${getValueMonth}/` : ''}${getValueYear}`} style={{ visibility: 'hidden' }} readOnly={true} />
                        </div>
                    }
                    {(+getQuestionData.question_type === 1 || +getQuestionData.question_type === 4) &&
                        getQuestionData.options.map((item, index) =>
                            <div key={index} className={style.checkbox}>
                                <input type="radio" name='answer' value={item.value} checked={getAnswerData[getQuestionNumber]?.answer?.value === item.value && true} onChange={InsertAnswer} />
                                <span>{item.label}</span>
                            </div>
                        )
                    }
                    {+getQuestionData.question_type === 5 &&
                        <div style={{ width: '100%', height: 400 }}>
                            <GoogleMap
                                bootstrapURLKeys={'AIzaSyBxcjztAZ9aDjO4JcCGxr8fAwF1l6YXssk'}
                                defaultZoom={10}
                                defaultCenter={{ lat: -6.200000, lng: 106.816666 }}
                                yesIWantToUseGoogleMapApiInternals
                                onClick={e => AddMarker(e)}>
                                {getMarker}
                            </GoogleMap>
                        </div>
                    }
                </div>
                <div className={style.submit}>
                    {getQuestionNumber > 0 &&
                        <Link href={`/question/${props.survey_group_id}/${getAnswerData[getQuestionNumber - 1]?.id}`}>
                            <button type='button' className={style.prev} onClick={PrevQuestion} disabled={getDisabledButton}>Prev</button>
                        </Link>
                    }
                    {console.log(getQuestionData)}
                    {/* Tombol navigasi untuk opsi checkbox */}
                    {+getQuestionData.question_type === 3 ?
                        +getQuestionData.is_skip === 0 ?
                            (typeof getAnswerData[getQuestionNumber] === 'undefined' || getAnswerData[getQuestionNumber]?.answer?.value?.length <= 0) ?
                                // Checkbox harus diisi dan user tidak memilih
                                ButtonApply()
                                :
                                // Checkbox harus diisi dan user memilih
                                (+getAnswerData[getQuestionNumber]?.answer?.next_question === 9999 || +props.survey_next_survey_id === 9999) ?
                                    ButtonApply()
                                    :
                                    ButtonNext()
                            :
                            // Checkbox tidak harus diisi
                            (+getAnswerData[getQuestionNumber]?.answer?.next_question === 9999 || +props.survey_next_survey_id === 9999) ?
                                ButtonApply()
                                :
                                ButtonNext()
                        :
                        // Tombol navigasi untuk opsi selain checkbox
                        (getAnswerData[getQuestionNumber]?.answer?.next_question && getAnswerData[getQuestionNumber]?.answer?.value) ?
                            (+getAnswerData[getQuestionNumber]?.answer?.next_question === 9999 || +props.survey_next_survey_id === 9999) ?
                                ButtonApply()
                                :
                                ButtonNext()
                            :
                            null
                    }
                </div>
                <p className={style.note}>Please check your answer before submit!</p>
            </div>
        </div >
    )
}
