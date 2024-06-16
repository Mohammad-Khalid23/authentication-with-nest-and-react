const HttpRequest = async (endpoint, headers = {}, body) => {

    try {
        const baseUrl = `http://localhost:3000/api/${endpoint}`;

        const requestObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        if (body) {
            requestObject.body = JSON.stringify(body);
        }

        const response = await fetch(baseUrl, requestObject);
        
        return response.json();

    } catch (error) {
        console.error("-----Erorr",error)
    }
};
export default HttpRequest;