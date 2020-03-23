export default interface SerializedTransaction {
	request: {
		fresh: boolean,
		host: string,
		ip: string,
		ips: Array<string>,
		method: string,
		originalUrl: string,
		params: { [index: string]: string},
		query: { [index: string]: string},
		headers: { [index: string]: string},
		body: any
	},
	response: {
		code: number,
		headers: { [index: string]: string},
		body: any
	},
	metadata: any,
	start: string,
	end: string
}