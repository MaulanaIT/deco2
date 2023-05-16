// Import Library
import Image from 'next/image';
import React from 'react';

// Import Custom Library
import { cx } from '../Helper';

// Import Assets
import FotoDebby from '/public/assets/debby.jpeg';
import FotoIndah from '/public/assets/indah.jpeg';
import FotoSaktiyo from '/public/assets/sakti.jpeg';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/home/who_we_are.module.css';

export default function WhoWeAre() {
    return (
        <section id="who-we-are" className={cx(global.container_width, style.who_we_are)}>
            <p className={style.section}>WHO WE ARE</p>
            <div className={cx(style.content, style.reverse)}>
                <div className={style.description}>
                    <p className={style.title}>Professional Profile</p>
                    <ol>
                        <li>Indah has 10 years of experience in financial sector, consulting and ocean conservation</li>
                        <li>Prior to co-founding DECO2, Indah is a Manager at EY-Parthenon and Associate Vice President at HSBC</li>
                        <li>Indah has exposure in multiple financial services including Retail banking and Wealth Management (RBWM), Commercial Banking, FinTech, Manufacturing, Healthcare and Retail Industry</li>
                        <li>Indah has extensive experience in Healthcare, Agriculture and Retail Industry</li>
                        <li>Currently Indah is also actively acting as Indonesia representative of Project Hiu, an
                            Australian based NGO which is running in shark conversation</li>
                    </ol>
                </div>
                <div className={style.photo}>
                    <Image src={FotoIndah} width={250} height={250} alt="Foto Indah" />
                    <p className={style.name}>Indah Purnama Sari</p>
                    <p className={style.job}>Co-Founder DECO2</p>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.photo}>
                    <Image src={FotoDebby} width={250} height={250} alt="Foto Debby" />
                    <p className={style.name}>Debby Reynata</p>
                    <p className={style.job}>Co-Founder DECO2</p>
                </div>
                <div className={style.description}>
                    <p className={style.title}>Professional Profile</p>
                    <ol>
                        <li>Debby has 9 years of extensive experience in the financial sector, both at the banking &amp;
                            corporate sides</li>
                        <li>Prior to co-founding DECO2, Debby was a Deputy General Manager Corporate Finance at PT Harum
                            Energy Tbk (Nickel Division) and Vice President Relationship Manager for Large Local Corporate
                            at PT HSBC Indonesia</li>
                        <li>Debby has exposure in multiple financial services end-to-end processes including Risk &amp;
                            Control Management, Credit Services &amp; Operations, Credit Analysis, Commercial Banking,
                            Corporate Banking, Corporate Finance</li>
                        <li>Debby has extensive experience in managing clients as well as working for corporate involved in
                            Coal Minning, Nickel Minning, Pharmaceutical, and Retail Industries</li>
                    </ol>
                </div>
            </div>
            <div className={cx(style.content, style.reverse)}>
                <div className={style.description}>
                    <p className={style.title}>Professional Profile</p>
                    <ol>
                        <li>Sakti has more than 18 years of experience in Project management, Climate change mechanism,
                            Project origination, Clean Development Mechanism (CDM), Green Climate Fund (GCF), financial and
                            business modeling, Budgeting, Financial planning, and Poverty reduction project through
                            infrastructure development and community empowerment (resolving fund and micro credit).</li>
                        <li>Prior to co-founding DECO2, Sakti was Head of Carbon Business at Wira Energy which is parent
                            company of DECO2, tasked to develop DECO2</li>
                    </ol>
                    <p className={style.title}>Relevant Certification</p>
                    <ol>
                        <li>Formulating proposals of low carbon climate resilient development: Designing Green Climate Fund
                            Projects, University of Twente, Netherland, 2016</li>
                        <li>Renewable Energy Service Corporations, GIZ, Jakarta, 2014</li>
                        <li>Greenship Associate from Green Building Council Indonesia (GBCI), Indonesia, 2013</li>
                        <li>Life cycle thinking on energy, food and agriculture in Asia, Ministry of Energy and Mineral
                            Resources, 2013</li>
                    </ol>
                </div>
                <div className={style.photo}>
                    <Image src={FotoSaktiyo} width={250} height={250} alt="Foto Saktiyo" />
                    <p className={style.name}>Saktiyo Tri Nugroho</p>
                    <p className={style.job}>Co-Founder DECO2</p>
                </div>
            </div>
        </section>
    )
}
