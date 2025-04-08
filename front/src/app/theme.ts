import { ThemeConfig } from "antd";

export const theme: ThemeConfig  = {
  components: {
    Tabs: {
      horizontalItemGutter: 100,
    },
    Table: {
      headerBg: '#AA1515',
      headerColor: 'white'
    },
    Button: {
      colorPrimary: '#AA1515',
    },
    Collapse: {
      headerBg: 'white',
      colorTextHeading: '#AA1515'
    },
  }
}