import { Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import adminStyle from "styles/Admin.module.scss";


function ListData (props) {

    const {
        className,
        style
    } = props;

    

    return (
        <div style={style} className={className}>
            <div className={adminStyle.content}>
                <DataGrid 
                    {...props}
                    className=''
                    style={{}}
                />
            </div>

            <div className={adminStyle.buttons}>
                {props.children}
            </div>
        </div>
    )
}

export default ListData;