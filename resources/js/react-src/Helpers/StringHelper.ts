
export const parseString = (strToDecode: string) => {

    const parser = new DOMParser()

    return parser.parseFromString(`<!doctype html><body>${strToDecode}`, 'text/html').body.textContent
}
