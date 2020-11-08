import React from 'react';
import styles from './index.module.css';
import Input from "../Input";
import {connect} from "react-redux";

class AddProject extends React.Component{

    data = {
        name: '',
        access_level: '',
        description: '',
        pictures: []
    };

    handleChange = event => {
        const key = event.target.name;
        this.data[key] = event.target.value;
    };

    submitHandler = event => {
        event.preventDefault();
        const {name, access_level, description, pictures} = this.data;
        this.props.dispatch({
            type: 'ADD_PROJECT',
            placeholder: {name, access_level, description, pictures}
        })
    };

    render() {
    return (
        <div className={styles.project}>
            <form onSubmit={this.submitHandler}>
                <div className={styles.heading}>
                    <Input className={styles.name} onChange={this.handleChange} name='name'
                           placeholder='Введите название проекта'/>
                    <Input className={styles.access_level} onChange={this.handleChange} name='access_level'
                           placeholder='Введите public/private'/>
                </div>
                <Input className={styles.description} onChange={this.handleChange} name='description'
                       placeholder='Описание проекта'/>
                <div>
                    <Input onChange={this.handleChange} name='pictures' placeholder='Добавьте изображения'/>
                </div>
                <div>
                    <button className={styles.button}>
                        Добавить проект
                    </button>
                </div>
            </form>
        </div>
    );
    }
}


export default connect()(AddProject);