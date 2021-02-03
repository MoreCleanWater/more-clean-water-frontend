	import { useState, useEffect } from "react";
	import { makeStyles } from "@material-ui/core/styles";
	import Card from "@material-ui/core/Card";
	import CardHeader from "@material-ui/core/CardHeader";
	import CardMedia from "@material-ui/core/CardMedia";
	import CardContent from "@material-ui/core/CardContent";
	import CardActions from "@material-ui/core/CardActions";
	import CardActionArea from "@material-ui/core/CardActionArea";
	import IconButton from "@material-ui/core/IconButton";
	import Typography from "@material-ui/core/Typography";
	import MoreVertIcon from "@material-ui/icons//MoreVert";
	import MenuItem from "@material-ui/core/MenuItem";
	import Menu from "@material-ui/core/Menu";
	import Button from "@material-ui/core/Button";
	import Link from "@material-ui/core/Link";
	import ContentModal from "./ContentModal";
	import Dialog from "@material-ui/core/Dialog";
	import DialogActions from "@material-ui/core/DialogActions";
	import DialogContent from "@material-ui/core/DialogContent";
	import DialogContentText from "@material-ui/core/DialogContentText";
	import CardStyle from 'styles/CardStyle';
	import cardStyle from 'styles/Cards.module.scss';
	import LaunchIcon from '@material-ui/icons/Launch';

import { Avatar, Grid } from "@material-ui/core";
	export default function ContentCard(props) {

	// const cardStyle = makeStyles((theme) => (CardStyle(theme)))();

	console.log(cardStyle)

	const { article, uniquekey, handleEdit, handleDelete, mode } = props;
	const [postedArticle, setPostedArticle] = useState({});
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	useEffect(() => {
		setPostedArticle(article);
	}, [article]);


	// console.log(Object.keys(article))

	// const avatarStyle =
	//   avatarType === "P" ? cardStyle.P : avatarType === "G" ? cardStyle.G : cardStyle.S;

	const handleSettingsClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleModalOpen = () => {
		setOpen(true);
	};

	const handleModalClose = (status) => {
		setOpen(status);
	};

	const handleDeleteOpen = () => {
		setDeleteOpen(true);
		handleClose();
	};

	const handleDeleteClose = () => {
		setDeleteOpen(false);
	};

// 	0: "body"
// ​
// 1: "categoryId"
// ​
// 2: "image"
// ​
// 3: "imageTitle"
// ​
// 4: "title"
// ​
// 5: "video"

	return (
		<Grid item xs={12} sm={6} lg={4}>
			<Card variant="outlined" className={cardStyle.root}>
				<CardHeader className={cardStyle.header}
					avatar={
						<Avatar aria-label="category" className={cardStyle.avatar}>
							M
						</Avatar>
					}
					action={
						props.isAdmin ? 
							<IconButton onClick={handleSettingsClick}>
								<MoreVertIcon />
							</IconButton>
						: false
					}
					title={postedArticle.title}
				/>

				{props.isAdmin ? 
					<Menu
						keepMounted
						id="settings-menu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem
							onClick={() => {
								handleClose();
								handleEdit(uniquekey);
							}}
						>
							<Typography variant="caption" color="primary">
								Edit
							</Typography>
						</MenuItem>

						<MenuItem onClick={handleDeleteOpen}>
							<Typography variant="caption" color="primary">
								Delete
							</Typography>
						</MenuItem>
					</Menu>
					: ''
				}

				<CardActionArea className={cardStyle.actionArea}>
					<div className={cardStyle.mediaArea}>
						{postedArticle.image ? (
							<CardMedia
								className={cardStyle.media}
								image={postedArticle.image}
								title={postedArticle.title}
							/>
						) : null}

						{postedArticle.video ? (
							<CardMedia
								className={cardStyle.media}
								component="iframe"
								title={postedArticle.title}
								src={postedArticle.video}
							/>
						) : null}
					</div>

					<CardContent className={cardStyle.content}>
						
						{postedArticle.body ? (
						<div
							dangerouslySetInnerHTML={{
								__html: postedArticle.body.substr(0, 340),
							}}
						></div>
						) : null}
					</CardContent>
				</CardActionArea>

				{mode !== "dialogue" ? 
					<CardActions>
						<Link
							component="button"
							variant="body2"
							style={{ marginLeft: "auto" }}
							onClick={handleModalOpen}
						>
							<LaunchIcon style={{color: '#78787c'}}/>
						</Link>
					</CardActions>
				: null}

				<ContentModal
					open={open}
					postedArticle={postedArticle}
					handleModalClose={handleModalClose}
				/>

				<Dialog
					open={deleteOpen}
					onClose={handleDeleteClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete?
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleDeleteClose} color="primary">
							Cancel
						</Button>
						
						<Button
							onClick={() => handleDelete(uniquekey)}
							color="primary"
							autoFocus
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>

				{/* <Modal
				open={open}
				onClose={handleModalClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				>
				{body}
				</Modal> */}
			</Card>
		</Grid>
	);
	}
