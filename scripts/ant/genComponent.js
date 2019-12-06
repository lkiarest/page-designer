const path = require('path')
const fs = require('fs')
const components = require('./components')

const antComponentDir = path.resolve(__dirname, '../../src/controls/antd')

// 驼峰命名转为下划线命名
const underlineName = (name) => {
  return name.replace(/([A-Z])/g, ch => `_${ch.toLowerCase()}`).replace(/^_/, '')
}

const CATEGORY_NAMES = ['LAYOUT', 'BASIC', 'ADVANCE']

/**
 * Ant Design 组件模板
 * @param category 0: 布局控件 1： 基本控件 2: 高级控件
 */
function antTemplate({
  name,displayName, category = 1, icon = 'question',
  isFormControl = false
}) {
  const lowerName = underlineName(name)
  const categoryName = CATEGORY_NAMES[category]

  return `
import { ${name} } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
${isFormControl ? 'import { formControl } from \'./Form\'\n' : ''}
@staticMembers({
  displayName: '${displayName}',
  category: ElementCategory.${categoryName},
  type: '${lowerName}',
  icon: '${icon}',
  // props: [{ // 右侧属性面板中可以编辑的属性列表
  //   name: 'label',
  //   type: 'input',
  //   props: {
  //     label: '标签'
  //   },
  //   default: '输入框',
  //   dataType: 'string'
  // }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  ${isFormControl ? '@formControl\n  ' : ''}_getComponent() {
    return ${name}
  }
}
`
}

// 生成组件文件
function generate(info) {
  const name = info.name
  const filename = `${name}.tsx`
  const content = antTemplate(info)
  const distFile = path.join(antComponentDir, filename)
  fs.writeFileSync(distFile, content, 'utf-8')

  console.info(`${distFile} generated`)

  // 更新 index
  const indexFile = path.join(antComponentDir, 'index.ts')
  const indexContent = fs.readFileSync(indexFile, 'utf-8')

  const newImport = `import ${name} from './${name}'`
  if (indexContent.indexOf(newImport) > -1) {
    console.info('index file contains this component, no need to update !')
    return
  }

  fs.writeFileSync(
    indexFile,
    indexContent.replace(/(\/\/ new-comp-import)/, (_, $1) => `${newImport}\n${$1}`)
      .replace(/(\/\/ new-comp-list)/, (_, $1) => `${name},\n  ${$1}`),
    'utf-8'
  )

  console.info('index file updated')
}

function start() {
  components.forEach(item => {
    generate(item)
  })

  console.info('all tasks finished !')
}

function test() {
  generate({
    name: 'Button',
    displayName: '按钮',
    isFormControl: false
  })
}

// test()
start()