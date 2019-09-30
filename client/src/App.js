import React, { Component } from 'react';
import ReactTable from 'react-table';
import NewArticle from './components/newArticle/newArticle';
import DeleteButton from './components/DeleteButton/DeleteButton';
import axios from 'axios';
import 'react-table/react-table.css'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      loading: false,
      editingArticle: ''
     };

     this.enableEditing = this.enableEditing.bind(this);
     this.renderEditable = this.renderEditable.bind(this);
}

enableEditing = id => {
    this.setState({'editingArticle': id, 'tempArticle': this.state.data[id]})
}

handleUpdateArticle = rowID => {
    const tempArticle = {
        title: this.state.data[rowID].title,
        description: this.state.data[rowID].description,
        author: this.state.data[rowID].author,
        tags: this.state.data[rowID].tags
    }
    console.log(this.state.data)
    axios.put('http://localhost:3000/' + this.state.data[rowID].id, tempArticle)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({editingID: ''})
}

renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
            __html: this.state.data[cellInfo.index][cellInfo.column.id]
          }}
      />
    );
  }

  render() {
    return (
      <div className="App">
         <ReactTable
            data={this.state.data}
            columns={[{
                Header: 'id',
                accessor: 'id',
                maxWidth: 40
              },
              {
                Header: 'Title',
                accessor: 'title',
                Cell: props => <div>
                                {props.row._index === this.state.editingArticle ?
                                this.renderEditable(props)
                            : (<div>{props.value}</div>)}
                            </div>
              },
              {
                Header: 'Description',
                accessor: 'description',
                Cell: props => <div>
                                {props.row._index === this.state.editingArticle ?
                                this.renderEditable(props)
                            : (<div>{props.value}</div>)}
                            </div>
              },
              {
                Header: 'Author',
                accessor: 'author',
                Cell: props => <div>
                                {props.row._index === this.state.editingArticle ?
                                this.renderEditable(props)
                            : (<div>{props.value}</div>)}
                            </div>
              },
              {
                Header: 'Tags',
                accessor: 'tags',
                Cell: props => <div>
                                {props.row._index === this.state.editingArticle ?
                                this.renderEditable(props)
                            : (<div>{props.value}</div>)}
                            </div>
              },
              {
                Header: 'Created',
                accessor: 'created_at'
              },
              {
                Header: 'Updated',
                accessor: 'updated_at'
              },
              {
                Header: 'Edit',
                Cell: props=> <EditSaveToggle
                                  editingID={this.state.editingArticle}
                                  rowID={props.row._index}
                                  enableEditing={this.enableEditing}
                                  handleUpdateArticle={this.handleUpdateArticle}/>,
                maxWidth: 30
              },
              {
                Header: 'Delete',
                Cell: props=> <DeleteButton id={props.row._index}/>,
                maxWidth: 40
              }]}
            loading={this.state.loading}
            onFetchData={(state, instance) => {
              this.setState({loading: true})
              axios.get('http://localhost:3000', {

              })
                .then((res) => {
                  this.setState({
                    data: res.data,
                    loading: false
                  })
                })
            }}/>
            <NewArticle/>
      </div>
    );
  }
}
const EditSaveToggle = (props) => {
    return (
        <div>
            {props.editingID !== props.rowID &&
                <div onClick={(e) =>props.enableEditing(props.rowID, e)}>Edit</div>
            }
            {props.editingID === props.rowID &&
                <div onClick={(e) =>props.handleUpdateArticle(props.rowID, e)}>Save</div>
            }
        </div>
    )
}

export default App;
