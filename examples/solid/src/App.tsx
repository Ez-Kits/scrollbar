import { ContainerSizeChange } from "./ContainerSizeChange";
import { NestedScrollBar } from "./NestedScrollBar";
import { ScrollBarPositionAbsolute } from "./ScrollBarPositionAbsolute";
import { VirtualList } from "./VirtualList";
const App = () => {
	return (
		<div>
			<h2>Nested ScrollBar</h2>
			<NestedScrollBar />
			<h2>Virtual List</h2>
			<VirtualList />
			<h2>ScrollBar Position Absolute</h2>
			<ScrollBarPositionAbsolute />
			<h2>Container Size Change</h2>
			<ContainerSizeChange />
		</div>
	);
};

export default App;
