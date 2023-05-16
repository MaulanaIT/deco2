// Import Library
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

// Import Custom Library
import { cx } from '../Helper';

// Import Assets
import IconClimateInvestor from '/public/assets/ic-climate-investor.webp';
import IconInterestedInvestor from '/public/assets/ic-interested-investor.webp';
import IconNegativeClients from '/public/assets/ic-carbon-negative.webp';
import IconPositiveClients from '/public/assets/ic-carbon-positive.webp';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/home/our_mission.module.css';
import Link from 'next/link';

const containerVariant = {
    hidden: { opacity: 1, scale: 0 },
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

export default function OurMission() {

    const OpenEmail = subject => {
        window.open(`mailto:contact.us@deco2.green?subject=${subject}`);
    }

    return (
        <section id="our-mission" className={style.our_mission}>
            <div className={cx(global.container_width, style.content)}>
                <motion.div variants={containerVariant} {...container} className={style.title}>
                    <motion.p variants={itemVariant}>Help the world achieve its <span className={global.fw_bold}>net zero</span> target</motion.p>
                </motion.div>
                <div className={style.section}>
                    <motion.div variants={containerVariant} {...container} className={style.item}>
                        <motion.div variants={itemVariant} className={style.photo}>
                            <Image src={IconPositiveClients} width={96} height={96} alt='Icon Positive Clients' />
                        </motion.div>
                        <motion.div variants={itemVariant} className={style.description}>
                            <p className={style.title}>Carbon Positive Organizations</p>
                            <p>We can help you in your journey <br /> to become carbon neutral <br /> and renewable energy reliant</p>
                            <br />
                            <div>
                                <button type="button" className={global.button} onClick={() => OpenEmail('Interested to buy Carbon Offsets')}>Buy Carbon Offsets</button>
                            </div>
                            <div>
                                <button type="button" className={global.button} onClick={() => OpenEmail('Interested to buy I-RECs')}>Buy I-RECs</button>
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div variants={containerVariant} {...container} className={style.item}>
                        <motion.div variants={itemVariant} className={style.photo}>
                            <Image src={IconNegativeClients} width={96} height={96} alt='Icon Positive Clients' />
                        </motion.div>
                        <motion.div variants={itemVariant} className={style.description}>
                            <p className={style.title}>Carbon Negative Organizations</p>
                            <p>We can help you generate revenue <br /> from your carbon offsets and <br /> renewable energy generation</p>
                            <br />
                            <div>
                                <Link href={'/question/11'}>
                                    <button type="button" className={global.button}>Check your eligibility</button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                <motion.div variants={containerVariant} {...container} className={style.title}>
                    <motion.p variants={itemVariant}>Find the right <span className={global.fw_bold}>partner</span> for your green projects</motion.p>
                </motion.div>
                <div className={style.section}>
                    <motion.div variants={containerVariant} {...container} className={style.item}>
                        <motion.div variants={itemVariant} className={style.photo}>
                            <Image src={IconClimateInvestor} width={96} height={96} alt='Icon Climate Investor' />
                        </motion.div>
                        <motion.div variants={itemVariant} className={style.description}>
                            <p className={style.title}>For Climate Investors</p>
                            <p>Help us create a better earth <br /> through investing in our sustainable <br /> project partners</p>
                            <br />
                            <div>
                                <button type="button" className={global.button} onClick={() => OpenEmail('Interested to Invest in Projects')}>Get more information</button>
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div variants={containerVariant} {...container} className={style.item}>
                        <motion.div variants={itemVariant} className={style.photo}>
                            <Image src={IconInterestedInvestor} width={96} height={96} alt='Icon Interested Investor' />
                        </motion.div>
                        <motion.div variants={itemVariant} className={style.description}>
                            <p className={style.title}>For Green Project Owners</p>
                            <p>Get in touch with us to get funding <br /> from Climate Investors</p>
                            <br />
                            <div>
                                <button type="button" className={global.button} onClick={() => OpenEmail('Interested to get Financing')}>Connect to Investors</button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
