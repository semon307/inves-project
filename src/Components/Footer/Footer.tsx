import React from "react";
import s from "./Footer.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faTelegram} from "@fortawesome/free-brands-svg-icons";

export const Footer = React.memo(() => {
    return (
        <div className={s.footerBlock}>
            <div className={`${s.container} ${s.footerContainer}`}>
                <div className={s.content}>
                    <div className={s.title}>Developed by Semen Kozhin</div>
                    <div className={s.iconBlock}>
                        <div className={s.icon}><a href={"https://github.com/semon307"} target={"_blank"}><FontAwesomeIcon className={s.fontAwesome} icon={faGithub}/></a></div>
                        <div className={s.icon}><a href={"https://www.linkedin.com/in/semen-kozhin-4a1a22127/"} target={"_blank"}><FontAwesomeIcon className={s.fontAwesome} icon={faLinkedin}/></a></div>
                        <div className={s.icon}><a href={"https://t.me/apostol3007"} target={"_blank"}><FontAwesomeIcon className={s.fontAwesome} icon={faTelegram}/></a></div>
                        <div className={s.icon}><a href={"https://www.facebook.com/semonkozhin/"} target={"_blank"}><FontAwesomeIcon className={s.fontAwesome} icon={faFacebook}/></a></div>
                    </div>
                    <div className={s.title}>© 2022 All rights reserved</div>
                </div>
            </div>

        </div>
    )
})