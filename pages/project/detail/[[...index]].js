// Import Library
import axios from 'axios';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Import Custom Library
import { cx } from '../../../components/Helper';
import { HideLoading, ShowLoading } from '../../../components/store/reducer';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/project/detail.module.css';

export async function getServerSideProps(context) {
    const index = context.params.index;
    return {
        props: {
            project_id: index[0],
            reference_number: index[1]
        },
    };
}

export default function Index(props) {

    const [getDataDetailProject, setDataDetailProject] = useState([]);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const config = {
            headers: {
                ...process.env.config.headers,
                token: JSON.parse(localStorage.getItem(process.env.storageName)).token
            }
        }

        dispatch(ShowLoading());

        const formData = new FormData();

        formData.append('project_id', props.project_id);

        axios.post(`${process.env.baseURL}/api/project/detail_project`, formData, config).then(response => {
            let data = response.data.data;

            console.log(data);

            setDataDetailProject(data);

            dispatch(HideLoading());
        }).catch(error => {
            console.log(error);

            dispatch(HideLoading());
        });
    }, [props.project_id]);

    return (
        <div className={cx(global.container_width, style.container)}>
            <p className={style.title}>Your Reference Number</p>
            <p className={style.reference_number}>{props.reference_number}</p>
            <p className={cx(style.note, global.mb_24)}>Please save this reference number to see your results later</p>
            {getDataDetailProject?.survey_questions?.length > 0 &&
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
                            {getDataDetailProject.survey_questions.map((item, index) =>
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
                {+getDataDetailProject?.status === 1 &&
                    <React.Fragment>
                        <p>Great News!</p>
                        <p>Your project can help to generate</p>
                        <p className={global.fw_bold}>{getDataDetailProject?.calculation_result?.amount_emission} MWh</p>
                        <p>renewable energy</p>
                        <br />
                        <p>It is eligible for I-REC issuance with</p>
                        <p>annual potential revenue of up to</p>
                        <p className={global.fw_bold}>USD {getDataDetailProject?.calculation_result?.amount_usd}</p>
                        <br />
                        {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                            <p>Sign up and register your project with us if you&apos;re interested to proceed :)</p>
                        }
                    </React.Fragment>
                }
                {+getDataDetailProject?.status === 2 &&
                    <React.Fragment>
                        <p>Great News!</p>
                        <p>Your project can help to reduce</p>
                        <p className={global.fw_bold}>{getDataDetailProject?.calculation_result?.amount_emission} tons CO2e emission</p>
                        <br />
                        <p>It is eligible for Carbon Credit issuance</p>
                        <p>with annual potential revenue of up to</p>
                        <p className={global.fw_bold}>USD {getDataDetailProject?.calculation_result?.amount_usd}</p>
                        <br />
                        {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                            <p>Sign up and register your project with us if you&apos;re interested to proceed :)</p>
                        }
                    </React.Fragment>
                }
                {+getDataDetailProject?.status === 3 &&
                    <React.Fragment>
                        <p>It looks like your project might help to reduce</p>
                        <p className={global.fw_bold}>{getDataDetailProject?.calculation_result?.amount_emission} tons CO2e emission</p>
                        <p>but it might not be eligible for Carbon</p>
                        <p>Mechanism yet!</p>
                        <br />
                        {JSON.parse(localStorage.getItem(process.env.storageName))?.token ? null :
                            <p>Sign up for a free consultation to find out how to be eligible!</p>
                        }
                    </React.Fragment>
                }
                {+getDataDetailProject?.status === 4 &&
                    <React.Fragment>
                        <p>Good news!</p>
                        <p>Your project can help to reduce</p>
                        <p className={global.fw_bold}>{getDataDetailProject?.calculation_result?.amount_emission} tons CO2e emission</p>
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
                {+getDataDetailProject?.status === 5 &&
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
                <Link href={{ pathname: `/question/11`, query: { reference_number: props.reference_number } }}>
                    <button type='button' className={global.button} onClick={() => dispatch(ShowLoading())}>Update Project</button>
                </Link>
                {/* <Link href={`/project/register/${props.project_id}`}>
                    <button type='button' className={global.button}>Project Registration</button>
                </Link>
                <button type='button' className={global.button}>Download PDF</button> */}
            </div>
            <div className={cx(style.action, global.mt_24)}>
                <Link href={`/project`}>
                    <button type='button' className={global.button}>Back to list project</button>
                </Link>
            </div>
        </div >
    )
}
