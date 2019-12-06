/**
 * 控件分类
 */
enum ElementCategory {
  LAYOUT, // 布局控件
  FORM,
  BASIC, // 基本控件
  ADVANCE, // 高级控件
}

export const categoryList = [
  {
    type: ElementCategory.LAYOUT,
    title: '布局控件',
  },
  {
    type: ElementCategory.FORM,
    title: '表单控件',
  },
  {
    type: ElementCategory.BASIC,
    title: '通用控件',
  },
  {
    type: ElementCategory.ADVANCE,
    title: '高级控件',
  }
]

export default ElementCategory
