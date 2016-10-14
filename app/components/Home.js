import React from "react";

let times = (n,f) => {
  var x = [];
  while(n-- > 0)x.push(f(n + 1));
  return x;
}

export default class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {fields:[
        []
      ],
      numFields:0,
      selectedField:{},
      displayMode:"desktop"
    };

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
        this.setState({selectedField:selectedField},()=>{console.log(this.state.selectedField)});
      }
    }

    this.changeDisplayMode = (mode) => {
      console.log(mode);
      this.setState({displayMode:mode});
    }

    this.onDragOver = (e) => {
      e.preventDefault();
    }
    this.onDrop = (e) => {
      let type = e.dataTransfer.getData("type");
      let field;
      let {numFields} = this.state;
      switch(type){
        case "text":
          field = {id:numFields + 1,name:"field1",type:"text",label:"Text: ",style:"",colxs:12,colsm:4,colmd:3};
          break;
        case "date":
          field = {id:numFields + 1,name:"field2",type:"date",label:"Date: ",style:"",colxs:12,colsm:4,colmd:3};
          break;
        case "number":
          field = {id:numFields + 1,name:"field3",type:"number",label:"Number: ",style:"",colxs:12,colsm:4,colmd:3};
          break;
        case "email":
          field = {id:numFields + 1,name:"field4",type:"email",label:"Email: ",style:"",colxs:12,colsm:4,colmd:3};
          break;
        case "datetime":
          field = {id:numFields + 1,name:"field5",type:"datetime",label:"Date Time: ",style:"",colxs:12,colsm:4,colmd:3};
          break;
        case "checkbox":
          field = {id:numFields + 1,name:"field6",type:"checkbox",label:"Checkbox: ",style:"",colxs:12,colsm:4,colmd:3};
          break;
        case "image":
          field = {id:numFields + 1,name:"field6",type:"image",label:"Image: ",style:"",src:"https://steamcommunity-a.akamaihd.net/public/images/sharedfiles/steam_workshop_default_image.png",colxs:12,colsm:4,colmd:3};
          break;
        default:
          field = null;
          break;
      }
      if(field){
        var fields = this.state.fields;
        field.row = fields.length;
        fields[fields.length - 1].push(field);
        this.setState({fields:fields,numFields:this.state.numFields + 1});
      }

    }
    this.onDrag = (e) => {
      console.log(e.target.getAttribute("data-type"));
      e.dataTransfer.setData("type",e.target.getAttribute("data-type"));
    }

    this.addRow = () => {
      var fields = this.state.fields;
      fields.push([]);
      console.log(fields);
      this.setState({fields:fields});
    }

    this.removeRow = () => {
      var fields = this.state.fields;
      if(fields.length > 1){
        var removedFields = fields[fields.length - 1];
        fields[fields.length - 2] = fields[fields.length - 2].concat(removedFields);
        console.log(fields);
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
  }
  componentDidMount(){

  }

  render(){
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-8" onDrop={this.onDrop} onDragOver={this.onDragOver} style={{minHeight:"500px"}}>
          <h2>Template Layout</h2>
          <ParseFields fields={this.state.fields} onSelectField={this.onSelectField} displayMode={this.state.displayMode} selectedField={this.state.selectedField} />
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12" style={{paddingBottom:"15px"}}>
              <label>Display Mode</label>
              <select className="form-control" value={this.state.displayMode} onChange={(e)=>{this.changeDisplayMode(e.target.value)}}>
                <option value="mobile" selected={this.state.displayMode == "mobile"}>Mobile</option>
                <option value="tablet" selected={this.state.displayMode == "tablet"}>Tablet</option>
                <option value="desktop" selected={this.state.displayMode == "desktop"}>Desktop</option>
              </select>
            </div>
            <Toolbar onDrag={this.onDrag} addRow={this.addRow} removeRow={this.removeRow} />
          </div>
          <div className="row">
            <SelectedField selectedField={this.state.selectedField} onChangeSelectedField={this.onChangeSelectedField} onChangeFieldRow={this.onChangeFieldRow} deSelectField={this.deSelectField} removeSelectedField={this.removeSelectedField} rows={this.state.fields.length} />
          </div>
        </div>
      </div>
    )
  }
}

class ParseFields extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var colWidth;
    switch(this.props.displayMode){
      case "mobile":
        colWidth = "colxs";
        break;
      case "tablet":
        colWidth = "colsm";
        break;
      case "desktop":
        colWidth = "colmd";
        break;
    }
    return (
      <div>
          {this.props.fields.map((row)=>{
            var r,fields;
            r = [];
            var x = (<div className="row">
            {row.map((field)=>{
              var f,style,selected = "";
              if(this.props.selectedField.id === field.id)
                selected = "selectedField";
              try{
                style = eval("({" + field.style + "})");
              }catch(e){
                style = {};
              }
              switch(field.type){
                case "text":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="text" className="form-control" name={field.name} style={style}  />
                        </div>
                       )
                  break;
                case "date":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="date" className="form-control" name={field.name} style={style}  />
                        </div>
                       )
                  break;
                case "number":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="number" className="form-control" name={field.name} style={style}  />
                        </div>
                       )
                  break;
                case "email":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="email" className="form-control" name={field.name} style={style}  />
                        </div>
                       )
                  break;
                case "datetime":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="datetime-local" className="form-control" name={field.name} style={style}  />
                        </div>
                       )
                  break;
                case "checkbox":
                  f = (
                        <div className="checkbox" onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label><input type="checkbox" name={field.name} style={style}  />{field.label}</label>
                        </div>
                       )
                  break;
                case "image":
                  f = (
                        <div className="checkbox" onClick={()=>{this.props.onSelectField(field.id)}}>
                          <img src={field.src} style={style} />
                        </div>
                       )
                  break;
                default:
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="text" className="form-control" name={field.name} style={style}  />
                        </div>
                       )
                  break;
              }
              return (
                <div className={"field col-xs-" + field[colWidth] + " " + "col-sm-" + field[colWidth] + " " + "col-md-" + field[colWidth] + " " + selected} key={field.id}>
                  {f}
                </div>
              );
            })}
            </div>);

            r.push(x);
            return r;
          })}
      </div>
    );
  }
};

