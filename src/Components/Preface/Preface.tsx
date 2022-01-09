import React from "react";
import {Time} from "../Time/Time";
import s from "./Preface.module.css"

export const Preface = () => {
    return (
        <div>
            <div className={s.preface}>
                <p>Dear friend,</p>
                <p>This beautiful app is created to help you to understand how soon You can reach your financial goals.
                    Reading motivation books about finances is fine, but sometimes people should to LOOK at possible
                    result to really get motivated. At least, that works for me. I do invest, save money and dream to be
                    really financial-independent person, but sometimes I also think: should I do like that or is it
                    maybe better to live here and now? And such kind of thoughts are actually painful for my
                    motivation.</p>

                <p>That is why I created this app. Just fill information about assets you have now and you will see
                    how much it could be in the nearest future if you keep going! You can also test some scenarios,
                    where you will save different amounts of your salary income also.</p>

                <p>Section of shares is special. It allows you not only to create understandable portfolio, but also
                    fetch prices of its’ units online! It is also possible to look at chart, that shows how did your
                    portfolio changed during past years and, based on it, how it can possibly change in the
                    future.</p>
                <p>And yeah, all the information you input here is not accessible for me – it will be stored in your
                    browser. It is safe and you will get access to that later, if you want to come back of course.
                    So, don’t worry, nobody will know how much do you earn:)</p>

                <p>If you have any idea how to improve this application (add more feature or change logic of
                    predicting for example), fill free to contact me!</p>

            </div>
            <Time/>
        </div>
    )
}