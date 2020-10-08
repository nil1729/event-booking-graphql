const sendRequest = async (requestData) => {
    const myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Content-Type", "application/json");
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestData),
        redirect: "follow",
    };
    const response = await fetch("/graphql", requestOptions);
    const JSONData = await response.json();
    return JSONData;
};

export default sendRequest;