import { database } from "../../../../firebase";
import { useState } from "react";
import _ from "lodash";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ContentCard from "./ContentCard";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import adminStyle from 'styles/Admin.module.scss'

export default function ViewContent(props) {
	const { postedArticle, setEditKey } = props;
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();
	const [alertMessage, setAlertMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState(false);

	const handleAlertClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSuccessMessage(false);
	};

	const handleDelete = (k) => {
		console.log("hello " + k);
		database.child(`${k}`).remove();
		setAlertMessage("Content deleted successfully");
		setSuccessMessage(true);
	};

	const handleEdit = (k) => {
		return setEditKey(k);
	};

	const getContentCard = (article, key) => {
		return (
			<ContentCard
				article={article}
				uniquekey={key}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		);
	};

	return (
		<div style={props.style} className={adminStyle.viewContent}>
            <div className={adminStyle.awarenessContent}>
				<Snackbar
					open={successMessage}
					autoHideDuration={4000}
					onClose={handleAlertClose}
				>
					<Alert onClose={handleAlertClose} severity="success">
						{alertMessage}
					</Alert>
				</Snackbar>
				{/* <Autocomplete
					id="category-combo-box"
					style={{ float: "right", width: "200px" }}
					options={category}
					getOptionLabel={(option) => option.name}
					onChange={(e, value) => {
						setSelectedCategory(value);
					}}
					renderInput={(params) => (
						<TextField required {...params} label="Category" />
					)}
				/> */}
				{postedArticle
					? _.map(postedArticle, (article, key) => getContentCard(article, key))
					: null}
			</div>
			<div className={adminStyle.buttons}>
				{props.children}
			</div>
		</div>
	);
}