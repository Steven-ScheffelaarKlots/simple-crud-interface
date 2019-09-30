import React, { Component } from 'react';
import axios from 'axios';

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.DeleteArticle = this.DeleteArticle.bind(this);
}

DeleteArticle=() => {
    axios.delete('http://localhost:3000/' + this.props.id)
    console.log(this.props.id)
}

    render() {
        return (
            <div onClick={this.DeleteArticle}>
                Delete
            </div>

        )
    }
    
    }
    
    export default DeleteButton;