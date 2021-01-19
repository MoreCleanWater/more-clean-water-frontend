import { Button } from "@material-ui/core";

function EditForm (props) {

    const {
        mode,
        selected,
        handleSubmit,
        handleCancel,
        className,
        style
    } = props;

    console.log(selected);

    return (
        <div className={className} style={style}>
            <Button variant="contained"
                className='primaryButton'
                size="small"
                onClick={handleSubmit}
                disableElevation
            >
                {mode === 'create' && 'Add'}
                {mode === 'update' && 'Save'}
            </Button>

            <Button variant="contained"
                className='primaryButton'
                size="small"
                onClick={handleCancel}
                disableElevation
            >
                Cancel
            </Button>
        </div>
    )
}

export default EditForm;