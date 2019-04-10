import React, { Component } from 'react'
import Icon from "@material-ui/core/Icon";
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import  { connect} from 'react-redux';
import { addList, addCard } from '../actions';

class ProyectionActionButton extends Component {

  state = {
      formOpen: false,
      text: ''
  };

  openForm = () => {
      this.setState({
          formOpen: true
      })
  }

  closeForm = () => {
    this.setState({
        formOpen: false
    })
  }

  onChangeText = (e) => {
    this.setState({ text: e.target.value})
  }

  handleAddList = () => {
      const { dispatch } = this.props;
      const { text } = this.state;

      if(text){
          dispatch(addList(text))
      }

      return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if(text){
        dispatch(addCard(listID, text));
    }
  };

  renderAddButton = () => {
    const { list } = this.props;
    debugger
    const buttonText = list ? "Agrega una lista" : "Agrega una tarea";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0, 0, 0, .15)" : "inherit";

    return(
        <div
            onClick={this.openForm}
            style={{
            ...styles.openForButtonGroup,
            opacity: buttonTextOpacity, 
            color: buttonTextColor, 
            backgroundColor: buttonTextBackground
            }}
        >
            <Icon>add</Icon>
            <h7>{buttonText}</h7>
        </div>
    )
  }  

  renderForm = () => {
      
      const { list } = this.props;

      const placeholder = list ? "Ingrese título de lista" : "Ingrese tarea";

      const buttonTitle = list ? "Agregar Lista" : "Agregar tarea";

      return <div>
          <Card style={{
              minHeight: 85,
              minWidth: 272,
              padding: "6px 8px 2px"
          }}>
              <Textarea
                placeholder={placeholder}
                autoFocus
                onBlur={this.closeForm}
                value={this.state.text}
                onChange={this.onChangeText}
                style={{
                    resize: "none",
                    width: "100%",
                    overflow: "hidden",
                    outline: "none",
                    border: "none"
                }}
              />
          </Card>
          <div style={styles.formButtonGroup}>
              <Button 
                onMouseDown={ list ? this.handleAddList : this.handleAddCard }
                variant="contained" 
                style={{ color: "white", backgroundColor: "#5acc44" }} 
              >{buttonTitle}</Button>
              <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
          </div>

      </div>
  }
    
  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },

    formButtonGroup: {
        marginTop: 8,
        display: 'flex',
        alignItems: "center"
    }
}

export default connect()(ProyectionActionButton);
