import React, {useState} from 'react';
import styles from './index.module.css';
import UserProject from '../UserProject';

import Input from "../Input";
import {connect} from "react-redux";
import AddProject from "../AddProject";
import classnames from "classnames";

class UserPage extends React.Component {

    state = {
        this_user: this.props.users.get(this.props.location.pathname.substring(1)),
        isMainPage: true,
        adding_project: false
    };

    render() {
        let adding_project = this.state.adding_project;
        let logged = (this.props.user !== null && this.props.user.Login === this.state.this_user.Login);

        let projects = this.state.this_user.Projects;

        const pageClassName = classnames(styles.page_button, {
            [styles.primary]: this.state.isMainPage
        });
        const projectsClassName = classnames(styles.projects_button, {
            [styles.primary]: !(this.state.isMainPage)
        });

        return (
            <div className={styles.objects}>
                {!adding_project && <div>
                    <header className={styles.header}>
                        <Input name="search" placeholder="Search" className={styles.search_input}/>
                        {logged &&
                        <button onClick={this.changeToNewProject} className={styles.button}> New project</button>}

                        <button className={pageClassName}> Главная</button>
                        <button className={projectsClassName}> Проекты</button>
                    </header>
                    <div className={styles.projects}>
                        {projects.map(project => <UserProject
                            key={project.id}
                            name={project.name}
                            access_level={project.access_level}
                            description={project.description}
                            pictures={project.pictures}
                            logged_in={logged}/>)
                        }
                    </div>
                </div>}
                {logged && adding_project && <AddProject/>}
            </div>
        );
    }

    changeToNewProject = (event) => {
        event.preventDefault();
        this.setState({...this.state, adding_project: true});
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        users: state.userReducer.users
    }
};

export default connect(mapStateToProps)(UserPage);