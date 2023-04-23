
import {Loading, Dialog} from "../common/common";
export let dialogMsg, dialogSuccess, dialogClose, dialogError;
export function loadingStart(){
    loading(true)
}
export function loadingStop(){
    loading(false)
}


let loading;
export default function ProcessScreen({children}){
    return (
        <>
        <Loading set={(setVisible)=>{loading=setVisible}}/>
        <Dialog 
        set={
            (messgase, success, error, close) => {
            dialogMsg=messgase;
            dialogSuccess=success;
            dialogError = error;
            dialogClose = close;
            }
            }/>
        {children}
        </>
    )
}