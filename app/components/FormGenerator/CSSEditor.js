import React from "react";
import Codemirror from "react-codemirror";
require('codemirror/mode/css/css');
require('codemirror/addon/hint/css-hint');
import {showHint} from "codemirror/addon/hint/show-hint";

export default class CSSEditor extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    };
    this.updateCode = (newCode) => {
        this.setState({
            code: newCode
        });
    }


    this.autocompleteCSS = (cm) => {
      let codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
      codeMirror.showHint(cm, codeMirror.hint.css);
    }
    this.autocompleteTag = (cm) => {
      let codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
      codeMirror.showHint(cm, codeMirror.hint.tag);
    }
  }
  componentDidMount(){
    let CodeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
    showHint(CodeMirror);

    var WORD = /([\u4e00-\u9fa5]|[a-zA-Z])+/, RANGE = 500;

    CodeMirror.registerHelper("hint", "tag", function (editor, options) {
        var word = options && options.word || WORD;
        var range = options && options.range || RANGE;
        var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
        var end = cur.ch, start = end;
        while (start && word.test(curLine.charAt(start - 1)))--start;
        var curWord = start != end && curLine.slice(start, end);

        var list = options && options.list || [], seen = {};
        var re = new RegExp(word.source, "g");
        for (var dir = -1; dir <= 1; dir += 2) {
            var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
            for (; line != endLine; line += dir) {
                var text = editor.getLine(line), m;
                while (m = re.exec(text)) {
                    if (line == cur.line && m[0] === curWord) continue;
                    if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
                        seen[m[0]] = true;
                        list.push(m[0]);
                    }
                }
            }
        }
        return { list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end) };
    });
  }
  componentWillUnmount(){
    delete window.doc;
  }

  render(){
    window.doc=this.props.doc;
    var options = {
            lineNumbers: true,
            mode: 'css',
            theme:'eclipse',
            extraKeys: {"Ctrl-Space": this.autocompleteTag,"Shift-Space":this.autocompleteCSS},
        };
    return (
      <div>
        <Codemirror ref="CodeMirror" value={this.props.code} onChange={this.props.updateCode} options={options} />
      </div>
    )
  }
}
