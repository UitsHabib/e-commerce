const Tbody = ({ columns, data }) => {
   
    return (
        <tbody>
            {
                data.map((item, index) => {
                   return <tr key={`row-${index}`}>
                        {
                            columns.map((column, idx) => {
                               if(column.path){
                                    return <td key={`column-${idx}`}>{item[column.path]}</td>
                               }else{
                                   return <td key={`column-${idx}`}>{column.getContent(item,idx)}</td>
                               }
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    )
}

export default Tbody