import React from "react";
import ParseFields from "./ParseFields";
import SelectedField from "./SelectedField";
import Toolbar from "./Toolbar";
import {NotificationManager} from 'react-notifications';


export default class CreateForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      NotificationManager:NotificationManager,
      fields:[
        []
      ],
      numFields:0,
      selectedField:{},
      displayMode:"desktop",
      doc: {
        "Account":{
          "bop":["x"],
          "Name":"Test Document",
          "bap":{zap:"test",xyz:10}
        },
        "pkl":"",
        "NumOfHouses":5,
        "testobj":{}
      },
      "picklists":{
        "test":["","item1","item2","item3","item4"],
        "states":["","MO","CA","IL","NY"]
      },
      FormName:"",
      DocumentType:"",
      form:{}

    };


    this.exportJSON = () => {
      var form = {};
      let x = () =>
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };
      form.id = x();
      form.name = this.state.FormName;
      form.documentType = this.state.DocumentType;
      form.fields = this.state.fields;
      this.setState({form:form},()=>{console.log(JSON.stringify(this.state.form))});
    }
    this.onSelectField = (field) => {
      var selectedField;
      var select = this.state.fields.filter((r)=>{
        let found = r.filter((f)=>{
          return f.id === field;
        });
        if(found[0])
          selectedField = found[0];
        return found[0] != null;
      });
      if(selectedField){
        this.setState({selectedField:selectedField});
      }
    }

    this.changeFormName = (value) => {
      this.setState({FormName:value});
    }

    this.changeDocumentType = (value) => {
      this.setState({DocumentType:value});
    }

    this.changeDisplayMode = (mode) => {
      this.setState({displayMode:mode});
    }

    this.onDragOver = (e) => {
      e.preventDefault();
    }
    this.onDrop = (e) => {
      let type = e.dataTransfer.getData("type");
      let {numFields} = this.state;
      let field = {id:numFields + 1,name:"field" + (numFields + 1),label:"Field" + (numFields + 1) + ": ",style:"",colxs:12,colsm:4,colmd:3,binding:"",onChange:""};;

      switch(type){
        case "text":
          field.type = "text";
          break;
        case "textarea":
          field.type = "textarea";
          break;
        case "picklist":
          field.type = "picklist";
          field.picklist = [""];
          break;
        case "date":
          field.type = "date";
          break;
        case "number":
          field.type = "number";
          break;
        case "email":
          field.type = "email";
          break;
        case "datetime":
          field.type = "datetime";
          break;
        case "checkbox":
          field.type = "checkbox";
          break;
        case "image":
          field.type = "image";
          field.src = "https://steamcommunity-a.akamaihd.net/public/images/sharedfiles/steam_workshop_default_image.png";
          break;
        case "spacer":
          field.type = "spacer";
          break;
        case "linebreak":
          field.type = "linebreak";
          field.colxs = 12;
          field.colsm = 12;
          field.colmd = 12;
          break;
        case "paragraph":
          field.type = "paragraph";
          field.text = "Test Placeholder";
          field.colsm = 12;
          field.colmd = 6;
          break;
        default:
          field = null;
          break;
      }
      if(field){
        var fields = this.state.fields;
        var currRow = fields[fields.length - 1];
        var rowLength = 0;
        currRow.filter((row)=>{rowLength += row.colmd;});
        if(rowLength + field.colmd <= 12){
          field.row = fields.length;
          fields[fields.length - 1].push(field);
        }
        else{
          field.row = fields.length + 1;
          fields[fields.length] = [];
          fields[fields.length - 1].push(field);
        }

        this.setState({fields:fields,numFields:this.state.numFields + 1});
      }

    }
    this.onDrag = (e) => {
      e.dataTransfer.setData("type",e.target.getAttribute("data-type"));
    }

    this.addRow = () => {
      var fields = this.state.fields;
      fields.push([]);
      this.setState({fields:fields});
    }

    this.removeRow = () => {
      var fields = this.state.fields;
      if(fields.length > 1){
        var removedFields = fields[fields.length - 1];
        removedFields.filter((f)=>{f.row=fields.length - 2})
        //fields[fields.length - 2] = fields[fields.length - 2].concat(removedFields);
        fields.pop();
        this.setState({fields:fields});
      }
    }

    this.onChangeSelectedField = (type, value) => {
      var field = this.state.selectedField;
      field[type] = value;
      var fields = this.state.fields;
      var newFields = fields.map((r)=>{
        let x = r.map((f)=>{
          if(f.id === field.id)
            return field
          else
            return f
        });
        return x;
      });
      this.setState({selectedField:field, fields:newFields});
    }

    this.onChangeFieldRow = (value) => {
      var field = this.state.selectedField;
      var oldRow = field.row - 1;
      var oldIndex;
      field.row = value;
      var fields = this.state.fields;

      var newFields = fields.map((r)=>{
        let x = r.map((f,i)=>{
          if(f.id === field.id){
            oldIndex = i;
            return field
          }
          else
            return f
        });
        return x;
      });

      fields[value - 1].push(field);
      fields[oldRow].splice(oldIndex,1);

      this.setState({selectedField:field, fields:fields});
    }

    this.updateProperty = (obj,is, value) => {
      if(is && is != "" && obj){
        if (typeof is == 'string')
            return this.updateProperty(obj,is.split('.'), value);
        else if (is.length==1 && value!==undefined){
          if(is[0].includes("[") || is[0].includes("]")){
            var patt = /\[([0-9]+)\]/g
            var res = patt.exec(is[0]);
            res = res[0].substring(1, res[0].length-1);
            return obj[is[0].split("[")[0]][res] = value;
          }else{
            return obj[is[0]] = value;
          }
        }
        else if (is.length==0)
            return obj;
        else{
          if(is[0].includes("[") || is[0].includes("]")){
            var patt = /\[([0-9]+)\]/g
            var res = patt.exec(is[0]);
            res = res[0].substring(1, res[0].length-1);
            return this.updateProperty(obj[is[0].split("[")[0]][res],is.slice(1), value);
          }else{
            return this.updateProperty(obj[is[0]],is.slice(1), value);
          }
        }
      }
    }

    this.getProperty = (obj,is) => {
      if(is && is != "" && obj){
        if (typeof is == 'string')
            return this.getProperty(obj,is.split('.'));
        else if (is.length==1){
          if(is[0].includes("[") || is[0].includes("]")){
            var patt = /\[([0-9]+)\]/g
            var res = patt.exec(is[0]);
            res = res[0].substring(1, res[0].length-1);
            return obj[is[0].split("[")[0]][res];
          }else{
            return obj[is[0]];
          }
        }
        else if (is.length==0)
            return obj;
        else{
          if(is[0].includes("[") || is[0].includes("]")){
            var patt = /\[([0-9]+)\]/g
            var res = patt.exec(is[0]);
            res = res[0].substring(1, res[0].length-1);
            return this.getProperty(obj[is[0].split("[")[0]][res],is.slice(1));
          }else{
            return this.getProperty(obj[is[0]],is.slice(1));
          }
        }
      }
    }

    this.onUpdateDocument = (property, value, func) => {
      var doc = this.state.doc;
      var NotificationManager = this.state.NotificationManager;
      if(property)
        this.updateProperty(doc, property, value);
      try{
          eval(func);
      }
      catch(err){
        console.log(err.message);
      }
      this.setState({doc:doc});
    }

    this.removeSelectedField = () => {
      var field = this.state.selectedField;
      var fields = this.state.fields;
      var newFields = fields.map((r, i)=>{
        let x = r.map((f, x)=>{
          if(f.id === field.id){
            fields[i].splice(x,1);
            return;
          }
          else
            return f
        });
        return x;
      });
      this.setState({selectedField:{}, fields:fields});
    }

    this.deSelectField = () => {
      this.setState({selectedField:{}});
    }

    this.initializeForm = (props) => {
      let state = this.state;
      state.form = props.form;
      state.fields = props.form.fields;
      state.FormName = props.form.name;
      state.DocumentType = props.form.documentType;
      return state;
    }
  }

  componentDidMount(){
    if(this.props.form && this.props.form.id){
      let state = this.initializeForm(this.props);
      this.setState(state);
    }
  }

  componentWillReceiveProps(props){
    if(props.form && props.form.id){
      let state = this.initializeForm(props);
      this.setState(state);
    }
  }

  componentWillUnmount(){
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="small-12 medium-8 large-8 columns">
            <div className="row">
              <div className="small-6 medium-6 large-6 columns">
                <label>Form Name</label>
                <input type="text" value={this.state.FormName} onChange={(e)=>{this.changeFormName(e.target.value)}} />
              </div>
              <div className="small-6 medium-6 large-6 columns">
                <label>Document Type</label>
                <input type="text" value={this.state.DocumentType} onChange={(e)=>{this.changeDocumentType(e.target.value)}} />
              </div>
            </div>

          </div>
          <div className="small-12 medium-4 large-4 columns">
            <div className="row">
              <div className="small-12 medium-12 large-12 columns" style={{paddingBottom:"15px"}}>
                <label>Display Mode</label>
                <select className="form-control" value={this.state.displayMode} onChange={(e)=>{this.changeDisplayMode(e.target.value)}}>
                  <option value="mobile" selected={this.state.displayMode == "mobile"}>Mobile</option>
                  <option value="tablet" selected={this.state.displayMode == "tablet"}>Tablet</option>
                  <option value="desktop" selected={this.state.displayMode == "desktop"}>Desktop</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-8 large-8 columns template" onDrop={this.onDrop} onDragOver={this.onDragOver} style={{minHeight:"500px"}}>
            <h2>Form Layout</h2>
            <ParseFields picklists={this.state.picklists} getProperty={this.getProperty} doc={this.state.doc} onUpdateDocument={this.onUpdateDocument} fields={this.state.fields} onSelectField={this.onSelectField} displayMode={this.state.displayMode} selectedField={this.state.selectedField} />
          </div>
          <div className="small-12 medium-4 large-4 columns">

            <div className="row">
              <Toolbar onDrag={this.onDrag} addRow={this.addRow} removeRow={this.removeRow} />
            </div>
            <div className="row">
              <SelectedField doc={this.state.doc} picklists={this.state.picklists} selectedField={this.state.selectedField} onChangeSelectedField={this.onChangeSelectedField} onChangeFieldRow={this.onChangeFieldRow} deSelectField={this.deSelectField} removeSelectedField={this.removeSelectedField} rows={this.state.fields.length} />
            </div>
            <div className="row">
              <div className="small-12 columns">
                <button type="button" className="button" onClick={this.exportJSON}>Export JSON</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
