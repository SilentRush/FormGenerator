import React from "react";
import { connect } from 'react-redux';
import CreateForm from "./CreateForm";
import * as formApi from '../../api/form-api';



class FormPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {

    };

  }

  componentDidMount(){
    var data;
    let formId;
    if(this.props.params)
      formId = this.props.params.formid;
    formApi.getForm(formId);

  }

  render(){
    return (
      <CreateForm form={this.props.form} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    form: store.formState.form
  };
};

export default connect(mapStateToProps)(FormPage);
