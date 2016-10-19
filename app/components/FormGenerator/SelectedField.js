import React from "react";
import Modal from "../Utility/Modal";
import Times from "../Utility/Times";
export default class SelectedField extends React.Component {
  constructor(props){
    super(props);
    this.state = {isModalOpen:false};
    this.openModal = () =>{
      this.setState({ isModalOpen: true });
    }
    this.closeModal = () =>{
      this.setState({ isModalOpen: false });
    }
  }

  render(){
    let {id,label,name,type,colmd,colsm,colxs,src,style,row,onChange,binding,picklist,text} = this.props.selectedField;
    let field = this.props.selectedField;
    var SelectedFields = [], output="";
    console.log(binding,this.props.selectedField);
    if(this.props.selectedField && this.props.selectedField.id){
      var img = "", pkl = "";
      if(field.hasOwnProperty("binding")){
        let html = (
          <div className="row" key="binding">
            <div className="columns small-3">
              <label>Binding: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={binding} onChange={(e)=>{this.props.onChangeSelectedField("binding",e.target.value)}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("name")){
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>Name: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={name} onChange={(e)=>{this.props.onChangeSelectedField("name",e.target.value)}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("label")){
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>Label: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={label} onChange={(e)=>{this.props.onChangeSelectedField("label",e.target.value)}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("onChange")){
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>On Change: </label>
            </div>
            <div className="columns small-9">
              <textarea type="text" className="smallCtrl" value={onChange} onChange={(e)=>{this.props.onChangeSelectedField("onChange",e.target.value)}} />
            </div>
            <button onClick={this.openModal} className="button" type="button">Open modal</button>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
              <h3>My Modal</h3>
              <div className="body">
                <p>This is the modal&apos;s body.</p>
                <p>This is the modal&apos;s body.</p>
                <p>This is the modal&apos;s body.This is the modal&apos;s body.This is the modal&apos;s body.This is the modal&apos;s body.This is the modal&apos;s body.This is the modal&apos;s body.</p>
                <p>This is the modal&apos;s body.</p>
                <p>This is the modal&apos;s body.</p>
                <p>This is the modal&apos;s body.</p>
                <p>This is the modal&apos;s body.</p>
              </div>
              <button onClick={this.closeModal}>Close modal</button>
            </Modal>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("type")){
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>Type: </label>
            </div>
            <div className="columns small-9">
              <select onChange={(e)=>{this.props.onChangeSelectedField("type",e.target.value)}} value={type} className="smallCtrl">
                <option value="text" selected={type == "text"}>Text</option>
                <option value="textarea" selected={type == "textarea"}>Text Area</option>
                <option value="date" selected={type == "date"}>Date</option>
                <option value="datetime" selected={type == "datetime"}>Date Time</option>
                <option value="number" selected={type == "number"}>Number</option>
                <option value="email" selected={type == "email"}>Email</option>
                <option value="checkbox" selected={type == "checkbox"}>Checkbox</option>
                <option value="image" selected={type == "image"}>Image</option>
                <option value="spacer" selected={type == "spacer"}>Spacer</option>
                <option value="linebreak" selected={type == "linebreak"}>Linebreak</option>
              </select>
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("colxs")){
        let html = (
          <div className="row">
            <div className="columns small-7">
              <label>Mobile Device Width (Max = 12): </label>
            </div>
            <div className="columns small-5">
              <input type="number" className="smallCtrl" value={colxs} onChange={(e)=>{this.props.onChangeSelectedField("colxs",e.target.value);}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("colsm")){
        let html = (
          <div className="row">
            <div className="columns small-7">
              <label>Tablet Device Width (Max = 12): </label>
            </div>
            <div className="columns small-5">
              <input type="number" className="smallCtrl" value={colsm} onChange={(e)=>{this.props.onChangeSelectedField("colsm",e.target.value);}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("colmd")){
        let html = (
          <div className="row">
            <div className="columns small-7">
              <label>Desktop Device Width (Max = 12): </label>
            </div>
            <div className="columns small-5">
              <input type="number" className="smallCtrl" value={colmd} onChange={(e)=>{this.props.onChangeSelectedField("colmd",e.target.value);}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("style")){
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>Style: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={style} onChange={(e)=>{this.props.onChangeSelectedField("style",e.target.value);}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      if(field.hasOwnProperty("text")){
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>Text: </label>
            </div>
            <div className="columns small-9">
              <textarea type="text" className="smallCtrl" value={text} onChange={(e)=>{this.props.onChangeSelectedField("text",e.target.value);}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }




      if(field.hasOwnProperty("src")){
        let html = (
          <div className="row" key="src">
            <div className="columns small-3">
              <label>Image Url: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={src} onChange={(e)=>{this.props.onChangeSelectedField("src",e.target.value);}} />
            </div>
          </div>
        );
        SelectedFields.push(html);
      }


      if(field.hasOwnProperty("picklist")){
        let items = [(<option></option>)];
        for(var key in this.props.picklists){if(this.props.picklists.hasOwnProperty(key))items.push((<option selected={picklist == key} value={key} key={key}>{key}</option>))};
        let html = (
          <div className="row" key="picklist">
            <div className="columns small-3">
              <label>Picklist: </label>
            </div>
            <div className="columns small-9">
              <select className="smallCtrl" value={picklist} onChange={(e)=>{this.props.onChangeSelectedField("picklist",e.target.value);}}>
                {items}
              </select>
            </div>
          </div>
        );
        SelectedFields.push(html);
      }

      output = (
        <div className="small-12 columns">
          <h3>Selected Field</h3>
          <input type="button" className="button warning" onClick={()=>{this.props.deSelectField();}} value="Deselect" /><br />
          <div className="row">
            <div className="columns small-3">
              <label>Row: </label>
            </div>
            <div className="columns small-9">
              <select className="smallCtrl form-control" value={row} onChange={(e)=>{this.props.onChangeFieldRow(e.target.value)}}>
                {Times(this.props.rows,(count)=>{return <option selected={row == count} value={count} key={count}>{count}</option>;})}
              </select>
            </div>
          </div>

          {SelectedFields}

          <input type="button" className="button alert" onClick={()=>{this.props.removeSelectedField();}} value="Remove Field" />
        </div>
      );
    }

    return (
      <div>
        {output}
      </div>
    );
  }
};
