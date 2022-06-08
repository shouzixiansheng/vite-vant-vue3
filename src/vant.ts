import { Tabbar, TabbarItem, Tab, Tabs, Dialog, Popover, Swipe, SwipeItem, List, PullRefresh, Collapse, CollapseItem, Checkbox, CheckboxGroup, Search, Icon, Lazyload, Skeleton, DropdownMenu, DropdownItem, ActionSheet, Field, Col, Row, DatetimePicker, Popup } from 'vant'
interface App {
	use: (val: any, obj?: object) => App
}
export const vantComponents = (app: App) => {
	app.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Dialog).use(Popover)
		.use(Swipe).use(SwipeItem).use(List).use(PullRefresh).use(Collapse).use(CollapseItem)
		.use(Checkbox).use(CheckboxGroup).use(Search).use(Icon).use(Lazyload, { lazyComponent: true }).use(Skeleton)
		.use(DropdownMenu).use(DropdownItem).use(ActionSheet).use(Field).use(Col).use(Row).use(DatetimePicker).use(Popup)

}
