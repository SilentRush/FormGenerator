import React from "react";

export default class Binding extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      binding:""
    };

    this.updateBinding = (val) =>{
      this.setState({binding:val});
    }

    this.processObject = (obj, arr, str) => {
      for (var property in obj) {
        var li = [], narr=[];
        if (obj.hasOwnProperty(property)) {
          if(obj[property] !== null && typeof obj[property] === 'object'){
            let objli;

            if(str != ""){
              objli = (<li id={str + "-" + property} key={str + "." + property}><a>{property}</a><ul className="vertical menu">{narr}</ul></li>);
              this.processObject(obj[property], narr, str + "." + property);
            }
            else{
              objli = (<li id={property} key={property}><a>{property}</a><ul className="vertical menu">{narr}</ul></li>);
              this.processObject(obj[property], narr, property);
            }
            li.push(objli);
          }
          else{
            let p = property;
            if(str != "")
              li = (<li key={str + "." + p}><a onClick={()=>{this.updateBinding(str + "." + p);}}>{p}</a></li>);
            else{
              li = (<li key={p}><a onClick={()=>{this.updateBinding(p);}}>{p}</a></li>);
            }
          }
        }
        arr.push(li);
      }
    }

    this.processDoc = () => {
      let drilldownmenu = [];
      let {doc} = this.props;
      this.processObject(doc,drilldownmenu, "");
      if(drilldownmenu.length == 0){
        let li = (<li key="blank"><a href=""></a></li>);
        drilldownmenu.push(li);
      }
      return drilldownmenu;
    }
  }

  componentWillMount(){
    this.setState({binding:this.props.binding});
  }

  componentDidMount(){
    var elem = new Foundation.Drilldown($("#drilldown"), {});
    /*if(this.state.binding && this.state.binding.includes(".")){
      let id = this.state.binding.split(".");
      let x = id.filter((str, index)=>{
        if(index < id.length - 1)
          return str;
      });
      x = '#' + x.join("-");
      console.log($(x));
      $('#drilldown').foundation('_show', $(x));
    }
    */
  }

  componentDidUpdate(props,state){
    var elem = new Foundation.Drilldown($("#drilldown"), {});
    /*if(this.state.binding && this.state.binding.includes(".")){
      let id = this.state.binding.split(".");
      let x = id.filter((str, index)=>{
        if(index < id.length - 1)
          return str;
      });
      x = '#' + x.join("-");
      console.log($(x));
      $('#drilldown').foundation('_show', $(x));
    }
    */
  }
  componentWillUnmount(){
    $("#drilldown").foundation('destroy');
  }
  componentWillReceiveProps(props){
    this.setState({binding:props.binding});
  }

  render(){
    let drilldownmenu = this.processDoc();
    return (
      <div>
        <h6>Current Binding: <font style={{color:"rgba(22, 184, 249, 0.63)",fontWeight:"bold"}}>{this.state.binding}</font></h6>
        <ul className="vertical menu" id="drilldown" data-drilldown>
          {drilldownmenu}
        </ul>
        <button onClick={()=>{this.props.updateBinding(this.state.binding);}} className="button success" type="button">Save</button>
        <button onClick={()=>{this.props.closeBindingModal();}} className="button alert" type="button">Cancel</button>
      </div>
    )
  }
}
