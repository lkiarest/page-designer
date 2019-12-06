/**
 * define style render props,
 * follow json-schema
 */
const STYLE_DEFS: any = {
  name: 'styles',
  propsSchema: {
    type: 'object',
    properties: {
      colors: {
        title: 'Colors',
        description: '颜色',
        type: 'object',
        properties: {
          color: {
            title: '前景色',
            type: 'string',
          },
          backgroundColor: {
            title: '背景色',
            type: 'string',
          },
          borderColor: {
            title: '边框颜色',
            type: 'string',
          }
        }
      },
      texts: {
        title: 'Text',
        description: '文本',
        type: 'object',
        properties: {
          fontFamily: {
            title: '字体',
            type: 'string',
          },
          fontSize: {
            title: '字体大小',
            type: 'string',
          },
          fontStyle: {
            title: '字体样式',
            type: 'string',
            enum: ['', 'normal', 'italic', 'oblique', 'initial', 'inherit']
          },
          fontWeight: {
            title: '字体粗细',
            type: 'string',
            enum: ['', 'normal', 'bold', 'bolder', 'lighter']
          },
          textAlign: {
            title: '左右对齐',
            type: 'string',
            enum: ['', 'left', 'center', 'right'],
          },
          whiteSpace: {
            title: '空白换行',
            type: 'string',
            enum: ['', 'normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap']
          },
          textDecorationLine: {
            title: '线条',
            type: 'string',
            enum: ['', 'none', 'underline', 'overline', 'line-through']
          },
          textDecorationColor: {
            title: '线条颜色',
            type: 'string',
          },
          textDecorationStyle: {
            title: '线条风格',
            type: 'string',
            enum: ['', 'solid', 'double', 'dotted', 'dashed', 'wavy']
          },
        }
      },
      margins: {
        title: 'Margins',
        description: '外边距',
        type: 'object',
        properties: {
          marginTop: {
            title: '上边距',
            type: 'string'
          },
          marginBottom: {
            title: '下边距',
            type: 'string'
          },
          marginLeft: {
            title: '左边距',
            type: 'string'
          },
          marginRight: {
            title: '右边距',
            type: 'string'
          }
        }
      },
      paddings: {
        title: 'Paddings',
        description: '内边距',
        type: 'object',
        properties: {
          paddingTop: {
            title: '上边距',
            type: 'string'
          },
          paddingBottom: {
            title: '下边距',
            type: 'string'
          },
          paddingLeft: {
            title: '左边距',
            type: 'string'
          },
          paddingRight: {
            title: '右边距',
            type: 'string'
          }
        }
      },
      borders: {
        title: 'Border',
        description: '边框',
        type: 'object',
        properties: {
          borderWidth: {
            title: '宽度',
            type: 'string',
          },
          borderColor: {
            title: '颜色',
            type: 'string',
          },
          borderStyle: {
            title: '样式',
            type: 'string',
            enum: ['', 'solid', 'none', 'hidden', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset']
          }
        }
      }
    }
  },
  uiSchema: {
    colors: {
      color: {
        'ui:widget': 'color'
      },
      backgroundColor: {
        'ui:widget': 'color'
      },
      borderColor: {
        'ui:widget': 'color'
      }
    },
    texts: {
      textAlign: {
        'ui:widget': 'select'
      },
      textDecorationColor: {
        'ui:widget': 'color'
      }
    },
    borders: {
      borderColor: {
        'ui:widget': 'color'
      }
    }
  }
}

export default () => STYLE_DEFS
