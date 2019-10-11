import React from 'react';

import './style.scss';
import storage from '../../config/storage_cf';
import Can from '../Can/index';

export default class Products extends React.Component {

    constructor() {
        super();
        this.state = {
            blogs: storage.fetch('blogs'),
            currentUser: storage.fetch('currentUser'),
            title: '',
        }
    }

    onChangeInput = (e) => {
        const title = e.target.value;
        this.setState({ title });
    }

    addNewBlog = () => {
        const { blogs, title, currentUser } = this.state;
        if (title === "" || title === null) {
            alert("K duoc de trong!");
        } else {
            const infoBlog = {
                id: Object.values(blogs).length + 1,
                title: title,
                author: currentUser.username,
                __type: 'Blog'
            }
            this.setState({
                blogs: [...blogs, infoBlog],
                title: ''
            })
        }
    }

    showListBlog = () => {
        const { blogs } = this.state;
        const listBlog = Object.values(blogs);
        const infoBlog = listBlog.map((blog, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{blog.id}</th>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <Can do="delete" on={blog} >
                        <td><button type="button">Delete</button></td>
                    </Can>
                </tr>
            )
        })
        return infoBlog;
    }

    componentDidUpdate() {
        storage.save('blogs', this.state.blogs);
    }

    render() {
        return (
            <div className="main-blog">
                <Can do="create" on="Blog">
                    <div className="form-add">
                        <input type="text" onChange={this.onChangeInput} value={this.state.title} />
                        <button type="button" onClick={this.addNewBlog}>Create</button>
                    </div>
                </Can>
                <div className="form-content">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showListBlog()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
