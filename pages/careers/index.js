// Import Library
import React from 'react';
import { motion } from 'framer-motion';

// Import Styles
import global from '/styles/global.module.css';
import style from '/styles/careers.module.css';

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

export default function Index() {
    return (
        <div className={style.container}>
            <motion.div variants={containerVariant} {...container} className={global.container_width}>
                <motion.p variants={itemVariant} className={style.title}>Help Shape the Future of Our Planet</motion.p>
                <div className={style.description}>
                    <motion.p variants={itemVariant}>deCO2 is growing, and we are looking for people who are passionate about working on projects that matter.</motion.p>
                    <br />
                    <motion.p variants={itemVariant}>Whether you are an undergraduate looking for internship, a fresh graduate looking for your first ever job, a professional looking to work in sustainability space, or someone who simply share our vision, you are welcome to send your CV to us at <br/><a href='mailto:contact.us@deco2.green' className={global.primary_color}>contact.us@deco2.green</a></motion.p>
                </div>
            </motion.div>
        </div>
    )
}
