import { database } from "database/firebase";
import { useState } from "react";
import _ from "lodash";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ContentCard from "components/Awareness/ContentCard";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import cardStyle from 'styles/Cards.module.scss'
import { Grid } from "@material-ui/core";

export default function ViewContent(props) {
	const { postedArticle, setEditKey, className } = props;
	// const [category, setCategory] = useState([]);
	// const [selectedCategory, setSelectedCategory] = useState();
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
				isAdmin={props.isAdmin}
			/>
		);
	};

	return (
		<div style={props.style} className={`${cardStyle.viewContent} ${className}`}>
			<Grid container className={`${cardStyle.awarenessContent} ${className}`} spacing={3}>
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
			</Grid>
			<div className={cardStyle.buttons}>
				{props.children}
			</div>
		</div>
	);
}
