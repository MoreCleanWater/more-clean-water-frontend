import { Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import css from "./Admin.module.scss";
import { useState } from "react";


function ListData (props) {

    const {
        className,
        style
    } = props;

    

    return (
        <div style={style} className={className}>
            <div className={css.content}>
                <DataGrid 
                    {...props}
                />
            </div>

            <div className={css.buttons}>
                {props.children}
            </div>
        </div>
    )
}

export default ListData;