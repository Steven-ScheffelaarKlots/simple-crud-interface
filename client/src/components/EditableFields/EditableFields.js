import React, { Component } from 'react';

class EditableField extends Component {
    render() {
        return (
            <input type="text" name={this.props.name} value={this.props.val} onChange={this.props.handleChange} />
        )
    }
    
    }
    
    export default EditableField;