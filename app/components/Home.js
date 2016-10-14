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
      displayMode:"desktop",
      document: {
        "Account":{
          "bop":["x"],
          "Name":"Test Document"
        },
        "NumOfHouses":5
      }
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
        var currRow = fields[fields.length - 1];
        var rowLength = 0;
        currRow.filter((row)=>{rowLength += row.colmd;});
        console.log(rowLength);
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

    this.updateProperty = (obj,is, value) => {
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

    this.getProperty = (obj,is) => {
      if(is){
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
      var document = this.state.document;
      if(property)
        this.updateProperty(document, property, value);
      try{
          eval(func);
      }
      catch(err){
        console.log(err.message);
      }
      this.setState({document:document},()=>{console.log(this.state);});
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
        <div className="small-12 medium-8 large-8 columns" onDrop={this.onDrop} onDragOver={this.onDragOver} style={{minHeight:"500px"}}>
          <h2>Template Layout</h2>
          <ParseFields getProperty={this.getProperty} document={this.state.document} onUpdateDocument={this.onUpdateDocument} fields={this.state.fields} onSelectField={this.onSelectField} displayMode={this.state.displayMode} selectedField={this.state.selectedField} />
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
                          <input type="text" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "date":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="date" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "number":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="number" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "email":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="email" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "datetime":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="datetime-local" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "checkbox":
                  f = (
                        <div className="checkbox" onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label><input type="checkbox" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />{field.label}</label>
                        </div>
                       )
                  break;
                case "image":
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <img src={field.src} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)} />
                        </div>
                       )
                  break;
                default:
                  f = (
                        <div onClick={()=>{this.props.onSelectField(field.id)}}>
                          <label>{field.label}</label>
                          <input type="text" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
              }
              return (
                <div className={"field columns small-" + field[colWidth] + " " + "medium-" + field[colWidth] + " " + "large-" + field[colWidth] + " " + selected} key={field.id}>
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
          <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag} data-type="text" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className="button hollow" style={{cursor:"move",width:"100%",padding: "0.85em 0.2em"}}>Text Input</button></div>
          <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="date" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className="button hollow" style={{cursor:"move",width:"100%",padding: "0.85em 0.2em"}}>Date Input</button></div>
          <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="datetime" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className="button hollow" style={{cursor:"move",width:"100%",padding: "0.85em 0.2em"}}>Datetime Input</button></div>
          <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="number" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className="button hollow" style={{cursor:"move",width:"100%",padding: "0.85em 0.2em"}}>Number Input</button></div>
          <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="checkbox" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className="button hollow" style={{cursor:"move",width:"100%",padding: "0.85em 0.2em"}}>Checkbox Input</button></div>
          <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="image" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className="button hollow" style={{cursor:"move",width:"100%",padding: "0.85em 0.2em"}}>Image</button></div>
        </div>
        <div>
          <button type="text" className="button primary" onClick={()=>{this.props.addRow()}}>Add Row</button>
          <button type="text" className="button alert" onClick={()=>{this.props.removeRow()}}>Remove Row</button>
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
    let {id,label,name,type,colmd,colsm,colxs,src,style,row,onChange,binding} = this.props.selectedField;
    var output;
    if(this.props.selectedField && this.props.selectedField.id){
      var img = "";
      if(type == "image")
        img = (<div className="row">
          <div className="columns small-3">
            <label>Image Url: </label>
          </div>
          <div className="columns small-9">
            <input type="text" className="smallCtrl" value={src} onChange={(e)=>{this.props.onChangeSelectedField("src",e.target.value);}} />
          </div>
        </div>);
      output = (
        <div>
          <h3>Selected Field</h3>
          <input type="button" className="button warning" onClick={()=>{this.props.deSelectField();}} value="Deselect" /><br />
          <div className="row">
            <div className="columns small-3">
              <label>Row: </label>
            </div>
            <div className="columns small-9">
              <select className="smallCtrl form-control" value={row} onChange={(e)=>{this.props.onChangeFieldRow(e.target.value)}}>
                {times(this.props.rows,(count)=>{return <option selected={row == count} value={count}>{count}</option>;})}
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
                <option value="date" selected={type == "date"}>Date</option>
                <option value="datetime" selected={type == "datetime"}>Date Time</option>
                <option value="number" selected={type == "number"}>Number</option>
                <option value="email" selected={type == "email"}>Email</option>
                <option value="checkbox" selected={type == "checkbox"}>Checkbox</option>
                <option value="image" selected={type == "image"}>Image</option>
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
