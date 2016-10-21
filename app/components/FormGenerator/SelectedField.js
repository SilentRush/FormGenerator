import React from "react";
import Modal from "../Utility/Modal";
import Times from "../Utility/Times";
import JavascriptEditor from "./JavascriptEditor";
import CSSEditor from "./CSSEditor";
import Binding from "./Binding";
import {NotificationManager} from 'react-notifications';

export default class SelectedField extends React.Component {
  constructor(props){
    super(props);
    this.state = {isModalOpen:false,isCSSModalOpen:false,isBindingModalOpen:false,code:"", css:"{}"};
    this.openModal = (initialValue) =>{
      this.setState({ isModalOpen: true, code:initialValue });
    }
    this.closeModal = () =>{
      this.setState({ isModalOpen: false, code:"" });
    }

    this.openCSSModal = (initialValue) =>{
      this.setState({ isCSSModalOpen: true, css:initialValue });
    }
    this.closeCSSModal = () =>{
      this.setState({ isCSSModalOpen: false, css:"{}" });
    }

    this.openBindingModal = (initialValue) =>{
      this.setState({ isBindingModalOpen: true });
    }
    this.closeBindingModal = () =>{
      this.setState({ isBindingModalOpen: false });
    }

    this.updateCode = (newCode) =>{
      this.setState({
            code: newCode
        });
    }
    this.saveCode = () => {
      let code = this.state.code;
      try{
        eval( code );
        this.props.onChangeSelectedField("onChange",this.state.code);
        this.closeModal();
      }catch(err){
        alert(err + "\n" + "Fix Javascript errors before saving!");
      }
    }

    this.updateCSS = (css) =>{
      this.setState({
            css: css
        });
    }

    this.updateBinding = (val) => {
      this.props.onChangeSelectedField("binding",val);
      this.closeBindingModal();
    }

    this.convertToStyle = () => {
      let code = this.state.css;
      try{
        eval('(' + code + ')');
        this.props.onChangeSelectedField("style",this.state.css);
        this.closeCSSModal();
      }catch(err){
        alert(err + "\n" + "Format must match Javascript Object format! If value is string wrap value in Quotes");
      }
    }
  }

  render(){
    let {id,label,name,type,colmd,colsm,colxs,src,style,row,onChange,binding,picklist,text} = this.props.selectedField;
    let field = this.props.selectedField;
    var SelectedFields = [], output="";
    if(this.props.selectedField && this.props.selectedField.id){
      var img = "", pkl = "";
      if(field.hasOwnProperty("binding")){
        let html = (
          <div className="row" key="binding">
            <div className="columns small-3">
              <label>Binding: </label>
            </div>
            <div className="columns small-9">
              <div className="input-group">
                <input className="input-group-field smallCtrl" type="text" value={binding} readOnly />
                <div className="input-group-button">
                  <input type="button" className="button smallCtrl" value="Edit" onClick={()=>{this.openBindingModal()}} />
                  <button type="button" className="button smallCtrl alert" onClick={()=>{this.props.onChangeSelectedField("binding","")}}><i class="fa fa-refresh" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
            <Modal isOpen={this.state.isBindingModalOpen}
                   transitionName="modal-anim"
                   id="bindingmodal"
                   width={400}
                   closeModal={this.closeBindingModal}
                   key="bindingmodal">
              <h3>Binding</h3>
              <h6></h6>
              <div className="body">
                <Binding binding={binding} doc={this.props.doc} closeBindingModal={this.closeBindingModal} updateBinding={this.updateBinding} />
              </div>

            </Modal>
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
        var options = {
            lineNumbers: true
        };
        let html = (
          <div className="row">
            <div className="columns small-3">
              <label>On Change: </label>
            </div>
            <div className="columns small-9">
              <div className="input-group">
                <input className="input-group-field smallCtrl" type="text" value={onChange} readOnly />
                <div className="input-group-button">
                  <input type="button" className="button smallCtrl" value="Edit" onClick={()=>{this.openModal(onChange)}} />
                </div>
              </div>
            </div>
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim"
                   id="javascriptmodal"
                   width={700}
                   closeModal={this.closeModal}
                   key="javascriptmodal">
              <h3>Javascript Editor</h3>
              <h6><kbd>Ctrl+Space</kbd> will match any tag in the below code.  <kbd>Shift+Space</kbd> will suggest javascript variables,functions, and attributes.  Access Document through <kbd>doc</kbd> object.</h6>
              <div className="body">
                <JavascriptEditor code={this.state.code} updateCode={this.updateCode} doc={this.props.doc} />
              </div>
              <button onClick={()=>{this.saveCode();}} className="button success" type="button">Save</button>
              <button onClick={()=>{this.closeModal();}} className="button alert" type="button">Cancel</button>
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
              <div className="input-group">
                <input className="input-group-field smallCtrl" type="text" value={style} readOnly />
                <div className="input-group-button">
                  <input type="button" className="button smallCtrl" value="Edit" onClick={()=>{this.openCSSModal(style)}} />
                </div>
              </div>
            </div>
            <Modal isOpen={this.state.isCSSModalOpen}
                   transitionName="modal-anim"
                   id="cssmodal"
                   width={700}
                   closeModal={this.closeCSSModal}
                   key="cssmodal">
              <h3>CSS Editor</h3>
              <h5>Example css: {'{background:"white",fontSize:"red"}'}</h5>
              <h6><kbd>Ctrl+Space</kbd> will match any tag in the below code.  <kbd>Shift+Space</kbd> will suggest css attributes and values.</h6>
              <div className="body">
                <CSSEditor code={this.state.css} updateCode={this.updateCSS} doc={this.props.doc} />
              </div>
              <button onClick={()=>{this.convertToStyle();}} className="button success" type="button">Save</button>
              <button onClick={()=>{this.closeCSSModal();}} className="button alert" type="button">Cancel</button>
            </Modal>
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
