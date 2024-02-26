import globalService from "../features/global/globalService"

function NotesBlock({ data }) {
    function createLine () {
        for(let [key, value] of Object.entries(data)) {
            let date = new Date(key * 1)
            // let dateFormat = globalService.formatDate(date)
            return (<><p className='date'>{globalService.formatDate(date)}</p><p>{value}</p></>)
        }
    }
    
    return (
        <div className='noteBox'>
            {createLine()}
        </div>
    )
}

export default NotesBlock
