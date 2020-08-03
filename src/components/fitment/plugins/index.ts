// import ImagePlugin from './image'
import SeparatorPlugin from './display/separator'
import SeparatorEdit from './edit/separator'
import BlankPlugin from './display/blank'
import BlankEdit from './edit/blank'
import ImagePlugin from './display/image'
import ImageEdit from './edit/image'
import ImageJumpPlugin from './display/image-jump'
import ImageJumpEdit from './edit/image-jump'

const list = [
  {
    group: '基础组件',
    plugins: [
      {
        id: 1,
        icon: 'https://static.zbszkj.com/images/fitment/plugin_image.jpeg',
        selectIcon: 'https://static.zbszkj.com/images/fitment/plugin_image_s.jpeg',
        name: '图片',
        editType: ImageEdit,
        type: ImagePlugin,
        originalDefaultProps: {}
      },
      {
        id: 5,
        icon: 'https://static.zbszkj.com/images/fitment/plugin_blank.jpeg',
        selectIcon: 'https://static.zbszkj.com/images/fitment/plugin_blank_s.jpeg',
        name: '空白',
        editType: BlankEdit,
        type: BlankPlugin,
        selectBtn: true
      },
      {
        id: 6,
        icon: 'https://static.zbszkj.com/images/fitment/plugin_line.jpeg',
        selectIcon: 'https://static.zbszkj.com/images/fitment/plugin_line_s.jpeg',
        name: '横线',
        type: SeparatorPlugin,
        editType: SeparatorEdit,
        selectBtn: true
      }
    ]
  },
  {
    group: '定制组件',
    plugins: [
      {
        id: 11,
        icon: 'https://static.zbszkj.com/images/fitment/plugin_image.jpeg',
        selectIcon: 'https://static.zbszkj.com/images/fitment/plugin_image_s.jpeg',
        name: '图片(带跳转)',
        editType: ImageJumpEdit,
        type: ImageJumpPlugin,
        originalDefaultProps: {}
      }
    ]
  }
]

export default list
