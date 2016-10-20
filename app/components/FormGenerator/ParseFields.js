import React from "react";
export default class ParseFields extends React.Component {
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
                style = eval("(" + field.style + ")");
              }catch(e){
                style = {};
              }
              switch(field.type){
                case "text":
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <input type="text" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "textarea":
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <textarea type="text" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}></textarea>
                        </div>
                       )
                  break;
                case "picklist":
                  var picklist;
                  if(this.props.getProperty(this.props.picklists,field.picklist))picklist = this.props.getProperty(this.props.picklists,field.picklist).map((item)=>{return (<option>{item}</option>)})
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <select className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}>
                            {picklist}
                          </select>
                        </div>
                       )
                  break;
                case "date":
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <input type="date" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "number":
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <input type="number" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "email":
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <input type="email" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "datetime":
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <input type="datetime-local" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
                case "checkbox":
                  f = (
                        <div className="checkbox">
                          <label><input type="checkbox" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />{field.label}</label>
                        </div>
                       )
                  break;
                case "image":
                  f = (
                        <div>
                          <img src={field.src} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)} />
                        </div>
                       )
                  break;
                case "spacer":
                  f = (
                        <div className="spacer" onClick={()=>{this.props.onSelectField(field.id)}}>
                          &nbsp;
                        </div>
                       )
                  break;
                case "linebreak":
                  f = (
                        <div className="linebreak" onClick={()=>{this.props.onSelectField(field.id)}}>
                          <hr />
                        </div>
                       )
                  break;
                case "paragraph":
                  f = (
                        <div className="paragraph" onClick={()=>{this.props.onSelectField(field.id)}}>
                          <p className="preserveNewLine" style={style}>{field.text}</p>
                        </div>
                       )
                  break;
                default:
                  f = (
                        <div>
                          <label>{field.label}</label>
                          <input type="text" className="form-control" name={field.name} style={style} onChange={(e)=>{this.props.onUpdateDocument(field.binding,e.target.value, field.onChange);}} value={this.props.getProperty(this.props.document,field.binding)}  />
                        </div>
                       )
                  break;
              }
              return (
                <div className={"field columns small-" + field[colWidth] + " medium-" + field[colWidth] + " large-" + field[colWidth] + " " + selected} key={field.id} onClick={()=>{this.props.onSelectField(field.id)}}>
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
