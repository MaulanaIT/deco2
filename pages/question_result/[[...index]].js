// Import Library
import axios from 'axios';
import Link from 'next/link';
import loadable from '@loadable/component';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

// Import Custom Library
import { cx, InputFormatNumber } from '../../components/Helper';
import { HideLoading, ShowLoading } from '../../components/store/reducer';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/question_result.module.css';

const FollowUp = loadable(() => import('/components/question-result/follow_up.js'));

export async function getServerSideProps(context) {
    const index = context.params.index;

    const { data } = await axios.get(`${process.env.baseURL}/api/survey/get_survey_question/${index[0]}`, process.env.config);

    const props = data.data;

    return { props: { props } };
}

export default function Index({ props = [] }) {

    const [getDataResult, setDataResult] = useState(null);

    const [getValueReferenceNumber, setValueReferenceNumber] = useState('');
    const [getValueError, setValueError] = useState('');

    const [getStatusFollowUp, setStatusFollowUp] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (router?.query?.index?.length > 1) {
            setValueReferenceNumber(router.query.index[1]);
        }
    }, [router.query.index]);

    useEffect(() => {
        if (router?.query?.index?.length > 1 && getValueReferenceNumber !== '') {
            GetResult();
        }
    }, [getValueReferenceNumber]);

    const GetResult = () => {
        if (getValueReferenceNumber === '') {
            document.getElementById('input-reference-number').focus();
            return
        }

        dispatch(ShowLoading());

        const formData = new FormData();

        formData.append('survey_group_id', props.survey_group_id);
        formData.append('reference_number', getValueReferenceNumber);

        axios.post(`${process.env.baseURL}/api/survey/survey_result`, formData, process.env.config).then(response => {
            let data = response.data.data;

            console.log(data);

            if (data.survey_questions && data.survey_questions.length > 0) {
                setDataResult(data);
            } else {
                setDataResult(null);
                setValueError(response.data.message);
            }

            dispatch(HideLoading());
        }).catch(error => {
            console.log(error);

            dispatch(HideLoading());
        });
    }

    return (
        <div className={cx(global.container_width, style.container)}>
            {getStatusFollowUp && <FollowUp close={() => setStatusFollowUp(false)} />}
            {!getDataResult &&
                <React.Fragment>
                    <p className={cx(global.mb_12, style.title_number)}>Input Your Reference Number</p>
                    <div className={cx(global.input_group, global.mb_12)}>
                        <input type="text" id='input-reference-number' value={getValueReferenceNumber} className={global.text_center} placeholder={`Reference Number . . .`} onInput={InputFormatNumber} onChange={e => setValueReferenceNumber(e.target.value)} required={true} />
                    </div>
                    <p className={cx(global.error, global.mb_24, global.text_center)}>{getValueError}</p>
                    <button type='button' className={global.button} onClick={GetResult}>Show Result</button>
                </React.Fragment>
            }
            {getDataResult &&
                <React.Fragment>
                    <p className={style.title}>Your Reference Number</p>
                    <p className={style.reference_number}>{getValueReferenceNumber}</p>
                    <p className={cx(style.note, global.mb_24)}>Please save this reference number to see your results later</p>
                    {getDataResult?.survey_questions?.length > 0 &&
                        <div className={cx(global.table_responsive, global.mb_24)}>
                            <table className={global.table}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Question</th>
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getDataResult.survey_questions.map((item, index) =>
                                        <tr key={index}>
                                            <th key={`title-${index}`}>Question {index + 1}</th>
                                            <td key={`question-${index}`}>{item.question}</td>
                                            <td key={`answer-${index}`} dangerouslySetInnerHTML={{ __html: item.answer }}></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                    <div className={style.congratulation}>
                        {+getDataResult?.status === 1 &&
                            <React.Fragment>
                                <p>Great News!</p>
                                <p>Your project can help to generate</p>
                                <p className={global.fw_bold}>{getDataResult?.calculation_result?.amount_emission} MWh</p>
                                <p>renewable energy</p>
                                <br />
                                <p>It is eligible for I-REC issuance with</p>
                                <p>annual potential revenue of up to</p>
                                <p className={global.fw_bold}>USD {getDataResult?.calculation_result?.amount_usd}</p>
                                <br />
                                {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                                    <p>Sign up and register your project with us if you&apos;re interested to proceed :)</p>
                                }
                            </React.Fragment>
                        }
                        {+getDataResult?.status === 2 &&
                            <React.Fragment>
                                <p>Great News!</p>
                                <p>Your project can help to reduce</p>
                                <p className={global.fw_bold}>{getDataResult?.calculation_result?.amount_emission} tons CO2e emission</p>
                                <br />
                                <p>It is eligible for Carbon Credit issuance</p>
                                <p>with annual potential revenue of up to</p>
                                <p className={global.fw_bold}>USD {getDataResult?.calculation_result?.amount_usd}</p>
                                <br />
                                {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                                    <p>Sign up and register your project with us if you&apos;re interested to proceed :)</p>
                                }
                            </React.Fragment>
                        }
                        {+getDataResult?.status === 3 &&
                            <React.Fragment>
                                <p>It looks like your project might help to reduce</p>
                                <p className={global.fw_bold}>{getDataResult?.calculation_result?.amount_emission} tons CO2e emission</p>
                                <p>but it might not be eligible for Carbon</p>
                                <p>Mechanism yet!</p>
                                <br />
                                {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                                    <p>Sign up for a free consultation to find out how to be eligible!</p>
                                }
                            </React.Fragment>
                        }
                        {+getDataResult?.status === 4 &&
                            <React.Fragment>
                                <p>Good news!</p>
                                <p>Your project can help to reduce</p>
                                <p className={global.fw_bold}>{getDataResult?.calculation_result?.amount_emission} tons CO2e emission</p>
                                <br />
                                <p>However, due to inherent issuance costs,</p>
                                <p>it looks like your project might not be</p>
                                <p>economically feasible yet for now.</p>
                                <br />
                                <p>Don&apos;t worry, costs sharing is possible!</p>
                                <br />
                                {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                                    <p>Sign up and register your project with us if you&apos;re interested in the costs sharing scheme :)</p>
                                }
                            </React.Fragment>
                        }
                        {+getDataResult?.status === 5 &&
                            <React.Fragment>
                                <p>Thank you for your interest in checking</p>
                                <p>your project&apos;s eligibility for carbon</p>
                                <p>mechanism!</p>
                                <br />
                                <p>Currently our team is working hard to</p>
                                <p>develop the tool for this scope which your</p>
                                <p>project falls under!</p>
                                <br />
                                <p>If you&apos;re still interested to register your</p>
                                <p>project for carbon issuance, please</p>
                                <Link href="/contact-us" className={global.primary_color}>contact us</Link>
                            </React.Fragment>
                        }
                    </div>
                    <div className={style.action}>
                        <Link href={`/question/${props.survey_group_id}`}>
                            <button type='button' className={global.button}>Retry</button>
                        </Link>
                        {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                            <Link href={`/register`}>
                                <button type='button' className={global.button}>Sign Up</button>
                            </Link>
                        }
                    </div>
                </React.Fragment>
            }
        </div >
    )
}
