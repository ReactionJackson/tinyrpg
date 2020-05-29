export const copyToClipboard = (data, type = "let") => {
  const cb = document.createElement('textarea')
  const dataStr = Object.keys(data).map((key, i) => {
    const val = JSON.stringify(data[key])
    return `${ i > 0 ? '\n' : '' }  ${ type } ${ key } = ${ val }`
  }).join("")
  cb.value = dataStr
  document.body.appendChild(cb)
  cb.select()
  document.execCommand("copy")
  document.body.removeChild(cb)
}
