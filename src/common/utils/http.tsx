
const toQueryString = (obj: any) =>
    '?'.concat(
        Object.keys(obj)
            .map((e) => {
                if (obj[e]) {
                    if (Array.isArray(obj[e])) {
                        let str = ''
                        for (let item of obj[e]) {
                            if (str != '') {
                                str += '&'
                            }
                            str += `${encodeURIComponent(e)}=${item}`;
                        }
                        return str;
                    }
                    return `${encodeURIComponent(e)}=${encodeURIComponent(obj[e])}`;
                }
                return null
            })
            .filter((e) => !!e)
            .join('&')
    )

export const urlFetcher = (...args: [string, Record<string, any>?, RequestInit?, string?]) => {
    let [path, params, config] = args
    let reqUrl = path
    if (config && config.method == 'GET' && params) {
        reqUrl += toQueryString(params)
    }

    return fetch(reqUrl, {
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        method: 'POST',
        body: config && config.method == 'GET' ? undefined : JSON.stringify(params),
        ...args[2]
    })
    .then(async (res) => {
        let data = await res.json()
        return data
    })
    .catch((e) => {
        console.error(e)

        throw e
    })
}
