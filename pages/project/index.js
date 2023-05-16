// Import Library
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// Import Custom Library
import { cx } from '../../components/Helper';
import { HideLoading, ShowLoading } from '../../components/store/reducer';

// Import Assets
import global from '/styles/global.module.css';
import style from '/styles/project/project.module.css';

export default function Index() {

    const [gethtmlTableDaftarAfoluProject, sethtmlTableDaftarAfoluProject] = useState([]);
    const [gethtmlTableDaftarRenewableEnergyProject, sethtmlTableDaftarRenewableEnergyProject] = useState([]);

    const [getDataGeneratedPDD, setDataGeneratedPDD] = useState([]);
    const [getDataGeneratedPrePDD, setDataGeneratedPrePDD] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        GetProject();
    }, []);

    const GetProject = () => {
        const config = {
            headers: {
                ...process.env.config.headers,
                token: JSON.parse(localStorage.getItem(process.env.storageName)).token
            }
        }

        dispatch(ShowLoading());

        axios.get(`${process.env.baseURL}/api/project/list_project`, config).then(response => {
            let data = response.data.data;

            console.log(response);

            let htmlTableDaftarAfoluProject = [];
            let htmlTableDaftarRenewableEnergyProject = [];

            if (data) {
                if (data.afolu && data.afolu.length > 0) {
                    data.afolu.forEach((item, index) => {
                        htmlTableDaftarAfoluProject.push(
                            <tr key={`complex-${index}`}>
                                <td className={global.text_center}>{index + 1}.</td>
                                <td className={global.text_center}>{item.reference_number}</td>
                                <td>{item.project_name}</td>
                                <td className={global.text_center}>{moment(item.created_date).format('DD-MM-YYYY')}</td>
                                <td className={global.text_center}>{item.project_status_label}</td>
                                <td className={global.table_action}>
                                    <div className={global.button_group}>
                                        <Link href={{ pathname: `/project/detail/${item.project_id}/${item.reference_number}` }}>
                                            <div className={global.view} onClick={() => dispatch(ShowLoading())}>View</div>
                                        </Link>
                                        {+item.project_status === 1 &&
                                            <Link href={{ pathname: `/project/register/${item.project_id}/${item.reference_number}` }}>
                                                <div className={global.register} onClick={() => dispatch(ShowLoading())}>Project Registration</div>
                                            </Link>
                                        }
                                        {/* {(+item.project_status > 1 && !item.pre_pdd_file) &&
                                            <div className={cx(global.register, global.disabled)}>File Pre-PDD Not Available</div>
                                        } */}
                                        {/* {(+item.project_status > 1 && !item.pre_pdd_file) &&
                                            <div className={global.register} onClick={() => GeneratePrePDD(item.project_id)}>Generate PDF Pre-PDD</div>
                                        }
                                        {(+item.project_status > 1 && item.pre_pdd_file) &&
                                            <Link href={item.pre_pdd_file}>
                                                <a className={global.register} target={`_blank`} rel={`noreferrer`}>Download File PDF Pre-PDD</a>
                                            </Link>
                                        } */}
                                        {/* {(+item.project_status > 1 && !item.pdd_file) &&
                                            <div className={cx(global.register, global.disabled)}>File PDD Not Available</div>
                                        } */}
                                        {/* {(+item.project_status > 1 && !item.pdd_file) &&
                                            <div className={global.register} onClick={() => GeneratePDD(item.project_id)}>Generate PDF PDD</div>
                                        }
                                        {(+item.project_status > 1 && item.pdd_file) &&
                                            <div className={global.register}>Downlaod File PDF PDD</div>
                                        } */}
                                    </div>
                                </td>
                            </tr>
                        );
                    });
                } else {
                    htmlTableDaftarAfoluProject.push(
                        <tr key={`complex-1`} className={global.text_center}>
                            <td colSpan={6}>Tidak ada data ditemukan</td>
                        </tr>
                    );
                }

                if (data.renewable_energy && data.renewable_energy.length > 0) {
                    data.renewable_energy.forEach((item, index) => {
                        htmlTableDaftarRenewableEnergyProject.push(
                            <tr key={`simple-${index}`}>
                                <td className={global.text_center}>{index + 1}.</td>
                                <td className={global.text_center}>{item.reference_number}</td>
                                <td>{item.project_name}</td>
                                <td className={global.text_center}>{moment(item.created_date).format('DD-MM-YYYY')}</td>
                                <td className={global.text_center}>{item.project_status_label}</td>
                                <td className={global.table_action}>
                                    <div className={global.button_group}>
                                        <Link href={{ pathname: `/project/detail/${item.project_id}/${item.reference_number}` }}>
                                            <div className={global.view} onClick={() => dispatch(ShowLoading())}>View</div>
                                        </Link>
                                        {+item.project_status === 1 &&
                                            <Link href={{ pathname: `/project/register/${item.project_id}/${item.reference_number}` }}>
                                                <div className={global.register} onClick={() => dispatch(ShowLoading())}>Project Registration</div>
                                            </Link>
                                        }
                                        {(+item.project_status > 1 && !item.pre_pdd_file) &&
                                            <div className={global.register} onClick={() => GeneratePrePDD(item.project_id)}>Generate PDF Pre-PDD</div>
                                        }
                                        {(+item.project_status > 1 && item.pre_pdd_file) &&
                                            <Link href={item.pre_pdd_file}>
                                                <a className={global.register} target={`_blank`} rel={`noreferrer`}>Download File PDF Pre-PDD</a>
                                            </Link>
                                        }
                                        {(+item.project_status > 1 && !item.pdd_file) &&
                                            <div className={cx(global.register, global.disabled)}>File PDD Not Available</div>
                                        }
                                        {/* {(+item.project_status > 1 && !item.pdd_file) &&
                                            <div className={global.register} onClick={() => GeneratePDD(item.project_id)}>Generate PDF PDD</div>
                                        }
                                        {(+item.project_status > 1 && item.pdd_file) &&
                                            <div className={global.register}>Downlaod File PDF PDD</div>
                                        } */}
                                    </div>
                                </td>
                            </tr>
                        );
                    });
                } else {
                    htmlTableDaftarRenewableEnergyProject.push(
                        <tr key={`simple-1`} className={global.text_center}>
                            <td colSpan={6}>Tidak ada data ditemukan</td>
                        </tr>
                    );
                }
            }

            sethtmlTableDaftarAfoluProject(htmlTableDaftarAfoluProject);
            sethtmlTableDaftarRenewableEnergyProject(htmlTableDaftarRenewableEnergyProject);

            dispatch(HideLoading());
        }).catch(error => {
            console.log(error);

            dispatch(HideLoading());
        });
    }

    const GeneratePDD = (project_id) => {
        const config = {
            headers: {
                ...process.env.config.headers,
                token: JSON.parse(localStorage.getItem(process.env.storageName)).token
            }
        }

        dispatch(ShowLoading());

        const formData = new FormData();

        formData.append('project_id', project_id);
        formData.append('template', 'pdd');

        axios.post(`${process.env.baseURL}/api/document/pdf`, formData, config).then(() => {
            GetProject();
        }).catch(error => {
            console.log(error);

            dispatch(HideLoading());
        });
    }

    const GeneratePrePDD = (project_id) => {
        const config = {
            headers: {
                ...process.env.config.headers,
                token: JSON.parse(localStorage.getItem(process.env.storageName)).token
            }
        }

        dispatch(ShowLoading());

        const formData = new FormData();

        formData.append('project_id', project_id);
        formData.append('template', 'pre_pdd');

        axios.post(`${process.env.baseURL}/api/document/pdf`, formData, config).then(() => {
            GetProject();
        }).catch(error => {
            console.log(error);

            dispatch(HideLoading());
        });
    }

    return (
        <div className={cx(global.container_width, style.container)}>
            <p className={style.title}>Renewable Energy</p>
            <div className={cx(global.table_responsive, global.mb_24, global.w_100)}>
                <table className={cx(global.table, global.w_100)}>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID Reference</th>
                            <th>Nama Project</th>
                            <th>Tanggal Submit</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gethtmlTableDaftarRenewableEnergyProject}
                    </tbody>
                </table>
            </div>
            <p className={style.title}>AFOLU</p>
            <div className={cx(global.table_responsive, global.mb_24, global.w_100)}>
                <table className={cx(global.table, global.w_100)}>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID Reference</th>
                            <th>Nama Project</th>
                            <th>Tanggal Submit</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gethtmlTableDaftarAfoluProject}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
