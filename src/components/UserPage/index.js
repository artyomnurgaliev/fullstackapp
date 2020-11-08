import React from 'react';
import styles from './index.module.css';
import UserProject from '../UserProject';

import Input from "../Input";
import {connect} from "react-redux";
import EditProjectPage from "../EditProjectPage";
import classnames from "classnames";
import edit from "../../images/edit.png";

class UserPage extends React.Component {

    state = {
        this_user: this.props.users.get(this.props.location.pathname.substring(1)),
        isMainPage: false
    };

    render() {
        let editing_project = this.props.editing_project;
        let project = {
            name: '',
            access_level: 'public',
            description: '',
            pictures: []
        }

        if (editing_project && this.props.project != null) {
            project = this.props.project;
        }
        console.log('project', project);

        let logged =  (this.props.user !== null && this.props.user.Login === this.state.this_user.Login);
        let projects = this.state.this_user.Projects;
        let info = this.state.this_user.Info;

        const pageClassName = classnames(styles.page_button, {
            [styles.primary]: this.state.isMainPage
        });
        const projectsClassName = classnames(styles.projects_button, {
            [styles.primary]: !(this.state.isMainPage)
        });
        return (
            <div className={styles.objects}>
                {!editing_project && <div>
                    <header className={styles.header}>
                        {!this.state.isMainPage &&
                        <Input name="search" placeholder="Search" className={styles.search_input}/>}
                        {logged && !this.state.isMainPage &&
                        <button onClick={this.changeToNewProject} className={styles.button}> New project</button>}

                        <button onClick={this.changeToMainPage} className={pageClassName}> Главная</button>
                        <button onClick={this.changeToProjects} className={projectsClassName}> Проекты</button>
                    </header>
                    {!this.state.isMainPage && <div className={styles.projects}>
                        {projects.filter(project => (logged || project.access_level === 'public')).map(project =>
                            <UserProject
                                key={project.id}
                                name={project.name}
                                access_level={project.access_level}
                                description={project.description}
                                pictures={project.pictures}
                                logged_in={logged}/>)
                        }
                    </div>} </div>}

                {this.state.isMainPage &&
                <div className={styles.projects}>
                    <div className={styles.row}>
                        <div className={styles.delimiter}>
                            _
                        </div>
                        <div>
                            {logged && <button onClick={this.editMainPage} className={styles.edit_button}>
                                <img className={styles.edit} src={edit}
                                     alt="edit"/></button>}
                        </div>
                    </div>
                    <div className={styles.main_info}>
                        <div>
                            <div className={styles.username}>{info[0]}</div>
                            <div className={styles.description}>{info[3]}</div>
                        </div>
                        <img className={styles.photo} src={info[4]}
                             alt="photo"/>
                    </div>
                    <div className={styles.info}> Почта: {info[1]}</div>
                    <div className={styles.info}> Телефон: {info[2]}</div>
                </div>}

                {logged && editing_project && <EditProjectPage data = {project} />}
            </div>
        );
    }

    editMainPage = (event) => {
        event.preventDefault();
        /// TODO
    }

    changeToProjects = (event) => {
        event.preventDefault();
        this.setState({...this.state, isMainPage: false});
    }

    changeToMainPage = (event) => {
        event.preventDefault();
        this.setState({...this.state, isMainPage: true});
    }

    changeToNewProject = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'EDITING_PROJECT',
            project: null
        });
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.userReducer.project,
        editing_project: state.userReducer.editing_project,
        user: state.userReducer.user,
        users: state.userReducer.users
    }
};

export default connect(mapStateToProps)(UserPage);