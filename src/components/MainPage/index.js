import React from 'react';
import styles from './index.module.css';
import Input from '../Input';
import {connect} from "react-redux";
import SignUp from "../SignUp";


class MainPage extends React.Component {
    render() {
        return (
            <div className={styles.blocks}>
                <div className={styles.search_block}>
                    <Input name="search" placeholder="Search" className={styles.search_input}/>
                </div>
                <div className={styles.text_block}>
                    <div className={styles.text}>
                        <div className={styles.major_text}>
                            Build to share achievements
                        </div>
                        <div className={styles.small_text}>
                            This site is created for you. Now you can store all your projects in one place
                        </div>
                    </div>
                    <SignUp/>
                </div>
            </div>
        );
    }
}

export default connect()(MainPage);