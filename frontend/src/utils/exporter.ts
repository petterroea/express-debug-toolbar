import SerializedTransaction from '../components/requestViewer/serializedTransaction'

const getBodyStr = (value: any) => {
    if(typeof value === "object") {
        return JSON.stringify(value)
    } else if(typeof value === "string") {
        return value
    } else {
        return ""
    }
}

export const generateHttpDump = (transaction: SerializedTransaction) => {
    return `
#############################
# Requested from ${transaction.start} to ${transaction.end}
# IP: ${transaction.request.ip}
${transaction.request.method} ${transaction.request.originalUrl}
${Object.keys(transaction.request.headers).map((key: string) => {
    return `${key}: ${transaction.request.headers[key]}\n`
}).join("")}

${
getBodyStr(transaction.request.body)
}###### RESPONSE
${transaction.response.code}
${
getBodyStr(transaction.response.body)
}
`
}

interface TransactionIndex  {
    didComplete: boolean,
    uuid: string,
    url: string,
    method: string,
    start: string,
    end: string,
    code: number
}

export const dumpEverything = async () => {
    return (await Promise.all(
        (await (await fetch(`/_debug/api/`)).json()).map(async (entry: TransactionIndex) => {
            return generateHttpDump(await (await fetch(`/_debug/api/${entry.uuid}`)).json())
        })
    )).join("\n")
}

export const downloadFile = (filename: string, text: string) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }