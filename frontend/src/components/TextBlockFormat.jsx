
function TextBlockFormat({data}) {
    if (!data) return
    let breaks = data.split('\n')
  return (
    <>
    {breaks.map((item, i)=> {
        let chunk = <p key={i}>{item}</p>
        if (item !== '')  return chunk
    })}
    </>
  )
}

export default TextBlockFormat
