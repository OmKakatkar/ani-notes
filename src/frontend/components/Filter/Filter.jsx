import {
	FILTER_PRIORITY,
	FILTER_TAG,
	PRIORITY_HIGH,
	PRIORITY_LOW,
	PRIORITY_MEDIUM,
} from "../../constants/reducer-constants";
import { useNotes } from "../../context/notes-context";
import "./Filter.css";

function Filter() {
	const { notes, filters, dispatch } = useNotes();
	const { priority, tags } = filters;

	const tagList = [
		...new Set(notes.reduce((acc, { tags }) => [...acc, ...tags], [])),
	];

	return (
		<>
			<div className="filter-type-container">
				<h5 className="text-lg">Priority</h5>
				<ul className="filter-list">
					<li>
						<label className="radio">
							<input
								type="radio"
								name="priority"
								className="radio-input"
								onChange={() => {
									dispatch({
										type: FILTER_PRIORITY,
										payload: { filters: { priority: PRIORITY_HIGH } },
									});
								}}
								checked={priority && priority === PRIORITY_HIGH}
							/>
							<div className="radio-icon"></div>High
						</label>
					</li>
					<li>
						<label className="radio">
							<input
								type="radio"
								name="priority"
								className="radio-input"
								onChange={() => {
									dispatch({
										type: FILTER_PRIORITY,
										payload: { filters: { priority: PRIORITY_MEDIUM } },
									});
								}}
								checked={priority && priority === PRIORITY_MEDIUM}
							/>
							<div className="radio-icon"></div>Medium
						</label>
					</li>
					<li>
						<label className="radio">
							<input
								type="radio"
								name="priority"
								className="radio-input"
								onChange={() => {
									dispatch({
										type: FILTER_PRIORITY,
										payload: { filters: { priority: PRIORITY_LOW } },
									});
								}}
								checked={priority && priority === PRIORITY_LOW}
							/>
							<div className="radio-icon"></div>Low
						</label>
					</li>
				</ul>
			</div>
			<div className="filter-type-container">
				<h5 className="text-lg">Category</h5>
				<ul className="filter-list">
					{tagList.map((tag, index) => (
						<li key={index}>
							<label className="checkbox">
								<input
									type="checkbox"
									className="checkbox-input"
									onChange={() => {
										dispatch({
											type: FILTER_TAG,
											payload: tag,
										});
									}}
									checked={tags.includes(tag)}
								/>
								<div className="checkbox-icon"></div>
								{tag}
							</label>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
export default Filter;
