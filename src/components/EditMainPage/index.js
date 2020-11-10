import React from 'react';
import styles from './index.module.css';
import {connect} from "react-redux";
import ImageUpload from "../../uploadService";
import {setUserAction} from "../../actions/user";
import User from "../../userService/User";
import { useState } from 'react';

function EditMainPage(props) {
    const [photo, setPhoto] = useState(props.data.photo);

    let _handleChange = event => {
        const key = event.target.name;
        props.data[key] = event.target.value;
    };

    let editMainPage = event => {
        event.preventDefault();
        let new_user = new User(...props.user.Fields, props.user.projects);
        new_user.fullName = props.data.fullName;
        new_user.description = props.data.description;
        new_user.photo = photo;
        props.setUser(new_user).then(() => {
            props.endEditing();
        });
    };


    return (
        <div className={styles.project}>
            <div className={styles.main_info}>
                {props.data.photo && <img className={styles.photo} src={photo}
                                          alt="photo"/>}
                <div className={styles.main}>
                    <div> Full name </div>
                    <input className={styles.name} onChange={_handleChange} name='fullName'
                           defaultValue={props.data.fullName} />
                    <div> Description </div>
                    <textarea className={styles.description} onChange={_handleChange} name='description'
                              defaultValue={props.data.description}/>
                </div>

            </div>

            <ImageUpload setPhoto = {setPhoto} />
            <div className={styles.footer}>
                <button onClick = {editMainPage} className={styles.submitButton}>
                    Изменить
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (...args) => dispatch(setUserAction(...args)),
        endEditing: () => dispatch({
            type: 'END_EDITING_USER',
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMainPage);