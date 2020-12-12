import React from 'react';
import styles from './index.module.css';
import UserProject from '../UserProject';

import {connect} from "react-redux";
import EditProjectPage from "../EditProjectPage";
import classnames from "classnames";
import edit from "../../images/edit.png";
import EditMainPage from "../EditMainPage";
import {getUserProjectAction, logoutAction} from "../../actions/user";
import {withRouter} from "react-router";
import PropTypes from "prop-types";

class UserPage extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    state = {
        search_project: '',
    };

    render() {
        let searching = this.props.searching;
        let main_page = this.props.main_page;

        let logged = this.props.user.Logged;
        let projects = (searching ? this.props.search_projects : this.props.user.Projects);
        if (!projects) {
            projects = [];
        }
        projects = projects.filter(project => (logged || project.access_level === 'public'));
        let info = this.props.user.Info;

        let editing_project = this.props.editing_project;
        let editing_main_page = this.props.editing_main_page;

        let project = {
            name: '',
            access_level: 'public',
            description: '',
            pictures: []
        }

        if (editing_project && this.props.project != null) {
            project = this.props.project;
        }

        let data = {
            fullName: '',
            description: '',
            photo: null
        }

        if (editing_main_page && this.props.data != null) {
            data = this.props.data;
        }

        const pageClassName = classnames(styles.page_button, {
            [styles.primary]: main_page
        });
        const projectsClassName = classnames(styles.projects_button, {
            [styles.primary]: !(main_page)
        });
        let description = info[1];
        if (description === '' && logged) {
            description = 'Please, add a description'
        }

        return (
            <div className={styles.objects}>
                {!editing_main_page && !editing_project && <div>
                    <header className={styles.header}>
                        {!main_page &&
                        <input name="search" placeholder="Search" className={styles.search_input}
                               onChange={this._handleChange}
                               onKeyDown={this._handleKeyDown}/>}
                        {!searching && logged && !main_page &&
                        <button onClick={this.changeToNewProject} className={styles.button}> New project</button>}

                        <button onClick={this.changeToMainPage} className={pageClassName}> Главная</button>
                        <button onClick={this.changeToProjects} className={projectsClassName}> Проекты</button>
                        {logged && <button onClick={this.logout} className={styles.projects_button}> Выйти</button>}
                    </header>
                    {!main_page && <div className={styles.projects}>
                        {projects.length === 0 && logged && <div className={styles.add_phrase}>
                            There are no projects here yet</div>}
                        {projects.map(project =>
                            <UserProject
                                key={project.id}
                                name={project.name}
                                access_level={project.access_level}
                                description={project.description}
                                pictures={project.pictures}
                                logged_in={logged}/>)
                        }
                    </div>} </div>}

                {!searching && !editing_main_page && main_page &&
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
                        {info[2] && <img className={styles.photo} src={info[2]} alt="photo"/>}
                        <div className={styles.main}>
                            <div className={styles.username}>{info[0]}</div>
                            <pre className={styles.description}>{description}</pre>
                        </div>
                    </div>
                </div>}
                {!searching && logged && editing_main_page && <EditMainPage data={data}/>}
                {!searching && logged && editing_project && <EditProjectPage data={project} created={project.name !== ''}/>}
            </div>
        );
    }

    logout = event => {
        event.preventDefault();
        this.props.logoutAction(this.props.user).then(() => {
            this.props.history.push('/signup');
        });
    }

    _handleKeyDown = event => {
        if (event.key === 'Enter') {
            this.props.search();
            this.props.getUserProject(this.props.user, this.state.search_project);
        }
    }

    _handleChange = event => {
        this.setState(
            {
                ...this.state,
                search_project: event.target.value
            });
    };

    editMainPage = (event) => {
        event.preventDefault();
        let info = this.props.user.Info;
        const fullName = info[0];
        const description = info[1];
        const photo = info[2];
        this.props.editingMainPage(fullName, description, photo);
    }

    changeToProjects = (event) => {
        event.preventDefault();
        this.props.notMainPage();
    }

    changeToMainPage = (event) => {
        event.preventDefault();
        this.props.mainPage();
    }

    changeToNewProject = (event) => {
        event.preventDefault();
        this.props.editingProject();
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.userReducer.data,
        searching: state.userReducer.searching,
        project: state.userReducer.project,
        editing_project: state.userReducer.editing_project,
        editing_main_page: state.userReducer.editing_main_page,
        user: state.userReducer.user,
        main_page: state.userReducer.main_page,
        search_projects: state.userReducer.search_projects
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        mainPage: () => dispatch({
            type: 'MAIN_PAGE',
        }),
        notMainPage: () => dispatch({
            type: 'NOT_MAIN_PAGE',
        }),
        editingProject: () => dispatch({
            type: 'EDITING_PROJECT',
            project: null
        }),
        editingMainPage: (fullName, description, photo) => dispatch({
            type: 'EDITING_USER',
            data: {fullName, description, photo}
        }),
        search: () => dispatch({
            type: 'SEARCH'
        }),
        getUserProject: (...args) => dispatch(getUserProjectAction(...args)),
        logoutAction: (user) => dispatch(logoutAction(user))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPage));