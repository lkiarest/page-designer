import React, { ReactElement } from 'react'
import styles from './index.module.less'

// 格式化 json (https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript)
function syntaxHighlight(json: string | object): string {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2)
  }

  json = json.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt')
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    var cls = styles.number
    if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = styles.key;
        } else {
          cls = styles.string;
        }
    } else if (/true|false/.test(match)) {
      cls = styles.boolean;
    } else if (/null/.test(match)) {
      cls = styles.null
    }
    return '<span class="' + cls + '">' + match + '</span>'
  })
}

export default class JsonView extends React.Component<{json: object}> {
  render(): ReactElement {
    const { json } = this.props
    const formated = syntaxHighlight(json)

    return (
      <code>
        <pre>
        <div dangerouslySetInnerHTML={{__html: formated}} />
        </pre>
      </code>
      // <div dangerouslySetInnerHTML={{__html: formated}} />
    )
  }
}