class Toolbar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div>
          <div draggable="true" className="col-xs-4 col-sm-4 col-md-4" onDragStart={this.props.onDrag} data-type="text" style={{padding:"10px",textAlign:"center", border:"#e2e2e2 1px solid", borderRadius:"5px",cursor:"move"}}>Text Input</div>
          <div draggable="true" className="col-xs-4 col-sm-4 col-md-4" onDragStart={this.props.onDrag}  data-type="date" style={{padding:"10px",textAlign:"center", border:"#e2e2e2 1px solid", borderRadius:"5px",cursor:"move"}}>Date Input</div>
          <div draggable="true" className="col-xs-4 col-sm-4 col-md-4" onDragStart={this.props.onDrag}  data-type="datetime" style={{padding:"10px",textAlign:"center", border:"#e2e2e2 1px solid", borderRadius:"5px",cursor:"move"}}>Datetime Input</div>
          <div draggable="true" className="col-xs-4 col-sm-4 col-md-4" onDragStart={this.props.onDrag}  data-type="number" style={{padding:"10px",textAlign:"center", border:"#e2e2e2 1px solid", borderRadius:"5px",cursor:"move"}}>Number Input</div>
          <div draggable="true" className="col-xs-4 col-sm-4 col-md-4" onDragStart={this.props.onDrag}  data-type="checkbox" style={{padding:"10px",textAlign:"center", border:"#e2e2e2 1px solid", borderRadius:"5px",cursor:"move"}}>Checkbox Input</div>
          <div draggable="true" className="col-xs-4 col-sm-4 col-md-4" onDragStart={this.props.onDrag}  data-type="image" style={{padding:"10px",textAlign:"center", border:"#e2e2e2 1px solid", borderRadius:"5px",cursor:"move"}}>Image</div>
        </div>
        <div>
          <button type="text" className="btn btn-primary" onClick={()=>{this.props.addRow()}}>Add Row</button>
          <button type="text" className="btn btn-danger" onClick={()=>{this.props.removeRow()}}>Remove Row</button>
        </div>
      </div>
    );
  }
};

class SelectedField extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let {id,label,name,type,colmd,colsm,colxs,src,style,row} = this.props.selectedField;
    var output;
    if(this.props.selectedField && this.props.selectedField.id){
      output = (
        <div>
          <h2>Selected Field</h2>
          <input type="button" className="btn btn-warning" onClick={()=>{this.props.deSelectField();}} value="Deselect" /><br />
          <label>Row: </label>
          <select className="form-control" value={row} onChange={(e)=>{this.props.onChangeFieldRow(e.target.value)}}>
            {times(this.props.rows,(count)=>{return <option selected={row == count} value={count}>{count}</option>;})}
          </select>
          <label>Name: </label>
          <input type="text" className="form-control" value={name} onChange={(e)=>{this.props.onChangeSelectedField("name",e.target.value)}} />
          <label>Label: </label>
          <input type="text" className="form-control" value={label} onChange={(e)=>{this.props.onChangeSelectedField("label",e.target.value)}} />
          <label>Type: </label>
          <select onChange={(e)=>{this.props.onChangeSelectedField("type",e.target.value)}} value={type} className="form-control">
            <option value="text" selected={type == "text"}>Text</option>
            <option value="date" selected={type == "date"}>Date</option>
            <option value="datetime" selected={type == "datetime"}>Date Time</option>
            <option value="number" selected={type == "number"}>Number</option>
            <option value="email" selected={type == "email"}>Email</option>
            <option value="checkbox" selected={type == "checkbox"}>Checkbox</option>
            <option value="image" selected={type == "image"}>Image</option>
          </select>
          <label>Mobile Device Width (Max = 12): </label>
          <input type="text" className="form-control" value={colxs} onChange={(e)=>{this.props.onChangeSelectedField("colxs",e.target.value);}} />
          <label>Tablet Device Width (Max = 12): </label>
          <input type="text" className="form-control" value={colsm} onChange={(e)=>{this.props.onChangeSelectedField("colsm",e.target.value);}} />
          <label>Desktop Device Width (Max = 12): </label>
          <input type="text" className="form-control" value={colmd} onChange={(e)=>{this.props.onChangeSelectedField("colmd",e.target.value);}} />
          <label>Style: </label>
          <input type="text" className="form-control" value={style} onChange={(e)=>{this.props.onChangeSelectedField("style",e.target.value);}} />
          <label>Image Url: </label>
          <input type="text" className="form-control" value={src} onChange={(e)=>{this.props.onChangeSelectedField("src",e.target.value);}} />
          <input type="button" className="btn btn-danger" onClick={()=>{this.props.removeSelectedField();}} value="Remove Field" />
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
