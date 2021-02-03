import red from '@material-ui/core/colors/red';

function CardStyle(theme) {
	return ({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},

		// paper: {
		//   position: "absolute",
		//   width: 400,
		//   backgroundColor: theme.palette.background.paper,
		//   border: "2px solid #000",
		//   boxShadow: theme.shadows[5],
		//   padding: theme.spacing(2, 4, 3),
		//   margin: "100px",
		// },
	})
};

export default CardStyle;