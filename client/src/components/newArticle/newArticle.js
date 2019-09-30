import React, { Component } from 'react';
import axios from 'axios';

class newArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        author: '',
        tags: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}

handleSubmit(event) {
    axios.post('http://localhost:3000', 
    this.state)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
}

render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" name='title' value={this.state.title} onChange={this.handleChange} />
                </label>
                <label>
                Description:
                <textarea type="text" name='description' value={this.state.description} onChange={this.handleChange} />
                </label>
                <label>
                Author:
                <input type="text" name='author' value={this.state.author} onChange={this.handleChange} />
                </label>
                <label>
                Tags:
                <input type="text" name='tags' value={this.state.tags} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

}

export default newArticle;