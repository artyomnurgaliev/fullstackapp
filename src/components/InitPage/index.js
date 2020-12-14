import React from 'react';
import styles from './index.module.css';
import {connect} from "react-redux";
import SignUp from "../SignUp";
import {getProjectAction} from "../../actions/user";
import UserProject from "../UserProject";


class InitPage extends React.Component {
    state = {
        search_project: '',
    };

    render() {
        let searching = this.props.main_searching;
        let loading = this.props.loading;

        let projects = this.props.search_projects;
        if (!projects) {
            projects = [];
        }

        projects = projects.filter(project => (project.access_level === 'public'));

        return (
            <div className={styles.blocks}>
                <div className={styles.search_block}>
                    <input name="search" placeholder="Search" className={styles.search_input}
                           onChange={this._handleChange}
                           onKeyDown={this._handleKeyDown}/>
                    {searching && <button onClick={this.toSignUp} className={styles.page_button}>
                        Sign Up / Sign In</button>}
                </div>

                {searching && <div className={styles.box}>
                    <div className={styles.projects}>
                        {loading && <h2>LOADING...</h2>}
                        {!loading && projects.length === 0 && <div className={styles.add_phrase}>
                            There are no projects here yet</div>}
                        {!loading && projects.map(project =>
                            <UserProject
                                key={project.id}
                                name={project.name}
                                access_level={project.access_level}
                                description={project.description}
                                pictures={project.pictures}
                                logged_in={false}/>)
                        }
                    </div>
                </div>}

                {!searching && <div className={styles.text_block}>
                    <div className={styles.text}>
                        <div className={styles.major_text}>
                            Build to share achievements
                        </div>
                        <div className={styles.small_text}>
                            This site is created for you. Now you can store all your projects in one place
                        </div>
                    </div>
                    <SignUp/>
                </div>}
            </div>
        );
    }

    toSignUp = (event) => {
        event.preventDefault();
        this.props.signupPage();
    }

    _handleKeyDown = event => {
        if (event.key === 'Enter') {
            this.props.search();
            this.props.getProject(this.state.search_project);
        }
    }

    _handleChange = event => {
        this.setState(
            {
                ...this.state,
                search_project: event.target.value
            });
    };
}

const mapStateToProps = (state) => {
    return {
        main_searching: state.userReducer.main_searching,
        search_projects: state.userReducer.search_projects,
        loading: state.userReducer.isFetching
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        search: () => dispatch({
            type: 'MAIN_SEARCH'
        }),
        signupPage: () => dispatch({
            type: 'SIGN_UP_PAGE',
        }),
        getProject: (...args) => dispatch(getProjectAction(...args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InitPage);