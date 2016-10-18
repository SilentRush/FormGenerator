import React from "react";
import Times from "../Utility/Times";
export default class SelectedField extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let {id,label,name,type,colmd,colsm,colxs,src,style,row,onChange,binding,picklist} = this.props.selectedField;
    var output;
    if(this.props.selectedField && this.props.selectedField.id){
      var img = "", pkl = "";
      if(type == "image")
        img = (<div className="row">
          <div className="columns small-3">
            <label>Image Url: </label>
          </div>
          <div className="columns small-9">
            <input type="text" className="smallCtrl" value={src} onChange={(e)=>{this.props.onChangeSelectedField("src",e.target.value);}} />
          </div>
        </div>);

      if(type == "picklist"){
        let items = [(<option></option>)];
        for(var key in this.props.picklists){if(this.props.picklists.hasOwnProperty(key))items.push((<option selected={picklist == key} value={key}>{key}</option>))};
        pkl = (<div className="row">
          <div className="columns small-3">
            <label>Picklist: </label>
          </div>
          <div className="columns small-9">
            <select className="smallCtrl" value={picklist} onChange={(e)=>{this.props.onChangeSelectedField("picklist",e.target.value);}}>
              {items}
            </select>
          </div>
        </div>);
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
                {Times(this.props.rows,(count)=>{return <option selected={row == count} value={count}>{count}</option>;})}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="columns small-3">
              <label>Binding: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={binding} onChange={(e)=>{this.props.onChangeSelectedField("binding",e.target.value)}} />
            </div>
          </div>

          {pkl}

          <div className="row">
            <div className="columns small-3">
              <label>Name: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={name} onChange={(e)=>{this.props.onChangeSelectedField("name",e.target.value)}} />
            </div>
          </div>

          <div className="row">
            <div className="columns small-3">
              <label>Label: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={label} onChange={(e)=>{this.props.onChangeSelectedField("label",e.target.value)}} />
            </div>
          </div>

          <div className="row">
            <div className="columns small-3">
              <label>On Change: </label>
            </div>
            <div className="columns small-9">
              <textarea type="text" className="smallCtrl" value={onChange} onChange={(e)=>{this.props.onChangeSelectedField("onChange",e.target.value)}} />
            </div>
          </div>

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

          <div className="row">
            <div className="columns small-7">
              <label>Mobile Device Width (Max = 12): </label>
            </div>
            <div className="columns small-5">
              <input type="number" className="smallCtrl" value={colxs} onChange={(e)=>{this.props.onChangeSelectedField("colxs",e.target.value);}} />
            </div>
          </div>

          <div className="row">
            <div className="columns small-7">
              <label>Tablet Device Width (Max = 12): </label>
            </div>
            <div className="columns small-5">
              <input type="number" className="smallCtrl" value={colsm} onChange={(e)=>{this.props.onChangeSelectedField("colsm",e.target.value);}} />
            </div>
          </div>

          <div className="row">
            <div className="columns small-7">
              <label>Desktop Device Width (Max = 12): </label>
            </div>
            <div className="columns small-5">
              <input type="number" className="smallCtrl" value={colmd} onChange={(e)=>{this.props.onChangeSelectedField("colmd",e.target.value);}} />
            </div>
          </div>

          <div className="row">
            <div className="columns small-3">
              <label>Style: </label>
            </div>
            <div className="columns small-9">
              <input type="text" className="smallCtrl" value={style} onChange={(e)=>{this.props.onChangeSelectedField("style",e.target.value);}} />
            </div>
          </div>

          {img}
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
